import { Request, Response } from "express";
import { singleton } from "tsyringe";

import CourseService from "@/services/course.service";
import {
  CourseResponse,
  ApiResponse,
  BadRequestError,
  UnauthorizedError
} from "@kanon-academy/types";

@singleton()
export default class CourseController {
  constructor(private readonly courseService: CourseService) {}

  handleGetById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
      throw new BadRequestError("Invalid course ID. Must be a positive integer");
    }

    const result = await this.courseService.getById(id);

    const response: ApiResponse<CourseResponse> = {
      success: true,
      message: "Course found",
      data: result,
      timestamp: new Date().toISOString()
    };

    res.status(200).json(response);
  };

  handleGetAll = async (_req: Request, res: Response) => {
    const result = await this.courseService.getAll();

    const response: ApiResponse<CourseResponse[]> = {
      success: true,
      message: `${result.length} courses found`,
      data: result,
      timestamp: new Date().toISOString()
    };

    res.status(200).json(response);
  };

  handleGetUserCourses = async (req: Request, res: Response) => {
    const userEmail = req.user?.email;

    if (userEmail === undefined) {
      throw new UnauthorizedError();
    }

    const result = await this.courseService.getUserCourses(userEmail);

    const response: ApiResponse<CourseResponse[]> = {
      success: true,
      message: `${result.length} courses found`,
      data: result,
      timestamp: new Date().toISOString()
    };

    res.status(200).json(response);
  };
}
