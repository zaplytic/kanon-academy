import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { courses } from "./course";
import { timestamps } from "./utils";

export const milestones = pgTable("milestones", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  course_id: integer()
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  order: integer().notNull(),
  ...timestamps
});
