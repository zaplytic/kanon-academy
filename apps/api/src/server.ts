import "reflect-metadata";
import app from "@/app";
import * as secrets from "@/config/secrets";
import HealthCheckService from "@/services/healthCheck.service";
import logger from "@/config/logger";
import { container } from "tsyringe";

const healthCheckService = container.resolve(HealthCheckService);

async function bootstrap() {
  try {
    await healthCheckService.dbConnectionCheck();

    app.listen(secrets.PORT, () => {
      logger.info(`Server is running on port ${secrets.PORT} in ${secrets.ENVIRONMENT}`);
    });
  } catch (error) {
    logger.error(`Failed to bootstrap the server, Error: ${error}`);
    process.exit(1);
  }
}

bootstrap();
