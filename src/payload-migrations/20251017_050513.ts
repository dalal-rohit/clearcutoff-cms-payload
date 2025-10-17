import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "faqs_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faqs_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faqs_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faqs_categories_locales" (
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faqs_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faqs_faqs_locales" (
  	"category" varchar,
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faqs_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP TABLE "global_sections_highlight" CASCADE;
  DROP TABLE "global_sections_highlight_locales" CASCADE;
  DROP TABLE "global_sections_categories" CASCADE;
  DROP TABLE "global_sections_categories_locales" CASCADE;
  DROP TABLE "global_sections_faqs" CASCADE;
  DROP TABLE "global_sections_faqs_locales" CASCADE;
  ALTER TABLE "faqs_highlight" ADD CONSTRAINT "faqs_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_highlight_locales" ADD CONSTRAINT "faqs_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_categories" ADD CONSTRAINT "faqs_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_categories_locales" ADD CONSTRAINT "faqs_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_faqs" ADD CONSTRAINT "faqs_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_faqs_locales" ADD CONSTRAINT "faqs_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "faqs_highlight_order_idx" ON "faqs_highlight" USING btree ("_order");
  CREATE INDEX "faqs_highlight_parent_id_idx" ON "faqs_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faqs_highlight_locales_locale_parent_id_unique" ON "faqs_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_categories_order_idx" ON "faqs_categories" USING btree ("_order");
  CREATE INDEX "faqs_categories_parent_id_idx" ON "faqs_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faqs_categories_locales_locale_parent_id_unique" ON "faqs_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_faqs_order_idx" ON "faqs_faqs" USING btree ("_order");
  CREATE INDEX "faqs_faqs_parent_id_idx" ON "faqs_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faqs_faqs_locales_locale_parent_id_unique" ON "faqs_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "global_sections_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_categories_locales" (
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_locales" (
  	"category" varchar,
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  DROP TABLE "faqs_highlight" CASCADE;
  DROP TABLE "faqs_highlight_locales" CASCADE;
  DROP TABLE "faqs_categories" CASCADE;
  DROP TABLE "faqs_categories_locales" CASCADE;
  DROP TABLE "faqs_faqs" CASCADE;
  DROP TABLE "faqs_faqs_locales" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  ALTER TABLE "global_sections_highlight" ADD CONSTRAINT "global_sections_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_highlight_locales" ADD CONSTRAINT "global_sections_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_categories" ADD CONSTRAINT "global_sections_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_categories_locales" ADD CONSTRAINT "global_sections_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs" ADD CONSTRAINT "global_sections_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_locales" ADD CONSTRAINT "global_sections_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_faqs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "global_sections_highlight_order_idx" ON "global_sections_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_highlight_parent_id_idx" ON "global_sections_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_highlight_locales_locale_parent_id_unique" ON "global_sections_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_categories_order_idx" ON "global_sections_categories" USING btree ("_order");
  CREATE INDEX "global_sections_categories_parent_id_idx" ON "global_sections_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_categories_locales_locale_parent_id_unique" ON "global_sections_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_faqs_order_idx" ON "global_sections_faqs" USING btree ("_order");
  CREATE INDEX "global_sections_faqs_parent_id_idx" ON "global_sections_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_faqs_locales_locale_parent_id_unique" ON "global_sections_faqs_locales" USING btree ("_locale","_parent_id");`)
}
