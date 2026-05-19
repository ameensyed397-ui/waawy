# Waawy

**Employee Experience Platform for Modern Teams**  
*The HRIS complement that makes employees feel valued*

---

## Overview

Waawy is the employee experience layer that works alongside your HRIS (Gusto, Rippling, BambooHR, ADP). It handles beautiful onboarding, team connections, peer recognition, and culture automation — the things payroll tools don't do.

**Core idea:** Your HRIS handles payroll. Waawy handles people.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Components | shadcn/ui |
| Auth | Clerk |
| Database | PostgreSQL + Prisma (Neon) |
| Email | Loops.so (transactional) |
| Deployment | Netlify |

## Routing Structure

```
app/
├── (marketing)/          # Public landing page (getwaawy.com/)
│   └── page.tsx          # Landing page · uses dark-mode components
├── blog/
│   ├── layout.tsx        # Header + footer wrapper
│   ├── page.tsx          # Blog index
│   └── [slug]/           # Individual blog posts (4 posts)
├── (auth)/
│   ├── sign-in/          # Clerk sign-in
│   ├── sign-up/          # Clerk sign-up
│   └── invite/[token]/   # Team invite flow
├── (dashboard)/
│   ├── onboarding/       # Onboarding wizard
│   └── ...               # App dashboard pages
├── api/
│   ├── waitlist/         # POST/GET: join waitlist (Loops email)
│   └── ...               # Other API routes
├── robots.ts             # SEO robots
└── sitemap.ts            # Auto-generated sitemap
```

## Landing Page Components

All landing page components are in `components/waawy-landing/dark-mode/`:

| Component | Section |
|-----------|---------|
| `Header.tsx` | Navigation (fixed, blur on scroll) |
| `Hero.tsx` | Hero with waitlist form |
| `PainSection.tsx` | HRIS gap explanation |
| `Receipts.tsx` | Social proof / testimonials |
| `FeaturePreview.tsx` | 5-feature grid (`#features`) |
| `HowItWorks.tsx` | 4-step flow (`#how-it-works`) |
| `Validation.tsx` | Comparison table + pricing (`#pricing`) |
| `WaitlistCTA.tsx` | Mid-page CTA |
| `Manifesto.tsx` | Footer with HRIS partner logos |
| `WaitlistForm.tsx` | Reusable email capture form |

## Design System

- **Display font**: Satoshi (via Fontshare CDN)
- **Body font**: Inter (via next/font/google)
- **Hand/accent font**: Caveat — `font-hand` class (via next/font/google, `--font-hand` CSS var) — used for Waawy wordmark and accent phrases
- **Brand color**: `#007BFF` (Waawy Blue)
- **Background**: `#f0f2f6` (light warm grey)

## Getting Started

```bash
npm install
cp .env.example .env.local   # Fill in your keys
npm run dev
```

### Required Environment Variables

```bash
# Clerk (auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=

# Email (Loops.so)
LOOPS_API_KEY=
LOOPS_WAITLIST_TRANSACTIONAL_ID=

# App
NEXT_PUBLIC_APP_URL=https://getwaawy.com
```

## Available Scripts

- `npm run dev` — Development server (localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint

## Blog Posts

SEO-optimized blog targeting HRIS-adjacent keywords:

1. **Why Your HRIS Makes Employees Feel Like Numbers** — `/blog/why-hris-makes-employees-feel-like-numbers`
2. **The Complete HR Stack for Remote Startups (2026)** — `/blog/complete-hr-stack-for-startups`
3. **Gusto vs Rippling: Honest Comparison (2026)** — `/blog/gusto-vs-rippling-comparison`
4. **How to Onboard Remote Employees** — `/blog/remote-employee-onboarding-guide`

## Contact

<hello@getwaawy.com> | [getwaawy.com](https://getwaawy.com)
