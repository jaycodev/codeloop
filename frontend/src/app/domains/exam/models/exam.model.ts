import { Course } from '@domains/course/models/course.model';

export interface Exam {
  examId?: number;
  course: Course;
  title: string;
  createdAt?: string | Date;
}
