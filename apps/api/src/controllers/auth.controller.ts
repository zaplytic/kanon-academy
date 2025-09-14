import { Request, Response } from "express";
import { singleton } from "tsyringe";

import AuthService from "@/services/auth.service";
import {
  RegistrationInput,
  ApiResponse,
  UserResponse,
  LoginInput,
  LoginResponse
} from "@kanon-academy/types";

@singleton()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  handleRegistration = async (req: Request, res: Response) => {
    const result: UserResponse = await this.authService.registerUser(req.body as RegistrationInput);
    const response: ApiResponse<UserResponse> = {
      success: true,
      message: "User successfully created",
      data: result,
      timestamp: Date()
    };
    res.status(201).json(response);
  };

  handleLogin = async (req: Request, res: Response) => {
    const result: LoginResponse = await this.authService.loginUser(req.body as LoginInput);

    const response: ApiResponse<LoginResponse> = {
      success: true,
      message: "User successfully logged in",
      data: result,
      timestamp: Date()
    };
    res.status(200).json(response);
  };
}
