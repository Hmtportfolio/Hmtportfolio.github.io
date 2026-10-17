import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

describe('Performance, SEO & Bundle Budget Verification (No Assumptions)', () => {
  beforeAll(() => {
    // Ensure fresh production build exists
    if (!fs.existsSync(DIST_DIR)) {
      execSync('pnpm run build', { cwd: ROOT_DIR, stdio: 'pipe' });
    }
  });

  it('enforces strict client JS bundle budget (< 10 KB vs baseline 44 KB)', () => {
    const astroAssetsDir = path.resolve(DIST_DIR, '_astro');
    expect(fs.existsSync(astroAssetsDir)).toBe(true);

    const jsFiles = fs.readdirSync(astroAssetsDir).filter((f: string) => f.endsWith('.js'));
    expect(jsFiles.length).toBeGreaterThan(0);

    let totalJsBytes = 0;
    jsFiles.forEach((file: string) => {
      const stats = fs.statSync(path.join(astroAssetsDir, file));
      totalJsBytes += stats.size;
    });

    const legacyAppJsBytes = fs.statSync(path.join(ROOT_DIR, 'app.js')).size;
    const reductionPercent = (((legacyAppJsBytes - totalJsBytes) / legacyAppJsBytes) * 100).toFixed(1);

    // Hard budget assertion: client JS must be under 10 KB
    expect(totalJsBytes).toBeLessThan(10 * 1024);

    // Compare with baseline
    console.log(`\n=== BUNDLE BUDGET COMPARISON ===`);
    console.log(`Baseline app.js:   ${(legacyAppJsBytes / 1024).toFixed(2)} KB`);
    console.log(`Astro Client JS:  ${(totalJsBytes / 1024).toFixed(2)} KB`);
    console.log(`Reduction:         ${reductionPercent}% less client JavaScript`);
    console.log(`================================\n`);

    expect(totalJsBytes).toBeLessThan(legacyAppJsBytes * 0.2); // Must be at least 80% smaller
  });

  it('verifies static HTML pre-rendering for SEO (no empty containers)', () => {
    const enHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');
    const vnHtml = fs.readFileSync(path.join(DIST_DIR, 'vn/index.html'), 'utf-8');

    // English pre-rendered content checks
    expect(enHtml).toContain('Hoang Minh Thien');
    expect(enHtml).toContain('Chroma');
    expect(enHtml).toContain('Mana the Cute Battle Maid');
    expect(enHtml).toContain('Van Lang University');
    expect(enHtml).toContain('Character Illustration');

    // Vietnamese pre-rendered content checks
    expect(vnHtml).toContain('Hoàng Minh Thiện');
    expect(vnHtml).toContain('Chroma');
    expect(vnHtml).toContain('Mana the cute Battle Maid');
    expect(vnHtml).toContain('Đại học Văn Lang');
    expect(vnHtml).toContain('Minh họa Nhân vật');

    // Compare with legacy index.html which had an empty <div id="projects-grid"></div>
    const legacyHtml = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf-8');
    expect(legacyHtml).toContain('<div class="projects-grid" id="projects-grid"></div>');
    expect(legacyHtml).not.toContain('Mana the Cute Battle Maid');
  });

  it('validates critical performance attributes on all media and head tags', () => {
    const enHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

    // Check preconnects and self-hosted font preloads
    expect(enHtml).toContain('rel="preconnect" href="https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev"');
    expect(enHtml).toContain('rel="preload" href="/fonts/inter/inter-latin.woff2" as="font" type="font/woff2" crossorigin');

    // Check canonical & hreflang
    expect(enHtml).toContain('rel="canonical" href="https://hmtportfolio.github.io/"');
    expect(enHtml).toContain('rel="alternate" hreflang="vi" href="https://hmtportfolio.github.io/vn/"');

    // Check FOUC prevention inline script exists
    expect(enHtml).toContain("document.documentElement.setAttribute('data-theme', theme);");

    // Check that modal video tags have preload="none" and poster to avoid unneeded buffering
    expect(enHtml).toContain('preload="none"');
    expect(enHtml).toContain('poster="/thumbnails/');

    // Check that card images have loading="lazy" and decoding="async"
    expect(enHtml).toContain('loading="lazy"');
    expect(enHtml).toContain('decoding="async"');

    // Check that above-the-fold avatar has eager loading and high priority
    expect(enHtml).toContain('class="avatar" src="/avatar.webp" alt="Hoang Minh Thien" loading="eager" fetchpriority="high"');
  });

  it('verifies static assets exist at dist root for GitHub Pages', () => {
    expect(fs.existsSync(path.join(DIST_DIR, 'robots.txt'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'sitemap.xml'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'sw.js'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'vn/index.html'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'index.html'))).toBe(true);
  });
});
