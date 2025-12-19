import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@kanon-academy/db-schema";
import { Pool } from "pg";
import { DATABASE_URL } from "@/config/secrets";

export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const db = drizzle(pool, { schema });

export default db;
