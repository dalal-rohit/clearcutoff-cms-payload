import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_alternatives_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__alternatives_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__alternatives_v_published_locale" AS ENUM('en', 'hi');
  CREATE TABLE "alternatives_tools_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "alternatives_tools_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "alternatives_tools_pros" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "alternatives_tools_pros_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "alternatives_tools_cons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "alternatives_tools_cons_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "alternatives_tools_limitations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "alternatives_tools_limitations_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "alternatives_tools_pricing_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"plan_name" varchar,
  	"price" varchar
  );
  
  CREATE TABLE "alternatives_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"rating_g2_score" varchar,
  	"rating_g2_review_count" varchar,
  	"rating_capterra_score" varchar,
  	"rating_capterra_review_count" varchar,
  	"testimonial_author_name" varchar,
  	"testimonial_author_role" varchar,
  	"testimonial_author_company" varchar
  );
  
  CREATE TABLE "alternatives_tools_locales" (
  	"best_for" varchar,
  	"standout_feature" varchar,
  	"description" varchar,
  	"pricing_summary" varchar,
  	"testimonial_quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "alternatives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"competitor_name" varchar,
  	"competitor_logo_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"hero_cta_url" varchar,
  	"introbody_html" varchar,
  	"mid_cta_cta_url" varchar,
  	"promise_cta_url" varchar,
  	"published_date" timestamp(3) with time zone,
  	"meta_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_alternatives_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "alternatives_locales" (
  	"hero_eyebrow" varchar DEFAULT 'Alternatives',
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"hero_cta_label" varchar DEFAULT 'Try for Free',
  	"intro_body" jsonb,
  	"summary_table_title" varchar,
  	"mid_cta_title" varchar,
  	"mid_cta_description" varchar,
  	"mid_cta_cta_label" varchar DEFAULT 'Try for Free',
  	"promise_title" varchar,
  	"promise_body" varchar,
  	"promise_cta_label" varchar DEFAULT 'Try for Free',
  	"meta_meta_title" varchar,
  	"meta_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "alternatives_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"alternatives_id" integer
  );
  
  CREATE TABLE "_alternatives_v_version_tools_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_alternatives_v_version_tools_features_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_alternatives_v_version_tools_pros" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_alternatives_v_version_tools_pros_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_alternatives_v_version_tools_cons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_alternatives_v_version_tools_cons_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_alternatives_v_version_tools_limitations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_alternatives_v_version_tools_limitations_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_alternatives_v_version_tools_pricing_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"plan_name" varchar,
  	"price" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_alternatives_v_version_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"rating_g2_score" varchar,
  	"rating_g2_review_count" varchar,
  	"rating_capterra_score" varchar,
  	"rating_capterra_review_count" varchar,
  	"testimonial_author_name" varchar,
  	"testimonial_author_role" varchar,
  	"testimonial_author_company" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_alternatives_v_version_tools_locales" (
  	"best_for" varchar,
  	"standout_feature" varchar,
  	"description" varchar,
  	"pricing_summary" varchar,
  	"testimonial_quote" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_alternatives_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_competitor_name" varchar,
  	"version_competitor_logo_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_hero_cta_url" varchar,
  	"version_introbody_html" varchar,
  	"version_mid_cta_cta_url" varchar,
  	"version_promise_cta_url" varchar,
  	"version_published_date" timestamp(3) with time zone,
  	"version_meta_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__alternatives_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__alternatives_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_alternatives_v_locales" (
  	"version_hero_eyebrow" varchar DEFAULT 'Alternatives',
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_hero_cta_label" varchar DEFAULT 'Try for Free',
  	"version_intro_body" jsonb,
  	"version_summary_table_title" varchar,
  	"version_mid_cta_title" varchar,
  	"version_mid_cta_description" varchar,
  	"version_mid_cta_cta_label" varchar DEFAULT 'Try for Free',
  	"version_promise_title" varchar,
  	"version_promise_body" varchar,
  	"version_promise_cta_label" varchar DEFAULT 'Try for Free',
  	"version_meta_meta_title" varchar,
  	"version_meta_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_alternatives_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"alternatives_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "alternatives_id" integer;
  ALTER TABLE "alternatives_tools_features" ADD CONSTRAINT "alternatives_tools_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_tools_features_locales" ADD CONSTRAINT "alternatives_tools_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives_tools_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_tools_pros" ADD CONSTRAINT "alternatives_tools_pros_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_tools_pros_locales" ADD CONSTRAINT "alternatives_tools_pros_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives_tools_pros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_tools_cons" ADD CONSTRAINT "alternatives_tools_cons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_tools_cons_locales" ADD CONSTRAINT "alternatives_tools_cons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives_tools_cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_tools_limitations" ADD CONSTRAINT "alternatives_tools_limitations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_tools_limitations_locales" ADD CONSTRAINT "alternatives_tools_limitations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives_tools_limitations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_tools_pricing_tiers" ADD CONSTRAINT "alternatives_tools_pricing_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_tools" ADD CONSTRAINT "alternatives_tools_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "alternatives_tools" ADD CONSTRAINT "alternatives_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_tools_locales" ADD CONSTRAINT "alternatives_tools_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives" ADD CONSTRAINT "alternatives_competitor_logo_id_media_id_fk" FOREIGN KEY ("competitor_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "alternatives" ADD CONSTRAINT "alternatives_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "alternatives_locales" ADD CONSTRAINT "alternatives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."alternatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_rels" ADD CONSTRAINT "alternatives_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."alternatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "alternatives_rels" ADD CONSTRAINT "alternatives_rels_alternatives_fk" FOREIGN KEY ("alternatives_id") REFERENCES "public"."alternatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools_features" ADD CONSTRAINT "_alternatives_v_version_tools_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v_version_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools_features_locales" ADD CONSTRAINT "_alternatives_v_version_tools_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v_version_tools_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools_pros" ADD CONSTRAINT "_alternatives_v_version_tools_pros_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v_version_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools_pros_locales" ADD CONSTRAINT "_alternatives_v_version_tools_pros_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v_version_tools_pros"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools_cons" ADD CONSTRAINT "_alternatives_v_version_tools_cons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v_version_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools_cons_locales" ADD CONSTRAINT "_alternatives_v_version_tools_cons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v_version_tools_cons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools_limitations" ADD CONSTRAINT "_alternatives_v_version_tools_limitations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v_version_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools_limitations_locales" ADD CONSTRAINT "_alternatives_v_version_tools_limitations_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v_version_tools_limitations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools_pricing_tiers" ADD CONSTRAINT "_alternatives_v_version_tools_pricing_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v_version_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools" ADD CONSTRAINT "_alternatives_v_version_tools_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools" ADD CONSTRAINT "_alternatives_v_version_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_version_tools_locales" ADD CONSTRAINT "_alternatives_v_version_tools_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v_version_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v" ADD CONSTRAINT "_alternatives_v_parent_id_alternatives_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."alternatives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_alternatives_v" ADD CONSTRAINT "_alternatives_v_version_competitor_logo_id_media_id_fk" FOREIGN KEY ("version_competitor_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_alternatives_v" ADD CONSTRAINT "_alternatives_v_version_meta_og_image_id_media_id_fk" FOREIGN KEY ("version_meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_alternatives_v_locales" ADD CONSTRAINT "_alternatives_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_alternatives_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_rels" ADD CONSTRAINT "_alternatives_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_alternatives_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_alternatives_v_rels" ADD CONSTRAINT "_alternatives_v_rels_alternatives_fk" FOREIGN KEY ("alternatives_id") REFERENCES "public"."alternatives"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "alternatives_tools_features_order_idx" ON "alternatives_tools_features" USING btree ("_order");
  CREATE INDEX "alternatives_tools_features_parent_id_idx" ON "alternatives_tools_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "alternatives_tools_features_locales_locale_parent_id_unique" ON "alternatives_tools_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "alternatives_tools_pros_order_idx" ON "alternatives_tools_pros" USING btree ("_order");
  CREATE INDEX "alternatives_tools_pros_parent_id_idx" ON "alternatives_tools_pros" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "alternatives_tools_pros_locales_locale_parent_id_unique" ON "alternatives_tools_pros_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "alternatives_tools_cons_order_idx" ON "alternatives_tools_cons" USING btree ("_order");
  CREATE INDEX "alternatives_tools_cons_parent_id_idx" ON "alternatives_tools_cons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "alternatives_tools_cons_locales_locale_parent_id_unique" ON "alternatives_tools_cons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "alternatives_tools_limitations_order_idx" ON "alternatives_tools_limitations" USING btree ("_order");
  CREATE INDEX "alternatives_tools_limitations_parent_id_idx" ON "alternatives_tools_limitations" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "alternatives_tools_limitations_locales_locale_parent_id_uniq" ON "alternatives_tools_limitations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "alternatives_tools_pricing_tiers_order_idx" ON "alternatives_tools_pricing_tiers" USING btree ("_order");
  CREATE INDEX "alternatives_tools_pricing_tiers_parent_id_idx" ON "alternatives_tools_pricing_tiers" USING btree ("_parent_id");
  CREATE INDEX "alternatives_tools_order_idx" ON "alternatives_tools" USING btree ("_order");
  CREATE INDEX "alternatives_tools_parent_id_idx" ON "alternatives_tools" USING btree ("_parent_id");
  CREATE INDEX "alternatives_tools_logo_idx" ON "alternatives_tools" USING btree ("logo_id");
  CREATE UNIQUE INDEX "alternatives_tools_locales_locale_parent_id_unique" ON "alternatives_tools_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "alternatives_competitor_logo_idx" ON "alternatives" USING btree ("competitor_logo_id");
  CREATE UNIQUE INDEX "alternatives_slug_idx" ON "alternatives" USING btree ("slug");
  CREATE INDEX "alternatives_meta_meta_og_image_idx" ON "alternatives" USING btree ("meta_og_image_id");
  CREATE INDEX "alternatives_updated_at_idx" ON "alternatives" USING btree ("updated_at");
  CREATE INDEX "alternatives_created_at_idx" ON "alternatives" USING btree ("created_at");
  CREATE INDEX "alternatives__status_idx" ON "alternatives" USING btree ("_status");
  CREATE UNIQUE INDEX "alternatives_locales_locale_parent_id_unique" ON "alternatives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "alternatives_rels_order_idx" ON "alternatives_rels" USING btree ("order");
  CREATE INDEX "alternatives_rels_parent_idx" ON "alternatives_rels" USING btree ("parent_id");
  CREATE INDEX "alternatives_rels_path_idx" ON "alternatives_rels" USING btree ("path");
  CREATE INDEX "alternatives_rels_alternatives_id_idx" ON "alternatives_rels" USING btree ("alternatives_id");
  CREATE INDEX "_alternatives_v_version_tools_features_order_idx" ON "_alternatives_v_version_tools_features" USING btree ("_order");
  CREATE INDEX "_alternatives_v_version_tools_features_parent_id_idx" ON "_alternatives_v_version_tools_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_alternatives_v_version_tools_features_locales_locale_parent" ON "_alternatives_v_version_tools_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_alternatives_v_version_tools_pros_order_idx" ON "_alternatives_v_version_tools_pros" USING btree ("_order");
  CREATE INDEX "_alternatives_v_version_tools_pros_parent_id_idx" ON "_alternatives_v_version_tools_pros" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_alternatives_v_version_tools_pros_locales_locale_parent_id_" ON "_alternatives_v_version_tools_pros_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_alternatives_v_version_tools_cons_order_idx" ON "_alternatives_v_version_tools_cons" USING btree ("_order");
  CREATE INDEX "_alternatives_v_version_tools_cons_parent_id_idx" ON "_alternatives_v_version_tools_cons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_alternatives_v_version_tools_cons_locales_locale_parent_id_" ON "_alternatives_v_version_tools_cons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_alternatives_v_version_tools_limitations_order_idx" ON "_alternatives_v_version_tools_limitations" USING btree ("_order");
  CREATE INDEX "_alternatives_v_version_tools_limitations_parent_id_idx" ON "_alternatives_v_version_tools_limitations" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_alternatives_v_version_tools_limitations_locales_locale_par" ON "_alternatives_v_version_tools_limitations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_alternatives_v_version_tools_pricing_tiers_order_idx" ON "_alternatives_v_version_tools_pricing_tiers" USING btree ("_order");
  CREATE INDEX "_alternatives_v_version_tools_pricing_tiers_parent_id_idx" ON "_alternatives_v_version_tools_pricing_tiers" USING btree ("_parent_id");
  CREATE INDEX "_alternatives_v_version_tools_order_idx" ON "_alternatives_v_version_tools" USING btree ("_order");
  CREATE INDEX "_alternatives_v_version_tools_parent_id_idx" ON "_alternatives_v_version_tools" USING btree ("_parent_id");
  CREATE INDEX "_alternatives_v_version_tools_logo_idx" ON "_alternatives_v_version_tools" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_alternatives_v_version_tools_locales_locale_parent_id_uniqu" ON "_alternatives_v_version_tools_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_alternatives_v_parent_idx" ON "_alternatives_v" USING btree ("parent_id");
  CREATE INDEX "_alternatives_v_version_version_competitor_logo_idx" ON "_alternatives_v" USING btree ("version_competitor_logo_id");
  CREATE INDEX "_alternatives_v_version_version_slug_idx" ON "_alternatives_v" USING btree ("version_slug");
  CREATE INDEX "_alternatives_v_version_meta_version_meta_og_image_idx" ON "_alternatives_v" USING btree ("version_meta_og_image_id");
  CREATE INDEX "_alternatives_v_version_version_updated_at_idx" ON "_alternatives_v" USING btree ("version_updated_at");
  CREATE INDEX "_alternatives_v_version_version_created_at_idx" ON "_alternatives_v" USING btree ("version_created_at");
  CREATE INDEX "_alternatives_v_version_version__status_idx" ON "_alternatives_v" USING btree ("version__status");
  CREATE INDEX "_alternatives_v_created_at_idx" ON "_alternatives_v" USING btree ("created_at");
  CREATE INDEX "_alternatives_v_updated_at_idx" ON "_alternatives_v" USING btree ("updated_at");
  CREATE INDEX "_alternatives_v_snapshot_idx" ON "_alternatives_v" USING btree ("snapshot");
  CREATE INDEX "_alternatives_v_published_locale_idx" ON "_alternatives_v" USING btree ("published_locale");
  CREATE INDEX "_alternatives_v_latest_idx" ON "_alternatives_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_alternatives_v_locales_locale_parent_id_unique" ON "_alternatives_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_alternatives_v_rels_order_idx" ON "_alternatives_v_rels" USING btree ("order");
  CREATE INDEX "_alternatives_v_rels_parent_idx" ON "_alternatives_v_rels" USING btree ("parent_id");
  CREATE INDEX "_alternatives_v_rels_path_idx" ON "_alternatives_v_rels" USING btree ("path");
  CREATE INDEX "_alternatives_v_rels_alternatives_id_idx" ON "_alternatives_v_rels" USING btree ("alternatives_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_alternatives_fk" FOREIGN KEY ("alternatives_id") REFERENCES "public"."alternatives"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_alternatives_id_idx" ON "payload_locked_documents_rels" USING btree ("alternatives_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "alternatives_tools_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_tools_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_tools_pros" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_tools_pros_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_tools_cons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_tools_cons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_tools_limitations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_tools_limitations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_tools_pricing_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_tools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_tools_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "alternatives_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools_pros" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools_pros_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools_cons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools_cons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools_limitations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools_limitations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools_pricing_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_version_tools_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_alternatives_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "alternatives_tools_features" CASCADE;
  DROP TABLE "alternatives_tools_features_locales" CASCADE;
  DROP TABLE "alternatives_tools_pros" CASCADE;
  DROP TABLE "alternatives_tools_pros_locales" CASCADE;
  DROP TABLE "alternatives_tools_cons" CASCADE;
  DROP TABLE "alternatives_tools_cons_locales" CASCADE;
  DROP TABLE "alternatives_tools_limitations" CASCADE;
  DROP TABLE "alternatives_tools_limitations_locales" CASCADE;
  DROP TABLE "alternatives_tools_pricing_tiers" CASCADE;
  DROP TABLE "alternatives_tools" CASCADE;
  DROP TABLE "alternatives_tools_locales" CASCADE;
  DROP TABLE "alternatives" CASCADE;
  DROP TABLE "alternatives_locales" CASCADE;
  DROP TABLE "alternatives_rels" CASCADE;
  DROP TABLE "_alternatives_v_version_tools_features" CASCADE;
  DROP TABLE "_alternatives_v_version_tools_features_locales" CASCADE;
  DROP TABLE "_alternatives_v_version_tools_pros" CASCADE;
  DROP TABLE "_alternatives_v_version_tools_pros_locales" CASCADE;
  DROP TABLE "_alternatives_v_version_tools_cons" CASCADE;
  DROP TABLE "_alternatives_v_version_tools_cons_locales" CASCADE;
  DROP TABLE "_alternatives_v_version_tools_limitations" CASCADE;
  DROP TABLE "_alternatives_v_version_tools_limitations_locales" CASCADE;
  DROP TABLE "_alternatives_v_version_tools_pricing_tiers" CASCADE;
  DROP TABLE "_alternatives_v_version_tools" CASCADE;
  DROP TABLE "_alternatives_v_version_tools_locales" CASCADE;
  DROP TABLE "_alternatives_v" CASCADE;
  DROP TABLE "_alternatives_v_locales" CASCADE;
  DROP TABLE "_alternatives_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_alternatives_fk";
  
  DROP INDEX "payload_locked_documents_rels_alternatives_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "alternatives_id";
  DROP TYPE "public"."enum_alternatives_status";
  DROP TYPE "public"."enum__alternatives_v_version_status";
  DROP TYPE "public"."enum__alternatives_v_published_locale";`)
}
