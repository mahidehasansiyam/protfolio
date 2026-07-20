# Gilberto Portfolio — Mahedi Hasan Siyam

A high-performance, animated portfolio website built with **Next.js 16 (App Router)** and a triple-animation stack. Features a dark/light theme, smooth scrolling, magnetic UI elements, and a fully responsive design.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with App Router, image optimization, and font optimization |
| **React 19** | UI library |
| **JavaScript (ES6+)** | All source code — TypeScript is not used |
| **Tailwind CSS v4** | Utility-first CSS framework with custom theme tokens |
| **framer-motion** | Declarative animations, scroll-driven parallax, page transitions |
| **GSAP + ScrollTrigger** | Imperative high-performance animations, scroll-triggered reveals, stagger effects |
| **Lenis** | Smooth scrolling, synced to GSAP ticker |
| **Lucide React** | Icon library |
| **clsx + tailwind-merge** | Conditional class merging (`cn()` utility) |
| **babel-plugin-react-compiler** | React compiler for build-time optimization |
| **ESLint** | Code linting |

## Features

- **Parallax scrolling** — framer-motion `useScroll`/`useTransform` for background text and image parallax
- **Smooth scroll** — Lenis-powered smooth scrolling wired to GSAP ScrollTrigger
- **Custom cursor** — Magnetic cursor follower with cluster particles and view-mode indicators
- **Magnetic elements** — Interactive buttons and links with spring-based magnetic pull
- **Scroll reveals** — GSAP-powered scroll-triggered animations (fade-up, slide, scale)
- **Text reveal** — Word-by-word staggered text animation on scroll
- **3D tilt cards** — Mouse-driven 3D perspective on project cards
- **Dark/Light theme** — System-preference aware with manual toggle and localStorage persistence
- **Dynamic background** — Aurora gradients, animated grid, noise overlay, and floating ambient bubbles
- **Animated section labels** — Numbered section markers with decorative dividers
- **Portfolio filter** — Category-based project filtering with layout animations
- **Project detail modal** — Full-screen project overlay with custom cursor state
- **Responsive** — Mobile breakpoints disable heavy GPU animations via `useIsMobile()` hook
- **Optimized fonts** — Inter font from next/font/google

## Project Structure

```
app/                    # App Router
  layout.js             # Root layout with global providers
  page.js               # Home page composing all sections
  globals.css           # Tailwind v4 directives, custom utilities, themes, animations
components/             # All UI components
  animations/           # Reusable animation wrappers
    Magnetic.js         # Spring-based magnetic hover effect
    ScrollReveal.js     # GSAP scroll-triggered entrance animations
    TextReveal.js       # Staggered word reveal on scroll
    TiltCard.js         # framer-motion 3D perspective tilt
  SmoothScroll.js       # Lenis instance wired to GSAP ticker
  MouseFollower.js      # Custom cursor with cluster particles
  BackgroundObjects.js  # Floating ambient bubbles (client-side only)
  ThemeToggle.js        # Dark/light switch
  BackToTop.js          # Floating scroll-to-top button
  Navbar.js             # Sticky nav with active section tracking
  Hero.js               # Main hero with parallax portrait
  About.js              # Bio section
  Education.js          # Education timeline
  LogoBar.js            # Technology/client logos
  Stats.js              # Statistics counter section
  Skills.js             # Skill bars/categories
  Expertise.js          # Expertise cards
  Portfolio.js          # Project grid with filter and modal
  Contact.js            # Contact form section
  Footer.js             # Site footer
hooks/
  useIsMobile.js        # Responsive breakpoint detection
lib/
  utils.js              # cn() class merge utility
public/                 # Static assets (images, icons)
```

## Custom Tailwind Tokens

| Token | Dark | Light |
|-------|------|-------|
| `brand-green` | `#4CAF50` | `#1A4D2E` |
| `brand-bg` | `#0F1210` | `#FBFBF2` |
| `card-bg` | `rgba(255,255,255,0.03)` | `#FFFFFF` |
| `foreground` | `#FFFFFF` | `#2C3333` |
| `border` | `rgba(255,255,255,0.1)` | `#D6D6C2` |
| `brand-coral` | `#FF6B5B` | `#FF4D4D` |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

Optimized for **Vercel**. Remote images are allowed from `images.unsplash.com` and `res.cloudinary.com` (configured in `next.config.mjs`).

## Architecture Notes

- Every component is a **Client Component** (`"use client"`). No Server Components.
- Mouse-driven animations are **disabled on mobile** via the `useIsMobile()` hook to preserve performance.
- GSAP's `ScrollTrigger` is **registered at module scope** in files that use it.
- Lenis is initialized once in `SmoothScroll.js` and pipes its frame loop through `gsap.ticker.add()`.
- The custom cursor (`MouseFollower.js`) communicates view-mode state via `CustomEvent` dispatched from `Portfolio.js`.
- Themes are toggled by adding/removing the `.dark` class on `<html>` and persisting to `localStorage`.
