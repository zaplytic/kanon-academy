export interface ServiceHealth {
  name: string;
  status: "healthy" | "unhealthy" | "degraded";
  message: string;
  responseTime?: number;
  error?: string;
}

export type HealthStatus = "healthy" | "unhealthy" | "degraded";

export interface HealthCheckResponse {
  status: "healthy" | "unhealthy" | "degraded";
  timestamp: string;
  version: string;
  uptime: number;
  services: ServiceHealth[];
}
