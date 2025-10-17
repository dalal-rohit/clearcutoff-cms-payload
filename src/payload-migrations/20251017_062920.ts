import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "reviews_reviews_review_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reviews_reviews_review_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "reviews_reviews_locales" ADD COLUMN "profession" varchar;
  ALTER TABLE "reviews_reviews_review_highlight" ADD CONSTRAINT "reviews_reviews_review_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_reviews_review_highlight_locales" ADD CONSTRAINT "reviews_reviews_review_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_reviews_review_highlight"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "reviews_reviews_review_highlight_order_idx" ON "reviews_reviews_review_highlight" USING btree ("_order");
  CREATE INDEX "reviews_reviews_review_highlight_parent_id_idx" ON "reviews_reviews_review_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reviews_reviews_review_highlight_locales_locale_parent_id_unique" ON "reviews_reviews_review_highlight_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "reviews_reviews_locales" DROP COLUMN "field";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "reviews_reviews_review_highlight" CASCADE;
  DROP TABLE "reviews_reviews_review_highlight_locales" CASCADE;
  ALTER TABLE "reviews_reviews_locales" ADD COLUMN "field" varchar;
  ALTER TABLE "reviews_reviews_locales" DROP COLUMN "profession";`)
}
