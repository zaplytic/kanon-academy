import { pgTable, integer, jsonb, primaryKey } from "drizzle-orm/pg-core";
import { courses } from "./course";
import { users } from "./user";
import { timestamps } from "./utils";
import { relations } from "drizzle-orm";

export const enrollments = pgTable(
  "enrollments",
  {
    user_id: integer()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    course_id: integer()
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    progress: jsonb(), // {"completed_lessons": [1, 5]}
    ...timestamps
  },
  (table) => [primaryKey({ columns: [table.user_id, table.course_id] })]
);

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.user_id],
    references: [users.id]
  }),
  course: one(courses, {
    fields: [enrollments.course_id],
    references: [courses.id]
  })
}));

export type dbSelectEnrollmentType = typeof enrollments.$inferSelect;
export type dbInsertEnrollmentType = typeof enrollments.$inferInsert;
