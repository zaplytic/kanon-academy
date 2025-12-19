import { CourseRepoSelectType, CourseResponse } from "@kanon-academy/types";

export function toCourseResponse(data: CourseRepoSelectType): CourseResponse {
  return {
    id: data.id,
    title: data.title,
    status: data.status,
    description: data.description,
    featured_image_link: data.featured_image_link,
    created_at: data.created_at,
    instructor_name: data.instructor?.full_name ?? null,
    category_name: data.category?.name ?? null
  };
}
