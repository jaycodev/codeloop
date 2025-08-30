export interface QuestionDTO {
  questionId: number;
  examId: number;
  statement: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctAnswer: string;
}