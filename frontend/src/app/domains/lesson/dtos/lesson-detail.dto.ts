import { CourseSummaryDto } from '../../../course/dtos/course-summary.dto';

export interface LessonDetailDto {
  id: number;
  title: string;
  content: string;
  videoUrl: string;
  course: CourseSummaryDto;
  orderNum: number;
}
