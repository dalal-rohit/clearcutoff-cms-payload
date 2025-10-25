import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "questions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question_id" varchar,
  	"exam_instance_id" varchar,
  	"stage_id" varchar,
  	"label_id" varchar,
  	"section_id" varchar,
  	"question_number" varchar,
  	"language_code" varchar,
  	"question_text" varchar,
  	"question_image_url" varchar,
  	"option_1_text" varchar,
  	"option_1_image_url" varchar,
  	"option_2_text" varchar,
  	"option_2_image_url" varchar,
  	"option_3_text" varchar,
  	"option_3_image_url" varchar,
  	"option_4_text" varchar,
  	"option_4_image_url" varchar,
  	"correct_option" varchar,
  	"official_answer_key" varchar,
  	"explanation" varchar,
  	"chapter_id" varchar,
  	"topic_id" varchar,
  	"subtopic_id" varchar,
  	"ai_time_to_solve" varchar,
  	"ai_difficulty_level" varchar,
  	"ai_question_type" varchar,
  	"ai_chapter_name" varchar,
  	"ai_topic_name" varchar,
  	"ai_subtopic_name" varchar,
  	"ai_cognitive_skill" varchar,
  	"ai_is_pedagogy" varchar,
  	"ai_is_not" varchar,
  	"ai_question_tags" varchar,
  	"gs_created_at" varchar,
  	"gs_updated_at" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "e_navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"ent_id" varchar,
  	"exam_id" varchar,
  	"parent_id" varchar,
  	"name" varchar,
  	"group" varchar,
  	"status" varchar,
  	"flag_course" varchar,
  	"flag_tests" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "e_stage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stage_id" varchar,
  	"exam_id" varchar,
  	"name" varchar,
  	"stage_type" varchar,
  	"stage_order" varchar,
  	"description" varchar,
  	"duration_mins" varchar,
  	"total_marks" varchar,
  	"total_questions" varchar,
  	"ai_evaluation_supported" varchar,
  	"status" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "e_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"name" varchar,
  	"type" varchar,
  	"area" varchar,
  	"description" varchar,
  	"total_questions" varchar,
  	"total_marks" varchar,
  	"question_weightage" varchar,
  	"evaluation_type" varchar,
  	"ai_evaluation_supported" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "e_instance" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"exam_instance_id" varchar NOT NULL,
  	"exam_id" varchar NOT NULL,
  	"exam_year" varchar,
  	"exam_cycle" varchar,
  	"mode" varchar,
  	"exam_pattern" varchar,
  	"duration_minutes" varchar,
  	"total_marks" varchar,
  	"total_questions" varchar,
  	"pass_criteria" varchar,
  	"pass_marks" varchar,
  	"negative_marking" varchar,
  	"marking_scheme" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "footers_pages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "footers_pages_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footers_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "footers_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contact" varchar NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "footers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"copyright" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "courses_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "courses_highlights" CASCADE;
  DROP TABLE IF EXISTS "courses_highlights_locales" CASCADE;
  DROP TABLE IF EXISTS "courses_locales" CASCADE;
  DROP TABLE IF EXISTS "pages_locales" CASCADE;
  ALTER TABLE "courses" DROP CONSTRAINT IF EXISTS "courses_hero_id_users_id_fk";
  
  DROP INDEX IF EXISTS "courses_slug_idx";
  DROP INDEX IF EXISTS "courses_hero_idx";
  ALTER TABLE "courses" ADD COLUMN "exam_id" varchar;
  ALTER TABLE "courses" ADD COLUMN "name" varchar;
  ALTER TABLE "courses" ADD COLUMN "short_name" varchar;
  ALTER TABLE "courses" ADD COLUMN "state" varchar;
  ALTER TABLE "courses" ADD COLUMN "conducting_body" varchar;
  ALTER TABLE "courses" ADD COLUMN "logo_url" varchar;
  ALTER TABLE "courses" ADD COLUMN "exam_type" varchar;
  ALTER TABLE "courses" ADD COLUMN "exam_frequency" varchar;
  ALTER TABLE "courses" ADD COLUMN "evaluation_type" varchar;
  ALTER TABLE "courses" ADD COLUMN "upcoming_exam" varchar;
  ALTER TABLE "courses" ADD COLUMN "status" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "rating" varchar;
  ALTER TABLE "courses" ADD COLUMN "price" varchar;
  ALTER TABLE "courses" ADD COLUMN "combo_price" varchar;
  ALTER TABLE "courses" ADD COLUMN "marking_schema" varchar;
  ALTER TABLE "pages" ADD COLUMN "title" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_enabled" boolean DEFAULT true;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "questions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_navigation_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_stage_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_sections_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_instance_id" integer;
  ALTER TABLE "footers_pages" ADD CONSTRAINT "footers_pages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_pages_locales" ADD CONSTRAINT "footers_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_socials" ADD CONSTRAINT "footers_socials_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footers_socials" ADD CONSTRAINT "footers_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_contacts" ADD CONSTRAINT "footers_contacts_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footers_contacts" ADD CONSTRAINT "footers_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "questions_updated_at_idx" ON "questions" USING btree ("updated_at");
  CREATE INDEX "questions_created_at_idx" ON "questions" USING btree ("created_at");
  CREATE INDEX "e_navigation_updated_at_idx" ON "e_navigation" USING btree ("updated_at");
  CREATE INDEX "e_navigation_created_at_idx" ON "e_navigation" USING btree ("created_at");
  CREATE INDEX "e_stage_updated_at_idx" ON "e_stage" USING btree ("updated_at");
  CREATE INDEX "e_stage_created_at_idx" ON "e_stage" USING btree ("created_at");
  CREATE INDEX "e_sections_updated_at_idx" ON "e_sections" USING btree ("updated_at");
  CREATE INDEX "e_sections_created_at_idx" ON "e_sections" USING btree ("created_at");
  CREATE INDEX "e_instance_updated_at_idx" ON "e_instance" USING btree ("updated_at");
  CREATE INDEX "e_instance_created_at_idx" ON "e_instance" USING btree ("created_at");
  CREATE INDEX "footers_pages_order_idx" ON "footers_pages" USING btree ("_order");
  CREATE INDEX "footers_pages_parent_id_idx" ON "footers_pages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footers_pages_locales_locale_parent_id_unique" ON "footers_pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footers_socials_order_idx" ON "footers_socials" USING btree ("_order");
  CREATE INDEX "footers_socials_parent_id_idx" ON "footers_socials" USING btree ("_parent_id");
  CREATE INDEX "footers_socials_icon_idx" ON "footers_socials" USING btree ("icon_id");
  CREATE INDEX "footers_contacts_order_idx" ON "footers_contacts" USING btree ("_order");
  CREATE INDEX "footers_contacts_parent_id_idx" ON "footers_contacts" USING btree ("_parent_id");
  CREATE INDEX "footers_contacts_icon_idx" ON "footers_contacts" USING btree ("icon_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_questions_fk" FOREIGN KEY ("questions_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_navigation_fk" FOREIGN KEY ("e_navigation_id") REFERENCES "public"."e_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_stage_fk" FOREIGN KEY ("e_stage_id") REFERENCES "public"."e_stage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_sections_fk" FOREIGN KEY ("e_sections_id") REFERENCES "public"."e_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_instance_fk" FOREIGN KEY ("e_instance_id") REFERENCES "public"."e_instance"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX IF NOT EXISTS "courses_name_idx" ON "courses" USING btree ("name");
  CREATE INDEX "payload_locked_documents_rels_questions_id_idx" ON "payload_locked_documents_rels" USING btree ("questions_id");
  CREATE INDEX "payload_locked_documents_rels_e_navigation_id_idx" ON "payload_locked_documents_rels" USING btree ("e_navigation_id");
  CREATE INDEX "payload_locked_documents_rels_e_stage_id_idx" ON "payload_locked_documents_rels" USING btree ("e_stage_id");
  CREATE INDEX "payload_locked_documents_rels_e_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("e_sections_id");
  CREATE INDEX "payload_locked_documents_rels_e_instance_id_idx" ON "payload_locked_documents_rels" USING btree ("e_instance_id");
  ALTER TABLE "courses" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "courses" DROP COLUMN IF EXISTS "hero_id";
  ALTER TABLE "courses" DROP COLUMN IF EXISTS "sections";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "sections";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "local_sections";
  ALTER TABLE "courses" ALTER COLUMN "status" DROP DEFAULT;
  ALTER TABLE "pages" ALTER COLUMN "title" DROP DEFAULT;`)
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
  
  CREATE TABLE "courses_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"hero_enabled" boolean DEFAULT true,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "questions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "e_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "e_stage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "e_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "e_instance" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers_pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers_contacts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footers" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "questions" CASCADE;
  DROP TABLE "e_navigation" CASCADE;
  DROP TABLE "e_stage" CASCADE;
  DROP TABLE "e_sections" CASCADE;
  DROP TABLE "e_instance" CASCADE;
  DROP TABLE "footers_pages" CASCADE;
  DROP TABLE "footers_pages_locales" CASCADE;
  DROP TABLE "footers_socials" CASCADE;
  DROP TABLE "footers_contacts" CASCADE;
  DROP TABLE "footers" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_questions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_navigation_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_stage_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_sections_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_instance_fk";
  
  DROP INDEX "courses_name_idx";
  DROP INDEX "payload_locked_documents_rels_questions_id_idx";
  DROP INDEX "payload_locked_documents_rels_e_navigation_id_idx";
  DROP INDEX "payload_locked_documents_rels_e_stage_id_idx";
  DROP INDEX "payload_locked_documents_rels_e_sections_id_idx";
  DROP INDEX "payload_locked_documents_rels_e_instance_id_idx";
  ALTER TABLE "courses" ADD COLUMN "slug" varchar;
  ALTER TABLE "courses" ADD COLUMN "hero_id" integer NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "sections" jsonb;
  ALTER TABLE "pages" ADD COLUMN "sections" jsonb;
  ALTER TABLE "pages" ADD COLUMN "local_sections" jsonb;
  ALTER TABLE "courses_highlights" ADD CONSTRAINT "courses_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_highlights_locales" ADD CONSTRAINT "courses_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_locales" ADD CONSTRAINT "courses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_highlights_order_idx" ON "courses_highlights" USING btree ("_order");
  CREATE INDEX "courses_highlights_parent_id_idx" ON "courses_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_highlights_locales_locale_parent_id_unique" ON "courses_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "courses_locales_locale_parent_id_unique" ON "courses_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "courses" ADD CONSTRAINT "courses_hero_id_users_id_fk" FOREIGN KEY ("hero_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_hero_idx" ON "courses" USING btree ("hero_id");
  ALTER TABLE "courses" DROP COLUMN "exam_id";
  ALTER TABLE "courses" DROP COLUMN "name";
  ALTER TABLE "courses" DROP COLUMN "short_name";
  ALTER TABLE "courses" DROP COLUMN "state";
  ALTER TABLE "courses" DROP COLUMN "conducting_body";
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
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "seo_title";
  ALTER TABLE "pages" DROP COLUMN "seo_description";
  ALTER TABLE "pages" DROP COLUMN "hero_enabled";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "questions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_navigation_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_stage_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_sections_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_instance_id";`)
}
