import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import sharp from 'sharp';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand
} from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CF_ACCESS_KEY_ID,
    secretAccessKey: process.env.CF_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.CF_BUCKET_NAME;
const PUBLIC_DOMAIN = 'https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev';

async function objectExists(key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch (e) {
    return false;
  }
}

async function main() {
  const enPath = path.resolve(__dirname, '../src/data/en.ts');
  const enContent = fs.readFileSync(enPath, 'utf8');

  // Match all { src: "https://pub-.../..." }
  const regex = /src:\s*"([^"]+)"/g;
  let m;
  const urls = [];
  while ((m = regex.exec(enContent)) !== null) {
    if (m[1].includes(PUBLIC_DOMAIN) && /\.(png|jpe?g)$/i.test(m[1])) {
      urls.push(m[1]);
    }
  }

  const uniqueUrls = [...new Set(urls)];
  console.log(`Found ${uniqueUrls.length} unique remote raster images in en.ts`);

  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;
  const mapping = {};

  for (let i = 0; i < uniqueUrls.length; i++) {
    const originalUrl = uniqueUrls[i];
    const encodedPath = originalUrl.replace(`${PUBLIC_DOMAIN}/`, '');
    const s3Key = decodeURIComponent(encodedPath);

    const ext = path.extname(s3Key);
    const webKey = s3Key.slice(0, -ext.length) + '.web.webp';
    const webUrl = `${PUBLIC_DOMAIN}/${webKey.split('/').map(encodeURIComponent).join('/')}`;

    mapping[originalUrl] = webUrl;

    const exists = await objectExists(webKey);
    if (exists) {
      console.log(`[${i + 1}/${uniqueUrls.length}] Already exists: ${webKey}`);
      continue;
    }

    try {
      console.log(`[${i + 1}/${uniqueUrls.length}] Optimizing: ${s3Key}`);
      const getRes = await client.send(new GetObjectCommand({ Bucket: BUCKET, Key: s3Key }));
      const originalBytes = await getRes.Body.transformToByteArray();
      totalOriginalBytes += originalBytes.length;

      const optimizedBuffer = await sharp(Buffer.from(originalBytes))
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();

      totalOptimizedBytes += optimizedBuffer.length;

      await client.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: webKey,
        Body: optimizedBuffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000, immutable'
      }));

      const origMb = (originalBytes.length / (1024 * 1024)).toFixed(2);
      const optKb = (optimizedBuffer.length / 1024).toFixed(1);
      const savings = ((1 - optimizedBuffer.length / originalBytes.length) * 100).toFixed(1);
      console.log(`  ✓ Uploaded ${webKey}: ${origMb} MB -> ${optKb} KB (${savings}% savings)`);
    } catch (err) {
      console.error(`  ✗ Failed to optimize ${s3Key}:`, err.message);
    }
  }

  fs.writeFileSync(
    path.resolve(__dirname, 'url-mapping.json'),
    JSON.stringify(mapping, null, 2)
  );

  console.log('\nOptimization complete!');
  if (totalOriginalBytes > 0) {
    console.log(`Total original processed: ${(totalOriginalBytes / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Total optimized produced: ${(totalOptimizedBytes / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Overall savings: ${((1 - totalOptimizedBytes / totalOriginalBytes) * 100).toFixed(1)}%`);
  }
}

main().catch(console.error);
