import express from 'express';
import multer from 'multer';
import mime from 'mime-types';
import dotenv from 'dotenv';
import { 
  S3Client, 
  PutObjectCommand, 
  ListObjectsV2Command, 
  HeadBucketCommand,
  DeleteObjectCommand 
} from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');

// Load environment variables
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB max per file
  },
});

// Helper to get or create S3 client based on current settings
function getS3Client(config = process.env) {
  const accountId = config.CF_ACCOUNT_ID?.trim();
  const accessKeyId = config.CF_ACCESS_KEY_ID?.trim();
  const secretAccessKey = config.CF_SECRET_ACCESS_KEY?.trim();

  if (!accountId || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

// Format Public URL
function getPublicUrl(key, config = process.env) {
  let domain = (config.CF_PUBLIC_DOMAIN || '').trim();
  if (!domain) {
    // Fallback to r2.dev or placeholder
    domain = `https://${config.CF_BUCKET_NAME || 'bucket'}.r2.dev`;
  }
  if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
    domain = `https://${domain}`;
  }
  domain = domain.replace(/\/+$/, '');
  
  // Encode each path segment properly
  const cleanKey = key.split('/').map(segment => encodeURIComponent(segment)).join('/');
  return `${domain}/${cleanKey}`;
}

// 1. Get current configuration status (never exposes raw credentials to the client)
app.get('/api/config', (req, res) => {
  const accountId = process.env.CF_ACCOUNT_ID || '';
  const accessKeyId = process.env.CF_ACCESS_KEY_ID || '';
  const secretAccessKey = process.env.CF_SECRET_ACCESS_KEY || '';
  const bucketName = process.env.CF_BUCKET_NAME || '';
  const publicDomain = process.env.CF_PUBLIC_DOMAIN || 'https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev';

  res.json({
    configured: Boolean(accountId && accessKeyId && secretAccessKey && bucketName),
    bucketName: bucketName || '(not set)',
    publicDomain,
    source: '.env',
    readOnly: true,
  });
});

// 2. Configuration is strictly managed via .env - UI writes are disabled for security
app.post('/api/config', (req, res) => {
  res.status(403).json({
    success: false,
    error: 'Configuration is strictly managed via uploader/.env on the server. Editing credentials from the browser UI is disabled for security.',
  });
});

// 3. Test Connection
app.get('/api/test-connection', async (req, res) => {
  const s3 = getS3Client();
  const bucket = process.env.CF_BUCKET_NAME?.trim();

  if (!s3 || !bucket) {
    return res.status(400).json({
      success: false,
      error: 'Incomplete configuration. Please fill in all required Cloudflare R2 credentials in Settings.',
    });
  }

  try {
    // Try to list objects (MaxKeys=1) to verify both read access & bucket existence
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      MaxKeys: 1,
    });
    const result = await s3.send(command);
    res.json({
      success: true,
      message: `Connection successful! Bucket "${bucket}" is accessible.`,
      keyCount: result.KeyCount ?? 0,
    });
  } catch (error) {
    console.error('Test connection error:', error);
    let message = error.message;
    if (error.name === 'NoSuchBucket') {
      message = `Bucket "${bucket}" does not exist. Check bucket name.`;
    } else if (error.name === 'InvalidAccessKeyId' || error.$metadata?.httpStatusCode === 403) {
      message = 'Access denied or invalid credentials. Check Account ID, Access Key ID, and Secret Key.';
    }
    res.status(500).json({ success: false, error: message });
  }
});

// Helper: Build a nested tree structure with files
function buildNestedTree(folders, rootFiles) {
  const root = {
    name: '/',
    path: '',
    fileCount: rootFiles.length,
    files: rootFiles,
    children: [],
  };

  const nodeMap = new Map();
  nodeMap.set('', root);

  folders.forEach((f) => {
    const node = {
      name: f.name,
      path: f.path,
      depth: f.depth,
      fileCount: f.fileCount,
      files: f.files || [],
      children: [],
    };
    nodeMap.set(f.path, node);
  });

  folders.forEach((f) => {
    const parentNode = nodeMap.get(f.parent);
    const currentNode = nodeMap.get(f.path);
    if (parentNode && currentNode) {
      parentNode.children.push(currentNode);
    }
  });

  return root;
}

