import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Neutralized 2026-09-05: this migration's original up()/down() were a full
// snapshot of every table/type/enum that existed at the time (users, media,
// categories, posts, exams, comparisons, alternatives, marketing_proof,
// etc.) — but that schema was never actually applied via this file. It was
// created on production by Payload's dev-mode `push` (docker-entrypoint.sh
// never ran `payload migrate` — the Coolify app uses the Nixpacks build
// pack, which doesn't invoke docker-entrypoint.sh at all), so every one of
// those tables/types already exists.
//
// Running the original up() against that DB fails immediately
// (`type "_locales" already exists`), which blocks every migration after
// it — including 20260905_051125 (the actual new Faq global tables) — from
// ever running. Since the schema it describes is already 100% live, this
// migration is now a no-op: nothing left to create.
//
// The original down() was `DROP TABLE ... CASCADE` for every one of those
// tables — i.e. the entire production dataset (Users, Media, Exams, Posts,
// Comparisons, Alternatives...). It's neutralized to a no-op too, so an
// accidental `payload migrate:down` can no longer wipe the database.
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {}
