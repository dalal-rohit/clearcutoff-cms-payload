import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create highlight table if it doesn't exist
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "reviews_reviews_review_highlight" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );`)

  // Create locales table for highlight if it doesn't exist
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "reviews_reviews_review_highlight_locales" (
      "text" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );`)

  // Add profession column to reviews_reviews_locales if missing
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'reviews_reviews_locales' AND column_name = 'profession'
      ) THEN
        ALTER TABLE "reviews_reviews_locales" ADD COLUMN "profession" varchar;
      END IF;
    END $$;`)

  // Add FKs if not present
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'reviews_reviews_review_highlight_parent_id_fk'
      ) THEN
        ALTER TABLE "reviews_reviews_review_highlight" ADD CONSTRAINT "reviews_reviews_review_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_reviews"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;`)

  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'reviews_reviews_review_highlight_locales_parent_id_fk'
      ) THEN
        ALTER TABLE "reviews_reviews_review_highlight_locales" ADD CONSTRAINT "reviews_reviews_review_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_reviews_review_highlight"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;`)

  // Create indexes if not present
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "reviews_reviews_review_highlight_order_idx" ON "reviews_reviews_review_highlight" USING btree ("_order");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "reviews_reviews_review_highlight_parent_id_idx" ON "reviews_reviews_review_highlight" USING btree ("_parent_id");`)
  await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS "reviews_reviews_review_highlight_locales_locale_parent_id_unique" ON "reviews_reviews_review_highlight_locales" USING btree ("_locale","_parent_id");`)

  // Drop old column if it exists
  await db.execute(sql`ALTER TABLE "reviews_reviews_locales" DROP COLUMN IF EXISTS "field";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "reviews_reviews_review_highlight" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "reviews_reviews_review_highlight_locales" CASCADE;`)
  await db.execute(sql`ALTER TABLE "reviews_reviews_locales" ADD COLUMN IF NOT EXISTS "field" varchar;`)
  await db.execute(sql`ALTER TABLE "reviews_reviews_locales" DROP COLUMN IF EXISTS "profession";`)
}
