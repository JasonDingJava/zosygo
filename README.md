# Zosygo — Game Guides Hub

SEO-optimized gaming guides site built with Next.js. Covers **Elden Ring** walkthroughs, boss strategies, builds, weapons, and tools.

## Tech Stack

- **Next.js** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS**
- **Google AdSense**

## Project Structure

```
app/
├── [slug]/                      # Game routes (elden-ring/)
│   ├── [category]/[article]/    # Article pages (builds/bosses/weapons/walkthroughs)
│   ├── tools/build-calculator/  # Interactive build calculator
│   └── page.tsx                 # Game landing page
lib/
├── articles.ts                  # Main article export (imports articles1-4)
├── articles1.ts                 # Articles 1-12
├── articles2.ts                 # Articles 27-36
├── articles3.ts                 # Articles 37-46
└── articles4.ts                 # Articles 47+
components/
├── ContentParagraphs.tsx        # Article content renderer (markdown links, tables, line breaks)
└── ...
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key Links

| Page | URL |
|------|-----|
| Home | [zosygo.com](https://zosygo.com) |
| Elden Ring Hub | [zosygo.com/elden-ring](https://zosygo.com/elden-ring) |
| Build Calculator | [zosygo.com/elden-ring/tools/build-calculator](https://zosygo.com/elden-ring/tools/build-calculator) |
| Builds | [zosygo.com/elden-ring/builds](https://zosygo.com/elden-ring/builds) |
| Bosses | [zosygo.com/elden-ring/bosses](https://zosygo.com/elden-ring/bosses) |
| Weapons | [zosygo.com/elden-ring/weapons](https://zosygo.com/elden-ring/weapons) |
| Walkthroughs | [zosygo.com/elden-ring/walkthroughs](https://zosygo.com/elden-ring/walkthroughs) |
| All Tools | [zosygo.com/tools](https://zosygo.com/tools) |

## Deployed on Vercel

Push to `main` → auto deploys.