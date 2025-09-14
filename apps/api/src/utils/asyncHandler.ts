import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
