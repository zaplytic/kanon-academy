import {
  dbSelectCategoryType,
  dbSelectCourseType,
  dbSelectEnrollmentType,
  dbSelectUserType
} from "@kanon-academy/db-schema";

export type CourseResponse = Omit<
  dbSelectCourseType,
  "updated_at" | "deleted_at" | "category_id" | "instructor_id"
> & {
  instructor_name: string | null;
  category_name: string | null;
};

export type CourseRepoSelectType = dbSelectCourseType & {
  instructor?: dbSelectUserType | undefined;
  category?: dbSelectCategoryType | undefined;
  enrollments?: dbSelectEnrollmentType[] | undefined;
};
