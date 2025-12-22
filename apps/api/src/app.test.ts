import request from "supertest";
import app from "./app";
import { pool } from "./db";
import { HealthCheckResponse, ApiResponse } from "@kanon-academy/types";

global.afterAll(async () => {
  await pool.end();
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateApiResponse = (body: any) => {
  expect(body).toHaveProperty("success");
  expect(body).toHaveProperty("message");
  expect(body).toHaveProperty("timestamp");
  expect(typeof body.success).toBe("boolean");
  expect(typeof body.message).toBe("string");
  expect(typeof body.timestamp).toBe("string");
};

describe("Health Check", () => {
  test("should return a healthy response", async () => {
    const res = await request(app).get("/api/healthCheck").expect(200);

    validateApiResponse(res.body);
    expect(res.body.success).toBe(true);

    const data = (res.body as ApiResponse<HealthCheckResponse>).data;
    expect(data?.status).toBe("healthy");
    expect(data?.services).toHaveLength(1);
  });

  test("database should be healthy", async () => {
    const res = await request(app).get("/api/healthCheck").expect(200);

    validateApiResponse(res.body);

    const data = (res.body as ApiResponse<HealthCheckResponse>).data;
    expect(data?.services[0].name).toContain("Database");
    expect(data?.services[0].status).toBe("healthy");
    expect(data?.services[0].message).toBe("Connection successful");
  });
});

describe("Middleware", () => {
  test("should allow CORS from allowed origins", async () => {
    const res = await request(app).get("/api/healthCheck").set("Origin", "http://localhost:4200");

    expect(res.headers["access-control-allow-origin"]).toBe("http://localhost:4200");
    expect(res.headers["access-control-allow-credentials"]).toBe("true");
  });

  test("should block CORS from disallowed origins", async () => {
    const res = await request(app).get("/api/healthCheck").set("Origin", "http://evil-site.com");

    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });
});

describe("Error Handling", () => {
  test("should return 404 for unknown routes with ApiResponse structure", async () => {
    const res = await request(app).get("/api/unknown-route");

    expect(res.status).toBe(404);
    validateApiResponse(res.body);
    expect(res.body.success).toBe(false);
  });
});

describe("API Routes", () => {
  test("should mount routes under /api prefix", async () => {
    const res = await request(app).get("/api/healthCheck");

    expect(res.status).not.toBe(404);
    validateApiResponse(res.body);
  });

  test("should not respond to routes without /api prefix", async () => {
    const res = await request(app).get("/healthCheck");

    expect(res.status).toBe(404);
    validateApiResponse(res.body);
  });
});
