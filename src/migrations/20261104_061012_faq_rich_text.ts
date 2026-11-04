import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "faq_categories_questions_locales" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "faq_categories_questions_locales" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "faq_categories_questions" ADD COLUMN "question_html" varchar;
  ALTER TABLE "faq_categories_questions" ADD COLUMN "answer_html" varchar;
  ALTER TABLE "faq_categories_questions_locales" ADD COLUMN "question_rich" jsonb;
  ALTER TABLE "faq_categories_questions_locales" ADD COLUMN "answer_rich" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "faq_categories_questions_locales" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "faq_categories_questions_locales" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "faq_categories_questions" DROP COLUMN "question_html";
  ALTER TABLE "faq_categories_questions" DROP COLUMN "answer_html";
  ALTER TABLE "faq_categories_questions_locales" DROP COLUMN "question_rich";
  ALTER TABLE "faq_categories_questions_locales" DROP COLUMN "answer_rich";`)
}
