import * as z from "zod";

import { dbSelectUserType } from "@kanon-academy/db-schema";

import { registrationSchema } from "./validations/index.js";

export type RegistrationInput = z.infer<typeof registrationSchema>["body"];

export type UserResponse = Omit<
  dbSelectUserType,
  | "password_hash"
  | "deleted_at"
  | "email_verified_at"
  | "last_login_at"
  | "updated_at"
  | "bio"
  | "status"
  | "role"
>;
