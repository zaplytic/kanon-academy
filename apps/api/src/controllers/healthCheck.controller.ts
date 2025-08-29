import { Request, Response } from "express";
import { HealthCheckResponse, ServiceHealth } from "@kanon/types";
import { singleton } from "tsyringe";
import HealthCheckService from "@/services/healthCheck.service";
import { PACKAGE_VERSION } from "@/config/secrets";

@singleton()
export default class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  handleHealthCheck = async (_req: Request, res: Response) => {
    const appVersion: string = PACKAGE_VERSION;
    const appUptime: number = process.uptime();

    const dbHealth = await this.healthCheckService.dbHealthCheck();

    const services: ServiceHealth[] = [dbHealth];

    let overallStatus: HealthCheckResponse["status"] = "healthy";
    if (services.some((s) => s.status === "unhealthy")) {
      overallStatus = "unhealthy";
    } else if (services.some((s) => s.status === "degraded")) {
      overallStatus = "degraded";
    }

    const healthCheckResponse: HealthCheckResponse = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: appVersion,
      uptime: appUptime,
      services: services,
    };

    res.status(200).json(healthCheckResponse);
  };
}
