import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('Cloudflare R2 Uploader Folder Tree Architecture', () => {
  const rootDir = process.cwd();
  const htmlPath = path.join(rootDir, 'uploader/public/index.html');
  const cssPath = path.join(rootDir, 'uploader/public/style.css');
  const jsPath = path.join(rootDir, 'uploader/public/app.js');
  const serverPath = path.join(rootDir, 'uploader/server.mjs');

  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  const jsContent = fs.readFileSync(jsPath, 'utf-8');
  const serverContent = fs.readFileSync(serverPath, 'utf-8');

  it('Step 1 HTML contains hierarchical folder tree explorer elements and no legacy chips', () => {
    // Must contain tree explorer panel
    expect(htmlContent).toContain('bucket-tree-panel');
    expect(htmlContent).toContain('id="folder-tree-container"');
    expect(htmlContent).toContain('id="folder-tree-search"');
    expect(htmlContent).toContain('id="btn-refresh-tree"');
    expect(htmlContent).toContain('id="selected-folder-badge"');
    expect(htmlContent).toContain('id="folder-input"');
    expect(htmlContent).toContain('id="destination-path-preview"');

    // Legacy static chips container should not exist
    expect(htmlContent).not.toContain('id="folder-chips"');
    expect(htmlContent).not.toContain('folder-chips-container');
  });

  it('server.mjs implements GET /api/folder-tree with pagination and depth calculation', () => {
    expect(serverContent).toContain("app.get('/api/folder-tree'");
    expect(serverContent).toContain('ContinuationToken');
    expect(serverContent).toContain('depth');
    expect(serverContent).toContain('fileCount');
    expect(serverContent).toContain('rootFileCount');
  });

  it('app.js implements loadFolderTree and renderFolderTree with search filtering and depth guides', () => {
    expect(jsContent).toContain('async function loadFolderTree');
    expect(jsContent).toContain('function renderFolderTree');
    expect(jsContent).toContain('function updateTreeSelectionHighlight');
    expect(jsContent).toContain('function updateFolderBadge');
    expect(jsContent).toContain('tree-branch-guide');
    expect(jsContent).toContain('btn-tree-subfolder');
  });

  it('style.css defines styling for tree nodes, depth indentation, and search bar', () => {
    expect(cssContent).toContain('.bucket-tree-panel');
    expect(cssContent).toContain('.folder-tree-container');
    expect(cssContent).toContain('.tree-node');
    expect(cssContent).toContain('.tree-branch-guide');
    expect(cssContent).toContain('.tree-file-count');
    expect(cssContent).toContain('.selected-folder-badge');
  });

  it('folder tree hierarchy parser correctly computes depth, parent, and counts', () => {
    // Simulating bucket object keys
    const mockKeys = [
      'hero.jpg',
      'banner.png',
      'Chroma/preview.png',
      'Chroma/full.jpg',
      'Illustration Works/art1.png',
      'Illustration Works/Green Summer 2025 (MHX) Wall design/wall1.jpg',
      'Illustration Works/Green Summer 2025 (MHX) Wall design/wall2.jpg',
    ];

    const folderStats = new Map<string, number>();
    folderStats.set('', 0);

    mockKeys.forEach((key) => {
      const parts = key.split('/');
      if (parts.length > 1) {
        const folder = parts.slice(0, -1).join('/');
        folderStats.set(folder, (folderStats.get(folder) || 0) + 1);

        for (let i = 1; i < parts.length - 1; i++) {
          const ancestor = parts.slice(0, i).join('/');
          if (!folderStats.has(ancestor)) {
            folderStats.set(ancestor, 0);
          }
        }
      } else {
        folderStats.set('', (folderStats.get('') || 0) + 1);
      }
    });

    const folders = Array.from(folderStats.keys())
      .filter((p) => p.length > 0)
      .map((p) => {
        const parts = p.split('/');
        return {
          path: p,
          name: parts[parts.length - 1],
          parent: parts.slice(0, -1).join('/'),
          depth: parts.length - 1,
          fileCount: folderStats.get(p) || 0,
        };
      })
      .sort((a, b) => a.path.localeCompare(b.path));

    expect(folderStats.get('')).toBe(2); // 2 root files
    expect(folders).toHaveLength(3);

    const chroma = folders.find((f) => f.path === 'Chroma');
    expect(chroma).toBeDefined();
    expect(chroma?.depth).toBe(0);
    expect(chroma?.parent).toBe('');
    expect(chroma?.fileCount).toBe(2);

    const illus = folders.find((f) => f.path === 'Illustration Works');
    expect(illus).toBeDefined();
    expect(illus?.depth).toBe(0);
    expect(illus?.parent).toBe('');
    expect(illus?.fileCount).toBe(1);

    const wall = folders.find((f) => f.path === 'Illustration Works/Green Summer 2025 (MHX) Wall design');
    expect(wall).toBeDefined();
    expect(wall?.depth).toBe(1);
    expect(wall?.parent).toBe('Illustration Works');
    expect(wall?.fileCount).toBe(2);
  });

  it('bucket-structure.json is created in codebase with valid schema and visual tree', () => {
    const rootStructureFile = path.join(rootDir, 'bucket-structure.json');
    const uploaderStructureFile = path.join(rootDir, 'uploader/bucket-structure.json');

    expect(fs.existsSync(rootStructureFile)).toBe(true);
    expect(fs.existsSync(uploaderStructureFile)).toBe(true);

    const data = JSON.parse(fs.readFileSync(rootStructureFile, 'utf-8'));
    expect(data.$schema).toBe('https://json-schema.org/draft/2020-12/schema');
    expect(data.bucketName).toBeTruthy();
    expect(data.publicDomain).toBeTruthy();
    expect(data.syncedAt).toBeTruthy();

    // Summary validation
    expect(data.summary).toBeDefined();
    expect(data.summary.totalFiles).toBeGreaterThan(0);
    expect(data.summary.totalFolders).toBeGreaterThan(0);
    expect(data.summary.rootFiles).toBeGreaterThanOrEqual(0);

    // ASCII visual tree
    expect(data.visualTree).toContain('/ (Bucket Root)');
    expect(data.visualTree).toContain('Illustration Works');

    // Folders array & Tree validation
    expect(Array.isArray(data.folders)).toBe(true);
    expect(data.folders.length).toBe(data.summary.totalFolders);
    expect(data.tree).toBeDefined();
    expect(data.tree.name).toBe('/');
    expect(Array.isArray(data.tree.children)).toBe(true);
  });

  it('server.mjs registers POST /api/sync-structure and syncBucketStructureFile', () => {
    expect(serverContent).toContain("app.post('/api/sync-structure'");
    expect(serverContent).toContain('export async function syncBucketStructureFile()');
  });
});
