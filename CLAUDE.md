# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Bilingual (English/German) CV/portfolio site for José Carlos Pomo González, with a public-facing single-page CV and a password-protected admin panel for editing CV content. Next.js 16 App Router + React 19, PostgreSQL via Prisma, Auth.js (NextAuth v5 beta), internationalization via next-intl, Tailwind CSS v4. Deployed on Vercel. Note the directory name (`me`) and package name (`cv-portfolio`) differ from the public site `jcpomo.com`.

## Commands

```bash
npm run dev          # Dev server at http://localhost:3000
npm run build        # prisma generate && next build
npm run lint         # ESLint (flat config, eslint.config.mjs)
npm run db:migrate   # prisma migrate deploy (apply migrations)
npm run db:seed      # Seed DB from prisma/seed.ts (npx tsx)
npx prisma migrate dev --name <name>   # Create + apply a new migration in dev
npx prisma studio    # Inspect/edit DB in browser
```

There is no test framework configured in this repo.

## Environment

Copy `.env.example` to `.env`. Required: `DATABASE_URL` (PostgreSQL), `AUTH_SECRET`, `AUTH_URL`, and `ADMIN_EMAIL`/`ADMIN_PASSWORD` (consumed only by `prisma/seed.ts` to create the single admin user — not by the running app).

## Architecture

### Bilingual data model (critical convention)
The site supports exactly two locales: `en` (default) and `de`, defined in `src/i18n/routing.ts`. Translated content is **not** stored in a translations table — instead, most Prisma models carry paired `*En`/`*De` columns (e.g. `positionEn`/`positionDe`, `summaryEn`/`summaryDe`). When adding a translatable field, add both columns to `prisma/schema.prisma`, create a migration, and update the corresponding API route + admin form + public section component. Components select the right column at render time based on the `locale` prop. Static UI strings (labels, nav) live in `src/messages/en.json` and `src/messages/de.json` via next-intl.

### Routing & i18n
- `src/middleware.ts` runs next-intl middleware on all non-API, non-asset paths, so every page lives under `src/app/[locale]/...` and URLs are prefixed (`/en/...`, `/de/...`).
- `src/i18n/request.ts` loads the message JSON per request; `src/i18n/navigation.ts` exports locale-aware `Link`/`router` helpers — use these instead of `next/link` for internal navigation.
- API routes under `src/app/api/...` are **outside** `[locale]` and excluded from the middleware matcher.

### Two surfaces
- **Public CV** (`src/app/[locale]/page.tsx`): a server component that fetches all CV data in one `Promise.all`, injects JSON-LD `Person` structured data for SEO, and composes section components from `src/components/public/`. If no `Profile` row exists it renders a "run the seed script" message.
- **Admin** (`src/app/[locale]/admin/...`): layout (`admin/layout.tsx`) calls `auth()` and redirects unauthenticated users to `/<locale>/login`. Each admin page is a client form that CRUDs one model via the matching `/api/<resource>` route.

### Auth
`src/lib/auth.ts` configures NextAuth with the Prisma adapter, JWT session strategy, and a single Credentials provider that checks email/password against the `User` table with bcryptjs. Only seeded admin users can log in (no signup). The handler is re-exported from `src/app/api/auth/[...nextauth]/route.ts`. Protect mutating API routes by calling `await auth()` and returning 401 if falsy — see `src/app/api/experience/route.ts` for the canonical pattern (public `GET`, auth-gated `POST`).

### Data access
`src/lib/prisma.ts` exports a singleton `PrismaClient` (cached on `globalThis` outside production). Always import `{ prisma }` from there. The generator uses the default `@prisma/client` output with **no custom `output` path** — this was deliberate to fix a Vercel Query Engine error (see `SOLUCION_PRISMA.md`); do not reintroduce a custom `output`.

### API route conventions
Each resource has a collection route (`route.ts`: `GET` list / `POST` create) and an item route (`[id]/route.ts`: `PUT`/`DELETE`). Lists are ordered by `sortOrder`. Date fields arrive as strings and must be wrapped in `new Date(...)`. `/api/upload` accepts a profile photo (JPEG/PNG/WebP, ≤5MB) and writes it to `public/images/` — note this is ephemeral on Vercel's serverless filesystem.

## Deployment (Vercel)

`vercel.json` sets the build command to `prisma generate && prisma migrate deploy && npm run build`, so migrations run automatically on deploy. `postinstall` also runs `prisma generate`. See `DESPLIEGUE.md` and `SOLUCION_PRISMA.md` for the full deployment story (Spanish).
