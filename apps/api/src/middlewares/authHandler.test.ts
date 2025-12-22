import request from "supertest";
import express, { Express, Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "@kanon-academy/types";
import { authHandler } from "./authHandler";
import errorHandler from "./errorHandler";

jest.mock("@/config/secrets", () => ({
  JWT_SECRET: "test-secret-key-for-testing",
  ENVIRONMENT: "test"
}));

const JWT_SECRET = "test-secret-key-for-testing";

describe("authHandler middleware", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  const createValidToken = (payload: Partial<JwtPayload> = {}): string => {
    const defaultPayload: JwtPayload = {
      sub: "user-123",
      email: "test@example.com",
      ...payload
    };

    return jwt.sign(defaultPayload, JWT_SECRET, {
      algorithm: "HS256",
      issuer: "kanon-academy",
      audience: "kanon-academy-app",
      expiresIn: "1h"
    });
  };

  describe("successful authentication", () => {
    test("should authenticate with valid token", async () => {
      const token = createValidToken();

      app.get("/protected", authHandler, (req: Request, res: Response) => {
        res.json({ user: req.user });
      });

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.user).toMatchObject({
        sub: "user-123",
        email: "test@example.com"
      });
    });

    test("should attach user to request object", async () => {
      const token = createValidToken({
        sub: "admin-456",
        email: "admin@example.com"
      });

      app.get("/protected", authHandler, (req: Request, res: Response) => {
        res.json({
          hasUser: !!req.user,
          sub: req.user?.sub
        });
      });

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.hasUser).toBe(true);
      expect(response.body.sub).toBe("admin-456");
    });

    test("should allow token with different payload fields", async () => {
      const token = createValidToken({
        sub: "test-user",
        email: "custom@example.com"
      });

      app.get("/protected", authHandler, (req: Request, res: Response) => {
        res.json({ email: req.user?.email });
      });

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.email).toBe("custom@example.com");
    });
  });

  describe("missing or invalid authorization header", () => {
    test("should reject request without authorization header", async () => {
      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      const response = await request(app).get("/protected").expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Invalid authorization header");
    });

    test("should reject authorization header without Bearer prefix", async () => {
      const token = createValidToken();

      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      const response = await request(app).get("/protected").set("Authorization", token).expect(401);

      expect(response.body.message).toContain("Invalid authorization header");
    });

    test("should reject malformed Bearer token", async () => {
      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      const response = await request(app)
        .get("/protected")
        .set("Authorization", "Bearer invalid-token-format")
        .expect(401);

      expect(response.body.message).toContain("Invalid Authorization header format");
    });

    test("should reject empty Bearer token", async () => {
      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      await request(app).get("/protected").set("Authorization", "Bearer ").expect(401);
    });
  });

  describe("invalid token format", () => {
    test("should reject token with invalid JWT structure", async () => {
      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      await request(app)
        .get("/protected")
        .set("Authorization", "Bearer not.a.valid.jwt")
        .expect(401);
    });

    test("should reject token with only two parts", async () => {
      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      await request(app)
        .get("/protected")
        .set("Authorization", "Bearer header.payload")
        .expect(401);
    });

    test("should reject token with special characters", async () => {
      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      await request(app)
        .get("/protected")
        .set("Authorization", "Bearer abc!@#.def$%^.ghi&*()")
        .expect(401);
    });
  });

  describe("token verification failures", () => {
    test("should reject expired token", async () => {
      const expiredToken = jwt.sign({ sub: "user-123", email: "test@example.com" }, JWT_SECRET, {
        algorithm: "HS256",
        issuer: "kanon-academy",
        audience: "kanon-academy-app",
        expiresIn: "-1h" // Expired 1 hour ago
      });

      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${expiredToken}`)
        .expect(401);

      expect(response.body.message).toContain("not valid or expired");
    });

    test("should reject token with wrong secret", async () => {
      const wrongSecretToken = jwt.sign(
        { sub: "user-123", email: "test@example.com" },
        "wrong-secret",
        {
          algorithm: "HS256",
          issuer: "kanon-academy",
          audience: "kanon-academy-app",
          expiresIn: "1h"
        }
      );

      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${wrongSecretToken}`)
        .expect(401);

      expect(response.body.message).toContain("not valid or expired");
    });

    test("should reject token with wrong algorithm", async () => {
      // Create token with HS512 instead of HS256
      const wrongAlgoToken = jwt.sign({ sub: "user-123", email: "test@example.com" }, JWT_SECRET, {
        algorithm: "HS512", // Different algorithm
        issuer: "kanon-academy",
        audience: "kanon-academy-app",
        expiresIn: "1h"
      });

      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${wrongAlgoToken}`)
        .expect(401);

      expect(response.body.message).toContain("not valid or expired");
    });

    test("should reject token with wrong issuer", async () => {
      const wrongIssuerToken = jwt.sign(
        { sub: "user-123", email: "test@example.com" },
        JWT_SECRET,
        {
          algorithm: "HS256",
          issuer: "wrong-issuer",
          audience: "kanon-academy-app",
          expiresIn: "1h"
        }
      );

      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${wrongIssuerToken}`)
        .expect(401);

      expect(response.body.message).toContain("not valid or expired");
    });

    test("should reject token with wrong audience", async () => {
      const wrongAudienceToken = jwt.sign(
        { sub: "user-123", email: "test@example.com" },
        JWT_SECRET,
        {
          algorithm: "HS256",
          issuer: "kanon-academy",
          audience: "wrong-audience",
          expiresIn: "1h"
        }
      );

      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${wrongAudienceToken}`)
        .expect(401);

      expect(response.body.message).toContain("not valid or expired");
    });
  });

  describe("middleware chain integration", () => {
    test("should work with other middleware before auth", async () => {
      const token = createValidToken();

      const customMiddleware = (_req: Request, res: Response, next: NextFunction) => {
        res.setHeader("X-Custom-Header", "test");
        next();
      };

      app.get("/protected", customMiddleware, authHandler, (_req: Request, res: Response) => {
        res.json({ authenticated: true });
      });

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.headers["x-custom-header"]).toBe("test");
      expect(response.body.authenticated).toBe(true);
    });

    test("should work with multiple protected routes", async () => {
      const token = createValidToken();

      app.get("/route1", authHandler, (req: Request, res: Response) => {
        res.json({ route: "1", sub: req.user?.sub });
      });

      app.get("/route2", authHandler, (req: Request, res: Response) => {
        res.json({ route: "2", sub: req.user?.sub });
      });

      const response1 = await request(app)
        .get("/route1")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      const response2 = await request(app)
        .get("/route2")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response1.body.sub).toBe("user-123");
      expect(response2.body.sub).toBe("user-123");
    });

    test("should not authenticate unprotected routes", async () => {
      const token = createValidToken();

      app.get("/public", (req: Request, res: Response) => {
        res.json({ public: true, hasUser: !!req.user });
      });

      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ protected: true });
      });

      const publicResponse = await request(app).get("/public").expect(200);

      expect(publicResponse.body.hasUser).toBe(false);

      await request(app).get("/protected").set("Authorization", `Bearer ${token}`).expect(200);
    });
  });

  describe("clock tolerance", () => {
    test("should accept token issued slightly in the future (within tolerance)", async () => {
      const futureToken = jwt.sign({ sub: "user-123", email: "test@example.com" }, JWT_SECRET, {
        algorithm: "HS256",
        issuer: "kanon-academy",
        audience: "kanon-academy-app",
        expiresIn: "1h",
        notBefore: "3s" // Not valid yet, but within 5s tolerance
      });

      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });

      await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${futureToken}`)
        .expect(200);
    });
  });

  describe("error message format", () => {
    test("should include error details in message", async () => {
      const expiredToken = jwt.sign({ sub: "user-123", email: "test@example.com" }, JWT_SECRET, {
        algorithm: "HS256",
        issuer: "kanon-academy",
        audience: "kanon-academy-app",
        expiresIn: "-1h"
      });

      app.get("/protected", authHandler, (_req: Request, res: Response) => {
        res.json({ success: true });
      });
      app.use(errorHandler);

      const response = await request(app)
        .get("/protected")
        .set("Authorization", `Bearer ${expiredToken}`)
        .expect(401);

      expect(response.body.message).toContain("Authorization token is not valid or expired");
      expect(response.body.message).toContain("because:");
    });
  });
});