// Helper: Generate formatted ASCII visual tree string
function generateAsciiTree(node, prefix = '', isLast = true, isRoot = true) {
  let lines = [];
  if (isRoot) {
    lines.push(`/ (Bucket Root) [${node.fileCount} direct files]`);
  } else {
    const marker = isLast ? '└── ' : '├── ';
    lines.push(`${prefix}${marker}${node.name} [${node.fileCount} files]`);
  }

  const childPrefix = isRoot ? '' : prefix + (isLast ? '    ' : '│   ');
  const children = node.children || [];
  children.forEach((child, index) => {
    const last = index === children.length - 1;
    lines.push(generateAsciiTree(child, childPrefix, last, false));
  });

  return lines.join('\n');
}

// Synchronize and write bucket-structure.json to codebase
export async function syncBucketStructureFile() {
  const s3 = getS3Client();
  const bucket = process.env.CF_BUCKET_NAME?.trim();
  const domain = (process.env.CF_PUBLIC_DOMAIN || '').trim().replace(/\/+$/, '');

  if (!s3 || !bucket) {
    return null;
  }

  const folderStats = new Map();
  folderStats.set('', 0);

  let isTruncated = true;
  let continuationToken = undefined;
  let totalFetched = 0;
  const allContents = [];

  while (isTruncated && totalFetched < 10000) {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      MaxKeys: 1000,
      ContinuationToken: continuationToken,
    });
    const result = await s3.send(command);
    const contents = result.Contents || [];
    totalFetched += contents.length;
    allContents.push(...contents);

    isTruncated = Boolean(result.IsTruncated && result.NextContinuationToken);
    continuationToken = result.NextContinuationToken;
  }

  // Format file details with public URLs (filter out directory marker keys ending in /)
  const allFiles = allContents
    .filter((obj) => obj.Key && !obj.Key.endsWith('/'))
    .map((obj) => {
      const key = obj.Key;
      const parts = key.split('/');
      const name = parts[parts.length - 1];
      const folder = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
      const encodedKey = parts.map(encodeURIComponent).join('/');
      const url = `${domain}/${encodedKey}`;
      return {
        name,
        key,
        folder,
        size: obj.Size || 0,
        lastModified: obj.LastModified ? new Date(obj.LastModified).toISOString() : null,
        url,
      };
    })
    .sort((a, b) => a.key.localeCompare(b.key));

  const filesByFolder = new Map();
  filesByFolder.set('', []);

  allFiles.forEach((file) => {
    const folder = file.folder;
    if (!filesByFolder.has(folder)) {
      filesByFolder.set(folder, []);
    }
    filesByFolder.get(folder).push(file);

    // Track ancestors
    if (folder) {
      const parts = folder.split('/');
      for (let i = 1; i <= parts.length; i++) {
        const ancestor = parts.slice(0, i).join('/');
        if (!filesByFolder.has(ancestor)) {
          filesByFolder.set(ancestor, []);
        }
      }
    }
  });

  const rootFiles = filesByFolder.get('') || [];

  const folders = Array.from(filesByFolder.keys())
    .filter((path) => path.length > 0)
    .map((path) => {
      const parts = path.split('/');
      const name = parts[parts.length - 1];
      const parent = parts.slice(0, -1).join('/');
      const depth = parts.length - 1;
      const files = filesByFolder.get(path) || [];
      return {
        path,
        name,
        parent,
        depth,
        fileCount: files.length,
        files,
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path));

  const nestedTree = buildNestedTree(folders, rootFiles);
  const visualTree = generateAsciiTree(nestedTree);

  const payload = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    bucketName: bucket,
    publicDomain: domain,
    syncedAt: new Date().toISOString(),
    summary: {
      totalFiles: allFiles.length,
      totalFolders: folders.length,
      rootFiles: rootFiles.length,
    },
    visualTree,
    rootFiles,
    folders,
    allFiles,
    tree: nestedTree,
  };

  const jsonStr = JSON.stringify(payload, null, 2);

  // Write to project root and uploader directory
  const rootDir = path.resolve(__dirname, '..');
  const rootFilePath = path.join(rootDir, 'bucket-structure.json');
  const uploaderFilePath = path.join(__dirname, 'bucket-structure.json');

  try {
    fs.writeFileSync(rootFilePath, jsonStr, 'utf-8');
    fs.writeFileSync(uploaderFilePath, jsonStr, 'utf-8');
    console.log(`[Bucket Structure] Updated bucket-structure.json (${folders.length} folders, ${allContents.length} files)`);
  } catch (err) {
    console.warn('[Bucket Structure] Error writing bucket-structure.json:', err.message);
  }

  return payload;
}

