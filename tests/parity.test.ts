import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { enData } from '../src/data/en';
import { vnData } from '../src/data/vn';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract the legacy DATA object from app.js to guarantee zero data loss
function getLegacyData(): any {
  const appJsPath = path.resolve(__dirname, '../app.js');
  const content = fs.readFileSync(appJsPath, 'utf-8');
  // Find substring starting at "const DATA = {" and ending before "/* === APP LOGIC"
  const startIdx = content.indexOf('const DATA = {');
  const endIdx = content.indexOf('/* ================================================================\n   APP LOGIC');
  const dataBlock = content.substring(startIdx, endIdx);
  // Evaluate the block safely in a Function
  const fn = new Function(`${dataBlock}; return DATA;`);
  return fn();
}

describe('Legacy Data Parity Verification (Zero Data Loss)', () => {
  const legacy = getLegacyData();

  describe('English Data Parity', () => {
    it('matches about section metadata and skills', () => {
      expect(enData.about.name).toBe(legacy.en.about.name);
      expect(enData.about.role).toBe(legacy.en.about.role);
      expect(enData.about.skills.tags).toEqual(legacy.en.about.skills.tags);
      expect(enData.about.education.items.length).toBe(legacy.en.about.education.items.length);
      expect(enData.about.experience.items.length).toBe(legacy.en.about.experience.items.length);
    });

    it('matches all project IDs and sequence', () => {
      const modernIds = enData.projects.items.map((p) => p.id);
      const legacyIds = legacy.en.projects.items.map((p: any) => p.id);
      expect(modernIds).toEqual(legacyIds);
    });

    it('preserves all project image and media URLs exactly', () => {
      legacy.en.projects.items.forEach((legacyProj: any) => {
        const modernProj = enData.projects.items.find((p) => p.id === legacyProj.id);
        expect(modernProj).toBeDefined();
        if (!modernProj) return;

        expect(modernProj.name).toBe(legacyProj.name);
        expect(modernProj.type).toBe(legacyProj.type);
        expect(modernProj.tools).toBe(legacyProj.tools);
        expect(modernProj.images.map((img) => img.src)).toEqual(legacyProj.images.map((img: any) => img.src));
        expect(modernProj.pdfs.map((pdf) => pdf.url)).toEqual(legacyProj.pdfs.map((pdf: any) => pdf.url));
        expect(modernProj.bullets).toEqual(legacyProj.bullets);
      });
    });

    it('matches all services and contact items', () => {
      expect(enData.services.items.length).toBe(legacy.en.services.items.length);
      expect(enData.contact.items.length).toBe(legacy.en.contact.items.length);
      expect(enData.contact.items[0].value).toBe(legacy.en.contact.items[0].value);
    });
  });

  describe('Vietnamese Data Parity', () => {
    it('matches Vietnamese about metadata and skills', () => {
      expect(vnData.about.name).toBe(legacy.vn.about.name);
      expect(vnData.about.role).toBe(legacy.vn.about.role);
      expect(vnData.about.skills.tags).toEqual(legacy.vn.about.skills.tags);
      expect(vnData.about.education.items.length).toBe(legacy.vn.about.education.items.length);
      expect(vnData.about.experience.items.length).toBe(legacy.vn.about.experience.items.length);
    });

    it('matches all Vietnamese project IDs and media URLs', () => {
      legacy.vn.projects.items.forEach((legacyProj: any) => {
        const modernProj = vnData.projects.items.find((p) => p.id === legacyProj.id);
        expect(modernProj).toBeDefined();
        if (!modernProj) return;

        expect(modernProj.name).toBe(legacyProj.name);
        expect(modernProj.images.map((img) => img.src)).toEqual(legacyProj.images.map((img: any) => img.src));
        expect(modernProj.pdfs.map((pdf) => pdf.url)).toEqual(legacyProj.pdfs.map((pdf: any) => pdf.url));
        expect(modernProj.bullets).toEqual(legacyProj.bullets);
      });
    });
  });
});
