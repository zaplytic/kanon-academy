import { JWT_SECRET } from "@/config/secrets";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload, UnauthorizedError } from "@kanon-academy/types";

export function authHandler(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new UnauthorizedError("Invalid authorization header"));
    }

    const match = authHeader.match(
      /^Bearer\s+([A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+)$/i
    );

    if (!match) {
      return next(new UnauthorizedError("Invalid Authorization header format"));
    }

    const token = match[1];

    const decodedPaylod: JwtPayload = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
      issuer: "kanon-academy",
      audience: "kanon-academy-app",
      clockTolerance: 5
    }) as JwtPayload;
    req.user = decodedPaylod;

    return next();
  } catch (error) {
    return next(
      new UnauthorizedError(`Authorization token is not valid or expired, because: ${error}`)
    );
  }
}
