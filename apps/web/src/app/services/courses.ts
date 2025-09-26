import { ApiResponse, CourseResponse } from "@kanon-academy/types";
import axiosSecure from "../../lib/axios";

export async function getCourses(): Promise<CourseResponse[]> {
  const result = await axiosSecure.get<ApiResponse<CourseResponse[]>>("/courses");

  if (!result.data.success || result.data.data === undefined) {
    throw new Error(result.data.message || "Failed to fetch courses");
  }

  return result.data.data ?? [];
}

export async function getCourse(courseId: string): Promise<CourseResponse> {
  const result = await axiosSecure.get<ApiResponse<CourseResponse>>(`/courses/${courseId}`);
  if (!result.data.success || result.data.data === undefined) {
    throw new Error(result.data.message || "Course not found");
  }

  return result.data.data;
}
