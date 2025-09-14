import { singleton } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthRepository from "@/repositories/auth.repo";
import {
  LoginInput,
  UnauthorizedError,
  RegistrationInput,
  LoginResponse
} from "@kanon-academy/types";
import { toUserPersistence, toUserResponse, toLoginResponse } from "@/mappers/auth.mapper";
import { dbSelectUserType } from "@kanon-academy/db-schema";
import { JWT_SECRET } from "@/config/secrets";
import logger from "@/config/logger";

@singleton()
export default class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async registerUser(input: RegistrationInput) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(input.password, salt);
    const userInsert = toUserPersistence(input, hash);

    const user = await this.authRepository.createUser(userInsert);
    return toUserResponse(user);
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

    const claims = { sub: String(user.id), email: user.email };
    const token = jwt.sign(claims, JWT_SECRET, {
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
