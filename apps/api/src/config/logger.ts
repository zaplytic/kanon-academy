import { pinoHttp } from "pino-http";
import pino from "pino";
import { ENVIRONMENT } from "@/config/secrets";

export const httpLogger = pinoHttp({
  transport:
    ENVIRONMENT !== "test"
      ? {
          target: "pino-pretty",
          options: {
            ignore: "pid,hostname,req.headers,res.headers"
          }
        }
      : undefined,
  level: ENVIRONMENT === "test" ? "silent" : "info",
  timestamp: pino.stdTimeFunctions.isoTime
});

const logger = httpLogger.logger;

export default logger;
