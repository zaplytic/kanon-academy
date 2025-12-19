import db from "@/db";
import {
  enrollments,
  dbSelectEnrollmentType,
  dbInsertEnrollementType
} from "@kanon-academy/db-schema";
import { eq, and } from "drizzle-orm";
import { singleton } from "tsyringe";
import { AppError } from "@kanon-academy/types";

@singleton()
export default class EnrollmentRepository {
  async checkEnrollment(courseId: number, studentId: number): Promise<boolean> {
    const existingEnrollments: dbSelectEnrollmentType[] = await db
      .select()
      .from(enrollments)
      .where(and(eq(enrollments.course_id, courseId), eq(enrollments.user_id, studentId)));

    return existingEnrollments.length !== 0;
  }

  async insertEnrollment(data: dbInsertEnrollementType): Promise<dbSelectEnrollmentType> {
    const inserted: dbSelectEnrollmentType[] = await db
      .insert(enrollments)
      .values(data)
      .returning();

    if (inserted.length === 0) {
      throw new AppError("Something happened during insertion", 500);
    }

    return inserted[0];
  }

  async deleteEnrollment(courseId: number, studentId: number): Promise<void> {
    const deleted: dbSelectEnrollmentType[] = await db
      .delete(enrollments)
      .where(and(eq(enrollments.course_id, courseId), eq(enrollments.user_id, studentId)))
      .returning();

    if (deleted.length == 0) {
      throw new AppError("Something happened during deletion or the user is not enrolled", 409);
    }
  }
}
