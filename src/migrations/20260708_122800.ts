import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "posts_attachments" CASCADE;
  DROP TABLE "_posts_v_version_attachments" CASCADE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "posts_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"file_id" integer
  );
  
  CREATE TABLE "_posts_v_version_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"file_id" integer,
  	"_uuid" varchar
  );
  
  ALTER TABLE "posts_attachments" ADD CONSTRAINT "posts_attachments_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_attachments" ADD CONSTRAINT "posts_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_attachments" ADD CONSTRAINT "_posts_v_version_attachments_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_attachments" ADD CONSTRAINT "_posts_v_version_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_attachments_order_idx" ON "posts_attachments" USING btree ("_order");
  CREATE INDEX "posts_attachments_parent_id_idx" ON "posts_attachments" USING btree ("_parent_id");
  CREATE INDEX "posts_attachments_file_idx" ON "posts_attachments" USING btree ("file_id");
  CREATE INDEX "_posts_v_version_attachments_order_idx" ON "_posts_v_version_attachments" USING btree ("_order");
  CREATE INDEX "_posts_v_version_attachments_parent_id_idx" ON "_posts_v_version_attachments" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_attachments_file_idx" ON "_posts_v_version_attachments" USING btree ("file_id");`)
}
