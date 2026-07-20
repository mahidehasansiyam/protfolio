<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Gilberto Portfolio

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (no test/formatter/typecheck) |

## Language & framework

- **JS only** (`.js`). TypeScript is installed but unused — do not write `.tsx`/`.ts`.
- **Every component is `"use client"`** — no Server Components in this project.
- **`@/` path alias** maps to project root (`jsconfig.json`).
- **`cn(...)` from `@/lib/utils`** for Tailwind class merging (clsx + tailwind-merge).

## Animation stack (all three coexist)

- **framer-motion** — declarative (`motion.div`, `AnimatePresence`, `useScroll/useTransform`, spring physics).
- **GSAP + ScrollTrigger** — imperative (`gsap.to/fromTo`, stagger). Register plugin at module scope: `gsap.registerPlugin(ScrollTrigger)`.
- **Lenis** — smooth scrolling, wired to GSAP ticker in `components/SmoothScroll.js`.
- **`useIsMobile()`** — guards all mouse-driven animations on mobile (used by every interactive component).

## Tailwind v4 conventions

- **Custom theme tokens**: `brand-green`, `brand-bg`, `card-bg`, `border`, `foreground`, `brand-coral`, `brand-dark-green`.
- **Custom utilities** (in `globals.css`): `dot-pattern`, `hero-gradient`, `hero-card-bg`, `glass-code-window`, `animate-morph`.

## Project structure

```
app/                    # Next.js App Router (layout.js, page.js, globals.css)
components/             # Flat structure + animations/ subdir
  animations/           # Magnetic, ScrollReveal, TextReveal, TiltCard
hooks/                  # useIsMobile.js
lib/                    # utils.js (cn helper)
```

## Theme

Dark/light via `.dark` CSS class + `localStorage` (`components/ThemeToggle.js`).

## Config quirks

- `next.config.mjs`: `reactCompiler: true` (babel-plugin-react-compiler), remote images from `images.unsplash.com` and `res.cloudinary.com`.
- `postcss.config.mjs`: only `@tailwindcss/postcss`.
- No CI, no tests, no formatter.
