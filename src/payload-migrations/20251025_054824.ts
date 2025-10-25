import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "questions_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "questions_locales" CASCADE;
  ALTER TABLE "questions" ALTER COLUMN "correct_option" SET DATA TYPE varchar;
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
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_instance_id" integer;
  CREATE INDEX "e_instance_updated_at_idx" ON "e_instance" USING btree ("updated_at");
  CREATE INDEX "e_instance_created_at_idx" ON "e_instance" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_instance_fk" FOREIGN KEY ("e_instance_id") REFERENCES "public"."e_instance"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_e_instance_id_idx" ON "payload_locked_documents_rels" USING btree ("e_instance_id");
  ALTER TABLE "pages" DROP COLUMN "sections";
  ALTER TABLE "pages" DROP COLUMN "local_sections";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "e_instance" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "e_instance" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_instance_fk";
  
  DROP INDEX "payload_locked_documents_rels_e_instance_id_idx";
  ALTER TABLE "questions" ALTER COLUMN "correct_option" SET DATA TYPE numeric;
  ALTER TABLE "pages" ADD COLUMN "sections" jsonb;
  ALTER TABLE "pages" ADD COLUMN "local_sections" jsonb;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_locales" ADD CONSTRAINT "questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "questions_locales_locale_parent_id_unique" ON "questions_locales" USING btree ("_locale","_parent_id");
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
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_instance_id";`)
}
