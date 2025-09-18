ALTER TABLE "courses" ALTER COLUMN "status" SET DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "featured_image_link" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'active';