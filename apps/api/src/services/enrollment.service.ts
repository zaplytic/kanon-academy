import EnrollmentRepository from "@/repositories/enrollment.repo";
import { singleton } from "tsyringe";
import { AppError, EnrollmentResponse } from "@kanon-academy/types";
import { toEnrollmentPersistance, toEnrollmentResponse } from "@/mappers/enrollment.mapper";

@singleton()
export default class EnrollmentService {
  constructor(private readonly enrollmentRepo: EnrollmentRepository) {}

  async enroll(courseId: number, studentId: number): Promise<EnrollmentResponse> {
    const alreadyEnrolled = await this.enrollmentRepo.checkEnrollment(courseId, studentId);
    if (alreadyEnrolled) {
      throw new AppError("User is already enrolled", 409);
    }

    const enroll = await this.enrollmentRepo.insertEnrollment(
      toEnrollmentPersistance(courseId, studentId)
    );

    return toEnrollmentResponse(enroll);
  }

  async unenroll(courseId: number, studentId: number): Promise<void> {
    await this.enrollmentRepo.deleteEnrollment(courseId, studentId);
  }
}
