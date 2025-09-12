import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is required by drizzle-kit. Set it in libs/db-schema/.env or your environment."
  );
}

export default defineConfig({
  out: "./migrations",
  schema: "./src/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL
  }
});
