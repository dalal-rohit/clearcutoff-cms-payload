import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create enum if not exists
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_courses_status') THEN
        CREATE TYPE "public"."enum_courses_status" AS ENUM('active', 'inactive', 'archived');
      END IF;
    END $$;`)

  // Safely drop highlights tables (they may not exist)
  await db.execute(sql`ALTER TABLE IF EXISTS "courses_highlights" DISABLE ROW LEVEL SECURITY;`)
  await db.execute(sql`ALTER TABLE IF EXISTS "courses_highlights_locales" DISABLE ROW LEVEL SECURITY;`)
  await db.execute(sql`DROP TABLE IF EXISTS "courses_highlights" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "courses_highlights_locales" CASCADE;`)

  // Drop FK if it exists
  await db.execute(sql`ALTER TABLE "courses" DROP CONSTRAINT IF EXISTS "courses_hero_id_users_id_fk";`)

  // Drop old indexes if they exist
  await db.execute(sql`DROP INDEX IF EXISTS "courses_slug_idx";`)
  await db.execute(sql`DROP INDEX IF EXISTS "courses_hero_idx";`)

  // Add new columns if missing
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='exam_id') THEN
        ALTER TABLE "courses" ADD COLUMN "exam_id" varchar NOT NULL;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='short_name') THEN
        ALTER TABLE "courses" ADD COLUMN "short_name" varchar NOT NULL;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='logo_url') THEN
        ALTER TABLE "courses" ADD COLUMN "logo_url" varchar NOT NULL;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='exam_type') THEN
        ALTER TABLE "courses" ADD COLUMN "exam_type" varchar NOT NULL;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='exam_frequency') THEN
        ALTER TABLE "courses" ADD COLUMN "exam_frequency" varchar NOT NULL;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='evaluation_type') THEN
        ALTER TABLE "courses" ADD COLUMN "evaluation_type" varchar NOT NULL;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='upcoming_exam') THEN
        ALTER TABLE "courses" ADD COLUMN "upcoming_exam" varchar NOT NULL;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='status') THEN
        ALTER TABLE "courses" ADD COLUMN "status" "enum_courses_status" DEFAULT 'active' NOT NULL;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='rating') THEN
        ALTER TABLE "courses" ADD COLUMN "rating" varchar NOT NULL;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='price') THEN
        ALTER TABLE "courses" ADD COLUMN "price" numeric NOT NULL;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='combo_price') THEN
        ALTER TABLE "courses" ADD COLUMN "combo_price" numeric;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses' AND column_name='marking_schema') THEN
        ALTER TABLE "courses" ADD COLUMN "marking_schema" varchar;
      END IF;
    END $$;`)

  // Add locales columns if missing
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses_locales' AND column_name='name') THEN
        ALTER TABLE "courses_locales" ADD COLUMN "name" varchar;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses_locales' AND column_name='state') THEN
        ALTER TABLE "courses_locales" ADD COLUMN "state" varchar;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='courses_locales' AND column_name='conducting_body') THEN
        ALTER TABLE "courses_locales" ADD COLUMN "conducting_body" varchar;
      END IF;
    END $$;`)

  // Create unique index on name + locale if not exists
  await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS "courses_name_idx" ON "courses_locales" USING btree ("name","_locale");`)

  // Drop old columns if they exist
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "slug";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "hero_id";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "sections";`)
  await db.execute(sql`ALTER TABLE "courses_locales" DROP COLUMN IF EXISTS "title";`)
  await db.execute(sql`ALTER TABLE "courses_locales" DROP COLUMN IF EXISTS "description";`)
  await db.execute(sql`ALTER TABLE "courses_locales" DROP COLUMN IF EXISTS "content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Recreate highlights tables if they don't exist (safe in iterative runs)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "courses_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar
    );`)
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "courses_highlights_locales" (
      "text" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );`)

  await db.execute(sql`DROP INDEX IF EXISTS "courses_name_idx";`)
  await db.execute(sql`ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "slug" varchar;`)
  await db.execute(sql`ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "hero_id" integer NOT NULL;`)
  await db.execute(sql`ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "sections" jsonb;`)
  await db.execute(sql`ALTER TABLE "courses_locales" ADD COLUMN IF NOT EXISTS "title" varchar NOT NULL;`)
  await db.execute(sql`ALTER TABLE "courses_locales" ADD COLUMN IF NOT EXISTS "description" varchar;`)
  await db.execute(sql`ALTER TABLE "courses_locales" ADD COLUMN IF NOT EXISTS "content" jsonb;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'courses_highlights_parent_id_fk'
      ) THEN
        ALTER TABLE "courses_highlights" ADD CONSTRAINT "courses_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'courses_highlights_locales_parent_id_fk'
      ) THEN
        ALTER TABLE "courses_highlights_locales" ADD CONSTRAINT "courses_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_highlights"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "courses_highlights_order_idx" ON "courses_highlights" USING btree ("_order");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "courses_highlights_parent_id_idx" ON "courses_highlights" USING btree ("_parent_id");`)
  await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS "courses_highlights_locales_locale_parent_id_unique" ON "courses_highlights_locales" USING btree ("_locale","_parent_id");`)
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'courses_hero_id_users_id_fk'
      ) THEN
        ALTER TABLE "courses" ADD CONSTRAINT "courses_hero_id_users_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;`)
  await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS "courses_slug_idx" ON "courses" USING btree ("slug");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "courses_hero_idx" ON "courses" USING btree ("hero_id");`)

  // Drop added columns if they exist
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "exam_id";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "short_name";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "logo_url";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "exam_type";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "exam_frequency";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "evaluation_type";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "upcoming_exam";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "status";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "rating";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "price";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "combo_price";`)
  await db.execute(sql`ALTER TABLE "courses" DROP COLUMN IF EXISTS "marking_schema";`)
  await db.execute(sql`ALTER TABLE "courses_locales" DROP COLUMN IF EXISTS "name";`)
  await db.execute(sql`ALTER TABLE "courses_locales" DROP COLUMN IF EXISTS "state";`)
  await db.execute(sql`ALTER TABLE "courses_locales" DROP COLUMN IF EXISTS "conducting_body";`)
  await db.execute(sql`DO $$ BEGIN IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_courses_status') THEN DROP TYPE "public"."enum_courses_status"; END IF; END $$;`)
}
