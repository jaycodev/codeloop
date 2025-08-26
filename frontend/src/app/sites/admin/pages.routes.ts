import { Routes } from '@angular/router';
import { Crud } from './cruds/crud';
import { EnrollmentCrud } from './enrollments/enrollment-crud';
import { ExamCrud } from './exams/exam-crud';
import { CourseCrud } from './courses/pages/course-crud';

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
