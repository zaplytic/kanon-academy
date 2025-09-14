import { singleton } from "tsyringe";
import bcrypt from "bcrypt";
import AuthRepository from "@/repositories/auth.repo";
import { RegistrationInput } from "@kanon-academy/types";
import { toUserPersistence, toUserResponse } from "@/mappers/auth.mapper";
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

    logger.info(user);

    return toUserResponse(user);
  }
}
