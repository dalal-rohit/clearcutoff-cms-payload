import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
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
  
  ALTER TABLE "footers_pages" ADD CONSTRAINT "footers_pages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_pages_locales" ADD CONSTRAINT "footers_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_socials" ADD CONSTRAINT "footers_socials_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footers_socials" ADD CONSTRAINT "footers_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footers_contacts" ADD CONSTRAINT "footers_contacts_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footers_contacts" ADD CONSTRAINT "footers_contacts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footers_pages_order_idx" ON "footers_pages" USING btree ("_order");
  CREATE INDEX "footers_pages_parent_id_idx" ON "footers_pages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footers_pages_locales_locale_parent_id_unique" ON "footers_pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footers_socials_order_idx" ON "footers_socials" USING btree ("_order");
  CREATE INDEX "footers_socials_parent_id_idx" ON "footers_socials" USING btree ("_parent_id");
  CREATE INDEX "footers_socials_icon_idx" ON "footers_socials" USING btree ("icon_id");
  CREATE INDEX "footers_contacts_order_idx" ON "footers_contacts" USING btree ("_order");
  CREATE INDEX "footers_contacts_parent_id_idx" ON "footers_contacts" USING btree ("_parent_id");
  CREATE INDEX "footers_contacts_icon_idx" ON "footers_contacts" USING btree ("icon_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footers_pages" CASCADE;
  DROP TABLE "footers_pages_locales" CASCADE;
  DROP TABLE "footers_socials" CASCADE;
  DROP TABLE "footers_contacts" CASCADE;
  DROP TABLE "footers" CASCADE;`)
}
