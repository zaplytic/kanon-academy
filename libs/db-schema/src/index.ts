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
export const userStatusEnum = pgEnum("userStatuses", ["pending", "active", "locked", "suspended"]);
export const courseStatusEnum = pgEnum("courseStatuses", ["draft", "archived", "published"]);

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

export const milestones = pgTable("milestones", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  course_id: integer().references(() => courses.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  description: text(),
  order: integer().notNull(),
  ...timestamps
});

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

export const enrollments = pgTable(
  "enrollments",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
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
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).unique().notNull(),
  description: text(),
  ...timestamps
});

export type dbInsertUserType = typeof users.$inferInsert;
export type dbSelectUserType = typeof users.$inferSelect;

export type dbInsertCourseType = typeof courses.$inferInsert;
export type dbSelectCourseType = typeof courses.$inferSelect;

export type dbInsertCategoryType = typeof categories.$inferInsert;
export type dbSelectCategoryType = typeof categories.$inferSelect;
