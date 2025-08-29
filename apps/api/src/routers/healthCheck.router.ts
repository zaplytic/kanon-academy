import HealthCheckController from "@/controllers/healthCheck.controller";

import { Router } from "express";
import { container } from "tsyringe";

const healthCheckController = container.resolve(HealthCheckController);

const healthCheckRouter: Router = Router();
healthCheckRouter.get("/", healthCheckController.handleHealthCheck);

export default healthCheckRouter;
