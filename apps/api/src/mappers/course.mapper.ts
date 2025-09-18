import { CourseRepoSelectType, CourseResponse } from "@kanon-academy/types";

export function toCourseResponse(data: CourseRepoSelectType): CourseResponse {
  return {
    id: data.courses.id,
    title: data.courses.title,
    status: data.courses.status,
    description: data.courses.description,
    featured_image_link: data.courses.featured_image_link,
    created_at: data.courses.created_at,
    instructor_name: data.users.full_name ?? null,
    category_name: data.categories.name
  };
}
