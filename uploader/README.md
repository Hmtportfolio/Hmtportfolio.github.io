# 🚀 Cloudflare R2 Asset & Image Uploader

A cross-platform Node.js mini program with a modern web UI to upload single or multiple images/assets to **Cloudflare R2**, organize them into bucket folders/prefixes, and view & copy both the **Bucket Path** and **Public URL** for each uploaded asset.

---

## 🛠️ Developer Setup & Commands

Run from project root or inside `uploader/`:

### From Project Root:
```bash
# Start in dev mode (hot-reloads on file changes)
npm run uploader
# or with pnpm
pnpm uploader

# Production start
npm run uploader:start
# or with pnpm
pnpm uploader:start
```

### From `uploader/` Directory:
```bash
cd uploader
pnpm install       # or npm install

# Dev mode with native Node.js watch
pnpm dev           # or npm run dev

# Start mode
pnpm start         # or npm start
```

Server starts at: **`http://localhost:3333`**

---

## 🔑 Cloudflare R2 Credentials

Configure via the **Settings (⚙️)** modal in the Web UI or in `uploader/.env`:

```env
CF_ACCOUNT_ID=your_cloudflare_account_id
CF_ACCESS_KEY_ID=your_r2_access_key_id
CF_SECRET_ACCESS_KEY=your_r2_secret_access_key
CF_BUCKET_NAME=your_bucket_name
CF_PUBLIC_DOMAIN=https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev

PORT=3333
```

> **Note:** The UI features a **⚡ Test Connection** button in Settings that verifies credentials against Cloudflare R2 via `@aws-sdk/client-s3` without needing to upload a file first.

---

## 🎯 Features

### 1. 📂 Specify Destination Folder / Prefix
- Enter any destination prefix (e.g. `Chroma`, `Illustration works`, `Wall Design`, `2026/Portraits`, or leave blank for root `/`).
- Quick-select chips populated with your portfolio folders and dynamically fetched from your R2 bucket.
- Live URL preview showing target path before uploading (`https://.../Chroma/Poster.png`).

### 2. 🖼️ Single & Multiple File Uploads
- Drag & drop 1 or multiple files into the dropzone.
- Multi-file picker dialog.
- **Clipboard Paste (<kbd>Ctrl</kbd> + <kbd>V</kbd>)**: Paste screenshot or image file directly.
- Thumbnail previews and inline filename editing before upload.
- Upload individual items or hit **Upload All Files** with progress bars.

### 3. 📍 Detailed Per-File Upload Results
For each file successfully uploaded, the UI displays:
- **Bucket Path / Object Key**: e.g. `Chroma/Poster.png` with a dedicated `📋 Copy Path` button.
- **Public URL**: e.g. `https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Poster.png` with a `📋 Copy URL` button and `↗ Open Link` button.
- Image thumbnail, size (KB/MB), and content-type.

### 4. 📋 Batch Export & Copy Options
- **📋 Copy Public URLs**: Raw newline-separated URLs (ideal for pasting into `Chroma.txt`, `Illustration works.txt`, etc.).
- **📋 Copy Bucket Paths**: Raw newline-separated bucket keys.
- **📋 Copy JSON**: Formatted array of `{ fileName, bucket, key, bucketPath, url, size, contentType }`.
- **📋 Markdown**: `![name](url)`

### 5. 🗂️ Bucket Explorer
- Browse existing assets in the R2 bucket.
- Filter by folder or filename.
- Click "Use Folder" on any item to set it as current upload target.
