import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_courses_status" AS ENUM('active', 'inactive', 'archived');
  ALTER TABLE "courses_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_highlights_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "courses_highlights" CASCADE;
  DROP TABLE "courses_highlights_locales" CASCADE;
  ALTER TABLE "courses" DROP CONSTRAINT "courses_hero_id_users_id_fk";
  
  DROP INDEX "courses_slug_idx";
  DROP INDEX "courses_hero_idx";
  ALTER TABLE "courses" ADD COLUMN "exam_id" varchar NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "short_name" varchar NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "logo_url" varchar NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "exam_type" varchar NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "exam_frequency" varchar NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "evaluation_type" varchar NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "upcoming_exam" varchar NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "status" "enum_courses_status" DEFAULT 'active' NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "rating" varchar NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "price" numeric NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "combo_price" numeric;
  ALTER TABLE "courses" ADD COLUMN "marking_schema" varchar;
  ALTER TABLE "courses_locales" ADD COLUMN "name" varchar;
  ALTER TABLE "courses_locales" ADD COLUMN "state" varchar;
  ALTER TABLE "courses_locales" ADD COLUMN "conducting_body" varchar;
  CREATE UNIQUE INDEX "courses_name_idx" ON "courses_locales" USING btree ("name","_locale");
  ALTER TABLE "courses" DROP COLUMN "slug";
  ALTER TABLE "courses" DROP COLUMN "hero_id";
  ALTER TABLE "courses" DROP COLUMN "sections";
  ALTER TABLE "courses_locales" DROP COLUMN "title";
  ALTER TABLE "courses_locales" DROP COLUMN "description";
  ALTER TABLE "courses_locales" DROP COLUMN "content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "courses_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "courses_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  DROP INDEX "courses_name_idx";
  ALTER TABLE "courses" ADD COLUMN "slug" varchar;
  ALTER TABLE "courses" ADD COLUMN "hero_id" integer NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "sections" jsonb;
  ALTER TABLE "courses_locales" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "courses_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "courses_locales" ADD COLUMN "content" jsonb;
  ALTER TABLE "courses_highlights" ADD CONSTRAINT "courses_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_highlights_locales" ADD CONSTRAINT "courses_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_highlights"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_highlights_order_idx" ON "courses_highlights" USING btree ("_order");
  CREATE INDEX "courses_highlights_parent_id_idx" ON "courses_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_highlights_locales_locale_parent_id_unique" ON "courses_highlights_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "courses" ADD CONSTRAINT "courses_hero_id_users_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_hero_idx" ON "courses" USING btree ("hero_id");
  ALTER TABLE "courses" DROP COLUMN "exam_id";
  ALTER TABLE "courses" DROP COLUMN "short_name";
  ALTER TABLE "courses" DROP COLUMN "logo_url";
  ALTER TABLE "courses" DROP COLUMN "exam_type";
  ALTER TABLE "courses" DROP COLUMN "exam_frequency";
  ALTER TABLE "courses" DROP COLUMN "evaluation_type";
  ALTER TABLE "courses" DROP COLUMN "upcoming_exam";
  ALTER TABLE "courses" DROP COLUMN "status";
  ALTER TABLE "courses" DROP COLUMN "rating";
  ALTER TABLE "courses" DROP COLUMN "price";
  ALTER TABLE "courses" DROP COLUMN "combo_price";
  ALTER TABLE "courses" DROP COLUMN "marking_schema";
  ALTER TABLE "courses_locales" DROP COLUMN "name";
  ALTER TABLE "courses_locales" DROP COLUMN "state";
  ALTER TABLE "courses_locales" DROP COLUMN "conducting_body";
  DROP TYPE "public"."enum_courses_status";`)
}
