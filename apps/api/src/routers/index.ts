import { Router } from "express";
import healthCheckRouter from "@/routers/healthCheck.router";

const rootRouter: Router = Router();

rootRouter.use("/healthCheck", healthCheckRouter);

export default rootRouter;
