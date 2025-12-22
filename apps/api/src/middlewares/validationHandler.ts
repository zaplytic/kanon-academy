import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export default function validationHandler(schema: ZodObject) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      req.body = parsed.body;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      req.query = (parsed as any).query;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      req.params = (parsed as any).params;

      return next();
    } catch (error) {
      return next(error);
    }
  };
}
