import { Router } from "express";
import { container } from "tsyringe";
import asyncHandler from "@/utils/asyncHandler";
import CourseController from "@/controllers/course.controller";

import enrollmentRouter from "./enrollment.router";
import { authHandler } from "@/middlewares/authHandler";

const courseRouter = Router();

const courseController = container.resolve(CourseController);

courseRouter.get("/", asyncHandler(courseController.handleGetAll));
courseRouter.get("/enrolled", authHandler, asyncHandler(courseController.handleGetUserCourses));
courseRouter.get("/:id", asyncHandler(courseController.handleGetById));

courseRouter.use("/:courseId/enrollment", enrollmentRouter);

export default courseRouter;
