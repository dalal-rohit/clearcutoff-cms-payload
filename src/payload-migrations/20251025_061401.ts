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
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "e_instance_id" integer;
  CREATE INDEX "e_instance_updated_at_idx" ON "e_instance" USING btree ("updated_at");
  CREATE INDEX "e_instance_created_at_idx" ON "e_instance" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_instance_fk" FOREIGN KEY ("e_instance_id") REFERENCES "public"."e_instance"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_e_instance_id_idx" ON "payload_locked_documents_rels" USING btree ("e_instance_id");
  ALTER TABLE "pages" DROP COLUMN "seo_title";
  ALTER TABLE "pages" DROP COLUMN "seo_description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "e_instance" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "e_instance" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_e_instance_fk";
  
  DROP INDEX "payload_locked_documents_rels_e_instance_id_idx";
  ALTER TABLE "pages" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "e_instance_id";`)
}
