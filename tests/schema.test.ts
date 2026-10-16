import { describe, it, expect } from 'vitest';
import {
  ProjectSchema,
  EducationItemSchema,
  ExperienceItemSchema,
  ServiceItemSchema,
  ContactItemSchema,
  PortfolioDataSchema,
} from '../src/data/schema';

describe('ProjectSchema', () => {
  it('validates a complete project object with single video string', () => {
    const raw = {
      id: 'p7',
      name: 'Chroma',
      type: '3d',
      typeLabel: '3D / Game Trailer',
      date: '2026',
      tools: 'Blender, Rigify, Technical Art, Animation',
      thumbnail: 'https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Poster.png',
      images: [],
      videoFirst: true,
      video: 'https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Trailer.mp4',
      pdfs: [{ label: 'GDD', url: 'https://example.com/gdd.pdf' }],
      desc: 'Chroma is a game trailer.',
      contributionsLabel: 'My Contributions:',
      bullets: ['Rigging', 'Animation'],
    };

    const parsed = ProjectSchema.safeParse(raw);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.videos).toEqual(['https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Chroma/Trailer.mp4']);
      expect(parsed.data.videoFirst).toBe(true);
    }
  });

  it('normalizes video array correctly', () => {
    const raw = {
      id: 'p2',
      name: 'Mana the Cute Battle Maid',
      type: '3d',
      typeLabel: '3D',
      date: 'Nov 2025',
      tools: 'ZBrush, Maya',
      images: [{ src: 'https://example.com/img.png', alt: 'Mana' }],
      video: [
        'https://example.com/v1.mp4',
        'https://example.com/v2.mp4',
      ],
      pdfs: [],
      desc: '3D Character',
      bullets: ['Modeling'],
    };

    const parsed = ProjectSchema.safeParse(raw);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.videos).toEqual([
        'https://example.com/v1.mp4',
        'https://example.com/v2.mp4',
      ]);
      expect(parsed.data.videoFirst).toBe(false);
    }
  });

  it('normalizes empty string video to empty array', () => {
    const raw = {
      id: 'p1',
      name: 'Definitely Not Gonna Late!',
      type: '2d',
      typeLabel: '2D',
      date: 'Jan 2025',
      tools: 'Clip Studio Paint',
      images: [{ src: 'https://example.com/1.png', alt: 'Test' }],
      video: '',
      pdfs: [],
      desc: 'Short animation',
      bullets: ['Script'],
    };

    const parsed = ProjectSchema.safeParse(raw);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.videos).toEqual([]);
    }
  });

  it('fails validation on invalid project type', () => {
    const raw = {
      id: 'p99',
      name: 'Invalid Project',
      type: 'unknown-type',
      typeLabel: 'Unknown',
      date: '2026',
      tools: 'Pen',
      images: [],
      video: '',
      pdfs: [],
      desc: 'Fail',
      bullets: [],
    };

    const parsed = ProjectSchema.safeParse(raw);
    expect(parsed.success).toBe(false);
  });
});

describe('Education & Experience Schemas', () => {
  it('validates education item', () => {
    const parsed = EducationItemSchema.safeParse({
      name: 'Van Lang University',
      meta: 'HCMC, Vietnam — Sep 2023 – Present',
      desc: '3rd year Undergraduate, Average GPA 3.5',
    });
    expect(parsed.success).toBe(true);
  });

  it('validates experience item with bullets', () => {
    const parsed = ExperienceItemSchema.safeParse({
      title: 'Director & Illustrator',
      meta: 'Team 3T, Van Lang University — July 2025 – Sep 2025',
      bullets: ['Directed visual', 'Created storyboard'],
    });
    expect(parsed.success).toBe(true);
  });
});

describe('Service & Contact Schemas', () => {
  it('validates service item', () => {
    const parsed = ServiceItemSchema.safeParse({
      icon: '✏️',
      title: 'Character Illustration',
      desc: 'Custom character designs.',
    });
    expect(parsed.success).toBe(true);
  });

  it('validates contact item with icon or iconImage and nullable href', () => {
    const withIcon = ContactItemSchema.safeParse({
      icon: '📧',
      label: 'Email',
      value: 'test@example.com',
      href: 'mailto:test@example.com',
    });
    expect(withIcon.success).toBe(true);

    const withImage = ContactItemSchema.safeParse({
      iconImage: 'https://example.com/icon.svg',
      label: 'Portfolio Files',
      value: 'View full portfolio',
      href: 'https://example.com',
    });
    expect(withImage.success).toBe(true);

    const nullHref = ContactItemSchema.safeParse({
      icon: '📍',
      label: 'Location',
      value: 'Ho Chi Minh City, Vietnam',
      href: null,
    });
    expect(nullHref.success).toBe(true);
  });
});
