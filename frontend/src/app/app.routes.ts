import { Routes } from '@angular/router';

// Imports Answer
import { AnswersList } from './domains/answer/components/answer.component';

// Imports Question
import { QuestionsList } from './domains/question/components/question.component';
import { QuestionsByExam } from './domains/question/components/question-by-exam.component';
import { QuestionsForm } from './domains/question/components/question-form.component';
import { QuestionDetail } from './domains/question/components/question-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'questions', pathMatch: 'full' }, // Ruta raíz

  // Answers
  { path: 'answers/:questionId', component: AnswersList },

  // Questions
  { path: 'questions', component: QuestionsList },
  { path: 'questions/:id', component: QuestionDetail },
  { path: 'questions/new', component: QuestionsForm },
  { path: 'questions/edit/:id', component: QuestionsForm },
  { path: 'questions/exam/:examId', component: QuestionsByExam }
]