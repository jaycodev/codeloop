import { CourseSummaryDto } from '../../course/dtos/course-summary.dto';

export interface Lesson {
  lessonId: number;
  title: string;
  content: string;
  videoUrl: string;
  course: CourseSummaryDto;
  orderNum: number;
}
