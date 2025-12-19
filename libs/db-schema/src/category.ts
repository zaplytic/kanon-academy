import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { courses } from "./course";
import { timestamps } from "./utils";
import { relations } from "drizzle-orm";

export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).unique().notNull(),
  description: text(),
  ...timestamps
});

export const categoriesRelation = relations(categories, ({ many }) => ({
  courses: many(courses)
}));

export type dbInsertCategoryType = typeof categories.$inferInsert;
export type dbSelectCategoryType = typeof categories.$inferSelect;
