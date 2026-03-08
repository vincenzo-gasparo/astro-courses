# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo structure

This is a **pnpm workspace monorepo**. All commands should be run from the repo root unless noted.

```
apps/
  fp-ts-course/        # fp-ts course — content + thin config only
  nextjs-course/       # Next.js course — content + thin config only
packages/
  course-ui/           # Shared framework (@courses/ui) — all components and lib
```

## Commands

```bash
# Development (run from repo root)
pnpm dev:fp-ts         # Dev server for fp-ts-course at localhost:3000
pnpm dev:nextjs        # Dev server for nextjs-course at localhost:3001
pnpm dev:all           # All course dev servers in parallel

# Build
pnpm build:all         # Production build for all courses

# Tests
pnpm test:all          # Unit tests + typecheck + lint (full CI suite)
pnpm test:unit         # Vitest unit tests across all apps
pnpm typecheck         # tsc --noEmit across all apps and packages
pnpm lint:all          # ESLint across all apps

# E2E tests (requires dev server running — run from apps/fp-ts-course)
npx playwright test
npx playwright test tests/smoke.spec.ts

# Unit tests (single file — run from apps/fp-ts-course)
npx vitest src/lib/progress.test.ts

# Cleanup
pnpm clean             # Remove .next, out, .velite build artifacts
```

## Architecture

Each course app is a **Next.js 15 App Router** site with **static export** (no server runtime). All pages are pre-rendered at build time.

### Shared package: `@courses/ui`

Lives in `packages/course-ui/src/`. Import as `@courses/ui` from any app.

- **Components** — `CourseLayout`, `ProgressProvider`, `MarkCompleteButton`, `ProgressBar`, `DayCardList`, `TableOfContents`, `Quiz`, `Pre`, `CopyButton`, `ThemeProvider`, `ThemeToggle`
- **Lib** — `getMDXComponent`, `loadProgress(storageKey)`, `saveProgress(storageKey, days)`, `cn`
- **Velite plugins** — `extractRaw`, `attachRaw` (imported in each app's `velite.config.ts`)

> **`next/font/google` must stay in the app**, not in `course-ui`. Fonts are declared in `apps/*/src/app/layout.tsx` and passed to `CourseLayout` via the `fontClassName` prop.

### Per-app files (in each `apps/*/`)

- `course.config.ts` — course title, description, localStorage key
- `content/lessons/day-NN.mdx` — lesson MDX files
- `velite.config.ts` — imports plugins from `@courses/ui/lib/velite-plugins`
- `next.config.mjs` — sets `basePath: '/course-name'` when `CI=true` (Model B GitHub Pages)
- `src/app/globals.css` — must include `@source "../../../../packages/course-ui/src"` so Tailwind v4 scans the shared package

### Content pipeline

```
apps/*/content/lessons/*.mdx
  → Velite build → .velite/ (generated types + data)
    → imported as: import { lessons } from '.velite'
      → lessons/[slug]/page.tsx renders MDXContent + Quiz + MarkCompleteButton + TableOfContents
```

Each lesson frontmatter schema (defined in `velite.config.ts`):
```
title, day (number), description?, slug (auto), body (MDX), quiz[]?
```

Quiz items: `{ question, options: string[], correct: number, explanation }`.

### Progress tracking

- `packages/course-ui/src/lib/progress.ts` — SSR-safe `loadProgress(storageKey)` / `saveProgress(storageKey, days)`; storageKey is passed in, not hardcoded
- `packages/course-ui/src/components/progress-provider.tsx` — React Context wrapping the app; `ProgressProvider` takes a `storageKey` prop; hydrates from localStorage in `useEffect`
- `CourseLayout` wires `storageKey` from `course.config.ts` through to `ProgressProvider`

### Static export constraint

Every dynamic route (`/lessons/[slug]`) must export `generateStaticParams()`. Velite data must be built before `next build` — `next.config.mjs` handles this automatically.

### Testing setup

- **Playwright** (`apps/*/tests/`) — E2E tests require dev server running; test IDs use `data-testid` attributes (`[data-testid="day-card"]`, `[data-testid="explanation"]`) and `data-day` on day cards
- **Vitest** (`apps/*/src/lib/progress.test.ts`) — unit tests for localStorage helpers; aliases `@courses/ui/lib/progress` directly to avoid pulling in Next.js-only code

### Deployment (GitHub Pages, Model B)

All courses deploy to one GitHub Pages site under subdirectory paths:
```
username.github.io/<repo>/fp-ts-course
username.github.io/<repo>/nextjs-course
```
See `.github/workflows/deploy.yml`. Each app sets `basePath` via `CI=true` env var.

### Adding a new lesson

1. Create `apps/fp-ts-course/content/lessons/day-NN.mdx` with required frontmatter (`title`, `day`, optional `description` and `quiz` array)
2. Velite picks it up automatically — no config change needed
3. Update smoke tests if lesson count assertions exist (`tests/smoke.spec.ts` checks for 16 cards)

### Adding a new course

1. Copy `apps/fp-ts-course` → `apps/new-course`
2. Edit `course.config.ts`, replace `content/lessons/*.mdx`, update `basePath` in `next.config.mjs`
3. Add `@source` to `globals.css` pointing to `packages/course-ui/src`
4. Add build step + cp line in `.github/workflows/deploy.yml`
5. Add `"dev:new-course": "pnpm --filter new-course dev"` to root `package.json`

### Existing courses

| App | Port | Topic | Days |
|-----|------|-------|------|
| `fp-ts-course` | 3000 | Functional TypeScript with fp-ts | 16 (day-00 → day-15) |
| `nextjs-course` | 3001 | Next.js from zero (React included) | 16 (day-00 → day-15) |
