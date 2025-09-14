import { Router } from "express";
import { container } from "tsyringe";

import AuthController from "@/controllers/auth.controller";
import asyncHandler from "@/utils/asyncHandler";
import validationHandler from "@/middlewares/validationHandler";
import { registrationSchema } from "@kanon-academy/types";

const authController = container.resolve(AuthController);

const authRouter = Router();

authRouter.post(
  "/register",
  validationHandler(registrationSchema),
  asyncHandler(authController.handleRegistration)
);

export default authRouter;
