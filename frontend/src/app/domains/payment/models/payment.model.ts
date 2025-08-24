import { Course } from "../../course/models/course.model";
import { User } from "../../user/models/user.model";

export interface Payment {
  paymentId?: number;
  student?: User;
  course?: Course;
  amount: number;
  status?: PaymentStatus;
  paymentDate?: string | Date;
  paymentMethod?: PaymentMethod;
}

export enum PaymentMethod {
  YAPE = 'YAPE',
  TARJETA_CREDITO = 'TARJETA_CREDITO'
}

export enum PaymentStatus {
  PENDIENTE = 'PENDIENTE',
  COMPLETADO = 'COMPLETADO',
  RECHAZADO = 'RECHAZADO'
}
