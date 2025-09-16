import { NextFunction, Request, Response, RequestHandler } from "express";

const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    void Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
