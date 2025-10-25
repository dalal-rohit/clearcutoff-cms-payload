import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses" ALTER COLUMN "status" SET DATA TYPE varchar;
  ALTER TABLE "courses" ALTER COLUMN "status" DROP DEFAULT;
  ALTER TABLE "courses" ALTER COLUMN "price" SET DATA TYPE varchar;
  ALTER TABLE "courses" ALTER COLUMN "combo_price" SET DATA TYPE varchar;
  ALTER TABLE "e_navigation" ADD COLUMN "ent_id" varchar;
  DROP TYPE "public"."enum_courses_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_courses_status" AS ENUM('active', 'inactive', 'archived');
  ALTER TABLE "courses" ALTER COLUMN "status" SET DEFAULT 'active'::"public"."enum_courses_status";
  ALTER TABLE "courses" ALTER COLUMN "status" SET DATA TYPE "public"."enum_courses_status" USING "status"::"public"."enum_courses_status";
  ALTER TABLE "courses" ALTER COLUMN "price" SET DATA TYPE numeric;
  ALTER TABLE "courses" ALTER COLUMN "combo_price" SET DATA TYPE numeric;
  ALTER TABLE "e_navigation" DROP COLUMN "ent_id";`)
}
