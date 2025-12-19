import { singleton } from "tsyringe";
import CourseRepository from "@/repositories/course.repo";
import { toCourseResponse } from "@/mappers/course.mapper";
import { CourseRepoSelectType, CourseResponse, NotFoundError } from "@kanon-academy/types";

@singleton()
export default class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async getById(id: number): Promise<CourseResponse> {
    const course = await this.courseRepository.findCourseById(id);
    if (!course) {
      throw new NotFoundError(`Course with id:${id} not found`);
    }
    return toCourseResponse(course);
  }

  async getAll(): Promise<CourseResponse[]> {
    const publishedCourses: CourseRepoSelectType[] = await this.courseRepository.getAllCourse();
    return publishedCourses.map(toCourseResponse);
  }

  async getUserCourses(userEmail: string): Promise<CourseResponse[]> {
    const publishedCourses = await this.courseRepository.getUserCourses(userEmail);
    return publishedCourses.map(toCourseResponse);
  }
}
