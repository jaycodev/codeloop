import { Course } from '../../course/models/course.model';

export interface Exam {
  examId?: number;
  course: Course;
  title: string;
  createdAt?: string | Date;
}
