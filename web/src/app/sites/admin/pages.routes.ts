import { Routes } from '@angular/router';
import { EnrollmentCrud } from './cruds/enrollment/enrollment.crud';
import { ExamCrud } from './cruds/exams/exam-crud';
import { CourseCrud } from './cruds/courses/courses';
//import { Crud } from './cruds/CRUD-EXAMPLE/crud';
import { QuestionCrud } from './cruds/questions/components/question-crud';
import { AnswerListByQuestion } from './cruds/answers/components/answer-by-question';
import { AnswerList } from './cruds/answers/components/answer-list';
import { UserCrudComponent } from './cruds/users/users';
import { PaymentCrud } from './cruds/payments/payment-crud';
import { LessonCrud } from './cruds/lessons/lesson-crud';

export default [
  { path: 'answer', component: AnswerList },
  { path: 'answers/question/:questionId', component: AnswerListByQuestion },
  { path: 'course', component: CourseCrud },
  { path: 'enrollment', component: EnrollmentCrud },
  { path: 'exam', component: ExamCrud },
  { path: 'lesson', component: LessonCrud },
  { path: 'payment', component: PaymentCrud },
  { path: 'question', component: QuestionCrud },
  { path: 'user', component: UserCrudComponent },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
