import { z } from 'zod';

export const ImageItemSchema = z.object({
  src: z.string(),
  alt: z.string(),
});
export type ImageItem = z.infer<typeof ImageItemSchema>;

export const PdfItemSchema = z.object({
  label: z.string(),
  url: z.string(),
});
export type PdfItem = z.infer<typeof PdfItemSchema>;

export const ProjectSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    type: z.enum(['2d', '3d']),
    typeLabel: z.string().min(1),
    date: z.string().min(1),
    tools: z.string().min(1),
    thumbnail: z.string().url().optional(),
    images: z.array(ImageItemSchema).default([]),
    videoFirst: z.boolean().optional().default(false),
    video: z.union([z.string(), z.array(z.string())]).optional(),
    pdfs: z.array(PdfItemSchema).default([]),
    desc: z.string().min(1),
    contributionsLabel: z.string().optional(),
    bullets: z.array(z.string()).default([]),
  })
  .transform((data) => {
    let videos: string[] = [];
    if (Array.isArray(data.video)) {
      videos = data.video.filter((v) => typeof v === 'string' && v.trim().length > 0);
    } else if (typeof data.video === 'string' && data.video.trim().length > 0) {
      videos = [data.video.trim()];
    }
    return {
      ...data,
      videos,
      videoFirst: data.videoFirst ?? false,
    };
  });

export type Project = z.infer<typeof ProjectSchema>;

export const EducationItemSchema = z.object({
  name: z.string().min(1),
  meta: z.string().min(1),
  desc: z.string().min(1),
});
export type EducationItem = z.infer<typeof EducationItemSchema>;

export const ExperienceItemSchema = z.object({
  title: z.string().min(1),
  meta: z.string().min(1),
  bullets: z.array(z.string()),
});
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;

export const SkillsSchema = z.object({
  title: z.string().min(1),
  tags: z.array(z.string()),
});
export type Skills = z.infer<typeof SkillsSchema>;

export const AboutSectionSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  education: z.object({
    title: z.string().min(1),
    items: z.array(EducationItemSchema),
  }),
  experience: z.object({
    title: z.string().min(1),
    items: z.array(ExperienceItemSchema),
  }),
  skills: SkillsSchema,
});
export type AboutSection = z.infer<typeof AboutSectionSchema>;

export const ServiceItemSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  desc: z.string().min(1),
});
export type ServiceItem = z.infer<typeof ServiceItemSchema>;

export const ContactItemSchema = z.object({
  icon: z.string().optional(),
  iconImage: z.string().optional(),
  label: z.string().min(1),
  value: z.string().min(1),
  href: z.string().nullable(),
});
export type ContactItem = z.infer<typeof ContactItemSchema>;

export const PortfolioDataSchema = z.object({
  nav: z.object({
    about: z.string(),
    projects: z.string(),
    services: z.string(),
    contact: z.string(),
  }),
  about: AboutSectionSchema,
  projects: z.object({
    title: z.string(),
    filters: z.object({
      all: z.string(),
      f2d: z.string(),
      f3d: z.string(),
    }),
    items: z.array(z.any()),
  }),
  services: z.object({
    title: z.string(),
    items: z.array(ServiceItemSchema),
  }),
  contact: z.object({
    title: z.string(),
    subtitle: z.string(),
    items: z.array(ContactItemSchema),
  }),
  footer: z.string(),
});
export type PortfolioData = z.infer<typeof PortfolioDataSchema>;
