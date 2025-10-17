import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "global_sections_logo_carousel1_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_logo_carousel1_logos_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"logo_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "global_sections_logo_carousel2_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "global_sections_logo_carousel2_logos_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"logo_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "global_sections" ADD COLUMN "logo_carousel1_enabled" boolean DEFAULT true;
  ALTER TABLE "global_sections" ADD COLUMN "logo_carousel2_enabled" boolean DEFAULT true;
  ALTER TABLE "global_sections_logo_carousel1_logos" ADD CONSTRAINT "global_sections_logo_carousel1_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel1_logos_locales" ADD CONSTRAINT "global_sections_logo_carousel1_logos_locales_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel1_logos_locales" ADD CONSTRAINT "global_sections_logo_carousel1_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_logo_carousel1_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel2_logos" ADD CONSTRAINT "global_sections_logo_carousel2_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel2_logos_locales" ADD CONSTRAINT "global_sections_logo_carousel2_logos_locales_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_sections_logo_carousel2_logos_locales" ADD CONSTRAINT "global_sections_logo_carousel2_logos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_sections_logo_carousel2_logos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "global_sections_logo_carousel1_logos_order_idx" ON "global_sections_logo_carousel1_logos" USING btree ("_order");
  CREATE INDEX "global_sections_logo_carousel1_logos_parent_id_idx" ON "global_sections_logo_carousel1_logos" USING btree ("_parent_id");
  CREATE INDEX "global_sections_logo_carousel1_logos_logo_idx" ON "global_sections_logo_carousel1_logos_locales" USING btree ("logo_id","_locale");
  CREATE UNIQUE INDEX "global_sections_logo_carousel1_logos_locales_locale_parent_id_unique" ON "global_sections_logo_carousel1_logos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "global_sections_logo_carousel2_logos_order_idx" ON "global_sections_logo_carousel2_logos" USING btree ("_order");
  CREATE INDEX "global_sections_logo_carousel2_logos_parent_id_idx" ON "global_sections_logo_carousel2_logos" USING btree ("_parent_id");
  CREATE INDEX "global_sections_logo_carousel2_logos_logo_idx" ON "global_sections_logo_carousel2_logos_locales" USING btree ("logo_id","_locale");
  CREATE UNIQUE INDEX "global_sections_logo_carousel2_logos_locales_locale_parent_id_unique" ON "global_sections_logo_carousel2_logos_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "global_sections_logo_carousel1_logos" CASCADE;
  DROP TABLE "global_sections_logo_carousel1_logos_locales" CASCADE;
  DROP TABLE "global_sections_logo_carousel2_logos" CASCADE;
  DROP TABLE "global_sections_logo_carousel2_logos_locales" CASCADE;
  ALTER TABLE "global_sections" DROP COLUMN "logo_carousel1_enabled";
  ALTER TABLE "global_sections" DROP COLUMN "logo_carousel2_enabled";`)
}
