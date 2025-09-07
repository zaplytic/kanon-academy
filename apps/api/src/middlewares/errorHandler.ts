import logger from "@/config/logger";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@kanon-academy/types";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.error(`💥: ${err.message}`);

    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  } else {
    logger.error(`💥: ${err.message}`);

    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  }
};

export default errorHandler;
