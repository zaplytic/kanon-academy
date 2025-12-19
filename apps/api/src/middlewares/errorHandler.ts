import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { AppError, ApiResponse } from "@kanon-academy/types";
import logger from "@/config/logger";
import { ENVIRONMENT } from "@/config/secrets";
import formatZodIssues, { type FormattedZodErrors } from "@/utils/formatZodError";

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(`💥 ${err.stack ?? err.message}`);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: ENVIRONMENT === "development" ? err.stack : undefined
    } as ApiResponse<void>);
  } else if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
      error: formatZodIssues(err.issues)
    } as ApiResponse<void, FormattedZodErrors>);
  } else {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: ENVIRONMENT === "development" ? err.stack : undefined
    } as ApiResponse<void>);
  }
};

export default errorHandler;
