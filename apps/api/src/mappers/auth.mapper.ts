import { LoginResponse, RegistrationInput, UserResponse } from "@kanon-academy/types";
import { dbInsertUserType, dbSelectUserType } from "@kanon-academy/db-schema";

export function toUserPersistence(input: RegistrationInput, hash: string): dbInsertUserType {
  return {
    full_name: input.full_name,
    password_hash: hash,
    email: input.email,
    status: "active",
    role: "student"
  };
}

export function toUserResponse(input: dbSelectUserType): UserResponse {
  return {
    id: input.id,
    email: input.email,
    full_name: input.full_name,
    created_at: input.created_at
  };
}

export function toLoginResponse(input: dbSelectUserType, jwt: string): LoginResponse {
  return {
    token: jwt,
    user: toUserResponse(input)
  };
}
