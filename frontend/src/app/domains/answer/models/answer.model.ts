export interface Answer {
  answerId?: number;
  questionId: number;
  studentId: number;
  answer: string;
  isCorrect: boolean;
}