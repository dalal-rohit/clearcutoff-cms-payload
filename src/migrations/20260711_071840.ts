import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts" DROP CONSTRAINT IF EXISTS "posts_hero_image_id_media_id_fk";

  ALTER TABLE "_posts_v" DROP CONSTRAINT IF EXISTS "_posts_v_version_hero_image_id_media_id_fk";

  DROP INDEX IF EXISTS "posts_hero_image_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_hero_image_idx";
  ALTER TABLE "posts_locales" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
  ALTER TABLE "_posts_v_locales" ADD COLUMN IF NOT EXISTS "version_hero_image_id" integer;
  DO $$ BEGIN
    ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "posts_hero_image_idx" ON "posts_locales" USING btree ("hero_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_hero_image_idx" ON "_posts_v_locales" USING btree ("version_hero_image_id","_locale");
  ALTER TABLE "posts" DROP COLUMN IF EXISTS "hero_image_id";
  ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_hero_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_locales" DROP CONSTRAINT IF EXISTS "posts_locales_hero_image_id_media_id_fk";

  ALTER TABLE "_posts_v_locales" DROP CONSTRAINT IF EXISTS "_posts_v_locales_version_hero_image_id_media_id_fk";

  DROP INDEX IF EXISTS "posts_hero_image_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_hero_image_idx";
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_hero_image_id" integer;
  DO $$ BEGIN
    ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  CREATE INDEX IF NOT EXISTS "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  ALTER TABLE "posts_locales" DROP COLUMN IF EXISTS "hero_image_id";
  ALTER TABLE "_posts_v_locales" DROP COLUMN IF EXISTS "version_hero_image_id";`)
}