// 4. Get list of existing folder tree and file counts from bucket
app.get('/api/folder-tree', async (req, res) => {
  try {
    const synced = await syncBucketStructureFile();
    if (synced) {
      return res.json({
        configured: true,
        rootFileCount: synced.summary.rootFiles,
        folders: synced.folders,
        visualTree: synced.visualTree,
        syncedAt: synced.syncedAt,
      });
    }

    // Fallback: check if bucket-structure.json exists on disk
    const uploaderFilePath = path.join(__dirname, 'bucket-structure.json');
    if (fs.existsSync(uploaderFilePath)) {
      const diskData = JSON.parse(fs.readFileSync(uploaderFilePath, 'utf-8'));
      return res.json({
        configured: true,
        rootFileCount: diskData.summary?.rootFiles || 0,
        folders: diskData.folders || [],
        visualTree: diskData.visualTree || '',
        syncedAt: diskData.syncedAt,
        cached: true,
      });
    }

    res.json({ configured: false, rootFileCount: 0, folders: [] });
  } catch (error) {
    console.warn('Could not list folder tree:', error.message);
    res.json({ configured: false, rootFileCount: 0, folders: [] });
  }
});

app.post('/api/sync-structure', async (req, res) => {
  try {
    const synced = await syncBucketStructureFile();
    if (!synced) {
      return res.status(400).json({ error: 'R2 bucket credentials not configured.' });
    }
    res.json({ success: true, data: synced });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/folders', async (req, res) => {
  const s3 = getS3Client();
  const bucket = process.env.CF_BUCKET_NAME?.trim();

  if (!s3 || !bucket) {
    return res.json({ folders: [] });
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      MaxKeys: 1000,
    });
    const result = await s3.send(command);
    const contents = result.Contents || [];

    const folderSet = new Set();
    contents.forEach((obj) => {
      const key = obj.Key || '';
      const parts = key.split('/');
      if (parts.length > 1) {
        folderSet.add(parts.slice(0, -1).join('/'));
      }
    });

    const folders = Array.from(folderSet).sort();
    res.json({ folders });
  } catch (error) {
    console.warn('Could not list folders:', error.message);
    res.json({ folders: [] });
  }
});

