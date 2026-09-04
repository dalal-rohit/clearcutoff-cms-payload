import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_exams_exam_frequency" AS ENUM('Annual', 'Biannual', 'One-Time', 'Rolling');
  CREATE TYPE "public"."enum_exams_evaluation_type" AS ENUM('MCQ', 'Descriptive', 'Hybrid');
  CREATE TYPE "public"."enum_exams_status" AS ENUM('Active', 'Coming Soon', 'Archived');
  CREATE TYPE "public"."enum_comparisons_feature_table_your_status" AS ENUM('yes', 'warning', 'no');
  CREATE TYPE "public"."enum_comparisons_feature_table_their_status" AS ENUM('yes', 'warning', 'no');
  CREATE TYPE "public"."enum_comparisons_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__comparisons_v_version_feature_table_your_status" AS ENUM('yes', 'warning', 'no');
  CREATE TYPE "public"."enum__comparisons_v_version_feature_table_their_status" AS ENUM('yes', 'warning', 'no');
  CREATE TYPE "public"."enum__comparisons_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__comparisons_v_published_locale" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_alternatives_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__alternatives_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__alternatives_v_published_locale" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_social_links_links_platform" AS ENUM('facebook', 'x', 'instagram', 'youtube', 'linkedin', 'github', 'other');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"content_html" varchar,
  	"exam_id" integer,
  	"author_id" integer,
  	"published_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"hero_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_content_html" varchar,
  	"version_exam_id" integer,
  	"version_author_id" integer,
  	"version_published_date" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_hero_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "exams" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"exam_id" varchar NOT NULL,
  	"name" varchar,
  	"short_name" varchar,
  	"state" varchar,
  	"conducting_body" varchar,
  	"logo_url" varchar,
  	"exam_type" varchar,
  	"exam_frequency" "enum_exams_exam_frequency",
  	"evaluation_type" "enum_exams_evaluation_type",
  	"ai_evaluation_supported" boolean DEFAULT false,
  	"upcoming_exam" varchar,
  	"status" "enum_exams_status",
  	"rating" varchar,
  	"price" jsonb,
  	"combo_price" jsonb,
  	"translation" jsonb,
  	"marking_schema" jsonb,
  	"metadata" jsonb,
  	"pyq_pdf" jsonb,
  	"source_uuid" varchar,
  	"source_slug" varchar,
  	"source_synced_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
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
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"posts_id" integer,
  	"exams_id" integer,
  	"comparisons_id" integer,
  	"alternatives_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"favicon_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"site_name" varchar NOT NULL,
  	"tagline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_nav_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_locales" (
  	"copyright_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "seo_defaults" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "seo_defaults_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "social_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_social_links_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "social_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_exam_id_exams_id_fk" FOREIGN KEY ("exam_id") REFERENCES "public"."exams"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_exam_id_exams_id_fk" FOREIGN KEY ("version_exam_id") REFERENCES "public"."exams"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_exams_fk" FOREIGN KEY ("exams_id") REFERENCES "public"."exams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comparisons_fk" FOREIGN KEY ("comparisons_id") REFERENCES "public"."comparisons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_alternatives_fk" FOREIGN KEY ("alternatives_id") REFERENCES "public"."alternatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items_locales" ADD CONSTRAINT "footer_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_defaults" ADD CONSTRAINT "seo_defaults_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seo_defaults_locales" ADD CONSTRAINT "seo_defaults_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_defaults"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_links_links" ADD CONSTRAINT "social_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_proof_trusted_by_logos" ADD CONSTRAINT "marketing_proof_trusted_by_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_proof_trusted_by_logos" ADD CONSTRAINT "marketing_proof_trusted_by_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_proof_integrations_logos" ADD CONSTRAINT "marketing_proof_integrations_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_proof_integrations_logos" ADD CONSTRAINT "marketing_proof_integrations_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_proof_stats" ADD CONSTRAINT "marketing_proof_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_proof_stats_locales" ADD CONSTRAINT "marketing_proof_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_proof_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_proof_locales" ADD CONSTRAINT "marketing_proof_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_proof"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_exam_idx" ON "posts" USING btree ("exam_id");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_hero_image_idx" ON "posts_locales" USING btree ("hero_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_exam_idx" ON "_posts_v" USING btree ("version_exam_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v_locales" USING btree ("version_hero_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE UNIQUE INDEX "exams_exam_id_idx" ON "exams" USING btree ("exam_id");
  CREATE INDEX "exams_updated_at_idx" ON "exams" USING btree ("updated_at");
  CREATE INDEX "exams_created_at_idx" ON "exams" USING btree ("created_at");
  CREATE UNIQUE INDEX "exam_id_idx" ON "exams" USING btree ("exam_id");
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
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_exams_id_idx" ON "payload_locked_documents_rels" USING btree ("exams_id");
  CREATE INDEX "payload_locked_documents_rels_comparisons_id_idx" ON "payload_locked_documents_rels" USING btree ("comparisons_id");
  CREATE INDEX "payload_locked_documents_rels_alternatives_id_idx" ON "payload_locked_documents_rels" USING btree ("alternatives_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_nav_items_locales_locale_parent_id_unique" ON "footer_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "seo_defaults_og_image_idx" ON "seo_defaults" USING btree ("og_image_id");
  CREATE UNIQUE INDEX "seo_defaults_locales_locale_parent_id_unique" ON "seo_defaults_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "social_links_links_order_idx" ON "social_links_links" USING btree ("_order");
  CREATE INDEX "social_links_links_parent_id_idx" ON "social_links_links" USING btree ("_parent_id");
  CREATE INDEX "marketing_proof_trusted_by_logos_order_idx" ON "marketing_proof_trusted_by_logos" USING btree ("_order");
  CREATE INDEX "marketing_proof_trusted_by_logos_parent_id_idx" ON "marketing_proof_trusted_by_logos" USING btree ("_parent_id");
  CREATE INDEX "marketing_proof_trusted_by_logos_logo_idx" ON "marketing_proof_trusted_by_logos" USING btree ("logo_id");
  CREATE INDEX "marketing_proof_integrations_logos_order_idx" ON "marketing_proof_integrations_logos" USING btree ("_order");
  CREATE INDEX "marketing_proof_integrations_logos_parent_id_idx" ON "marketing_proof_integrations_logos" USING btree ("_parent_id");
  CREATE INDEX "marketing_proof_integrations_logos_logo_idx" ON "marketing_proof_integrations_logos" USING btree ("logo_id");
  CREATE INDEX "marketing_proof_stats_order_idx" ON "marketing_proof_stats" USING btree ("_order");
  CREATE INDEX "marketing_proof_stats_parent_id_idx" ON "marketing_proof_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "marketing_proof_stats_locales_locale_parent_id_unique" ON "marketing_proof_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "marketing_proof_locales_locale_parent_id_unique" ON "marketing_proof_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "exams" CASCADE;
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
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer_nav_items_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "seo_defaults" CASCADE;
  DROP TABLE "seo_defaults_locales" CASCADE;
  DROP TABLE "social_links_links" CASCADE;
  DROP TABLE "social_links" CASCADE;
  DROP TABLE "marketing_proof_trusted_by_logos" CASCADE;
  DROP TABLE "marketing_proof_integrations_logos" CASCADE;
  DROP TABLE "marketing_proof_stats" CASCADE;
  DROP TABLE "marketing_proof_stats_locales" CASCADE;
  DROP TABLE "marketing_proof" CASCADE;
  DROP TABLE "marketing_proof_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";
  DROP TYPE "public"."enum_exams_exam_frequency";
  DROP TYPE "public"."enum_exams_evaluation_type";
  DROP TYPE "public"."enum_exams_status";
  DROP TYPE "public"."enum_comparisons_feature_table_your_status";
  DROP TYPE "public"."enum_comparisons_feature_table_their_status";
  DROP TYPE "public"."enum_comparisons_status";
  DROP TYPE "public"."enum__comparisons_v_version_feature_table_your_status";
  DROP TYPE "public"."enum__comparisons_v_version_feature_table_their_status";
  DROP TYPE "public"."enum__comparisons_v_version_status";
  DROP TYPE "public"."enum__comparisons_v_published_locale";
  DROP TYPE "public"."enum_alternatives_status";
  DROP TYPE "public"."enum__alternatives_v_version_status";
  DROP TYPE "public"."enum__alternatives_v_published_locale";
  DROP TYPE "public"."enum_social_links_links_platform";`)
}
