import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_reviews_reviews_gender" AS ENUM('male', 'female');
  CREATE TABLE "reviews_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reviews_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reviews_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"profile_id" integer,
  	"gender" "enum_reviews_reviews_gender",
  	"rating" numeric
  );
  
  CREATE TABLE "reviews_reviews_locales" (
  	"name" varchar,
  	"field" varchar,
  	"review" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "reviews_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "reviews_highlight" ADD CONSTRAINT "reviews_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_highlight_locales" ADD CONSTRAINT "reviews_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_reviews" ADD CONSTRAINT "reviews_reviews_profile_id_media_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews_reviews" ADD CONSTRAINT "reviews_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_reviews_locales" ADD CONSTRAINT "reviews_reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_locales" ADD CONSTRAINT "reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "reviews_highlight_order_idx" ON "reviews_highlight" USING btree ("_order");
  CREATE INDEX "reviews_highlight_parent_id_idx" ON "reviews_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reviews_highlight_locales_locale_parent_id_unique" ON "reviews_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reviews_reviews_order_idx" ON "reviews_reviews" USING btree ("_order");
  CREATE INDEX "reviews_reviews_parent_id_idx" ON "reviews_reviews" USING btree ("_parent_id");
  CREATE INDEX "reviews_reviews_profile_idx" ON "reviews_reviews" USING btree ("profile_id");
  CREATE UNIQUE INDEX "reviews_reviews_locales_locale_parent_id_unique" ON "reviews_reviews_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "reviews_locales_locale_parent_id_unique" ON "reviews_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "reviews_highlight" CASCADE;
  DROP TABLE "reviews_highlight_locales" CASCADE;
  DROP TABLE "reviews_reviews" CASCADE;
  DROP TABLE "reviews_reviews_locales" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "reviews_locales" CASCADE;
  DROP TYPE "public"."enum_reviews_reviews_gender";`)
}
