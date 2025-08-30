import { PaymentMethod, PaymentStatus } from '../payment.model';

export interface UpdatePaymentDto {
  studentId?: number;
  courseId?: number;
  amount?: number;
  status?: PaymentStatus;
  paymentDate?: string | Date;
  paymentMethod?: PaymentMethod;
}
