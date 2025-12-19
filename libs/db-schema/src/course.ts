import { pgEnum, pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { users } from "./user";
import { categories } from "./category";
import { timestamps } from "./utils";
import { relations } from "drizzle-orm";
import { enrollments } from "./enrollment";

export const courseStatusEnum = pgEnum("courseStatuses", ["draft", "archived", "published"]);

export const courses = pgTable("courses", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  status: courseStatusEnum().notNull().default("draft"),
  description: text().notNull(),
  category_id: integer()
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  featured_image_link: text(),
  instructor_id: integer()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // TODO: Check if the user is instructor
  ...timestamps
});

export const coursesRelations = relations(courses, ({ one, many }) => ({
  enrollments: many(enrollments),
  instructor: one(users, {
    fields: [courses.instructor_id],
    references: [users.id]
  }),
  category: one(categories, {
    fields: [courses.category_id],
    references: [categories.id]
  })
}));

export type dbInsertCourseType = typeof courses.$inferInsert;
export type dbSelectCourseType = typeof courses.$inferSelect;
