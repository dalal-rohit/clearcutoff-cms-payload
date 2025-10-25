import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create questions table if not exists
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "questions" (
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
    );`)

  // Add rels column if missing
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'questions_id'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "questions_id" integer;
      END IF;
    END $$;`)

  // Create indexes if not exists
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "questions_updated_at_idx" ON "questions" USING btree ("updated_at");`)
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "questions_created_at_idx" ON "questions" USING btree ("created_at");`)

  // Add FK if not exists
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'payload_locked_documents_rels_questions_fk'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_questions_fk" FOREIGN KEY ("questions_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;`)

  // Index on rels questions_id
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_questions_id_idx" ON "payload_locked_documents_rels" USING btree ("questions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Drop FK if exists
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_questions_fk";`)
  // Drop index if exists
  await db.execute(sql`DROP INDEX IF EXISTS "payload_locked_documents_rels_questions_id_idx";`)
  // Drop column if exists
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "questions_id";`)
  // Drop table if exists
  await db.execute(sql`ALTER TABLE "questions" DISABLE ROW LEVEL SECURITY;`)
  await db.execute(sql`DROP TABLE IF EXISTS "questions" CASCADE;`)
}
