import express, { Express } from "express";
import cors from "cors";
import rootRouter from "@/routers";
import errorHandler from "@/middlewares/errorHandler";
import { httpLogger } from "@/config/logger";
import { corsOptions } from "@/config/cors";

const app: Express = express();

app.use(httpLogger);

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", rootRouter);
app.use(errorHandler);

export default app;