// 5. List objects in bucket (for Explorer view)
app.get('/api/objects', async (req, res) => {
  const s3 = getS3Client();
  const bucket = process.env.CF_BUCKET_NAME?.trim();
  const prefix = req.query.prefix || '';

  if (!s3 || !bucket) {
    return res.status(400).json({ error: 'R2 is not configured.' });
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix ? (prefix.endsWith('/') ? prefix : prefix + '/') : '',
      MaxKeys: 200,
    });
    const result = await s3.send(command);

    const items = (result.Contents || []).map(obj => ({
      key: obj.Key,
      name: path.basename(obj.Key),
      size: obj.Size,
      lastModified: obj.LastModified,
      url: getPublicUrl(obj.Key),
    }));

    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Upload Files (single or multiple)
app.post('/api/upload', upload.array('files', 100), async (req, res) => {
  const s3 = getS3Client();
  const bucket = process.env.CF_BUCKET_NAME?.trim();

  if (!s3 || !bucket) {
    return res.status(400).json({
      success: false,
      error: 'Cloudflare R2 is not configured. Please open Settings and enter your credentials.',
    });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'No files were uploaded.',
    });
  }

  // Parse folder destination
  let folder = (req.body.folder || '').trim();
  folder = folder.replace(/^\/+|\/+$/g, ''); // strip leading/trailing slashes

  let customNames = [];
  try {
    if (req.body.customNames) {
      customNames = JSON.parse(req.body.customNames);
    }
  } catch (e) {
    customNames = [];
  }

  const results = [];
  const errors = [];

  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    const originalName = file.originalname;
    const finalName = customNames[i] && customNames[i].trim() ? customNames[i].trim() : originalName;

    // Build S3 Key
    const s3Key = folder ? `${folder}/${finalName}` : finalName;

    // Detect Content-Type
    let contentType = file.mimetype;
    if (!contentType || contentType === 'application/octet-stream') {
      contentType = mime.lookup(finalName) || 'application/octet-stream';
    }

    try {
      const putCommand = new PutObjectCommand({
        Bucket: bucket,
        Key: s3Key,
        Body: file.buffer,
        ContentType: contentType,
      });

      await s3.send(putCommand);

      const publicUrl = getPublicUrl(s3Key);
      const cleanName = path.parse(finalName).name;

      results.push({
        success: true,
        originalName,
        fileName: finalName,
        bucket,
        key: s3Key,
        bucketPath: `${bucket}/${s3Key}`,
        folder: folder || '(root)',
        size: file.size,
        contentType,
        url: publicUrl,
        markdown: `![${cleanName}](${publicUrl})`,
        html: `<img src="${publicUrl}" alt="${cleanName}" />`,
      });
    } catch (err) {
      console.error(`Failed to upload ${originalName}:`, err);
      errors.push({
        fileName: finalName,
        key: s3Key,
        error: err.message,
      });
    }
  }

  // Sync bucket-structure.json in background if any file succeeded
  if (results.length > 0) {
    syncBucketStructureFile().catch((err) => {
      console.warn('[Bucket Structure] Post-upload sync failed:', err.message);
    });
  }

  res.json({
    success: errors.length === 0,
    uploadedCount: results.length,
    failedCount: errors.length,
    results,
    errors,
  });
});

// 7. Delete an object (optional utility)
app.delete('/api/object', async (req, res) => {
  const s3 = getS3Client();
  const bucket = process.env.CF_BUCKET_NAME?.trim();
  const key = req.query.key;

  if (!s3 || !bucket || !key) {
    return res.status(400).json({ error: 'Missing parameters.' });
  }

  try {
    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    syncBucketStructureFile().catch(() => {});
    res.json({ success: true, message: `Deleted ${key}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server (bound to localhost for security)
app.listen(PORT, '127.0.0.1', async () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n======================================================`);
  console.log(`🚀 Cloudflare R2 Uploader is running!`);
  console.log(`🌐 Web UI: ${url}`);
  console.log(`======================================================\n`);

  // Automatically scan and sync bucket-structure.json on startup
  try {
    const synced = await syncBucketStructureFile();
    if (synced) {
      console.log(`📁 Bucket structure synchronized to codebase:`);
      console.log(`   - bucket-structure.json`);
      console.log(`   - uploader/bucket-structure.json\n`);
    }
  } catch (err) {
    console.warn(`[Bucket Structure] Startup sync skipped: ${err.message}`);
  }

  if (process.env.OPEN_BROWSER === 'true') {
    const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${openCmd} ${url}`);
  }
});

