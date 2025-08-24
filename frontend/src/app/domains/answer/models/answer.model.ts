export interface Answer {
  answerId?: number;
  questionId: number;
  studentId: number;
  answer?: string;       // carácter (length = 1) que envía el estudiante
  isCorrect?: boolean | null;
}
