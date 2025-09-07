import { pinoHttp } from "pino-http";
import pino from "pino";

export const httpLogger = pinoHttp({
  transport: {
    target: "pino-pretty",
    options: {
      ignore: "pid,hostname,req.headers,res.headers"
    }
  },
  level: "info",
  timestamp: pino.stdTimeFunctions.isoTime
});

const logger = httpLogger.logger;

export default logger;
