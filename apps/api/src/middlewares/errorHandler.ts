import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@kanon-academy/types";
import logger from "@/config/logger";
import { ENVIRONMENT } from "@/config/secrets";
import formatZodIssues from "@/utils/formatZodError";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  logger.error(`💥: ${err.message}`);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  } else if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: formatZodIssues(err.issues)
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: ENVIRONMENT === "development" ? err.stack : undefined
    });
  }
};

export default errorHandler;
