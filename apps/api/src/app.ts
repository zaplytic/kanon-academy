import express, { Express } from "express";
import rootRouter from "@/routers";
import errorHandler from "@/middlewares/errorHandler";
import { httpLogger } from "@/config/logger";

const app: Express = express();

app.use(httpLogger);

app.use("/api", rootRouter);

app.use(express.json());

app.use(errorHandler);

export default app;
