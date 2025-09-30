import { User } from '@domains/user/models/user.model';
import { Course } from '@domains/course/models/course.model';

export interface Enrollment {
  enrollmentId?: number;
  studentId: User;
  courseId: Course;
  enrollmentDate?: string | Date;
  progress?: number;
  status?: string;
}
