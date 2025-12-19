import db from "@/db";
import { courses, users } from "@kanon-academy/db-schema";
import { eq, and, isNull } from "drizzle-orm";
import { singleton } from "tsyringe";
import { CourseRepoSelectType } from "@kanon-academy/types";

@singleton()
export default class CourseRepository {
  async findCourseById(id: number): Promise<CourseRepoSelectType | null> {
    const course: CourseRepoSelectType | undefined = await db.query.courses.findFirst({
      where: and(eq(courses.status, "published"), isNull(courses.deleted_at), eq(courses.id, id)),
      with: {
        instructor: true,
        enrollments: true,
        category: true
      }
    });

    return course ?? null;
  }

  async getAllCourse(): Promise<CourseRepoSelectType[]> {
    const all: CourseRepoSelectType[] = await db.query.courses.findMany({
      where: and(eq(courses.status, "published"), isNull(courses.deleted_at)),
      with: {
        instructor: true,
        enrollments: true,
        category: true
      }
    });

    return all;
  }

  async getUserCourses(userEmail: string): Promise<CourseRepoSelectType[]> {
    const usersCourses = await db.query.users.findFirst({
      where: eq(users.email, userEmail),
      with: {
        enrollments: {
          with: {
            course: {
              with: {
                instructor: true,
                category: true
              }
            }
          }
        }
      }
    });

    if (usersCourses === undefined) return [];

    return usersCourses?.enrollments
      .map((e) => e.course)
      .filter((course) => course.status !== "published" || course.deleted_at === null);
  }
}
