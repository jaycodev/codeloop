import { CourseSummaryDto } from '../../course/models/dto/course-summary.dto';

export interface Lesson {
  lessonId: number;
  title: string;
  content: string;
  videoUrl: string;
  course: CourseSummaryDto;
  orderNum: number;
}
