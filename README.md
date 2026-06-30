# bar-for-tenable

An ad-hoc, personalized job-application page Bar Moshe built for the **Full Stack
Engineer, Integrations Frameworks** role at **Tenable** (Tel Aviv, Tenable One),
rebuilt in Tenable's AI-era brand: dark charcoal surface, the lime/chartreuse
accent, white type, and the signature rotating heptagon "octogram" mark that
collapses into a solid hexagon as the hero scrolls.

Not affiliated with Tenable. `robots: noindex` — a private, shareable link.

Extracted from the `bar_builds` workshop site (`site/app/(en)/tenable`) into this
standalone sibling repo so it deploys on its own Vercel project, matching the
`bar-for-*` application-site pattern.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Plain CSS (scoped under `.tn-root`) + GSAP (ScrollTrigger)
- `next/og` share card (`app/opengraph-image.tsx`)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Layout

- `app/` — route shell (`layout.tsx`, `page.tsx` with fonts + metadata, `opengraph-image.tsx`)
- `src/marketing/tenable/` — the app: `TenableApp`, `IntegrationConsole`, `TenableMark`, `tenable.css`, plus `marketing-base.css` (the `.mp-root` reset ported from the workshop site)
- `src/lib/gsap.ts` — single GSAP registrar
- `public/Bar_Moshe_Resume.pdf` — CV linked from the page

Built by Bar Moshe, in Tenable's brand, for this application.
