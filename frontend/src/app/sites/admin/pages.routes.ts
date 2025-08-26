import { Routes } from '@angular/router';
import { EnrollmentCrud } from './cruds/enrollment/enrollment-crud';
import { ExamCrud } from './cruds/exam/exam-crud';
import { CourseCrud } from './courses/pages/course-crud';
import { Crud } from './cruds/CRUD-EXAMPLE/crud';

export default [
  { path: 'answer', component: EnrollmentCrud },
  { path: 'course', component: CourseCrud },
  { path: 'enrollment', component: EnrollmentCrud },
  { path: 'exam', component: ExamCrud },
  { path: 'lesson', component: Crud },
  { path: 'payment', component: Crud },
  { path: 'question', component: Crud },
  { path: 'user', component: Crud },
  { path: '**', redirectTo: '/notfound' },
] as Routes;
