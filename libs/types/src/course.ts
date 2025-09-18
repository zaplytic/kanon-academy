import {
  dbSelectCategoryType,
  dbSelectCourseType,
  dbSelectUserType
} from "@kanon-academy/db-schema";

export type CourseResponse = Omit<
  dbSelectCourseType,
  "updated_at" | "deleted_at" | "category_id" | "instructor_id"
> & {
  instructor_name: string | null;
  category_name: string;
};

export type CourseRepoSelectType = {
  courses: dbSelectCourseType;
  users: dbSelectUserType;
  categories: dbSelectCategoryType;
};
