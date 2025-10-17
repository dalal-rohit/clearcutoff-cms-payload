import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "questions_locales" ADD CONSTRAINT "questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "questions_locales_locale_parent_id_unique" ON "questions_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "questions" DROP COLUMN "question_text";
  ALTER TABLE "questions" DROP COLUMN "option_1_text";
  ALTER TABLE "questions" DROP COLUMN "option_2_text";
  ALTER TABLE "questions" DROP COLUMN "option_3_text";
  ALTER TABLE "questions" DROP COLUMN "option_4_text";
  ALTER TABLE "questions" DROP COLUMN "explanation";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "questions_locales" CASCADE;
  ALTER TABLE "questions" ADD COLUMN "question_text" varchar;
  ALTER TABLE "questions" ADD COLUMN "option_1_text" varchar;
  ALTER TABLE "questions" ADD COLUMN "option_2_text" varchar;
  ALTER TABLE "questions" ADD COLUMN "option_3_text" varchar;
  ALTER TABLE "questions" ADD COLUMN "option_4_text" varchar;
  ALTER TABLE "questions" ADD COLUMN "explanation" numeric;`)
}
