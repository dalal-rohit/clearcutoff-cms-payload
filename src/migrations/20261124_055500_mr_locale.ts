import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."_locales" ADD VALUE 'mr';
  ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE 'mr';
  ALTER TYPE "public"."enum__comparisons_v_published_locale" ADD VALUE 'mr';
  ALTER TYPE "public"."enum__alternatives_v_published_locale" ADD VALUE 'mr';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "posts_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "comparisons_comparison_points_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "comparisons_feature_table_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "comparisons_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_comparisons_v_version_comparison_points_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_comparisons_v_version_feature_table_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_comparisons_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "alternatives_tools_features_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "alternatives_tools_pros_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "alternatives_tools_cons_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "alternatives_tools_limitations_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "alternatives_tools_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "alternatives_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_alternatives_v_version_tools_features_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_alternatives_v_version_tools_pros_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_alternatives_v_version_tools_cons_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_alternatives_v_version_tools_limitations_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_alternatives_v_version_tools_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_alternatives_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "site_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_nav_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_nav_items_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "seo_defaults_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "marketing_proof_stats_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "marketing_proof_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "faq_categories_questions_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "faq_categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('en', 'hi');
  ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "posts_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "comparisons_comparison_points_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "comparisons_feature_table_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "comparisons_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_comparisons_v_version_comparison_points_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_comparisons_v_version_feature_table_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_comparisons_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "alternatives_tools_features_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "alternatives_tools_pros_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "alternatives_tools_cons_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "alternatives_tools_limitations_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "alternatives_tools_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "alternatives_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_alternatives_v_version_tools_features_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_alternatives_v_version_tools_pros_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_alternatives_v_version_tools_cons_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_alternatives_v_version_tools_limitations_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_alternatives_v_version_tools_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_alternatives_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "site_settings_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_nav_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_nav_items_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "seo_defaults_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "marketing_proof_stats_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "marketing_proof_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "faq_categories_questions_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "faq_categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__posts_v_published_locale";
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'hi');
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__posts_v_published_locale" USING "published_locale"::"public"."enum__posts_v_published_locale";
  ALTER TABLE "_comparisons_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__comparisons_v_published_locale";
  CREATE TYPE "public"."enum__comparisons_v_published_locale" AS ENUM('en', 'hi');
  ALTER TABLE "_comparisons_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__comparisons_v_published_locale" USING "published_locale"::"public"."enum__comparisons_v_published_locale";
  ALTER TABLE "_alternatives_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__alternatives_v_published_locale";
  CREATE TYPE "public"."enum__alternatives_v_published_locale" AS ENUM('en', 'hi');
  ALTER TABLE "_alternatives_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__alternatives_v_published_locale" USING "published_locale"::"public"."enum__alternatives_v_published_locale";`)
}
