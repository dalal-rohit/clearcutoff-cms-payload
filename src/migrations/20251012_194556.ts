import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_global_sections_reviews_reviews_gender" AS ENUM('male', 'female');
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
  
  CREATE TABLE "courses_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "courses_highlights_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "courses_blocks_hero_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_pricing_section_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "courses_blocks_pricing_section_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"plan_name" varchar,
  	"price" numeric
  );
  
  CREATE TABLE "courses_blocks_pricing_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"title" varchar,
  	"show_course_price" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "courses_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar,
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_section_cards_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_section_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"plan_name" varchar,
  	"price" numeric
  );
  
  CREATE TABLE "pages_blocks_pricing_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"title" varchar,
  	"show_course_price" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"hero_heading" varchar DEFAULT 'hero',
  	"hero_color" varchar,
  	"course_hero_enabled" boolean DEFAULT true,
  	"course_hero_heading" varchar DEFAULT 'course_hero',
  	"course_hero_color" varchar,
  	"logo_carousel_enabled" boolean DEFAULT true,
  	"logo_carousel_heading" varchar DEFAULT 'logoCarousel',
  	"logo_carousel_color" varchar,
  	"features_enabled" boolean DEFAULT true,
  	"features_heading" varchar DEFAULT 'features',
  	"features_color" varchar,
  	"how_it_works_enabled" boolean DEFAULT true,
  	"how_it_works_heading" varchar DEFAULT 'how_it_works',
  	"how_it_works_color" varchar,
  	"comparison_table_enabled" boolean DEFAULT true,
  	"comparison_table_heading" varchar DEFAULT 'comparison_table',
  	"comparison_table_color" varchar,
  	"reviews_enabled" boolean DEFAULT true,
  	"reviews_heading" varchar DEFAULT 'reviews',
  	"reviews_color" varchar,
  	"faqs_enabled" boolean DEFAULT true,
  	"faqs_heading" varchar DEFAULT 'faqs',
  	"faqs_color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"hero_enabled" boolean DEFAULT true,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
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
  	"courses_id" integer,
  	"pages_id" integer
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
  
  CREATE TABLE "global_sections_logo_carousel_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_logo_carousel_logos_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"logo_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_features_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_features_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_features_features_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_how_it_works_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_how_it_works_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_how_it_works_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "global_sections_how_it_works_how_it_works_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"description" varchar,
  	"btn_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_comparison_table_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_comparison_table_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_comparison_table_comparison" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_comparison_table_comparison_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_comparison_table_coaching_center" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_comparison_table_coaching_center_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_comparison_table_clear_cutoff" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_comparison_table_clear_cutoff_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_reviews_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_reviews_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_reviews_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"profile_id" integer,
  	"gender" "enum_global_sections_reviews_reviews_gender",
  	"rating" numeric
  );
  
  CREATE TABLE "global_sections_reviews_reviews_locales" (
  	"name" varchar,
  	"field" varchar,
  	"review" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_categories_locales" (
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_faqs_faqs_locales" (
  	"category" varchar,
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "global_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_enabled" boolean DEFAULT true,
  	"hero_background_image_id" integer,
  	"logo_carousel_enabled" boolean DEFAULT true,
  	"features_enabled" boolean DEFAULT true,
  	"how_it_works_enabled" boolean DEFAULT true,
  	"comparison_table_enabled" boolean DEFAULT true,
  	"reviews_enabled" boolean DEFAULT true,
  	"faqs_enabled" boolean DEFAULT true,
  	"footer_enabled" boolean DEFAULT true,
  	"footer_copyright" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "global_sections_locales" (
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_subheading" varchar,
  	"hero_cta_text" varchar,
  	"hero_cta_link" varchar,
  	"course_hero_course_hero_eyebrow" varchar,
  	"course_hero_course_hero_heading" varchar,
  	"course_hero_course_hero_subheading" varchar,
  	"course_hero_course_hero_ctatext" varchar,
  	"course_hero_course_hero_ctalink" varchar,
  	"features_eyebrow" varchar,
  	"features_heading" varchar,
  	"features_subheading" varchar,
  	"how_it_works_eyebrow" varchar,
  	"how_it_works_heading" varchar,
  	"how_it_works_subheading" varchar,
  	"comparison_table_eyebrow" varchar,
  	"comparison_table_heading" varchar,
  	"comparison_table_subheading" varchar,
  	"reviews_eyebrow" varchar,
  	"reviews_heading" varchar,
  	"reviews_subheading" varchar,
  	"faqs_eyebrow" varchar,
  	"faqs_heading" varchar,
  	"faqs_subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_highlights" ADD CONSTRAINT "courses_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_highlights_locales" ADD CONSTRAINT "courses_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_hero_section" ADD CONSTRAINT "courses_blocks_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_hero_section" ADD CONSTRAINT "courses_blocks_hero_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_pricing_section_cards_features" ADD CONSTRAINT "courses_blocks_pricing_section_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_pricing_section_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_pricing_section_cards" ADD CONSTRAINT "courses_blocks_pricing_section_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_pricing_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_pricing_section" ADD CONSTRAINT "courses_blocks_pricing_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_locales" ADD CONSTRAINT "courses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_section" ADD CONSTRAINT "pages_blocks_hero_section_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_section" ADD CONSTRAINT "pages_blocks_hero_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_section_cards_features" ADD CONSTRAINT "pages_blocks_pricing_section_cards_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_section_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_section_cards" ADD CONSTRAINT "pages_blocks_pricing_section_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_section" ADD CONSTRAINT "pages_blocks_pricing_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel_logos" ADD CONSTRAINT "global_sections_logo_carousel_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel_logos_locales" ADD CONSTRAINT "global_sections_logo_carousel_logos_locales_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel_logos_locales" ADD CONSTRAINT "global_sections_logo_carousel_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_logo_carousel_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_features_highlight" ADD CONSTRAINT "global_sections_features_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_features_highlight_locales" ADD CONSTRAINT "global_sections_features_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_features_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_features_features" ADD CONSTRAINT "global_sections_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_features_features_locales" ADD CONSTRAINT "global_sections_features_features_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_sections_features_features_locales" ADD CONSTRAINT "global_sections_features_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_features_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_how_it_works_highlight" ADD CONSTRAINT "global_sections_how_it_works_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_how_it_works_highlight_locales" ADD CONSTRAINT "global_sections_how_it_works_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_how_it_works_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_how_it_works_how_it_works" ADD CONSTRAINT "global_sections_how_it_works_how_it_works_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_sections_how_it_works_how_it_works" ADD CONSTRAINT "global_sections_how_it_works_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_how_it_works_how_it_works_locales" ADD CONSTRAINT "global_sections_how_it_works_how_it_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_how_it_works_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_highlight" ADD CONSTRAINT "global_sections_comparison_table_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_highlight_locales" ADD CONSTRAINT "global_sections_comparison_table_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_comparison" ADD CONSTRAINT "global_sections_comparison_table_comparison_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_comparison_locales" ADD CONSTRAINT "global_sections_comparison_table_comparison_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_comparison"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_coaching_center" ADD CONSTRAINT "global_sections_comparison_table_coaching_center_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_coaching_center_locales" ADD CONSTRAINT "global_sections_comparison_table_coaching_center_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_coaching_center"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_clear_cutoff" ADD CONSTRAINT "global_sections_comparison_table_clear_cutoff_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_comparison_table_clear_cutoff_locales" ADD CONSTRAINT "global_sections_comparison_table_clear_cutoff_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_comparison_table_clear_cutoff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_reviews_highlight" ADD CONSTRAINT "global_sections_reviews_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_reviews_highlight_locales" ADD CONSTRAINT "global_sections_reviews_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_reviews_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_reviews_reviews" ADD CONSTRAINT "global_sections_reviews_reviews_profile_id_media_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_sections_reviews_reviews" ADD CONSTRAINT "global_sections_reviews_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_reviews_reviews_locales" ADD CONSTRAINT "global_sections_reviews_reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_reviews_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_highlight" ADD CONSTRAINT "global_sections_faqs_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_highlight_locales" ADD CONSTRAINT "global_sections_faqs_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_faqs_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_categories" ADD CONSTRAINT "global_sections_faqs_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_categories_locales" ADD CONSTRAINT "global_sections_faqs_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_faqs_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_faqs" ADD CONSTRAINT "global_sections_faqs_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_faqs_faqs_locales" ADD CONSTRAINT "global_sections_faqs_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_faqs_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_footer_links" ADD CONSTRAINT "global_sections_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections" ADD CONSTRAINT "global_sections_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_sections_locales" ADD CONSTRAINT "global_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "courses_highlights_order_idx" ON "courses_highlights" USING btree ("_order");
  CREATE INDEX "courses_highlights_parent_id_idx" ON "courses_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "courses_highlights_locales_locale_parent_id_unique" ON "courses_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "courses_blocks_hero_section_order_idx" ON "courses_blocks_hero_section" USING btree ("_order");
  CREATE INDEX "courses_blocks_hero_section_parent_id_idx" ON "courses_blocks_hero_section" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_hero_section_path_idx" ON "courses_blocks_hero_section" USING btree ("_path");
  CREATE INDEX "courses_blocks_hero_section_background_image_idx" ON "courses_blocks_hero_section" USING btree ("background_image_id");
  CREATE INDEX "courses_blocks_pricing_section_cards_features_order_idx" ON "courses_blocks_pricing_section_cards_features" USING btree ("_order");
  CREATE INDEX "courses_blocks_pricing_section_cards_features_parent_id_idx" ON "courses_blocks_pricing_section_cards_features" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_pricing_section_cards_order_idx" ON "courses_blocks_pricing_section_cards" USING btree ("_order");
  CREATE INDEX "courses_blocks_pricing_section_cards_parent_id_idx" ON "courses_blocks_pricing_section_cards" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_pricing_section_order_idx" ON "courses_blocks_pricing_section" USING btree ("_order");
  CREATE INDEX "courses_blocks_pricing_section_parent_id_idx" ON "courses_blocks_pricing_section" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_pricing_section_path_idx" ON "courses_blocks_pricing_section" USING btree ("_path");
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE UNIQUE INDEX "courses_locales_locale_parent_id_unique" ON "courses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_section_order_idx" ON "pages_blocks_hero_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_section_parent_id_idx" ON "pages_blocks_hero_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_section_path_idx" ON "pages_blocks_hero_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_section_background_image_idx" ON "pages_blocks_hero_section" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_pricing_section_cards_features_order_idx" ON "pages_blocks_pricing_section_cards_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_section_cards_features_parent_id_idx" ON "pages_blocks_pricing_section_cards_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_section_cards_order_idx" ON "pages_blocks_pricing_section_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_section_cards_parent_id_idx" ON "pages_blocks_pricing_section_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_section_order_idx" ON "pages_blocks_pricing_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_section_parent_id_idx" ON "pages_blocks_pricing_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_section_path_idx" ON "pages_blocks_pricing_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "global_sections_logo_carousel_logos_order_idx" ON "global_sections_logo_carousel_logos" USING btree ("_order");
  CREATE INDEX "global_sections_logo_carousel_logos_parent_id_idx" ON "global_sections_logo_carousel_logos" USING btree ("_parent_id");
  CREATE INDEX "global_sections_logo_carousel_logos_logo_idx" ON "global_sections_logo_carousel_logos_locales" USING btree ("logo_id","_locale");
  CREATE UNIQUE INDEX "global_sections_logo_carousel_logos_locales_locale_parent_id_unique" ON "global_sections_logo_carousel_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_features_highlight_order_idx" ON "global_sections_features_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_features_highlight_parent_id_idx" ON "global_sections_features_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_features_highlight_locales_locale_parent_id_unique" ON "global_sections_features_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_features_features_order_idx" ON "global_sections_features_features" USING btree ("_order");
  CREATE INDEX "global_sections_features_features_parent_id_idx" ON "global_sections_features_features" USING btree ("_parent_id");
  CREATE INDEX "global_sections_features_features_image_idx" ON "global_sections_features_features_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "global_sections_features_features_locales_locale_parent_id_unique" ON "global_sections_features_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_how_it_works_highlight_order_idx" ON "global_sections_how_it_works_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_how_it_works_highlight_parent_id_idx" ON "global_sections_how_it_works_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_how_it_works_highlight_locales_locale_parent_id_unique" ON "global_sections_how_it_works_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_how_it_works_how_it_works_order_idx" ON "global_sections_how_it_works_how_it_works" USING btree ("_order");
  CREATE INDEX "global_sections_how_it_works_how_it_works_parent_id_idx" ON "global_sections_how_it_works_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "global_sections_how_it_works_how_it_works_image_idx" ON "global_sections_how_it_works_how_it_works" USING btree ("image_id");
  CREATE UNIQUE INDEX "global_sections_how_it_works_how_it_works_locales_locale_parent_id_unique" ON "global_sections_how_it_works_how_it_works_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_comparison_table_highlight_order_idx" ON "global_sections_comparison_table_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_comparison_table_highlight_parent_id_idx" ON "global_sections_comparison_table_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_highlight_locales_locale_parent_id_unique" ON "global_sections_comparison_table_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_comparison_table_comparison_order_idx" ON "global_sections_comparison_table_comparison" USING btree ("_order");
  CREATE INDEX "global_sections_comparison_table_comparison_parent_id_idx" ON "global_sections_comparison_table_comparison" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_comparison_locales_locale_parent_id_unique" ON "global_sections_comparison_table_comparison_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_comparison_table_coaching_center_order_idx" ON "global_sections_comparison_table_coaching_center" USING btree ("_order");
  CREATE INDEX "global_sections_comparison_table_coaching_center_parent_id_idx" ON "global_sections_comparison_table_coaching_center" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_coaching_center_locales_locale_parent_id_unique" ON "global_sections_comparison_table_coaching_center_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_comparison_table_clear_cutoff_order_idx" ON "global_sections_comparison_table_clear_cutoff" USING btree ("_order");
  CREATE INDEX "global_sections_comparison_table_clear_cutoff_parent_id_idx" ON "global_sections_comparison_table_clear_cutoff" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_comparison_table_clear_cutoff_locales_locale_parent_id_unique" ON "global_sections_comparison_table_clear_cutoff_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_reviews_highlight_order_idx" ON "global_sections_reviews_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_reviews_highlight_parent_id_idx" ON "global_sections_reviews_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_reviews_highlight_locales_locale_parent_id_unique" ON "global_sections_reviews_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_reviews_reviews_order_idx" ON "global_sections_reviews_reviews" USING btree ("_order");
  CREATE INDEX "global_sections_reviews_reviews_parent_id_idx" ON "global_sections_reviews_reviews" USING btree ("_parent_id");
  CREATE INDEX "global_sections_reviews_reviews_profile_idx" ON "global_sections_reviews_reviews" USING btree ("profile_id");
  CREATE UNIQUE INDEX "global_sections_reviews_reviews_locales_locale_parent_id_unique" ON "global_sections_reviews_reviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_faqs_highlight_order_idx" ON "global_sections_faqs_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_faqs_highlight_parent_id_idx" ON "global_sections_faqs_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_faqs_highlight_locales_locale_parent_id_unique" ON "global_sections_faqs_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_faqs_categories_order_idx" ON "global_sections_faqs_categories" USING btree ("_order");
  CREATE INDEX "global_sections_faqs_categories_parent_id_idx" ON "global_sections_faqs_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_faqs_categories_locales_locale_parent_id_unique" ON "global_sections_faqs_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_faqs_faqs_order_idx" ON "global_sections_faqs_faqs" USING btree ("_order");
  CREATE INDEX "global_sections_faqs_faqs_parent_id_idx" ON "global_sections_faqs_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_faqs_faqs_locales_locale_parent_id_unique" ON "global_sections_faqs_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_footer_links_order_idx" ON "global_sections_footer_links" USING btree ("_order");
  CREATE INDEX "global_sections_footer_links_parent_id_idx" ON "global_sections_footer_links" USING btree ("_parent_id");
  CREATE INDEX "global_sections_hero_hero_background_image_idx" ON "global_sections" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "global_sections_locales_locale_parent_id_unique" ON "global_sections_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "courses_highlights" CASCADE;
  DROP TABLE "courses_highlights_locales" CASCADE;
  DROP TABLE "courses_blocks_hero_section" CASCADE;
  DROP TABLE "courses_blocks_pricing_section_cards_features" CASCADE;
  DROP TABLE "courses_blocks_pricing_section_cards" CASCADE;
  DROP TABLE "courses_blocks_pricing_section" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "courses_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_section" CASCADE;
  DROP TABLE "pages_blocks_pricing_section_cards_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_section_cards" CASCADE;
  DROP TABLE "pages_blocks_pricing_section" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "global_sections_logo_carousel_logos" CASCADE;
  DROP TABLE "global_sections_logo_carousel_logos_locales" CASCADE;
  DROP TABLE "global_sections_features_highlight" CASCADE;
  DROP TABLE "global_sections_features_highlight_locales" CASCADE;
  DROP TABLE "global_sections_features_features" CASCADE;
  DROP TABLE "global_sections_features_features_locales" CASCADE;
  DROP TABLE "global_sections_how_it_works_highlight" CASCADE;
  DROP TABLE "global_sections_how_it_works_highlight_locales" CASCADE;
  DROP TABLE "global_sections_how_it_works_how_it_works" CASCADE;
  DROP TABLE "global_sections_how_it_works_how_it_works_locales" CASCADE;
  DROP TABLE "global_sections_comparison_table_highlight" CASCADE;
  DROP TABLE "global_sections_comparison_table_highlight_locales" CASCADE;
  DROP TABLE "global_sections_comparison_table_comparison" CASCADE;
  DROP TABLE "global_sections_comparison_table_comparison_locales" CASCADE;
  DROP TABLE "global_sections_comparison_table_coaching_center" CASCADE;
  DROP TABLE "global_sections_comparison_table_coaching_center_locales" CASCADE;
  DROP TABLE "global_sections_comparison_table_clear_cutoff" CASCADE;
  DROP TABLE "global_sections_comparison_table_clear_cutoff_locales" CASCADE;
  DROP TABLE "global_sections_reviews_highlight" CASCADE;
  DROP TABLE "global_sections_reviews_highlight_locales" CASCADE;
  DROP TABLE "global_sections_reviews_reviews" CASCADE;
  DROP TABLE "global_sections_reviews_reviews_locales" CASCADE;
  DROP TABLE "global_sections_faqs_highlight" CASCADE;
  DROP TABLE "global_sections_faqs_highlight_locales" CASCADE;
  DROP TABLE "global_sections_faqs_categories" CASCADE;
  DROP TABLE "global_sections_faqs_categories_locales" CASCADE;
  DROP TABLE "global_sections_faqs_faqs" CASCADE;
  DROP TABLE "global_sections_faqs_faqs_locales" CASCADE;
  DROP TABLE "global_sections_footer_links" CASCADE;
  DROP TABLE "global_sections" CASCADE;
  DROP TABLE "global_sections_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_global_sections_reviews_reviews_gender";`)
}
