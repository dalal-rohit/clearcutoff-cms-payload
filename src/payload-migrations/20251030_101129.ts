import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "exams_name_idx";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE UNIQUE INDEX IF NOT EXISTS "exams_name_idx" ON "exams" USING btree ("name");`)
}
