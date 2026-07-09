import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_comparisons_feature_table_your_status" AS ENUM('yes', 'warning', 'no');
  CREATE TYPE "public"."enum_comparisons_feature_table_their_status" AS ENUM('yes', 'warning', 'no');
  CREATE TYPE "public"."enum_comparisons_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__comparisons_v_version_feature_table_your_status" AS ENUM('yes', 'warning', 'no');
  CREATE TYPE "public"."enum__comparisons_v_version_feature_table_their_status" AS ENUM('yes', 'warning', 'no');
  CREATE TYPE "public"."enum__comparisons_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__comparisons_v_published_locale" AS ENUM('en', 'hi');
  CREATE TABLE "comparisons_comparison_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "comparisons_comparison_points_locales" (
  	"title" varchar,
  	"your_text" varchar,
  	"their_text" varchar,
  	"impact_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "comparisons_feature_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"your_status" "enum_comparisons_feature_table_your_status" DEFAULT 'yes',
  	"their_status" "enum_comparisons_feature_table_their_status" DEFAULT 'no'
  );
  
  CREATE TABLE "comparisons_feature_table_locales" (
  	"feature" varchar,
  	"your_text" varchar,
  	"their_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "comparisons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"competitor_name" varchar,
  	"competitor_logo_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"hero_cta_url" varchar,
  	"mid_cta_cta_url" varchar,
  	"promise_cta_url" varchar,
  	"meta_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_comparisons_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "comparisons_locales" (
  	"hero_eyebrow" varchar DEFAULT 'Compare',
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"hero_cta_label" varchar DEFAULT 'Start free trial',
  	"comparison_section_title" varchar,
  	"mid_cta_title" varchar,
  	"mid_cta_description" varchar,
  	"mid_cta_cta_label" varchar DEFAULT 'Book a Demo',
  	"promise_title" varchar,
  	"promise_body" varchar,
  	"promise_cta_label" varchar DEFAULT 'Book a Demo',
  	"meta_meta_title" varchar,
  	"meta_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_comparisons_v_version_comparison_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comparisons_v_version_comparison_points_locales" (
  	"title" varchar,
  	"your_text" varchar,
  	"their_text" varchar,
  	"impact_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_comparisons_v_version_feature_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"your_status" "enum__comparisons_v_version_feature_table_your_status" DEFAULT 'yes',
  	"their_status" "enum__comparisons_v_version_feature_table_their_status" DEFAULT 'no',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_comparisons_v_version_feature_table_locales" (
  	"feature" varchar,
  	"your_text" varchar,
  	"their_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_comparisons_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_competitor_name" varchar,
  	"version_competitor_logo_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_hero_cta_url" varchar,
  	"version_mid_cta_cta_url" varchar,
  	"version_promise_cta_url" varchar,
  	"version_meta_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__comparisons_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__comparisons_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_comparisons_v_locales" (
  	"version_hero_eyebrow" varchar DEFAULT 'Compare',
  	"version_hero_title" varchar,
  	"version_hero_description" varchar,
  	"version_hero_cta_label" varchar DEFAULT 'Start free trial',
  	"version_comparison_section_title" varchar,
  	"version_mid_cta_title" varchar,
  	"version_mid_cta_description" varchar,
  	"version_mid_cta_cta_label" varchar DEFAULT 'Book a Demo',
  	"version_promise_title" varchar,
  	"version_promise_body" varchar,
  	"version_promise_cta_label" varchar DEFAULT 'Book a Demo',
  	"version_meta_meta_title" varchar,
  	"version_meta_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "marketing_proof_trusted_by_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL
  );
  
  CREATE TABLE "marketing_proof_integrations_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL
  );
  
  CREATE TABLE "marketing_proof_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_proof_stats_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "marketing_proof" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"integrations_link_url" varchar,
  	"final_cta_cta_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "marketing_proof_locales" (
  	"trusted_by_label" varchar DEFAULT 'Trusted by 10,000+ businesses',
  	"integrations_title" varchar DEFAULT 'Connect everything you already use',
  	"integrations_description" varchar,
  	"integrations_link_label" varchar DEFAULT 'View all Integrations',
  	"final_cta_title" varchar DEFAULT 'Turn connections into conversions',
  	"final_cta_description" varchar,
  	"final_cta_cta_label" varchar DEFAULT 'Sign up for a free trial now',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "comparisons_id" integer;
  ALTER TABLE "comparisons_comparison_points" ADD CONSTRAINT "comparisons_comparison_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comparisons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comparisons_comparison_points_locales" ADD CONSTRAINT "comparisons_comparison_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comparisons_comparison_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comparisons_feature_table" ADD CONSTRAINT "comparisons_feature_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comparisons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comparisons_feature_table_locales" ADD CONSTRAINT "comparisons_feature_table_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comparisons_feature_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_competitor_logo_id_media_id_fk" FOREIGN KEY ("competitor_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "comparisons" ADD CONSTRAINT "comparisons_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "comparisons_locales" ADD CONSTRAINT "comparisons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comparisons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comparisons_v_version_comparison_points" ADD CONSTRAINT "_comparisons_v_version_comparison_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comparisons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comparisons_v_version_comparison_points_locales" ADD CONSTRAINT "_comparisons_v_version_comparison_points_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comparisons_v_version_comparison_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comparisons_v_version_feature_table" ADD CONSTRAINT "_comparisons_v_version_feature_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comparisons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comparisons_v_version_feature_table_locales" ADD CONSTRAINT "_comparisons_v_version_feature_table_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comparisons_v_version_feature_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_comparisons_v" ADD CONSTRAINT "_comparisons_v_parent_id_comparisons_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."comparisons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_comparisons_v" ADD CONSTRAINT "_comparisons_v_version_competitor_logo_id_media_id_fk" FOREIGN KEY ("version_competitor_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_comparisons_v" ADD CONSTRAINT "_comparisons_v_version_meta_og_image_id_media_id_fk" FOREIGN KEY ("version_meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_comparisons_v_locales" ADD CONSTRAINT "_comparisons_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_comparisons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_proof_trusted_by_logos" ADD CONSTRAINT "marketing_proof_trusted_by_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_proof_trusted_by_logos" ADD CONSTRAINT "marketing_proof_trusted_by_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_proof_integrations_logos" ADD CONSTRAINT "marketing_proof_integrations_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_proof_integrations_logos" ADD CONSTRAINT "marketing_proof_integrations_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_proof_stats" ADD CONSTRAINT "marketing_proof_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_proof_stats_locales" ADD CONSTRAINT "marketing_proof_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_proof_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_proof_locales" ADD CONSTRAINT "marketing_proof_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_proof"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "comparisons_comparison_points_order_idx" ON "comparisons_comparison_points" USING btree ("_order");
  CREATE INDEX "comparisons_comparison_points_parent_id_idx" ON "comparisons_comparison_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "comparisons_comparison_points_locales_locale_parent_id_uniqu" ON "comparisons_comparison_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "comparisons_feature_table_order_idx" ON "comparisons_feature_table" USING btree ("_order");
  CREATE INDEX "comparisons_feature_table_parent_id_idx" ON "comparisons_feature_table" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "comparisons_feature_table_locales_locale_parent_id_unique" ON "comparisons_feature_table_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "comparisons_competitor_logo_idx" ON "comparisons" USING btree ("competitor_logo_id");
  CREATE UNIQUE INDEX "comparisons_slug_idx" ON "comparisons" USING btree ("slug");
  CREATE INDEX "comparisons_meta_meta_og_image_idx" ON "comparisons" USING btree ("meta_og_image_id");
  CREATE INDEX "comparisons_updated_at_idx" ON "comparisons" USING btree ("updated_at");
  CREATE INDEX "comparisons_created_at_idx" ON "comparisons" USING btree ("created_at");
  CREATE INDEX "comparisons__status_idx" ON "comparisons" USING btree ("_status");
  CREATE UNIQUE INDEX "comparisons_locales_locale_parent_id_unique" ON "comparisons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_comparisons_v_version_comparison_points_order_idx" ON "_comparisons_v_version_comparison_points" USING btree ("_order");
  CREATE INDEX "_comparisons_v_version_comparison_points_parent_id_idx" ON "_comparisons_v_version_comparison_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_comparisons_v_version_comparison_points_locales_locale_pare" ON "_comparisons_v_version_comparison_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_comparisons_v_version_feature_table_order_idx" ON "_comparisons_v_version_feature_table" USING btree ("_order");
  CREATE INDEX "_comparisons_v_version_feature_table_parent_id_idx" ON "_comparisons_v_version_feature_table" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_comparisons_v_version_feature_table_locales_locale_parent_i" ON "_comparisons_v_version_feature_table_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_comparisons_v_parent_idx" ON "_comparisons_v" USING btree ("parent_id");
  CREATE INDEX "_comparisons_v_version_version_competitor_logo_idx" ON "_comparisons_v" USING btree ("version_competitor_logo_id");
  CREATE INDEX "_comparisons_v_version_version_slug_idx" ON "_comparisons_v" USING btree ("version_slug");
  CREATE INDEX "_comparisons_v_version_meta_version_meta_og_image_idx" ON "_comparisons_v" USING btree ("version_meta_og_image_id");
  CREATE INDEX "_comparisons_v_version_version_updated_at_idx" ON "_comparisons_v" USING btree ("version_updated_at");
  CREATE INDEX "_comparisons_v_version_version_created_at_idx" ON "_comparisons_v" USING btree ("version_created_at");
  CREATE INDEX "_comparisons_v_version_version__status_idx" ON "_comparisons_v" USING btree ("version__status");
  CREATE INDEX "_comparisons_v_created_at_idx" ON "_comparisons_v" USING btree ("created_at");
  CREATE INDEX "_comparisons_v_updated_at_idx" ON "_comparisons_v" USING btree ("updated_at");
  CREATE INDEX "_comparisons_v_snapshot_idx" ON "_comparisons_v" USING btree ("snapshot");
  CREATE INDEX "_comparisons_v_published_locale_idx" ON "_comparisons_v" USING btree ("published_locale");
  CREATE INDEX "_comparisons_v_latest_idx" ON "_comparisons_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_comparisons_v_locales_locale_parent_id_unique" ON "_comparisons_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "marketing_proof_trusted_by_logos_order_idx" ON "marketing_proof_trusted_by_logos" USING btree ("_order");
  CREATE INDEX "marketing_proof_trusted_by_logos_parent_id_idx" ON "marketing_proof_trusted_by_logos" USING btree ("_parent_id");
  CREATE INDEX "marketing_proof_trusted_by_logos_logo_idx" ON "marketing_proof_trusted_by_logos" USING btree ("logo_id");
  CREATE INDEX "marketing_proof_integrations_logos_order_idx" ON "marketing_proof_integrations_logos" USING btree ("_order");
  CREATE INDEX "marketing_proof_integrations_logos_parent_id_idx" ON "marketing_proof_integrations_logos" USING btree ("_parent_id");
  CREATE INDEX "marketing_proof_integrations_logos_logo_idx" ON "marketing_proof_integrations_logos" USING btree ("logo_id");
  CREATE INDEX "marketing_proof_stats_order_idx" ON "marketing_proof_stats" USING btree ("_order");
  CREATE INDEX "marketing_proof_stats_parent_id_idx" ON "marketing_proof_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "marketing_proof_stats_locales_locale_parent_id_unique" ON "marketing_proof_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "marketing_proof_locales_locale_parent_id_unique" ON "marketing_proof_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comparisons_fk" FOREIGN KEY ("comparisons_id") REFERENCES "public"."comparisons"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_comparisons_id_idx" ON "payload_locked_documents_rels" USING btree ("comparisons_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "comparisons_comparison_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comparisons_comparison_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comparisons_feature_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comparisons_feature_table_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comparisons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "comparisons_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comparisons_v_version_comparison_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comparisons_v_version_comparison_points_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comparisons_v_version_feature_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comparisons_v_version_feature_table_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comparisons_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_comparisons_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_proof_trusted_by_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_proof_integrations_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_proof_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_proof_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_proof" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_proof_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "comparisons_comparison_points" CASCADE;
  DROP TABLE "comparisons_comparison_points_locales" CASCADE;
  DROP TABLE "comparisons_feature_table" CASCADE;
  DROP TABLE "comparisons_feature_table_locales" CASCADE;
  DROP TABLE "comparisons" CASCADE;
  DROP TABLE "comparisons_locales" CASCADE;
  DROP TABLE "_comparisons_v_version_comparison_points" CASCADE;
  DROP TABLE "_comparisons_v_version_comparison_points_locales" CASCADE;
  DROP TABLE "_comparisons_v_version_feature_table" CASCADE;
  DROP TABLE "_comparisons_v_version_feature_table_locales" CASCADE;
  DROP TABLE "_comparisons_v" CASCADE;
  DROP TABLE "_comparisons_v_locales" CASCADE;
  DROP TABLE "marketing_proof_trusted_by_logos" CASCADE;
  DROP TABLE "marketing_proof_integrations_logos" CASCADE;
  DROP TABLE "marketing_proof_stats" CASCADE;
  DROP TABLE "marketing_proof_stats_locales" CASCADE;
  DROP TABLE "marketing_proof" CASCADE;
  DROP TABLE "marketing_proof_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_comparisons_fk";
  
  DROP INDEX "payload_locked_documents_rels_comparisons_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "comparisons_id";
  DROP TYPE "public"."enum_comparisons_feature_table_your_status";
  DROP TYPE "public"."enum_comparisons_feature_table_their_status";
  DROP TYPE "public"."enum_comparisons_status";
  DROP TYPE "public"."enum__comparisons_v_version_feature_table_your_status";
  DROP TYPE "public"."enum__comparisons_v_version_feature_table_their_status";
  DROP TYPE "public"."enum__comparisons_v_version_status";
  DROP TYPE "public"."enum__comparisons_v_published_locale";`)
}
