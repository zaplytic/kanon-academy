import request from "supertest";
import express, { Express, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AppError } from "@kanon-academy/types";
import errorHandler from "./errorHandler";
import logger from "../config/logger";

jest.mock("@/config/logger", () => ({
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn()
}));

jest.mock("@/config/secrets", () => ({
  ENVIRONMENT: "development"
}));

describe("errorHandler middleware", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  describe("AppError handling", () => {
    test("should handle AppError with correct status code and message", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new AppError("Resource not found", 404));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test").expect(404);

      expect(response.body).toMatchObject({
        success: false,
        message: "Resource not found",
        timestamp: expect.any(String)
      });
      expect(response.body.error).toBeDefined(); // Stack trace in development
    });

    test("should handle unauthorized error", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new AppError("Unauthorized access", 401));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test").expect(401);

      expect(response.body).toMatchObject({
        success: false,
        message: "Unauthorized access"
      });
    });

    test("should handle forbidden error", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new AppError("Access forbidden", 403));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test").expect(403);

      expect(response.body.message).toBe("Access forbidden");
    });

    test("should log AppError", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new AppError("Test error", 400));
      });
      app.use(errorHandler);

      await request(app).get("/test");

      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe("ZodError handling", () => {
    test("should handle ZodError with 400 status", async () => {
      app.post("/test", (_req: Request, _res: Response, next: NextFunction) => {
        const schema = z.object({
          email: z.email(),
          age: z.number().min(18)
        });

        try {
          schema.parse({ email: "invalid", age: 15 });
        } catch (error) {
          next(error);
        }
      });
      app.use(errorHandler);

      const response = await request(app).post("/test").expect(400);

      expect(response.body).toMatchObject({
        success: false,
        message: "Invalid request data",
        timestamp: expect.any(String)
      });
      expect(response.body.error).toBeDefined();
    });

    test("should format ZodError issues correctly", async () => {
      app.post("/test", (_req: Request, _res: Response, next: NextFunction) => {
        const schema = z.object({
          username: z.string().min(3),
          password: z.string().min(8)
        });

        try {
          schema.parse({ username: "ab", password: "short" });
        } catch (error) {
          next(error);
        }
      });
      app.use(errorHandler);

      const response = await request(app).post("/test").expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid request data");
      expect(response.body.error).toBeDefined();
    });

    test("should handle nested ZodError validation", async () => {
      app.post("/test", (_req: Request, _res: Response, next: NextFunction) => {
        const schema = z.object({
          user: z.object({
            profile: z.object({
              age: z.number().positive()
            })
          })
        });

        try {
          schema.parse({ user: { profile: { age: -5 } } });
        } catch (error) {
          next(error);
        }
      });
      app.use(errorHandler);

      const response = await request(app).post("/test").expect(400);

      expect(response.body.message).toBe("Invalid request data");
    });

    test("should log ZodError", async () => {
      app.post("/test", (_req: Request, _res: Response, next: NextFunction) => {
        const schema = z.object({ name: z.string() });
        try {
          schema.parse({ name: 123 });
        } catch (error) {
          next(error);
        }
      });
      app.use(errorHandler);

      await request(app).post("/test");

      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe("Generic Error handling", () => {
    test("should handle generic errors with 500 status", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new Error("Something went wrong"));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test").expect(500);

      expect(response.body).toMatchObject({
        success: false,
        message: "Internal Server Error",
        timestamp: expect.any(String)
      });
    });

    test("should include stack trace in development mode", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new Error("Test error"));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test").expect(500);

      expect(response.body.error).toBeDefined();
      expect(typeof response.body.error).toBe("string");
    });

    test("should handle TypeError", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new TypeError("Invalid type"));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test").expect(500);

      expect(response.body.message).toBe("Internal Server Error");
    });

    test("should handle ReferenceError", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new ReferenceError("Variable not defined"));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test").expect(500);

      expect(response.body.success).toBe(false);
    });

    test("should log generic errors", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new Error("Generic error"));
      });
      app.use(errorHandler);

      await request(app).get("/test");

      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe("Production mode", () => {
    beforeEach(() => {
      jest.mock("@/config/secrets", () => ({
        ENVIRONMENT: "production"
      }));
    });

    test("should not include stack trace for AppError in production", async () => {
      const secrets = require("@/config/secrets");
      secrets.ENVIRONMENT = "production";

      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new AppError("Production error", 400));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test").expect(400);

      expect(response.body.error).toBeUndefined();

      secrets.ENVIRONMENT = "development";
    });

    test("should not include stack trace for generic errors in production", async () => {
      const secrets = require("@/config/secrets");
      secrets.ENVIRONMENT = "production";

      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new Error("Production error"));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test").expect(500);

      expect(response.body.error).toBeUndefined();

      secrets.ENVIRONMENT = "development";
    });
  });

  describe("Response format", () => {
    test("should always include timestamp", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new Error("Test"));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test");

      expect(response.body.timestamp).toBeDefined();
      expect(new Date(response.body.timestamp).toString()).not.toBe("Invalid Date");
    });

    test("should always set success to false", async () => {
      app.get("/test1", (_req: Request, _res: Response, next: NextFunction) => {
        next(new AppError("Error 1", 400));
      });
      app.get("/test2", (_req: Request, _res: Response, next: NextFunction) => {
        const schema = z.object({ test: z.string() });
        try {
          schema.parse({ test: 123 });
        } catch (error) {
          next(error);
        }
      });
      app.get("/test3", (_req: Request, _res: Response, next: NextFunction) => {
        next(new Error("Error 3"));
      });
      app.use(errorHandler);

      const response1 = await request(app).get("/test1");
      const response2 = await request(app).get("/test2");
      const response3 = await request(app).get("/test3");

      expect(response1.body.success).toBe(false);
      expect(response2.body.success).toBe(false);
      expect(response3.body.success).toBe(false);
    });

    test("should always include message field", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new Error("Test message"));
      });
      app.use(errorHandler);

      const response = await request(app).get("/test");

      expect(response.body.message).toBeDefined();
      expect(typeof response.body.message).toBe("string");
    });
  });

  describe("Error logging", () => {
    test("should log error message when stack is not available", async () => {
      const errorWithoutStack = new Error("No stack trace");
      delete errorWithoutStack.stack;

      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(errorWithoutStack);
      });
      app.use(errorHandler);

      await request(app).get("/test");

      expect(logger.error).toHaveBeenCalledWith(expect.stringContaining("No stack trace"));
    });

    test("should log stack trace when available", async () => {
      app.get("/test", (_req: Request, _res: Response, next: NextFunction) => {
        next(new Error("Error with stack"));
      });
      app.use(errorHandler);

      await request(app).get("/test");

      expect(logger.error).toHaveBeenCalledWith(expect.stringContaining("💥"));
    });
  });
});
