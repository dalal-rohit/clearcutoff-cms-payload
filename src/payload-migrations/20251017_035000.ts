import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "global_sections_faqsabc_highlight" CASCADE;
  DROP TABLE "global_sections_faqsabc_highlight_locales" CASCADE;
  DROP TABLE "global_sections_faqsabc_categories" CASCADE;
  DROP TABLE "global_sections_faqsabc_categories_locales" CASCADE;
  DROP TABLE "global_sections_faqsabc_faqs" CASCADE;
  DROP TABLE "global_sections_faqsabc_faqs_locales" CASCADE;
  ALTER TABLE "global_sections" DROP COLUMN "faqsabc_enabled";
  ALTER TABLE "global_sections_locales" DROP COLUMN "faqsabc_eyebrow";
  ALTER TABLE "global_sections_locales" DROP COLUMN "faqsabc_heading";
  ALTER TABLE "global_sections_locales" DROP COLUMN "faqsabc_subheading";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "global_sections_faqsabc_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_faqsabc_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_faqsabc_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_faqsabc_categories_locales" (
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_faqsabc_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_faqsabc_faqs_locales" (
  	"category" varchar,
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "global_sections" ADD COLUMN "faqsabc_enabled" boolean DEFAULT true;
  ALTER TABLE "global_sections_locales" ADD COLUMN "faqsabc_eyebrow" varchar;
  ALTER TABLE "global_sections_locales" ADD COLUMN "faqsabc_heading" varchar;
  ALTER TABLE "global_sections_locales" ADD COLUMN "faqsabc_subheading" varchar;
  ALTER TABLE "global_sections_faqsabc_highlight" ADD CONSTRAINT "global_sections_faqsabc_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqsabc_highlight_locales" ADD CONSTRAINT "global_sections_faqsabc_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_faqsabc_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqsabc_categories" ADD CONSTRAINT "global_sections_faqsabc_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqsabc_categories_locales" ADD CONSTRAINT "global_sections_faqsabc_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_faqsabc_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqsabc_faqs" ADD CONSTRAINT "global_sections_faqsabc_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqsabc_faqs_locales" ADD CONSTRAINT "global_sections_faqsabc_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_faqsabc_faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "global_sections_faqsabc_highlight_order_idx" ON "global_sections_faqsabc_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_faqsabc_highlight_parent_id_idx" ON "global_sections_faqsabc_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_faqsabc_highlight_locales_locale_parent_id_unique" ON "global_sections_faqsabc_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_faqsabc_categories_order_idx" ON "global_sections_faqsabc_categories" USING btree ("_order");
  CREATE INDEX "global_sections_faqsabc_categories_parent_id_idx" ON "global_sections_faqsabc_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_faqsabc_categories_locales_locale_parent_id_unique" ON "global_sections_faqsabc_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_faqsabc_faqs_order_idx" ON "global_sections_faqsabc_faqs" USING btree ("_order");
  CREATE INDEX "global_sections_faqsabc_faqs_parent_id_idx" ON "global_sections_faqsabc_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_faqsabc_faqs_locales_locale_parent_id_unique" ON "global_sections_faqsabc_faqs_locales" USING btree ("_locale","_parent_id");`)
}
