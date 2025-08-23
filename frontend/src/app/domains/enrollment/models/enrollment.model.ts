export interface Enrollment {
  enrollmentId?: number;
  studentId: number;
  courseId: number;
  enrollmentDate?: string | Date; // ISO string desde backend o Date en cliente
  progress?: number; // BigDecimal -> number
  status?: string;
  // opcionales: objetos anidados (si los trae el backend)
  student?: Record<string, any>;
  course?: Record<string, any>;
}
