import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "faq_categories_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faq_categories_questions_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faq_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL
  );
  
  CREATE TABLE "faq_categories_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "faq_categories_questions" ADD CONSTRAINT "faq_categories_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_categories_questions_locales" ADD CONSTRAINT "faq_categories_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_categories_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_categories" ADD CONSTRAINT "faq_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_categories_locales" ADD CONSTRAINT "faq_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "faq_categories_questions_order_idx" ON "faq_categories_questions" USING btree ("_order");
  CREATE INDEX "faq_categories_questions_parent_id_idx" ON "faq_categories_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faq_categories_questions_locales_locale_parent_id_unique" ON "faq_categories_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faq_categories_order_idx" ON "faq_categories" USING btree ("_order");
  CREATE INDEX "faq_categories_parent_id_idx" ON "faq_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faq_categories_locales_locale_parent_id_unique" ON "faq_categories_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "faq_categories_questions" CASCADE;
  DROP TABLE "faq_categories_questions_locales" CASCADE;
  DROP TABLE "faq_categories" CASCADE;
  DROP TABLE "faq_categories_locales" CASCADE;
  DROP TABLE "faq" CASCADE;`)
}
