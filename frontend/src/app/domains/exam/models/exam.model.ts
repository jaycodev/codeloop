import { CourseSummaryDto } from '../../course/dtos/course-summary.dto';

export interface Exam {
  examId?: number;
  course: CourseSummaryDto;
  title: string;
  createdAt?: string | Date;
}
