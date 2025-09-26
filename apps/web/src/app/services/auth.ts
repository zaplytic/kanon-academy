import {
  ApiResponse,
  RegistrationInput,
  UserResponse,
  LoginResponse,
  LoginInput
} from "@kanon-academy/types";
import axiosSecure from "../../lib/axios";

export async function registerUser(data: RegistrationInput): Promise<UserResponse> {
  const result = await axiosSecure.post<ApiResponse<UserResponse>>("/auth/register", data);

  if (!result.data.success || result.data.data === undefined) {
    throw new Error(result.data.message || "User creation failed");
  }

  return result.data.data;
}

export async function loginUser(data: LoginInput): Promise<LoginResponse> {
  const result = await axiosSecure.post<ApiResponse<LoginResponse>>("/auth/login", data);

  if (!result.data.success || result.data.data === undefined) {
    throw new Error(result.data.message || "User login failed");
  }

  return result.data.data;
}
