import { singleton } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthRepository from "@/repositories/auth.repo";
import {
  LoginInput,
  UnauthorizedError,
  RegistrationInput,
  LoginResponse,
  JwtPayload,
  DuplicateEmailError,
  UserResponse
} from "@kanon-academy/types";
import { toUserPersistence, toUserResponse, toLoginResponse } from "@/mappers/auth.mapper";
import { dbSelectUserType } from "@kanon-academy/db-schema";
import { JWT_SECRET } from "@/config/secrets";
import logger from "@/config/logger";

@singleton()
export default class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async registerUser(input: RegistrationInput) {
    const emailExists = await this.authRepository.checkEmailExistence(input.email);

    if (emailExists) {
      throw new DuplicateEmailError("The provided email address is already registered.");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(input.password, salt);
    const userInsert = toUserPersistence(input, hash);

    const user = await this.authRepository.createUser(userInsert);
    return toUserResponse(user);
  }

  async getUserByEmail(email: string | undefined): Promise<UserResponse | null> {
    if (email === undefined) {
      return null;
    }
    const user = await this.authRepository.findUserByEmail(email);
    return user;
  }

  async loginUser(input: LoginInput): Promise<LoginResponse> {
    const user: dbSelectUserType | null = await this.authRepository.findUserByEmail(input.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const payload: JwtPayload = { sub: String(user.id), email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "15m",
      issuer: "kanon-academy",
      audience: "kanon-academy-app"
    });

    try {
      await this.authRepository.updateLastLogin(user.id);
    } catch (error) {
      logger.warn(`Last Login Update Failed for user id ${user.id} with error: ${error}`);
    }
    return toLoginResponse(user, token);
  }
}
