import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "global_sections_reviews_highlight" CASCADE;
  DROP TABLE "global_sections_reviews_highlight_locales" CASCADE;
  DROP TABLE "global_sections_reviews_reviews" CASCADE;
  DROP TABLE "global_sections_reviews_reviews_locales" CASCADE;
  ALTER TABLE "global_sections" DROP COLUMN "reviews_enabled";
  ALTER TABLE "global_sections_locales" DROP COLUMN "reviews_eyebrow";
  ALTER TABLE "global_sections_locales" DROP COLUMN "reviews_heading";
  ALTER TABLE "global_sections_locales" DROP COLUMN "reviews_subheading";
  DROP TYPE "public"."enum_global_sections_reviews_reviews_gender";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_global_sections_reviews_reviews_gender" AS ENUM('male', 'female');
  CREATE TABLE "global_sections_reviews_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_reviews_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_reviews_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"profile_id" integer,
  	"gender" "enum_global_sections_reviews_reviews_gender",
  	"rating" numeric
  );
  
  CREATE TABLE "global_sections_reviews_reviews_locales" (
  	"name" varchar,
  	"field" varchar,
  	"review" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "global_sections" ADD COLUMN "reviews_enabled" boolean DEFAULT true;
  ALTER TABLE "global_sections_locales" ADD COLUMN "reviews_eyebrow" varchar;
  ALTER TABLE "global_sections_locales" ADD COLUMN "reviews_heading" varchar;
  ALTER TABLE "global_sections_locales" ADD COLUMN "reviews_subheading" varchar;
  ALTER TABLE "global_sections_reviews_highlight" ADD CONSTRAINT "global_sections_reviews_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_reviews_highlight_locales" ADD CONSTRAINT "global_sections_reviews_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_reviews_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_reviews_reviews" ADD CONSTRAINT "global_sections_reviews_reviews_profile_id_media_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_sections_reviews_reviews" ADD CONSTRAINT "global_sections_reviews_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_reviews_reviews_locales" ADD CONSTRAINT "global_sections_reviews_reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_reviews_reviews"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "global_sections_reviews_highlight_order_idx" ON "global_sections_reviews_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_reviews_highlight_parent_id_idx" ON "global_sections_reviews_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_reviews_highlight_locales_locale_parent_id_unique" ON "global_sections_reviews_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_reviews_reviews_order_idx" ON "global_sections_reviews_reviews" USING btree ("_order");
  CREATE INDEX "global_sections_reviews_reviews_parent_id_idx" ON "global_sections_reviews_reviews" USING btree ("_parent_id");
  CREATE INDEX "global_sections_reviews_reviews_profile_idx" ON "global_sections_reviews_reviews" USING btree ("profile_id");
  CREATE UNIQUE INDEX "global_sections_reviews_reviews_locales_locale_parent_id_unique" ON "global_sections_reviews_reviews_locales" USING btree ("_locale","_parent_id");`)
}
