import db from "@/db";
import {
  enrollments,
  dbSelectEnrollmentType,
  dbInsertEnrollementType
} from "@kanon-academy/db-schema";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";
import { singleton } from "tsyringe";
import { AppError } from "@kanon-academy/types";

@singleton()
export default class EnrollmentRepository {
  async checkEnrollment(courseId: number, studentId: number): Promise<boolean> {
    // @ts-expect-error - Drizzle type compatibility issue
    const existingEnrollments: dbSelectEnrollmentType[] = db
      .select()
      // @ts-expect-error - Drizzle type compatibility issue
      .from(enrollments)
      // @ts-expect-error - Drizzle type compatibility issue
      .where(and(eq(courseId, enrollments.course_id), eq(studentId, enrollments.user_id)));

    return existingEnrollments.length !== 0;
  }

  async insertEnrollment(data: dbInsertEnrollementType): Promise<dbSelectEnrollmentType> {
    // @ts-expect-error - Drizzle type compatibility issue
    const inserted: dbSelectEnrollmentType[] = db.insert(enrollments).values(data).returning();

    if (inserted.length === 0) {
      throw new AppError("Something happened during insertion", 500);
    }

    return inserted[0];
  }

  async deleteEnrollment(courseId: number, studentId: number): Promise<void> {
    // @ts-expect-error - Drizzle type compatibility issue
    const deleted: dbSelectEnrollmentType[] = db
      // @ts-expect-error - Drizzle type compatibility issue
      .delete(enrollments)
      // @ts-expect-error - Drizzle type compatibility issue
      .where(and(eq(courseId, enrollments.course_id), eq(studentId, enrollments.user_id)))
      .returning();

    if (deleted.length == 0) {
      throw new AppError("Something happened during deletion or the user is not enrolled", 409);
    }
  }
}
