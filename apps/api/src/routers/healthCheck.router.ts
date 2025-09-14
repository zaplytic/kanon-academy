import HealthCheckController from "@/controllers/healthCheck.controller";
import asyncHandler from "@/utils/asyncHandler";

import { Router } from "express";
import { container } from "tsyringe";

const healthCheckController = container.resolve(HealthCheckController);

const healthCheckRouter = Router();
healthCheckRouter.get("/", asyncHandler(healthCheckController.handleHealthCheck));

export default healthCheckRouter;
