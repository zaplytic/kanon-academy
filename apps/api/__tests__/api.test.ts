import app from "@/app";
import { ServiceHealth } from "@kanon/types";

import { pool } from "@/db";

import request from "supertest";

describe("Health Check API", () => {
  it("should return health check response with status 200", async () => {
    const response = await request(app).get("/api/healthcheck");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("version");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("services");
  });

  it("should return services with correct structure", async () => {
    const response = await request(app).get("/api/healthcheck");

    const services: ServiceHealth[] = response.body.services;
    expect(Array.isArray(services)).toBe(true);
    services.forEach((service) => {
      expect(service).toHaveProperty("name");
      expect(service).toHaveProperty("status");
      expect(service).toHaveProperty("message");
      expect(service).toHaveProperty("responseTime");
    });
  });

  afterAll(async () => {
    await pool.end();
  });
});
