# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Payload skill

This project is built on Payload CMS. A dedicated skill lives at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs (fields, collections, hooks, access control, queries, adapters, plugins).

## Commands

Uses **pnpm** (see `packageManager` in package.json). Node `^18.20.2 || >=20.9.0`.

- `pnpm dev` — start the dev server at http://localhost:3000 (admin panel at `/admin`)
- `pnpm devsafe` — same, but wipes `.next` first (use when the build cache is stale/corrupt)
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm lint` — ESLint (`eslint.config.mjs`, extends `next/core-web-vitals` + `next/typescript`)
- `pnpm generate:types` — regenerate `src/payload-types.ts` from the config. **Run after any schema/collection/field change**; types are otherwise stale.
- `pnpm generate:importmap` — regenerate `src/app/(payload)/admin/importMap.js` after adding custom admin components
- `pnpm payload` — Payload CLI (migrations, etc.)

### Tests

- `pnpm test` — runs int then e2e
- `pnpm test:int` — Vitest integration tests, `tests/int/**/*.int.spec.ts` (jsdom env). Single file: `pnpm test:int tests/int/api.int.spec.ts`
- `pnpm test:e2e` — Playwright, `tests/e2e/**` (chromium). Auto-starts `pnpm dev` as its web server and reuses an existing one. Single test: `pnpm test:e2e -g "test name"`

Integration tests boot a real Payload instance via `getPayload({ config })`, so they need a working `DATABASE_URL`.

## Environment

Requires a `.env` file (not committed):

- `DATABASE_URL` — Postgres connection string (see below)
- `PAYLOAD_SECRET` — secret used to sign auth tokens

## Architecture

Payload 3 runs **inside** a Next.js 16 App Router app (React 19) — there is no separate backend server. Everything is one Next.js process.

- **`src/payload.config.ts`** — the single source of truth. Registers collections, the Lexical rich-text editor, the Postgres adapter (`@payloadcms/db-postgres`, reads `DATABASE_URL`), sharp for image processing, and the type-generation output path. `PAYLOAD_SECRET` is read here.
- **`src/collections/`** — collection definitions. `Users.ts` (`auth: true`, backs the admin login) and `Media.ts` (`upload: true`, public read). Add new collections here and register them in the config's `collections` array.
- **`src/payload-types.ts`** — generated types; import as `import type { User } from '@/payload-types'`. Do not hand-edit.
- **`src/app/(payload)/`** — Payload-owned routes (route group). Admin UI at `admin/[[...segments]]`, and the REST (`api/[...slug]`) + GraphQL (`api/graphql`) endpoints. Generally leave these as-is.
- **`src/app/(frontend)/`** — your public site. `page.tsx` is a Server Component that gets the Payload instance with `getPayload({ config })` and uses the Local API directly (no HTTP).
- **`src/app/my-route/route.ts`** — example of a custom Next.js route handler using the Payload Local API.

### Database note

Despite the `README.md` and `docker-compose.yml` (which are the upstream blank-template defaults referencing **MongoDB**), this project is configured for **Postgres** in `payload.config.ts`. Trust the config, not those files. `DATABASE_URL` must be a Postgres connection string.

### Path aliases

`@/*` → `src/*` and `@payload-config` → `src/payload.config.ts` (defined in `tsconfig.json`).

## Key conventions

- **Local API bypasses access control by default.** When acting on behalf of a user, pass `overrideAccess: false` (and the `user`). See the skill's security section.
- **Thread `req` through nested operations in hooks** to keep transactions atomic, and use `req.context` flags to avoid infinite hook loops.
- After schema changes: `pnpm generate:types`. After adding custom admin components: `pnpm generate:importmap`.
