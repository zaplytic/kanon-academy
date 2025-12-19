import { relations } from "drizzle-orm";
import { timestamps } from "./utils";
import { pgEnum, pgTable, integer, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { courses } from "./course";
import { enrollments } from "./enrollment";

export const userStatusEnum = pgEnum("userStatuses", ["pending", "active", "locked", "suspended"]);
export const roleEnum = pgEnum("userRoles", ["student", "instructor"]);

export const users = pgTable("users", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  full_name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).unique().notNull(),
  email_verified_at: timestamp(),
  password_hash: varchar({ length: 511 }).notNull(),
  bio: text(),
  role: roleEnum().notNull(),
  status: userStatusEnum().notNull().default("active"),
  last_login_at: timestamp(),
  ...timestamps
});

export const usersRelations = relations(users, ({ many }) => ({
  instructedCourses: many(courses),
  enrollments: many(enrollments)
}));

export type dbInsertUserType = typeof users.$inferInsert;
export type dbSelectUserType = typeof users.$inferSelect;
