import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  S3Client,
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

const uploads = [
  {
    localFile: '/tmp/chroma_web_1080.mp4',
    key: 'Chroma/Trailer CHROMA_nhóm 2.web.mp4',
    originalUrl: 'https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Trailer%20CHROMA_nh%C3%B3m%202.mp4',
  },
  {
    localFile: '/tmp/regretful_web_1080.mp4',
    key: 'Regretful Colors (Sac Mau Hoi Han)/Short film Sắc màu hối hận.web.mp4',
    originalUrl: 'https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Short%20film%20S%E1%BA%AFc%20m%C3%A0u%20h%E1%BB%91i%20h%E1%BA%ADn.mp4',
  }
];

async function main() {
  console.log('Uploading web-optimized videos to Cloudflare R2...');

  for (const item of uploads) {
    const stats = fs.statSync(item.localFile);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`\nProcessing ${item.key} (${sizeMb} MB)...`);

    const fileStream = fs.createReadStream(item.localFile);

    console.log(`  Uploading to s3://${BUCKET}/${item.key}...`);
    await client.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: item.key,
      Body: fileStream,
      ContentLength: stats.size,
      ContentType: 'video/mp4',
      CacheControl: 'public, max-age=31536000, immutable'
    }));

    const webUrl = `${PUBLIC_DOMAIN}/${item.key.split('/').map(encodeURIComponent).join('/')}`;
    console.log(`  ✓ Successfully uploaded: ${webUrl}`);
  }

  console.log('\nAll videos uploaded successfully to Cloudflare R2!');
}

main().catch(console.error);
