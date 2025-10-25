import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "courses_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_highlights_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questions_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "courses_highlights" CASCADE;
  DROP TABLE "courses_highlights_locales" CASCADE;
  DROP TABLE "courses_locales" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "questions_locales" CASCADE;
  ALTER TABLE "courses" DROP CONSTRAINT "courses_hero_id_users_id_fk";
  
  DROP INDEX "courses_slug_idx";
  DROP INDEX "courses_hero_idx";
  ALTER TABLE "questions" ALTER COLUMN "correct_option" SET DATA TYPE varchar;
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
  ALTER TABLE "courses" ADD COLUMN "status" varchar NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "rating" varchar;
  ALTER TABLE "courses" ADD COLUMN "price" varchar;
  ALTER TABLE "courses" ADD COLUMN "combo_price" varchar;
  ALTER TABLE "courses" ADD COLUMN "marking_schema" varchar;
  ALTER TABLE "pages" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_enabled" boolean DEFAULT true;
  ALTER TABLE "questions" ADD COLUMN "language_code" varchar;
  ALTER TABLE "questions" ADD COLUMN "question_text" varchar;
  ALTER TABLE "questions" ADD COLUMN "option_1_text" varchar;
  ALTER TABLE "questions" ADD COLUMN "option_2_text" varchar;
  ALTER TABLE "questions" ADD COLUMN "option_3_text" varchar;
  ALTER TABLE "questions" ADD COLUMN "option_4_text" varchar;
  ALTER TABLE "questions" ADD COLUMN "official_answer_key" varchar;
  ALTER TABLE "questions" ADD COLUMN "explanation" varchar;
  ALTER TABLE "questions" ADD COLUMN "chapter_id" varchar;
  ALTER TABLE "questions" ADD COLUMN "topic_id" varchar;
  ALTER TABLE "questions" ADD COLUMN "subtopic_id" varchar;
  ALTER TABLE "questions" ADD COLUMN "ai_time_to_solve" varchar;
  ALTER TABLE "questions" ADD COLUMN "ai_difficulty_level" varchar;
  ALTER TABLE "questions" ADD COLUMN "ai_question_type" varchar;
  ALTER TABLE "questions" ADD COLUMN "ai_chapter_name" varchar;
  ALTER TABLE "questions" ADD COLUMN "ai_topic_name" varchar;
  ALTER TABLE "questions" ADD COLUMN "ai_subtopic_name" varchar;
  ALTER TABLE "questions" ADD COLUMN "ai_cognitive_skill" varchar;
  ALTER TABLE "questions" ADD COLUMN "ai_is_pedagogy" varchar;
  ALTER TABLE "questions" ADD COLUMN "ai_is_not" varchar;
  ALTER TABLE "questions" ADD COLUMN "ai_question_tags" varchar;
  ALTER TABLE "questions" ADD COLUMN "gs_created_at" varchar;
  ALTER TABLE "questions" ADD COLUMN "gs_updated_at" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_navigation_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_stage_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_sections_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_instance_id" integer;
  CREATE INDEX "e_navigation_updated_at_idx" ON "e_navigation" USING btree ("updated_at");
  CREATE INDEX "e_navigation_created_at_idx" ON "e_navigation" USING btree ("created_at");
  CREATE INDEX "e_stage_updated_at_idx" ON "e_stage" USING btree ("updated_at");
  CREATE INDEX "e_stage_created_at_idx" ON "e_stage" USING btree ("created_at");
  CREATE INDEX "e_sections_updated_at_idx" ON "e_sections" USING btree ("updated_at");
  CREATE INDEX "e_sections_created_at_idx" ON "e_sections" USING btree ("created_at");
  CREATE INDEX "e_instance_updated_at_idx" ON "e_instance" USING btree ("updated_at");
  CREATE INDEX "e_instance_created_at_idx" ON "e_instance" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_navigation_fk" FOREIGN KEY ("e_navigation_id") REFERENCES "public"."e_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_stage_fk" FOREIGN KEY ("e_stage_id") REFERENCES "public"."e_stage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_sections_fk" FOREIGN KEY ("e_sections_id") REFERENCES "public"."e_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_instance_fk" FOREIGN KEY ("e_instance_id") REFERENCES "public"."e_instance"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "courses_name_idx" ON "courses" USING btree ("name");
  CREATE INDEX "payload_locked_documents_rels_e_navigation_id_idx" ON "payload_locked_documents_rels" USING btree ("e_navigation_id");
  CREATE INDEX "payload_locked_documents_rels_e_stage_id_idx" ON "payload_locked_documents_rels" USING btree ("e_stage_id");
  CREATE INDEX "payload_locked_documents_rels_e_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("e_sections_id");
  CREATE INDEX "payload_locked_documents_rels_e_instance_id_idx" ON "payload_locked_documents_rels" USING btree ("e_instance_id");
  ALTER TABLE "courses" DROP COLUMN "slug";
  ALTER TABLE "courses" DROP COLUMN "hero_id";
  ALTER TABLE "courses" DROP COLUMN "sections";
  ALTER TABLE "pages" DROP COLUMN "sections";
  ALTER TABLE "pages" DROP COLUMN "local_sections";`)
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
  
  CREATE TABLE "questions_locales" (
  	"question_text" varchar,
  	"option_1_text" varchar,
  	"option_2_text" varchar,
  	"option_3_text" varchar,
  	"option_4_text" varchar,
  	"explanation" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "e_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "e_stage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "e_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "e_instance" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "e_navigation" CASCADE;
  DROP TABLE "e_stage" CASCADE;
  DROP TABLE "e_sections" CASCADE;
  DROP TABLE "e_instance" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_navigation_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_stage_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_sections_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_instance_fk";
  
  DROP INDEX "courses_name_idx";
  DROP INDEX "payload_locked_documents_rels_e_navigation_id_idx";
  DROP INDEX "payload_locked_documents_rels_e_stage_id_idx";
  DROP INDEX "payload_locked_documents_rels_e_sections_id_idx";
  DROP INDEX "payload_locked_documents_rels_e_instance_id_idx";
  ALTER TABLE "questions" ALTER COLUMN "correct_option" SET DATA TYPE numeric;
  ALTER TABLE "courses" ADD COLUMN "slug" varchar;
  ALTER TABLE "courses" ADD COLUMN "hero_id" integer NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "sections" jsonb;
  ALTER TABLE "pages" ADD COLUMN "sections" jsonb;
  ALTER TABLE "pages" ADD COLUMN "local_sections" jsonb;
  ALTER TABLE "courses_highlights" ADD CONSTRAINT "courses_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_highlights_locales" ADD CONSTRAINT "courses_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_locales" ADD CONSTRAINT "courses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_locales" ADD CONSTRAINT "questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_highlights_order_idx" ON "courses_highlights" USING btree ("_order");
  CREATE INDEX "courses_highlights_parent_id_idx" ON "courses_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_highlights_locales_locale_parent_id_unique" ON "courses_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "courses_locales_locale_parent_id_unique" ON "courses_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "questions_locales_locale_parent_id_unique" ON "questions_locales" USING btree ("_locale","_parent_id");
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
  ALTER TABLE "questions" DROP COLUMN "language_code";
  ALTER TABLE "questions" DROP COLUMN "question_text";
  ALTER TABLE "questions" DROP COLUMN "option_1_text";
  ALTER TABLE "questions" DROP COLUMN "option_2_text";
  ALTER TABLE "questions" DROP COLUMN "option_3_text";
  ALTER TABLE "questions" DROP COLUMN "option_4_text";
  ALTER TABLE "questions" DROP COLUMN "official_answer_key";
  ALTER TABLE "questions" DROP COLUMN "explanation";
  ALTER TABLE "questions" DROP COLUMN "chapter_id";
  ALTER TABLE "questions" DROP COLUMN "topic_id";
  ALTER TABLE "questions" DROP COLUMN "subtopic_id";
  ALTER TABLE "questions" DROP COLUMN "ai_time_to_solve";
  ALTER TABLE "questions" DROP COLUMN "ai_difficulty_level";
  ALTER TABLE "questions" DROP COLUMN "ai_question_type";
  ALTER TABLE "questions" DROP COLUMN "ai_chapter_name";
  ALTER TABLE "questions" DROP COLUMN "ai_topic_name";
  ALTER TABLE "questions" DROP COLUMN "ai_subtopic_name";
  ALTER TABLE "questions" DROP COLUMN "ai_cognitive_skill";
  ALTER TABLE "questions" DROP COLUMN "ai_is_pedagogy";
  ALTER TABLE "questions" DROP COLUMN "ai_is_not";
  ALTER TABLE "questions" DROP COLUMN "ai_question_tags";
  ALTER TABLE "questions" DROP COLUMN "gs_created_at";
  ALTER TABLE "questions" DROP COLUMN "gs_updated_at";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_navigation_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_stage_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_sections_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_instance_id";`)
}
