import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "e_navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  
  ALTER TABLE "courses_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "courses_locales" CASCADE;
  ALTER TABLE "courses" ALTER COLUMN "exam_id" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "short_name" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "logo_url" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "exam_type" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "exam_frequency" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "evaluation_type" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "upcoming_exam" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "rating" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "price" DROP NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "name" varchar;
  ALTER TABLE "courses" ADD COLUMN "state" varchar;
  ALTER TABLE "courses" ADD COLUMN "conducting_body" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_navigation_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_stage_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_sections_id" integer;
  CREATE INDEX "e_navigation_updated_at_idx" ON "e_navigation" USING btree ("updated_at");
  CREATE INDEX "e_navigation_created_at_idx" ON "e_navigation" USING btree ("created_at");
  CREATE INDEX "e_stage_updated_at_idx" ON "e_stage" USING btree ("updated_at");
  CREATE INDEX "e_stage_created_at_idx" ON "e_stage" USING btree ("created_at");
  CREATE INDEX "e_sections_updated_at_idx" ON "e_sections" USING btree ("updated_at");
  CREATE INDEX "e_sections_created_at_idx" ON "e_sections" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_navigation_fk" FOREIGN KEY ("e_navigation_id") REFERENCES "public"."e_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_stage_fk" FOREIGN KEY ("e_stage_id") REFERENCES "public"."e_stage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_sections_fk" FOREIGN KEY ("e_sections_id") REFERENCES "public"."e_sections"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "courses_name_idx" ON "courses" USING btree ("name");
  CREATE INDEX "payload_locked_documents_rels_e_navigation_id_idx" ON "payload_locked_documents_rels" USING btree ("e_navigation_id");
  CREATE INDEX "payload_locked_documents_rels_e_stage_id_idx" ON "payload_locked_documents_rels" USING btree ("e_stage_id");
  CREATE INDEX "payload_locked_documents_rels_e_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("e_sections_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "courses_locales" (
  	"name" varchar,
  	"state" varchar,
  	"conducting_body" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "e_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "e_stage" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "e_sections" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "e_navigation" CASCADE;
  DROP TABLE "e_stage" CASCADE;
  DROP TABLE "e_sections" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_navigation_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_stage_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_sections_fk";
  
  DROP INDEX "courses_name_idx";
  DROP INDEX "payload_locked_documents_rels_e_navigation_id_idx";
  DROP INDEX "payload_locked_documents_rels_e_stage_id_idx";
  DROP INDEX "payload_locked_documents_rels_e_sections_id_idx";
  ALTER TABLE "courses" ALTER COLUMN "exam_id" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "short_name" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "logo_url" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "exam_type" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "exam_frequency" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "evaluation_type" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "upcoming_exam" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "rating" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "price" SET NOT NULL;
  ALTER TABLE "courses_locales" ADD CONSTRAINT "courses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "courses_name_idx" ON "courses_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "courses_locales_locale_parent_id_unique" ON "courses_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "courses" DROP COLUMN "name";
  ALTER TABLE "courses" DROP COLUMN "state";
  ALTER TABLE "courses" DROP COLUMN "conducting_body";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_navigation_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_stage_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_sections_id";`)
}
