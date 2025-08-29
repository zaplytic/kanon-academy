import { DrizzleError, DrizzleQueryError } from "drizzle-orm";
import { singleton } from "tsyringe";
import { performance } from "perf_hooks";

import logger from "@/config/logger";
import HealthCheckRepository from "@/repositories/healthCheck.repo";
import { ServiceHealth } from "@kanon/types";

@singleton()
export default class HealthCheckService {
  constructor(private readonly healthCheckRepo: HealthCheckRepository) {}

  async dbHealthCheck(): Promise<ServiceHealth> {
    const startTime = performance.now();
    let dbHealth: ServiceHealth = {
      name: "Database (Postgres)",
      status: "unhealthy",
      message: "Connection successful",
    };

    try {
      await this.healthCheckRepo.dbSelectOne();
      const endTime = performance.now();

      const responseTime = endTime - startTime;
      return {
        ...dbHealth,
        status: "healthy",
        responseTime: responseTime,
      };
    } catch (error) {
      if (error instanceof DrizzleError || error instanceof DrizzleQueryError) {
        return {
          ...dbHealth,
          message: "Connection or query error",
          error: error.message,
        };
      } else {
        return {
          ...dbHealth,
          message: "Unknown error occurred during db ping",
          error: error instanceof Error ? error.message : `${error}`,
        };
      }
    }
  }

  async dbConnectionCheck(): Promise<void> {
    try {
      await this.healthCheckRepo.dbSelectOne();
      logger.info("Database connected successfully");
    } catch (error) {
      if (error instanceof DrizzleError) {
        logger.error({ error: error }, "Database connection error: ");
      } else if (error instanceof DrizzleQueryError) {
        logger.error({ error: error }, "Database query error: ");
      } else if (error instanceof Error) {
        logger.error(
          { error: error },
          "Unexpected error during database check: ",
        );
      }
    }
  }
}
