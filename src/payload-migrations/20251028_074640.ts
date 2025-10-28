import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "global_sections_how_it_works_how_it_works_locales" DROP CONSTRAINT IF EXISTS "global_sections_how_it_works_how_it_works_locales_parent_id_fk";
  
  ALTER TABLE "global_sections_comparison_table_highlight_locales" DROP CONSTRAINT IF EXISTS "global_sections_comparison_table_highlight_locales_parent_id_fk";
  
  ALTER TABLE "global_sections_comparison_table_comparison_locales" DROP CONSTRAINT IF EXISTS "global_sections_comparison_table_comparison_locales_parent_id_fk";
  
  ALTER TABLE "global_sections_comparison_table_coaching_center_locales" DROP CONSTRAINT IF EXISTS "global_sections_comparison_table_coaching_center_locales_parent_id_fk";
  
  ALTER TABLE "global_sections_comparison_table_clear_cutoff_locales" DROP CONSTRAINT IF EXISTS "global_sections_comparison_table_clear_cutoff_locales_parent_id_fk";
  
  DROP INDEX IF EXISTS "reviews_reviews_review_highlight_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_hero_highlight_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_course_hero_highlight_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_logo_carousel_logos_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_features_highlight_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_features_features_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_how_it_works_highlight_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_how_it_works_how_it_works_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_comparison_table_highlight_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_comparison_table_comparison_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_comparison_table_coaching_center_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "global_sections_comparison_table_clear_cutoff_locales_locale_parent_id_unique";
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT 'media';
  ALTER TABLE "global_sections_how_it_works_how_it_works_locales" ADD CONSTRAINT "global_sections_how_it_works_how_it_works_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_how_it_works_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_highlight_locales" ADD CONSTRAINT "global_sections_comparison_table_highlight_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_comparison_locales" ADD CONSTRAINT "global_sections_comparison_table_comparison_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_coaching_center_locales" ADD CONSTRAINT "global_sections_comparison_table_coaching_center_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_coaching_center"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_clear_cutoff_locales" ADD CONSTRAINT "global_sections_comparison_table_clear_cutoff_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_clear_cutoff"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "reviews_reviews_review_highlight_locales_locale_parent_id_un" ON "reviews_reviews_review_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_hero_highlight_locales_locale_parent_id_uniq" ON "global_sections_hero_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_course_hero_highlight_locales_locale_parent_" ON "global_sections_course_hero_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_logo_carousel_logos_locales_locale_parent_id" ON "global_sections_logo_carousel_logos_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_features_highlight_locales_locale_parent_id_" ON "global_sections_features_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_features_features_locales_locale_parent_id_u" ON "global_sections_features_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_how_it_works_highlight_locales_locale_parent" ON "global_sections_how_it_works_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_how_it_works_how_it_works_locales_locale_par" ON "global_sections_how_it_works_how_it_works_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_highlight_locales_locale_pa" ON "global_sections_comparison_table_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_comparison_locales_locale_p" ON "global_sections_comparison_table_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_coaching_center_locales_loc" ON "global_sections_comparison_table_coaching_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_clear_cutoff_locales_locale" ON "global_sections_comparison_table_clear_cutoff_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "global_sections_how_it_works_how_it_works_locales" DROP CONSTRAINT "global_sections_how_it_works_how_it_works_locales_parent__fk";
  
  ALTER TABLE "global_sections_comparison_table_highlight_locales" DROP CONSTRAINT "global_sections_comparison_table_highlight_locales_parent_fk";
  
  ALTER TABLE "global_sections_comparison_table_comparison_locales" DROP CONSTRAINT "global_sections_comparison_table_comparison_locales_paren_fk";
  
  ALTER TABLE "global_sections_comparison_table_coaching_center_locales" DROP CONSTRAINT "global_sections_comparison_table_coaching_center_locales__fk";
  
  ALTER TABLE "global_sections_comparison_table_clear_cutoff_locales" DROP CONSTRAINT "global_sections_comparison_table_clear_cutoff_locales_par_fk";
  
  DROP INDEX "reviews_reviews_review_highlight_locales_locale_parent_id_un";
  DROP INDEX "global_sections_hero_highlight_locales_locale_parent_id_uniq";
  DROP INDEX "global_sections_course_hero_highlight_locales_locale_parent_";
  DROP INDEX "global_sections_logo_carousel_logos_locales_locale_parent_id";
  DROP INDEX "global_sections_features_highlight_locales_locale_parent_id_";
  DROP INDEX "global_sections_features_features_locales_locale_parent_id_u";
  DROP INDEX "global_sections_how_it_works_highlight_locales_locale_parent";
  DROP INDEX "global_sections_how_it_works_how_it_works_locales_locale_par";
  DROP INDEX "global_sections_comparison_table_highlight_locales_locale_pa";
  DROP INDEX "global_sections_comparison_table_comparison_locales_locale_p";
  DROP INDEX "global_sections_comparison_table_coaching_center_locales_loc";
  DROP INDEX "global_sections_comparison_table_clear_cutoff_locales_locale";
  ALTER TABLE "global_sections_how_it_works_how_it_works_locales" ADD CONSTRAINT "global_sections_how_it_works_how_it_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_how_it_works_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_highlight_locales" ADD CONSTRAINT "global_sections_comparison_table_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_comparison_locales" ADD CONSTRAINT "global_sections_comparison_table_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_coaching_center_locales" ADD CONSTRAINT "global_sections_comparison_table_coaching_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_coaching_center"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_clear_cutoff_locales" ADD CONSTRAINT "global_sections_comparison_table_clear_cutoff_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_clear_cutoff"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "reviews_reviews_review_highlight_locales_locale_parent_id_unique" ON "reviews_reviews_review_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_hero_highlight_locales_locale_parent_id_unique" ON "global_sections_hero_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_course_hero_highlight_locales_locale_parent_id_unique" ON "global_sections_course_hero_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_logo_carousel_logos_locales_locale_parent_id_unique" ON "global_sections_logo_carousel_logos_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_features_highlight_locales_locale_parent_id_unique" ON "global_sections_features_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_features_features_locales_locale_parent_id_unique" ON "global_sections_features_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_how_it_works_highlight_locales_locale_parent_id_unique" ON "global_sections_how_it_works_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_how_it_works_how_it_works_locales_locale_parent_id_unique" ON "global_sections_how_it_works_how_it_works_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_highlight_locales_locale_parent_id_unique" ON "global_sections_comparison_table_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_comparison_locales_locale_parent_id_unique" ON "global_sections_comparison_table_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_coaching_center_locales_locale_parent_id_unique" ON "global_sections_comparison_table_coaching_center_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_clear_cutoff_locales_locale_parent_id_unique" ON "global_sections_comparison_table_clear_cutoff_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "media" DROP COLUMN "prefix";`)
}
