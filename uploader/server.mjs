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

// 1. Get current configuration (masking secret)
app.get('/api/config', (req, res) => {
  const accountId = process.env.CF_ACCOUNT_ID || '';
  const accessKeyId = process.env.CF_ACCESS_KEY_ID || '';
  const secretAccessKey = process.env.CF_SECRET_ACCESS_KEY || '';
  const bucketName = process.env.CF_BUCKET_NAME || '';
  const publicDomain = process.env.CF_PUBLIC_DOMAIN || 'https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev';

  res.json({
    configured: Boolean(accountId && accessKeyId && secretAccessKey && bucketName),
    accountId,
    accessKeyId,
    secretAccessKey: secretAccessKey ? '••••••••' + secretAccessKey.slice(-4) : '',
    hasSecret: Boolean(secretAccessKey),
    bucketName,
    publicDomain,
  });
});

// 2. Save configuration to .env
app.post('/api/config', (req, res) => {
  try {
    const { accountId, accessKeyId, secretAccessKey, bucketName, publicDomain } = req.body;

    const existingSecret = process.env.CF_SECRET_ACCESS_KEY || '';
    const finalSecret = secretAccessKey && !secretAccessKey.startsWith('••••')
      ? secretAccessKey.trim()
      : existingSecret;

    const newConfig = {
      CF_ACCOUNT_ID: (accountId || '').trim(),
      CF_ACCESS_KEY_ID: (accessKeyId || '').trim(),
      CF_SECRET_ACCESS_KEY: finalSecret,
      CF_BUCKET_NAME: (bucketName || '').trim(),
      CF_PUBLIC_DOMAIN: (publicDomain || '').trim() || 'https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev',
      PORT: String(PORT),
    };

    // Update process.env
    Object.assign(process.env, newConfig);

    // Save to .env file
    const envContent = Object.entries(newConfig)
      .map(([k, v]) => `${k}=${v}`)
      .join('\n') + '\n';

    fs.writeFileSync(envPath, envContent, 'utf-8');

    res.json({ success: true, message: 'Settings saved successfully!' });
  } catch (error) {
    console.error('Error saving config:', error);
    res.status(500).json({ success: false, error: error.message });
  }
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

// 4. Get list of existing folder prefixes and recent files from bucket
app.get('/api/folders', async (req, res) => {
  const s3 = getS3Client();
  const bucket = process.env.CF_BUCKET_NAME?.trim();

  if (!s3 || !bucket) {
    return res.json({ folders: [] });
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Delimiter: '/',
      MaxKeys: 100,
    });
    const result = await s3.send(command);

    const folders = (result.CommonPrefixes || [])
      .map(p => p.Prefix?.replace(/\/$/, ''))
      .filter(Boolean);

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
    res.json({ success: true, message: `Deleted ${key}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n======================================================`);
  console.log(`🚀 Cloudflare R2 Uploader is running!`);
  console.log(`🌐 Web UI: ${url}`);
  console.log(`======================================================\n`);

  if (process.env.OPEN_BROWSER === 'true') {
    const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${openCmd} ${url}`);
  }
});

