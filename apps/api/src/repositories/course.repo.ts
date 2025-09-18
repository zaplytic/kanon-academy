import db from "@/db";
import { categories, courses, users } from "@kanon-academy/db-schema";
import { eq, and, isNull, desc } from "drizzle-orm";
import { singleton } from "tsyringe";
import { CourseRepoSelectType } from "@kanon-academy/types";

@singleton()
export default class CourseRepository {
  async findCourseById(id: number): Promise<CourseRepoSelectType | null> {
    // @ts-expect-error - Drizzle type compatibility issue
    const course: CourseRepoSelectType[] = await db
      .select()
      // @ts-expect-error - Drizzle type compatibility issue
      .from(courses)
      // @ts-expect-error - Drizzle type compatibility issue
      .leftJoin(categories, eq(categories.id, courses.category_id))
      // @ts-expect-error - Drizzle type compatibility issue
      .leftJoin(users, eq(users.id, courses.instructor_id))
      // @ts-expect-error - Drizzle type compatibility issue
      .where(and(eq(courses.id, id), eq(courses.status, "published"), isNull(courses.deleted_at)))
      .limit(1);
    return course[0] ?? null;
  }

  async getAllCourse(): Promise<CourseRepoSelectType[]> {
    // @ts-expect-error - Drizzle type compatibility issue
    const published: CourseRepoSelectType[] = await db
      .select()
      // @ts-expect-error - Drizzle type compatibility issue
      .from(courses)
      // @ts-expect-error - Drizzle type compatibility issue
      .leftJoin(categories, eq(categories.id, courses.category_id))
      // @ts-expect-error - Drizzle type compatibility issue
      .leftJoin(users, eq(users.id, courses.instructor_id))
      // @ts-expect-error - Drizzle type compatibility issue
      .where(and(eq(courses.status, "published"), isNull(courses.deleted_at)))
      // @ts-expect-error - Drizzle type compatibility issue
      .orderBy(desc(courses.created_at));

    return published;
  }
}
