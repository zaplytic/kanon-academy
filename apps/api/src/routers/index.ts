import { Router } from "express";
import healthCheckRouter from "@/routers/healthCheck.router";
import authRouter from "@/routers/auth.router";
import courseRouter from "@/routers/course.router";

const rootRouter: Router = Router();

rootRouter.use("/healthCheck", healthCheckRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/courses", courseRouter);

export default rootRouter;
