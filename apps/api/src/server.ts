import "reflect-metadata";

import app from "@/app";
import * as secrets from "@/config/secrets";
import logger from "@/config/logger";
import HealthCheckService from "@/services/healthCheck.service";
import { container } from "tsyringe";

const healthCheckService = container.resolve(HealthCheckService);

app.listen(secrets.PORT, async () => {
  await healthCheckService.dbConnectionCheck();
  logger.info(
    `Server is running on port ${secrets.PORT} in ${secrets.ENVIRONMENT}`,
  );
});
