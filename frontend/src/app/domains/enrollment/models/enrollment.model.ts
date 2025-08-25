import { User } from "@/domains/user/models/user.model";
import { Course } from "@/student/courses/courses";

export interface Enrollment {
  enrollmentId?: number;
  studentId: User;
  courseId: Course;
  enrollmentDate?: string | Date; // ISO string desde backend o Date en cliente
  progress?: number; // BigDecimal -> number
  status?: string;
}
