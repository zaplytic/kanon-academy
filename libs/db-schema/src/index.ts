import {
  integer,
  pgTable,
  text,
  timestamp,
  pgEnum,
  varchar,
  jsonb,
  unique
} from "drizzle-orm/pg-core";

const timestamps = {
  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  deleted_at: timestamp()
};

export const roleEnum = pgEnum("userRoles", ["student", "instructor"]);
export const statusEnum = pgEnum("userStatuses", [
  "active",
  "locked",
  "deleted",
  "suspended"
]);

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  full_name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).unique().notNull(),
  email_verified_at: timestamp(),
  password_hash: varchar({ length: 511 }).notNull(),
  bio: text(),
  role: roleEnum().notNull(),
  status: statusEnum().notNull(),
  last_login_at: timestamp(),
  ...timestamps
});

export const courses = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  category_id: integer()
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  featured_image_id: integer(),
  instructor_id: integer()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // TODO: Check if the user is instructor
  ...timestamps
});

export const milestones = pgTable("milestones", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  course_id: integer().references(() => courses.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  order: integer().notNull(),
  ...timestamps
});

export const lessons = pgTable("lessons", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  milestone_id: integer()
    .notNull()
    .references(() => milestones.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  content: jsonb(),
  order: integer().notNull(),
  ...timestamps
});

export const enrollments = pgTable(
  "enrollments",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    course_id: integer()
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    progress: jsonb(), // {"completed_lessons": [1, 5]}
    ...timestamps
  },
  (table) => [unique().on(table.user_id, table.course_id)]
);

export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).unique().notNull(),
  description: text(),
  ...timestamps
});

export type dbInsertUserType = typeof users.$inferInsert;
export type dbSelectUserType = typeof users.$inferSelect;
