ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_user_id_course_id_unique";--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_course_id_pk" PRIMARY KEY("user_id","course_id");--> statement-breakpoint
ALTER TABLE "enrollments" DROP COLUMN "id";