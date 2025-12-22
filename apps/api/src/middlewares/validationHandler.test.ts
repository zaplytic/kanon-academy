import request from "supertest";
import express, { Express, Request, Response, NextFunction } from "express";
import { z } from "zod";
import validationHandler from "./validationHandler";

describe("validationHandler middleware", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
  });

  describe("successful validation", () => {
    test("should pass valid request body through", async () => {
      const schema = z.object({
        body: z.object({
          name: z.string(),
          age: z.number()
        })
      });

      app.post("/test", validationHandler(schema), (req: Request, res: Response) => {
        res.json({ received: req.body });
      });

      const response = await request(app).post("/test").send({ name: "John", age: 30 }).expect(200);

      expect(response.body.received).toEqual({ name: "John", age: 30 });
    });

    test("should validate query parameters", async () => {
      const schema = z.object({
        query: z.object({
          page: z.string().transform(Number),
          limit: z.string().transform(Number)
        })
      });

      app.get("/test", validationHandler(schema), (req: Request, res: Response) => {
        res.json({ query: req.query });
      });

      const response = await request(app).get("/test?page=1&limit=10").expect(200);

      expect(response.body.query).toEqual({ page: 1, limit: 10 });
    });

    test("should validate route params", async () => {
      const schema = z.object({
        params: z.object({
          id: z.uuid()
        })
      });

      app.get("/test/:id", validationHandler(schema), (req: Request, res: Response) => {
        res.json({ params: req.params });
      });

      const uuid = "123e4567-e89b-12d3-a456-426614174000";
      const response = await request(app).get(`/test/${uuid}`).expect(200);

      expect(response.body.params.id).toBe(uuid);
    });

    test("should validate multiple sources simultaneously", async () => {
      const schema = z.object({
        body: z.object({ name: z.string() }),
        query: z.object({ filter: z.string() }),
        params: z.object({ id: z.string() })
      });

      app.post("/test/:id", validationHandler(schema), (req: Request, res: Response) => {
        res.json({
          body: req.body,
          query: req.query,
          params: req.params
        });
      });

      const response = await request(app)
        .post("/test/123?filter=active")
        .send({ name: "Test" })
        .expect(200);

      expect(response.body).toEqual({
        body: { name: "Test" },
        query: { filter: "active" },
        params: { id: "123" }
      });
    });
  });

  describe("validation errors", () => {
    test("should call next with error for invalid body", async () => {
      const schema = z.object({
        body: z.object({
          email: z.email(),
          age: z.number().min(18)
        })
      });

      app.post("/test", validationHandler(schema), (_req: Request, res: Response) => {
        res.json({ success: true });
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        res.status(400).json({
          error: "Validation failed",
          issues: err.issues
        });
      });

      const response = await request(app)
        .post("/test")
        .send({ email: "invalid-email", age: 15 })
        .expect(400);

      expect(response.body.error).toBe("Validation failed");
      expect(response.body.issues).toBeDefined();
    });
  });

  describe("middleware chain", () => {
    test("should work with other middleware", async () => {
      const schema = z.object({
        body: z.object({ message: z.string() })
      });

      const addHeader = (_req: Request, res: Response, next: NextFunction) => {
        res.setHeader("X-Custom-Header", "test");
        next();
      };

      app.post("/test", addHeader, validationHandler(schema), (req: Request, res: Response) => {
        res.json({ received: req.body });
      });

      const response = await request(app).post("/test").send({ message: "hello" }).expect(200);

      expect(response.headers["x-custom-header"]).toBe("test");
      expect(response.body.received.message).toBe("hello");
    });
  });
});
