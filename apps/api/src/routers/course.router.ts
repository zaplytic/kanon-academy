import { Router } from "express";
import { container } from "tsyringe";
import asyncHandler from "@/utils/asyncHandler";
import CourseController from "@/controllers/course.controller";

import enrollmentRouter from "./enrollment.router";

const courseRouter = Router();

const courseController = container.resolve(CourseController);

courseRouter.get("/", asyncHandler(courseController.handleGetAll));
courseRouter.get("/:id", asyncHandler(courseController.handleGetById));

courseRouter.use("/:courseId/enrollment", enrollmentRouter);

export default courseRouter;
