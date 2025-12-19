import { dbInsertEnrollementType, dbSelectEnrollmentType } from "@kanon-academy/db-schema";
import { EnrollmentResponse } from "@kanon-academy/types";

export function toEnrollmentPersistance(
  courseId: number,
  studentId: number
): dbInsertEnrollementType {
  return {
    user_id: studentId,
    course_id: courseId,
    progress: {}
  };
}

export function toEnrollmentResponse(data: dbSelectEnrollmentType): EnrollmentResponse {
  return {
    course_id: data.course_id,
    user_id: data.user_id,
    created_at: data.created_at
  };
}
