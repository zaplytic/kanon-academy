import type { JwtPayload } from "@kanon-academy/types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
