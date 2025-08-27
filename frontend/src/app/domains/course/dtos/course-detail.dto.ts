import { UserSummaryDto } from '@/domains/user/dtos/user-summary.dto';

export interface CourseDetailDto {
  id: number;
  title: string;
  description: string;
  teacher: UserSummaryDto;
  price: number;
  imageUrl: string;
  level: string;
  durationHours: number;
  lessonCount: number;
}
