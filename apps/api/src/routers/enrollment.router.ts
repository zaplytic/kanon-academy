import { Router } from "express";
import EnrollmentController from "@/controllers/enrollment.controller";
import { container } from "tsyringe";
import { authHandler } from "@/middlewares/authHandler";

const enrollmentController = container.resolve(EnrollmentController);

const enrollmentRouter = Router();

enrollmentRouter.post("/", authHandler, enrollmentController.handleEnrollment);
enrollmentRouter.delete("/", authHandler, enrollmentController.handleUnenrollment);

export default enrollmentRouter;
