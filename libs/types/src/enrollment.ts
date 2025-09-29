import { dbSelectEnrollmentType } from "@kanon-academy/db-schema";

export type EnrollmentResponse = Omit<
  dbSelectEnrollmentType,
  "updated_at" | "deleted_at" | "progress"
>;
