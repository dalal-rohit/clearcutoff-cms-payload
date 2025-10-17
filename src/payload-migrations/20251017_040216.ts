import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "global_sections_faqs_yesterday_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_yesterday_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_yesterday_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_yesterday_categories_locales" (
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_yesterday_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_yesterday_faqs_locales" (
  	"category" varchar,
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  DROP TABLE "global_sections_logo_carousel1_logos" CASCADE;
  DROP TABLE "global_sections_logo_carousel1_logos_locales" CASCADE;
  DROP TABLE "global_sections_logo_carousel2_logos" CASCADE;
  DROP TABLE "global_sections_logo_carousel2_logos_locales" CASCADE;
  ALTER TABLE "pages" ADD COLUMN "local_sections1" jsonb;
  ALTER TABLE "pages" ADD COLUMN "local_sections2" jsonb;
  ALTER TABLE "global_sections" ADD COLUMN "faqs_yesterday_enabled" boolean DEFAULT true;
  ALTER TABLE "global_sections_locales" ADD COLUMN "faqs_yesterday_eyebrow" varchar;
  ALTER TABLE "global_sections_locales" ADD COLUMN "faqs_yesterday_heading" varchar;
  ALTER TABLE "global_sections_locales" ADD COLUMN "faqs_yesterday_subheading" varchar;
  ALTER TABLE "global_sections_faqs_yesterday_highlight" ADD CONSTRAINT "global_sections_faqs_yesterday_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_yesterday_highlight_locales" ADD CONSTRAINT "global_sections_faqs_yesterday_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_faqs_yesterday_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_yesterday_categories" ADD CONSTRAINT "global_sections_faqs_yesterday_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_yesterday_categories_locales" ADD CONSTRAINT "global_sections_faqs_yesterday_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_faqs_yesterday_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_yesterday_faqs" ADD CONSTRAINT "global_sections_faqs_yesterday_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_yesterday_faqs_locales" ADD CONSTRAINT "global_sections_faqs_yesterday_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_faqs_yesterday_faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "global_sections_faqs_yesterday_highlight_order_idx" ON "global_sections_faqs_yesterday_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_faqs_yesterday_highlight_parent_id_idx" ON "global_sections_faqs_yesterday_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_faqs_yesterday_highlight_locales_locale_parent_id_unique" ON "global_sections_faqs_yesterday_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_faqs_yesterday_categories_order_idx" ON "global_sections_faqs_yesterday_categories" USING btree ("_order");
  CREATE INDEX "global_sections_faqs_yesterday_categories_parent_id_idx" ON "global_sections_faqs_yesterday_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_faqs_yesterday_categories_locales_locale_parent_id_unique" ON "global_sections_faqs_yesterday_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_faqs_yesterday_faqs_order_idx" ON "global_sections_faqs_yesterday_faqs" USING btree ("_order");
  CREATE INDEX "global_sections_faqs_yesterday_faqs_parent_id_idx" ON "global_sections_faqs_yesterday_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_faqs_yesterday_faqs_locales_locale_parent_id_unique" ON "global_sections_faqs_yesterday_faqs_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "global_sections" DROP COLUMN "logo_carousel1_enabled";
  ALTER TABLE "global_sections" DROP COLUMN "logo_carousel2_enabled";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "global_sections_logo_carousel1_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_logo_carousel1_logos_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"logo_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_logo_carousel2_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_logo_carousel2_logos_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"logo_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  DROP TABLE "global_sections_faqs_yesterday_highlight" CASCADE;
  DROP TABLE "global_sections_faqs_yesterday_highlight_locales" CASCADE;
  DROP TABLE "global_sections_faqs_yesterday_categories" CASCADE;
  DROP TABLE "global_sections_faqs_yesterday_categories_locales" CASCADE;
  DROP TABLE "global_sections_faqs_yesterday_faqs" CASCADE;
  DROP TABLE "global_sections_faqs_yesterday_faqs_locales" CASCADE;
  ALTER TABLE "global_sections" ADD COLUMN "logo_carousel1_enabled" boolean DEFAULT true;
  ALTER TABLE "global_sections" ADD COLUMN "logo_carousel2_enabled" boolean DEFAULT true;
  ALTER TABLE "global_sections_logo_carousel1_logos" ADD CONSTRAINT "global_sections_logo_carousel1_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel1_logos_locales" ADD CONSTRAINT "global_sections_logo_carousel1_logos_locales_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel1_logos_locales" ADD CONSTRAINT "global_sections_logo_carousel1_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_logo_carousel1_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel2_logos" ADD CONSTRAINT "global_sections_logo_carousel2_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel2_logos_locales" ADD CONSTRAINT "global_sections_logo_carousel2_logos_locales_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel2_logos_locales" ADD CONSTRAINT "global_sections_logo_carousel2_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_logo_carousel2_logos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "global_sections_logo_carousel1_logos_order_idx" ON "global_sections_logo_carousel1_logos" USING btree ("_order");
  CREATE INDEX "global_sections_logo_carousel1_logos_parent_id_idx" ON "global_sections_logo_carousel1_logos" USING btree ("_parent_id");
  CREATE INDEX "global_sections_logo_carousel1_logos_logo_idx" ON "global_sections_logo_carousel1_logos_locales" USING btree ("logo_id","_locale");
  CREATE UNIQUE INDEX "global_sections_logo_carousel1_logos_locales_locale_parent_id_unique" ON "global_sections_logo_carousel1_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_logo_carousel2_logos_order_idx" ON "global_sections_logo_carousel2_logos" USING btree ("_order");
  CREATE INDEX "global_sections_logo_carousel2_logos_parent_id_idx" ON "global_sections_logo_carousel2_logos" USING btree ("_parent_id");
  CREATE INDEX "global_sections_logo_carousel2_logos_logo_idx" ON "global_sections_logo_carousel2_logos_locales" USING btree ("logo_id","_locale");
  CREATE UNIQUE INDEX "global_sections_logo_carousel2_logos_locales_locale_parent_id_unique" ON "global_sections_logo_carousel2_logos_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages" DROP COLUMN "local_sections1";
  ALTER TABLE "pages" DROP COLUMN "local_sections2";
  ALTER TABLE "global_sections" DROP COLUMN "faqs_yesterday_enabled";
  ALTER TABLE "global_sections_locales" DROP COLUMN "faqs_yesterday_eyebrow";
  ALTER TABLE "global_sections_locales" DROP COLUMN "faqs_yesterday_heading";
  ALTER TABLE "global_sections_locales" DROP COLUMN "faqs_yesterday_subheading";`)
}
