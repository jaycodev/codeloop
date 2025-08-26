export interface Answer {
  answerId?: number;
  questionId: number;
  studentId: number;
  studentName?: string;
  answer: string;
  isCorrect: boolean;
}