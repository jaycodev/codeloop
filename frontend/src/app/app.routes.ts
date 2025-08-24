import { Routes } from '@angular/router';
import { CourseListado } from './domains/course/components/course-list-delete/course-list-delete';
import { CourseDescription } from './student/description-course/descripcion-curso';
import { CourseFormCancel } from './domains/course/components/course-form-cancel/course-form-cancel';

// Imports Answer
import { AnswersList } from './domains/answer/components/answer.component';

// Imports Question
import { QuestionsList } from './domains/question/components/question.component';
import { QuestionsByExam } from './domains/question/components/question-by-exam.component';
import { QuestionsForm } from './domains/question/components/question-form.component';
import { QuestionDetail } from './domains/question/components/question-detail.component';

export const routes: Routes = [
  { path: '', component: CourseListado }, // Ruta raíz
  { path: 'cursos-descripcion/:id', component: CourseDescription },
  { path: 'courses', component: CourseListado},//listado de cursos
  { path: 'courses/new', component: CourseFormCancel },
  { path: 'courses/edit/:id', component: CourseFormCancel },

  // Answers
  { path: 'answers/:questionId', component: AnswersList },

  // Questions
  { path: 'questions', component: QuestionsList },
  { path: 'questions/:id', component: QuestionDetail },
  { path: 'questions/new', component: QuestionsForm },
  { path: 'questions/edit/:id', component: QuestionsForm },
  { path: 'questions/exam/:examId', component: QuestionsByExam }
]
