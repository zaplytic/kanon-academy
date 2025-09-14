import { Router } from "express";
import { container } from "tsyringe";
import { rateLimit } from "express-rate-limit";

import AuthController from "@/controllers/auth.controller";
import asyncHandler from "@/utils/asyncHandler";
import validationHandler from "@/middlewares/validationHandler";
import { loginSchema, registrationSchema } from "@kanon-academy/types";

const authController = container.resolve(AuthController);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  legacyHeaders: false,
  ipv6Subnet: 56
});

const authRouter = Router();

authRouter.post(
  "/register",
  validationHandler(registrationSchema),
  asyncHandler(authController.handleRegistration)
);

authRouter.post(
  "/login",
  loginLimiter,
  validationHandler(loginSchema),
  asyncHandler(authController.handleLogin)
);

export default authRouter;
