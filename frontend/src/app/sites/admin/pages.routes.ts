import { Routes } from '@angular/router';
import { EnrollmentCrud } from './cruds/enrollment/enrollment-crud';
import { ExamCrud } from './cruds/exam/exam-crud';
import { CourseCrud } from './courses/pages/course-crud';
import { Crud } from './cruds/CRUD-EXAMPLE/crud';
import { QuestionCrud } from './cruds/questions/components/question-crud';
import { AnswerListByQuestion } from './cruds/answers/components/answer-by-question';
import { AnswerList } from './cruds/answers/components/answer-list';

export default [
  { path: 'answer', component: AnswerList },
  { path: 'answers/question/:questionId', component: AnswerListByQuestion },
  { path: 'course', component: CourseCrud },
  { path: 'enrollment', component: EnrollmentCrud },
  { path: 'exam', component: ExamCrud },
  { path: 'lesson', component: Crud },
  { path: 'payment', component: Crud },
  { path: 'question', component: QuestionCrud },
  { path: 'user', component: Crud },
  { path: '**', redirectTo: '/notfound' },
] as Routes;