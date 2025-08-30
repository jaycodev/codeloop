import { PaymentMethod, PaymentStatus } from '../payment.model';

export interface CreatePaymentDto {
  studentId: number;
  courseId: number;
  amount: number;               // BigDecimal -> number
  status?: PaymentStatus;
  paymentDate?: string | Date;  // OffsetDateTime -> ISO string | Date
  paymentMethod?: PaymentMethod;
}
