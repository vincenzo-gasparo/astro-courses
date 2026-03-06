# fp-ts Course

A 15-day structured course for TypeScript developers who want to use [fp-ts](https://gcanti.github.io/fp-ts/) confidently in production codebases. Each day covers one concept with a written lesson, code examples, and an interactive quiz.

## What You'll Learn

| Day | Topic |
|-----|-------|
| 0 | Functional Programming Foundations |
| 1 | `pipe` and `flow` — composition primitives |
| 2 | `Option` — null-safe values |
| 3 | `Either` — typed error handling |
| 4 | `Task` — composable async |
| 5 | `TaskEither` — async with typed errors |
| 6 | `Apply` — parallel independent effects |
| 7 | `ReadonlyArray` — functional array processing |
| 8 | `NonEmptyArray` — compile-time non-emptiness |
| 9 | `Record` — operations on string-keyed objects |
| 10 | `Json` — safe JSON parsing |
| 11 | `IOEither` — synchronous effects that can fail |
| 12 | `ReaderIO` — dependency injection for sync effects |
| 13 | `ReaderTaskEither` — DI + async + error handling |
| 14 | Typeclasses — `Ord`, `Eq`, `Semigroup`, `Monoid` |
| 15 | Real-World Integration — putting it all together |

## Features

- **Structured lessons** — every day has an introduction, Core API reference, When to Use / Not Use guidance, a real-world example, and key takeaways
- **Interactive quizzes** — per-question answer locking with immediate correct/incorrect feedback
- **Progress tracking** — mark days complete; progress is saved locally in the browser
- **Table of contents** — sticky sidebar on desktop with active section highlight
- **Dark mode** — system preference detected, manually toggleable
- **Syntax highlighting** — code blocks with one-click copy

## Tech Stack

- [Next.js 15](https://nextjs.org) — App Router, static export
- [Velite](https://velite.js.org) — MDX content pipeline
- [Tailwind CSS v4](https://tailwindcss.com)
- [rehype-pretty-code](https://rehype-pretty-code.netlify.app) + [Shiki](https://shiki.style) — syntax highlighting
- [Playwright](https://playwright.dev) — E2E tests
- [Vitest](https://vitest.dev) — unit tests

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
content/lessons/    # MDX lesson files (day-00.mdx … day-15.mdx)
src/
  app/              # Next.js App Router pages
  components/       # React components (Quiz, MarkCompleteButton, TableOfContents, …)
  lib/              # Utilities (MDX renderer, progress localStorage helpers)
tests/              # Playwright E2E and Vitest unit tests
```

## Running Tests

```bash
# E2E tests (requires dev server running)
npx playwright test

# Unit tests
npx vitest
```

## Deployment

The site builds as a fully static export and deploys automatically to GitHub Pages on every push to `main` via GitHub Actions.

```bash
npm run build   # outputs to /out
```
