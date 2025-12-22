import "reflect-metadata";

import type { JwtPayload } from "@kanon-academy/types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
