import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DATABASE_URL } from "@/config/secrets";

export const pool = new Pool({
  connectionString: DATABASE_URL
});

const db = drizzle(pool);

export default db;
