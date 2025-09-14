import { Router } from "express";
import healthCheckRouter from "@/routers/healthCheck.router";
import authRouter from "@/routers/auth.router";

const rootRouter: Router = Router();

rootRouter.use("/healthCheck", healthCheckRouter);
rootRouter.use("/auth", authRouter);

export default rootRouter;
