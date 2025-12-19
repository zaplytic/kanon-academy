const { drizzle } = require("drizzle-orm/node-postgres");
const { migrate } = require("drizzle-orm/node-postgres/migrator");
const postgres = require("pg");
require("dotenv").config();

const runMigrations = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in .env file");
  }

  const connectionString = process.env.DATABASE_URL;
  const pool = new postgres.Pool({
    connectionString
  });
  const db = drizzle(pool);

  console.log("Running migrations...");

  await migrate(db, { migrationsFolder: "./libs/db-schema/migrations" });

  console.log("Migrations completed.");

  await pool.end();
};

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
