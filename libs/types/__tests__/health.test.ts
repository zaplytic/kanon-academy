import { HealthCheckResponse, HealthStatus, ServiceHealth } from "@/health";

describe("Health Types", () => {
  describe("HealthCheckResponse", () => {
    test("should create a valid healthy response", () => {
      const healthCheck: HealthCheckResponse = {
        status: "healthy",
        timestamp: "2025-01-01T00:00:00.000Z",
        version: "1.0.0",
        uptime: 3600,
        services: [],
      };

      expect(healthCheck.status).toBe("healthy");
      expect(healthCheck.version).toBe("1.0.0");
      expect(healthCheck.uptime).toBe(3600);
      expect(healthCheck.services).toEqual([]);
    });

    test("should create a valid unhealthy response with services", () => {
      const healthCheck: HealthCheckResponse = {
        status: "unhealthy",
        timestamp: "2025-01-01T00:00:00.000Z",
        version: "1.0.0",
        uptime: 1800,
        services: [
          {
            name: "database",
            message: "Database connection failed",
            status: "unhealthy",
            error: "Connection failed",
          },
        ],
      };

      expect(healthCheck.status).toBe("unhealthy");
      expect(healthCheck.services).toHaveLength(1);
      expect(healthCheck.services[0].error).toBe("Connection failed");
    });

    test("should create a valid degraded response", () => {
      const healthCheck: HealthCheckResponse = {
        status: "degraded",
        timestamp: "2025-01-01T00:00:00.000Z",
        version: "1.0.0",
        uptime: 7200,
        services: [
          {
            name: "cache",
            message: "Cache response time is high",
            status: "degraded",
            responseTime: 500,
          },
        ],
      };

      expect(healthCheck.status).toBe("degraded");
      expect(healthCheck.services[0].responseTime).toBe(500);
    });
  });

  describe("ServiceHealth", () => {
    test("should create a healthy service", () => {
      const service: ServiceHealth = {
        name: "database",
        message: "Database is running smoothly",
        status: "healthy",
        responseTime: 25,
      };

      expect(service.name).toBe("database");
      expect(service.status).toBe("healthy");
      expect(service.responseTime).toBe(25);
      expect(service.error).toBeUndefined();
    });

    test("should create an unhealthy service with error", () => {
      const service: ServiceHealth = {
        name: "redis",
        status: "unhealthy",
        message: "Redis connection failed",
        error: "Connection timeout after 5000ms",
      };

      expect(service.name).toBe("redis");
      expect(service.status).toBe("unhealthy");
      expect(service.error).toBe("Connection timeout after 5000ms");
      expect(service.responseTime).toBeUndefined();
    });

    test("should create a degraded service", () => {
      const service: ServiceHealth = {
        name: "external-api",
        status: "degraded",
        responseTime: 2000,
        message: "External API response time is high",
      };

      expect(service.name).toBe("external-api");
      expect(service.status).toBe("degraded");
      expect(service.responseTime).toBe(2000);
    });
  });

  describe("HealthStatus", () => {
    test("should accept valid health status values", () => {
      const healthy: HealthStatus = "healthy";
      const unhealthy: HealthStatus = "unhealthy";
      const degraded: HealthStatus = "degraded";

      expect(healthy).toBe("healthy");
      expect(unhealthy).toBe("unhealthy");
      expect(degraded).toBe("degraded");
    });
  });
});
