# Hoang Minh Thien — Portfolio

Modern, high-performance artist & illustrator portfolio built with [Astro](https://astro.build/) (zero-JS static site generation), TypeScript, and [Vitest](https://vitest.dev/) for strict Test-Driven Development (TDD).

## 🚀 Performance Highlights

- **89.0% Reduction in Client JavaScript**: Shrunk from **43.1 KB** monolithic client script down to **4.7 KB** of modular client islands.
- **100% Pre-rendered Static HTML**: Full semantic HTML and SEO indexability for all projects, bio, skills, education, and services (eliminating the old empty DOM shell).
- **Static Multi-language Support**: Separate pre-rendered routes for English (`/`) and Vietnamese (`/vn/`) with `hreflang` tags.
- **Automated Performance & Bundle Budgets**: Automated tests enforce that client JS stays under 10 KB, all images have `loading="lazy"` and `decoding="async"`, and media preconnects are present.

---

## 📁 Modular Project Structure

```
.
├── .github/workflows/deploy.yml # Automated test & deploy to GitHub Pages
├── public/                      # Static assets (sw.js, robots.txt, sitemap.xml)
├── src/
│   ├── components/              # Modular UI components
│   │   ├── Header.astro         # Sticky header with logo & nav
│   │   ├── NavTabs.astro        # Tab panel buttons
│   │   ├── LanguageSwitch.astro # EN / VN switcher with hash sync
│   │   ├── ThemeToggle.astro    # Accessible Dark/Light toggle
│   │   ├── AboutSection.astro   # Bio, education, experience, skills
│   │   ├── ProjectsSection.astro# Filter chips & grid with pre-rendered modal templates
│   │   ├── ProjectCard.astro    # Individual project card with lazy media
│   │   ├── ServicesSection.astro# Services grid
│   │   ├── ContactSection.astro # Contact methods & external links
│   │   ├── ProjectModal.astro   # Accessible modal dialog
│   │   ├── Lightbox.astro       # High-res image zoom overlay
│   │   └── Footer.astro         # Localized footer
│   ├── data/                    # Type-safe portfolio datasets
│   │   ├── schema.ts            # Zod validation schemas
│   │   ├── en.ts                # English dataset
│   │   ├── vn.ts                # Vietnamese dataset
│   │   └── index.ts             # Dataset helpers
│   ├── layouts/
│   │   └── BaseLayout.astro     # Core HTML layout, SEO meta, inline FOUC script
│   ├── pages/
│   │   ├── index.astro          # English route (/)
│   │   └── vn/index.astro       # Vietnamese route (/vn/)
│   ├── scripts/                 # Pure, testable client modules
│   │   ├── filter.ts            # Project 2D/3D filtering
│   │   ├── tabs.ts              # Tab panel navigation & URL hash sync
│   │   ├── theme.ts             # Theme detection, persistence & toggle
│   │   ├── modal.ts             # Modal state machine & lightbox
│   │   └── lazy-video.ts        # IntersectionObserver video controller
│   └── styles/
│       ├── tokens.css           # CSS variables & dark mode overrides
│       └── global.css           # Global typography, reset, and shared styles
├── tests/                       # Automated Test Suite (TDD)
│   ├── parity.test.ts           # Zero data loss assertion vs legacy data
│   ├── schema.test.ts           # Zod schema validation tests
│   ├── filter.test.ts           # Filtering unit tests
│   ├── tabs.test.ts             # Tab switching unit tests
│   ├── theme.test.ts            # Theme switching tests
│   ├── modal.test.ts            # Modal state machine tests
│   └── performance.test.ts      # Automated bundle budget & HTML pre-render tests
├── uploader/                    # Cloudflare R2 image upload tool
├── astro.config.mjs             # Astro config (site: 'https://hmtportfolio.github.io')
└── vitest.config.ts             # Vitest test runner configuration
```

---

## 🛠️ Development & Maintenance Workflow

### How to Add or Update a Project
All portfolio content is decoupled from UI code in `src/data/en.ts` and `src/data/vn.ts`.
To add a new project, simply append an entry to `rawProjects` in both files:

```typescript
{
  id: "p8",
  name: "Project Name",
  type: "2d", // "2d" | "3d"
  typeLabel: "2D / Concept Art",
  date: "2026",
  tools: "Photoshop, Blender",
  thumbnail: "https://pub-.../thumb.png", // optional
  images: [
    { src: "https://pub-.../img1.png", alt: "Description" }
  ],
  video: "https://pub-.../clip.mp4", // optional string or array of strings
  pdfs: [
    { label: "Design Doc (PDF)", url: "https://pub-.../doc.pdf" }
  ],
  desc: "Project overview description.",
  bullets: [
    "Key responsibility or achievement 1",
    "Key responsibility or achievement 2"
  ]
}
```
TypeScript and Zod will automatically validate all fields at compile time!

### Running the Dev Server
```bash
pnpm dev
```

### Running Tests (TDD)
```bash
pnpm test          # Run all 31 automated tests once
pnpm test:watch    # Watch mode for instant TDD feedback
```

### Building for Production
```bash
pnpm build
```

### Running the Cloudflare R2 Uploader Tool
```bash
pnpm uploader
```

---

## 🌐 GitHub Pages Deployment

The repository includes `.github/workflows/deploy.yml` which automatically runs tests, builds the static site, and deploys to GitHub Pages on every push to `main`.

**One-time GitHub Setup**:
1. Go to repository **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
