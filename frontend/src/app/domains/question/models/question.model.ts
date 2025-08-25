export interface Question {
  questionId: number;
  examId: number;
  statement: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctAnswer: string;
} 