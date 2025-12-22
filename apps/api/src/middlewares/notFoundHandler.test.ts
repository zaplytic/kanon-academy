import notFoundHandler from "./notFoundHandler";
import express, { Express } from "express";
import request from "supertest";
import errorHandler from "./errorHandler";

describe("notFoundHandler", () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(notFoundHandler);
    app.use(errorHandler); // since notFoundHandler just throws the error
  });

  describe("HTTP methods", () => {
    test("should return a 404 using GET on unknown path", async () => {
      const response = await request(app).get("/unknown-get").expect(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("requested path /unknown-get does not exist");
    });

    test("should return a 404 using post on unknown path", async () => {
      const response = await request(app).post("/unknown-post").expect(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("requested path /unknown-post does not exist");
    });

    test("should return a 404 using patch on unknown path", async () => {
      const response = await request(app).patch("/unknown-patch").expect(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("requested path /unknown-patch does not exist");
    });

    test("should return a 404 using put on unknown path", async () => {
      const response = await request(app).put("/unknown-put").expect(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("requested path /unknown-put does not exist");
    });

    test("should return a 404 using delete on unknown path", async () => {
      const response = await request(app).delete("/unknown-delete").expect(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("requested path /unknown-delete does not exist");
    });
  });

  describe("different path formats", () => {
    test("should handle root path", async () => {
      const response = await request(app).get("/").expect(404);

      expect(response.body.message).toBe("requested path / does not exist");
    });

    test("should handle nested paths", async () => {
      const response = await request(app).get("/api/v1/users/123").expect(404);

      expect(response.body.message).toBe("requested path /api/v1/users/123 does not exist");
    });

    test("should handle paths with query parameters", async () => {
      const response = await request(app).get("/search?query=test&page=1").expect(404);

      expect(response.body.message).toBe("requested path /search does not exist");
    });

    test("should handle paths with special characters", async () => {
      const response = await request(app).get("/users/john-doe_123").expect(404);

      expect(response.body.message).toBe("requested path /users/john-doe_123 does not exist");
    });

    test("should handle encoded paths", async () => {
      const response = await request(app).get("/users/john%20doe").expect(404);

      expect(response.body.message).toBe("requested path /users/john%20doe does not exist");
    });
  });

  describe("edge cases", () => {
    test("should handle very long paths", async () => {
      const longPath = "/a".repeat(100);
      const response = await request(app).get(longPath).expect(404);

      expect(response.body.message).toBe(`requested path ${longPath} does not exist`);
    });

    test("should handle paths with trailing slashes", async () => {
      const response = await request(app).get("/test/").expect(404);

      expect(response.body.message).toBe("requested path /test/ does not exist");
    });
  });
});
