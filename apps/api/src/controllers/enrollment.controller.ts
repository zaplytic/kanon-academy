import { Request, Response } from "express";
import EnrollmentService from "@/services/enrollment.service";
import { singleton } from "tsyringe";
import { ApiResponse, EnrollmentResponse, UnauthorizedError } from "@kanon-academy/types";
import AuthService from "@/services/auth.service";

@singleton()
export default class EnrollmentController {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly authService: AuthService
  ) {}

  handleEnrollment = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const user = await this.authService.getUserByEmail(req.user?.email);

    if (user === null) {
      throw new UnauthorizedError();
    }

    const enrollment = await this.enrollmentService.enroll(+courseId, user.id);

    res.json({
      success: true,
      message: "You successfully enrolled in the course",
      data: enrollment,
      timestamp: new Date().toISOString()
    } as ApiResponse<EnrollmentResponse>);
  };

  handleUnenrollment = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    const user = await this.authService.getUserByEmail(req.user?.email);
    if (user === null) {
      throw new UnauthorizedError();
    }

    await this.enrollmentService.unenroll(+courseId, user.id);

    res.json({
      success: true,
      message: "You have successfully unenrolled from the course",
      timestamp: new Date().toISOString()
    } as ApiResponse<void>);
  };
}
