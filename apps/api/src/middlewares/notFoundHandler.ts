import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "@kanon-academy/types";

export default function notFoundHandler(req: Request, _: Response, next: NextFunction) {
  next(new NotFoundError(`requested path ${req.path} does not exist`));
}
