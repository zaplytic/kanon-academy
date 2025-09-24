import { ApiResponse, RegistrationInput, UserResponse } from "@kanon-academy/types";
import axiosSecure from "../../lib/axios";

export async function registerUser(data: RegistrationInput): Promise<UserResponse> {
  const result = await axiosSecure.post<ApiResponse<UserResponse>>("/auth/register", data);

  if (!result.data.success || result.data.data === undefined) {
    throw new Error(result.data.message || "User creation failed");
  }

  return result.data.data;
}
