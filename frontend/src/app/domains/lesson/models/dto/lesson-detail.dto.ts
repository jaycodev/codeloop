import { CourseSummaryDto } from '../../../course/models/dto/course-summary.dto';

export interface LessonDetailDto {
  id: number;
  title: string;
  content: string;
  videoUrl: string;
  course: CourseSummaryDto;
  orderNum: number;
}
