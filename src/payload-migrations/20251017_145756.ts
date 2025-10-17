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
  	"correct_option" numeric,
  	"explanation" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "questions_id" integer;
  CREATE INDEX "questions_updated_at_idx" ON "questions" USING btree ("updated_at");
  CREATE INDEX "questions_created_at_idx" ON "questions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_questions_fk" FOREIGN KEY ("questions_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_questions_id_idx" ON "payload_locked_documents_rels" USING btree ("questions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "questions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "questions" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_questions_fk";
  
  DROP INDEX "payload_locked_documents_rels_questions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "questions_id";`)
}
