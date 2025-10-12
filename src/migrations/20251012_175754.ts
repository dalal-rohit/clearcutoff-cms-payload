import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "global_sections" DROP CONSTRAINT "global_sections_landing_hero_background_image_id_media_id_fk";
  
  DROP INDEX "global_sections_landing_hero_landing_hero_background_ima_idx";
  ALTER TABLE "global_sections" ADD COLUMN "hero_enabled" boolean DEFAULT true;
  ALTER TABLE "global_sections" ADD COLUMN "hero_heading" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "hero_subheading" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "hero_cta_text" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "hero_cta_link" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "hero_background_image_id" integer;
  ALTER TABLE "global_sections" ADD CONSTRAINT "global_sections_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "global_sections_hero_hero_background_image_idx" ON "global_sections" USING btree ("hero_background_image_id");
  ALTER TABLE "global_sections" DROP COLUMN "landing_hero_eyebrow";
  ALTER TABLE "global_sections" DROP COLUMN "landing_hero_heading";
  ALTER TABLE "global_sections" DROP COLUMN "landing_hero_subheading";
  ALTER TABLE "global_sections" DROP COLUMN "landing_hero_cta_text";
  ALTER TABLE "global_sections" DROP COLUMN "landing_hero_cta_link";
  ALTER TABLE "global_sections" DROP COLUMN "landing_hero_background_image_id";
  ALTER TABLE "global_sections" DROP COLUMN "course_hero_eyebrow";
  ALTER TABLE "global_sections" DROP COLUMN "course_hero_heading";
  ALTER TABLE "global_sections" DROP COLUMN "course_hero_subheading";
  ALTER TABLE "global_sections" DROP COLUMN "course_hero_cta_text";
  ALTER TABLE "global_sections" DROP COLUMN "course_hero_cta_link";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "global_sections" DROP CONSTRAINT "global_sections_hero_background_image_id_media_id_fk";
  
  DROP INDEX "global_sections_hero_hero_background_image_idx";
  ALTER TABLE "global_sections" ADD COLUMN "landing_hero_eyebrow" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "landing_hero_heading" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "landing_hero_subheading" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "landing_hero_cta_text" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "landing_hero_cta_link" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "landing_hero_background_image_id" integer;
  ALTER TABLE "global_sections" ADD COLUMN "course_hero_eyebrow" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "course_hero_heading" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "course_hero_subheading" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "course_hero_cta_text" varchar;
  ALTER TABLE "global_sections" ADD COLUMN "course_hero_cta_link" varchar;
  ALTER TABLE "global_sections" ADD CONSTRAINT "global_sections_landing_hero_background_image_id_media_id_fk" FOREIGN KEY ("landing_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "global_sections_landing_hero_landing_hero_background_ima_idx" ON "global_sections" USING btree ("landing_hero_background_image_id");
  ALTER TABLE "global_sections" DROP COLUMN "hero_enabled";
  ALTER TABLE "global_sections" DROP COLUMN "hero_heading";
  ALTER TABLE "global_sections" DROP COLUMN "hero_subheading";
  ALTER TABLE "global_sections" DROP COLUMN "hero_cta_text";
  ALTER TABLE "global_sections" DROP COLUMN "hero_cta_link";
  ALTER TABLE "global_sections" DROP COLUMN "hero_background_image_id";`)
}
