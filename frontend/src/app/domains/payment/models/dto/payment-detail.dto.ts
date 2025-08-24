import { CourseSummaryDto } from '../../../course/models/dto/course-summary.dto';
import { UserSummaryDto } from '../../../user/models/dto/user-summary.dto';

export interface PaymentDetailDto {
  id: number;
  student: UserSummaryDto;
  course: CourseSummaryDto;
  amount: number;
  status: string;
  paymentDate?: string | Date;
  paymentMethod?: string;
}
