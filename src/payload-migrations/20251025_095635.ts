import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'hi');
  CREATE TYPE "public"."enum_reviews_reviews_gender" AS ENUM('male', 'female');
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
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"exam_id" varchar,
  	"name" varchar,
  	"short_name" varchar,
  	"state" varchar,
  	"conducting_body" varchar,
  	"logo_url" varchar,
  	"exam_type" varchar,
  	"exam_frequency" varchar,
  	"evaluation_type" varchar,
  	"upcoming_exam" varchar,
  	"status" varchar NOT NULL,
  	"rating" varchar,
  	"price" varchar,
  	"combo_price" varchar,
  	"marking_schema" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"hero_enabled" boolean DEFAULT true,
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
  
  CREATE TABLE "questions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question_id" varchar,
  	"exam_instance_id" varchar,
  	"stage_id" varchar,
  	"label_id" varchar,
  	"section_id" varchar,
  	"question_number" varchar,
  	"language_code" varchar,
  	"question_text" varchar,
  	"question_image_url" varchar,
  	"option_1_text" varchar,
  	"option_1_image_url" varchar,
  	"option_2_text" varchar,
  	"option_2_image_url" varchar,
  	"option_3_text" varchar,
  	"option_3_image_url" varchar,
  	"option_4_text" varchar,
  	"option_4_image_url" varchar,
  	"correct_option" varchar,
  	"official_answer_key" varchar,
  	"explanation" varchar,
  	"chapter_id" varchar,
  	"topic_id" varchar,
  	"subtopic_id" varchar,
  	"ai_time_to_solve" varchar,
  	"ai_difficulty_level" varchar,
  	"ai_question_type" varchar,
  	"ai_chapter_name" varchar,
  	"ai_topic_name" varchar,
  	"ai_subtopic_name" varchar,
  	"ai_cognitive_skill" varchar,
  	"ai_is_pedagogy" varchar,
  	"ai_is_not" varchar,
  	"ai_question_tags" varchar,
  	"gs_created_at" varchar,
  	"gs_updated_at" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "e_navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"ent_id" varchar,
  	"exam_id" varchar,
  	"parent_id" varchar,
  	"name" varchar,
  	"group" varchar,
  	"status" varchar,
  	"flag_course" varchar,
  	"flag_tests" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "e_stage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"stage_id" varchar,
  	"exam_id" varchar,
  	"name" varchar,
  	"stage_type" varchar,
  	"stage_order" varchar,
  	"description" varchar,
  	"duration_mins" varchar,
  	"total_marks" varchar,
  	"total_questions" varchar,
  	"ai_evaluation_supported" varchar,
  	"status" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "e_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"name" varchar,
  	"type" varchar,
  	"area" varchar,
  	"description" varchar,
  	"total_questions" varchar,
  	"total_marks" varchar,
  	"question_weightage" varchar,
  	"evaluation_type" varchar,
  	"ai_evaluation_supported" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "e_instance" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"exam_instance_id" varchar NOT NULL,
  	"exam_id" varchar NOT NULL,
  	"exam_year" varchar,
  	"exam_cycle" varchar,
  	"mode" varchar,
  	"exam_pattern" varchar,
  	"duration_minutes" varchar,
  	"total_marks" varchar,
  	"total_questions" varchar,
  	"pass_criteria" varchar,
  	"pass_marks" varchar,
  	"negative_marking" varchar,
  	"marking_scheme" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  	"pages_id" integer,
  	"questions_id" integer,
  	"e_navigation_id" integer,
  	"e_stage_id" integer,
  	"e_sections_id" integer,
  	"e_instance_id" integer
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
  
  CREATE TABLE "footers_pages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "footers_pages_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footers_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link" varchar NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "footers_contacts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"contact" varchar NOT NULL,
  	"icon_id" integer
  );
  
  CREATE TABLE "footers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"copyright" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faqs_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faqs_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faqs_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faqs_categories_locales" (
  	"category" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faqs_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faqs_faqs_locales" (
  	"category" varchar,
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faqs_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reviews_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reviews_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reviews_reviews_review_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "reviews_reviews_review_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reviews_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"profile_id" integer,
  	"gender" "enum_reviews_reviews_gender",
  	"rating" numeric
  );
  
  CREATE TABLE "reviews_reviews_locales" (
  	"name" varchar,
  	"profession" varchar,
  	"review" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "reviews_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "global_sections_hero_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_hero_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_course_hero_highlight" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_course_hero_highlight_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
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
  
  CREATE TABLE "global_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_enabled" boolean DEFAULT true,
  	"hero_background_image_id" integer,
  	"logo_carousel_enabled" boolean DEFAULT true,
  	"features_enabled" boolean DEFAULT true,
  	"how_it_works_enabled" boolean DEFAULT true,
  	"comparison_table_enabled" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "global_sections_locales" (
  	"hero_eyebrow" varchar,
  	"hero_heading" varchar,
  	"hero_subheading" varchar,
  	"hero_cta1_text" varchar,
  	"hero_cta2_text" varchar,
  	"course_hero_course_hero_eyebrow" varchar,
  	"course_hero_course_hero_heading" varchar,
  	"course_hero_course_hero_subheading" varchar,
  	"course_hero_course_hero_cta1_text" varchar,
  	"course_hero_course_hero_cta2_text" varchar,
  	"features_eyebrow" varchar,
  	"features_heading" varchar,
  	"features_subheading" varchar,
  	"how_it_works_eyebrow" varchar,
  	"how_it_works_heading" varchar,
  	"how_it_works_subheading" varchar,
  	"comparison_table_eyebrow" varchar,
  	"comparison_table_heading" varchar,
  	"comparison_table_subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_questions_fk" FOREIGN KEY ("questions_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_navigation_fk" FOREIGN KEY ("e_navigation_id") REFERENCES "public"."e_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_stage_fk" FOREIGN KEY ("e_stage_id") REFERENCES "public"."e_stage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_sections_fk" FOREIGN KEY ("e_sections_id") REFERENCES "public"."e_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_e_instance_fk" FOREIGN KEY ("e_instance_id") REFERENCES "public"."e_instance"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_pages" ADD CONSTRAINT "footers_pages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_pages_locales" ADD CONSTRAINT "footers_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_socials" ADD CONSTRAINT "footers_socials_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footers_socials" ADD CONSTRAINT "footers_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_contacts" ADD CONSTRAINT "footers_contacts_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footers_contacts" ADD CONSTRAINT "footers_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_highlight" ADD CONSTRAINT "faqs_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_highlight_locales" ADD CONSTRAINT "faqs_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_categories" ADD CONSTRAINT "faqs_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_categories_locales" ADD CONSTRAINT "faqs_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_faqs" ADD CONSTRAINT "faqs_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_faqs_locales" ADD CONSTRAINT "faqs_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_highlight" ADD CONSTRAINT "reviews_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_highlight_locales" ADD CONSTRAINT "reviews_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_reviews_review_highlight" ADD CONSTRAINT "reviews_reviews_review_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_reviews_review_highlight_locales" ADD CONSTRAINT "reviews_reviews_review_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_reviews_review_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_reviews" ADD CONSTRAINT "reviews_reviews_profile_id_media_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews_reviews" ADD CONSTRAINT "reviews_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_reviews_locales" ADD CONSTRAINT "reviews_reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews_reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_locales" ADD CONSTRAINT "reviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_hero_highlight" ADD CONSTRAINT "global_sections_hero_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_hero_highlight_locales" ADD CONSTRAINT "global_sections_hero_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_hero_highlight"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_course_hero_highlight" ADD CONSTRAINT "global_sections_course_hero_highlight_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_course_hero_highlight_locales" ADD CONSTRAINT "global_sections_course_hero_highlight_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_course_hero_highlight"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE UNIQUE INDEX "courses_name_idx" ON "courses" USING btree ("name");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "questions_updated_at_idx" ON "questions" USING btree ("updated_at");
  CREATE INDEX "questions_created_at_idx" ON "questions" USING btree ("created_at");
  CREATE INDEX "e_navigation_updated_at_idx" ON "e_navigation" USING btree ("updated_at");
  CREATE INDEX "e_navigation_created_at_idx" ON "e_navigation" USING btree ("created_at");
  CREATE INDEX "e_stage_updated_at_idx" ON "e_stage" USING btree ("updated_at");
  CREATE INDEX "e_stage_created_at_idx" ON "e_stage" USING btree ("created_at");
  CREATE INDEX "e_sections_updated_at_idx" ON "e_sections" USING btree ("updated_at");
  CREATE INDEX "e_sections_created_at_idx" ON "e_sections" USING btree ("created_at");
  CREATE INDEX "e_instance_updated_at_idx" ON "e_instance" USING btree ("updated_at");
  CREATE INDEX "e_instance_created_at_idx" ON "e_instance" USING btree ("created_at");
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
  CREATE INDEX "payload_locked_documents_rels_questions_id_idx" ON "payload_locked_documents_rels" USING btree ("questions_id");
  CREATE INDEX "payload_locked_documents_rels_e_navigation_id_idx" ON "payload_locked_documents_rels" USING btree ("e_navigation_id");
  CREATE INDEX "payload_locked_documents_rels_e_stage_id_idx" ON "payload_locked_documents_rels" USING btree ("e_stage_id");
  CREATE INDEX "payload_locked_documents_rels_e_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("e_sections_id");
  CREATE INDEX "payload_locked_documents_rels_e_instance_id_idx" ON "payload_locked_documents_rels" USING btree ("e_instance_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "footers_pages_order_idx" ON "footers_pages" USING btree ("_order");
  CREATE INDEX "footers_pages_parent_id_idx" ON "footers_pages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footers_pages_locales_locale_parent_id_unique" ON "footers_pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footers_socials_order_idx" ON "footers_socials" USING btree ("_order");
  CREATE INDEX "footers_socials_parent_id_idx" ON "footers_socials" USING btree ("_parent_id");
  CREATE INDEX "footers_socials_icon_idx" ON "footers_socials" USING btree ("icon_id");
  CREATE INDEX "footers_contacts_order_idx" ON "footers_contacts" USING btree ("_order");
  CREATE INDEX "footers_contacts_parent_id_idx" ON "footers_contacts" USING btree ("_parent_id");
  CREATE INDEX "footers_contacts_icon_idx" ON "footers_contacts" USING btree ("icon_id");
  CREATE INDEX "faqs_highlight_order_idx" ON "faqs_highlight" USING btree ("_order");
  CREATE INDEX "faqs_highlight_parent_id_idx" ON "faqs_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faqs_highlight_locales_locale_parent_id_unique" ON "faqs_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_categories_order_idx" ON "faqs_categories" USING btree ("_order");
  CREATE INDEX "faqs_categories_parent_id_idx" ON "faqs_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faqs_categories_locales_locale_parent_id_unique" ON "faqs_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_faqs_order_idx" ON "faqs_faqs" USING btree ("_order");
  CREATE INDEX "faqs_faqs_parent_id_idx" ON "faqs_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faqs_faqs_locales_locale_parent_id_unique" ON "faqs_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reviews_highlight_order_idx" ON "reviews_highlight" USING btree ("_order");
  CREATE INDEX "reviews_highlight_parent_id_idx" ON "reviews_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reviews_highlight_locales_locale_parent_id_unique" ON "reviews_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reviews_reviews_review_highlight_order_idx" ON "reviews_reviews_review_highlight" USING btree ("_order");
  CREATE INDEX "reviews_reviews_review_highlight_parent_id_idx" ON "reviews_reviews_review_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "reviews_reviews_review_highlight_locales_locale_parent_id_unique" ON "reviews_reviews_review_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "reviews_reviews_order_idx" ON "reviews_reviews" USING btree ("_order");
  CREATE INDEX "reviews_reviews_parent_id_idx" ON "reviews_reviews" USING btree ("_parent_id");
  CREATE INDEX "reviews_reviews_profile_idx" ON "reviews_reviews" USING btree ("profile_id");
  CREATE UNIQUE INDEX "reviews_reviews_locales_locale_parent_id_unique" ON "reviews_reviews_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "reviews_locales_locale_parent_id_unique" ON "reviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_hero_highlight_order_idx" ON "global_sections_hero_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_hero_highlight_parent_id_idx" ON "global_sections_hero_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_hero_highlight_locales_locale_parent_id_unique" ON "global_sections_hero_highlight_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_course_hero_highlight_order_idx" ON "global_sections_course_hero_highlight" USING btree ("_order");
  CREATE INDEX "global_sections_course_hero_highlight_parent_id_idx" ON "global_sections_course_hero_highlight" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "global_sections_course_hero_highlight_locales_locale_parent_id_unique" ON "global_sections_course_hero_highlight_locales" USING btree ("_locale","_parent_id");
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
  CREATE INDEX "global_sections_hero_hero_background_image_idx" ON "global_sections" USING btree ("hero_background_image_id");
  CREATE UNIQUE INDEX "global_sections_locales_locale_parent_id_unique" ON "global_sections_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "questions" CASCADE;
  DROP TABLE "e_navigation" CASCADE;
  DROP TABLE "e_stage" CASCADE;
  DROP TABLE "e_sections" CASCADE;
  DROP TABLE "e_instance" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "footers_pages" CASCADE;
  DROP TABLE "footers_pages_locales" CASCADE;
  DROP TABLE "footers_socials" CASCADE;
  DROP TABLE "footers_contacts" CASCADE;
  DROP TABLE "footers" CASCADE;
  DROP TABLE "faqs_highlight" CASCADE;
  DROP TABLE "faqs_highlight_locales" CASCADE;
  DROP TABLE "faqs_categories" CASCADE;
  DROP TABLE "faqs_categories_locales" CASCADE;
  DROP TABLE "faqs_faqs" CASCADE;
  DROP TABLE "faqs_faqs_locales" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "reviews_highlight" CASCADE;
  DROP TABLE "reviews_highlight_locales" CASCADE;
  DROP TABLE "reviews_reviews_review_highlight" CASCADE;
  DROP TABLE "reviews_reviews_review_highlight_locales" CASCADE;
  DROP TABLE "reviews_reviews" CASCADE;
  DROP TABLE "reviews_reviews_locales" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "reviews_locales" CASCADE;
  DROP TABLE "global_sections_hero_highlight" CASCADE;
  DROP TABLE "global_sections_hero_highlight_locales" CASCADE;
  DROP TABLE "global_sections_course_hero_highlight" CASCADE;
  DROP TABLE "global_sections_course_hero_highlight_locales" CASCADE;
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
  DROP TABLE "global_sections" CASCADE;
  DROP TABLE "global_sections_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_reviews_reviews_gender";`)
}
