import { CourseSummaryDto } from '../../../course/dtos/course-summary.dto';
import { UserSummaryDto } from '../../../user/dtos/user-summary.dto';

export interface PaymentDetailDto {
  id: number;
  student: UserSummaryDto;
  course: CourseSummaryDto;
  amount: number;
  status: string;
  paymentDate?: string | Date;
  paymentMethod?: string;
}
