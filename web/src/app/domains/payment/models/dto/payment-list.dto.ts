import { PaymentMethod, PaymentStatus } from '../payment.model';

export interface PaymentListDto {
  id: number;
  studentName: string;
  courseTitle: string;
  amount: number;
  status: PaymentStatus;
  paymentDate?: string | Date;
  paymentMethod?: PaymentMethod;
}
