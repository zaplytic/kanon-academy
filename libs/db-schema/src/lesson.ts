import { pgTable, integer, varchar, jsonb } from "drizzle-orm/pg-core";
import { milestones } from "./milestone";
import { timestamps } from "./utils";

export const lessons = pgTable("lessons", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  milestone_id: integer()
    .notNull()
    .references(() => milestones.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  content: jsonb(),
  order: integer().notNull(),
  ...timestamps
});
