import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create tables if not exist
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footers" (
      "id" serial PRIMARY KEY NOT NULL,
      "copyright" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );`)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footers_pages" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link" varchar NOT NULL
    );`)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footers_pages_locales" (
      "name" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );`)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footers_socials" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link" varchar NOT NULL,
      "icon_id" integer
    );`)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "footers_contacts" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "contact" varchar NOT NULL,
      "icon_id" integer
    );`)

  // Add FKs if not present
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'footers_pages_parent_id_fk'
      ) THEN
        ALTER TABLE "footers_pages" ADD CONSTRAINT "footers_pages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;`)

  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'footers_pages_locales_parent_id_fk'
      ) THEN
        ALTER TABLE "footers_pages_locales" ADD CONSTRAINT "footers_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers_pages"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;`)

  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'footers_socials_icon_id_media_id_fk'
      ) THEN
        ALTER TABLE "footers_socials" ADD CONSTRAINT "footers_socials_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;`)

  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'footers_socials_parent_id_fk'
      ) THEN
        ALTER TABLE "footers_socials" ADD CONSTRAINT "footers_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;`)

  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'footers_contacts_icon_id_media_id_fk'
      ) THEN
        ALTER TABLE "footers_contacts" ADD CONSTRAINT "footers_contacts_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
      END IF;
    END $$;`)

  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'footers_contacts_parent_id_fk'
      ) THEN
        ALTER TABLE "footers_contacts" ADD CONSTRAINT "footers_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;`)

  // Indexes if not exists
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "footers_pages_order_idx" ON "footers_pages" USING btree ("_order");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "footers_pages_parent_id_idx" ON "footers_pages" USING btree ("_parent_id");`)
  await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS "footers_pages_locales_locale_parent_id_unique" ON "footers_pages_locales" USING btree ("_locale","_parent_id");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "footers_socials_order_idx" ON "footers_socials" USING btree ("_order");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "footers_socials_parent_id_idx" ON "footers_socials" USING btree ("_parent_id");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "footers_socials_icon_idx" ON "footers_socials" USING btree ("icon_id");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "footers_contacts_order_idx" ON "footers_contacts" USING btree ("_order");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "footers_contacts_parent_id_idx" ON "footers_contacts" USING btree ("_parent_id");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "footers_contacts_icon_idx" ON "footers_contacts" USING btree ("icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "footers_pages" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "footers_pages_locales" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "footers_socials" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "footers_contacts" CASCADE;`)
  await db.execute(sql`DROP TABLE IF EXISTS "footers" CASCADE;`)
}
