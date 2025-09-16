import db from "@/db";
import { dbInsertUserType, dbSelectUserType, users } from "@kanon-academy/db-schema";
import { count, eq } from "drizzle-orm";
import { singleton } from "tsyringe";
import { AppError } from "@kanon-academy/types";

@singleton()
export default class AuthRepository {
  constructor() {
    /* empty */
  }

  async checkEmailExistence(email: string): Promise<boolean> {
    // @ts-expect-error - Drizzle type compatibility issue
    const result = await db.select({ value: count() }).from(users).where(eq(users.email, email));
    return result[0].value > 0;
  }

  async findUserByEmail(email: string): Promise<dbSelectUserType | null> {
    // @ts-expect-error - Drizzle type compatibility issue
    const user: dbSelectUserType[] = await db
      .select()
      // @ts-expect-error - Drizzle type compatibility issue
      .from(users)
      // @ts-expect-error - Drizzle type compatibility issue
      .where(eq(users.email, email))
      .limit(1);
    return user[0] ?? null;
  }

  async updateLastLogin(id: number): Promise<void> {
    // @ts-expect-error - Drizzle type compatibility issue
    await db.update(users).set({ last_login_at: new Date() }).where(eq(users.id, id));
  }

  async createUser(userInsert: dbInsertUserType): Promise<dbSelectUserType> {
    // FIX: PgTableWithColumns and PgTable<TableConfig>
    // @ts-expect-error - Drizzle type compatibility issue
    const inserted: dbSelectUserType[] = await db.insert(users).values(userInsert).returning();

    if (inserted.length === 0) {
      throw new AppError("Email already exists", 409);
    }

    return inserted[0];
  }
}
