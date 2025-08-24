import { CourseSummaryDto } from '../../course/models/dto/course-summary.dto';

export interface Exam {
  examId?: number;
  course: CourseSummaryDto;
  title: string;
  createdAt?: string | Date; // OffsetDateTime -> ISO string o Date en cliente
}
