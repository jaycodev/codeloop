import { Routes } from '@angular/router';
import { AdminLayout } from './pages/admin/layout/component/layout';
import { Home } from './pages/student/pages/home/home';
import { Notfound } from './pages/admin/pages/notfound/notfound';
import { Dashboard } from './pages/admin/pages/dashboard/dashboard';
import { AnswersList } from './domains/answer/components/answer.component';
import { QuestionsList } from './domains/question/components/question.component';
import { QuestionsByExam } from './domains/question/components/question-by-exam.component';
import { QuestionsForm } from './domains/question/components/question-form.component';
import { QuestionDetail } from './domains/question/components/question-detail.component';
import { CourseListado } from './domains/course/components/course-list-delete/course-list-delete';
import { CourseFormCancel } from './domains/course/components/course-form-cancel/course-form-cancel';
import { StudentLayout } from './pages/student/layout/layout';
import { Courses } from './pages/student/pages/courses/courses';

export const appRoutes: Routes = [
  // Public student page routes
  {
    path: '',
    component: StudentLayout,
    children: [
      { path: '', component: Home },
      { path: 'cursos', component: Courses },
    ],
  },

  // Private admin page routes
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminLayout,
        children: [
          { path: 'dashboard', component: Dashboard },
          { path: 'cruds', loadChildren: () => import('./pages/admin/pages/pages.routes') },
        ],
      },
    ],
  },

  // Authentication routes
  { path: '', loadChildren: () => import('./pages/admin/pages/auth/auth.routes') },


  { path: 'courses', component: CourseListado },
  { path: 'courses/new', component: CourseFormCancel },
  { path: 'courses/edit/:id', component: CourseFormCancel },

  { path: 'answers/:questionId', component: AnswersList },

  { path: 'questions', component: QuestionsList },
  { path: 'questions/:id', component: QuestionDetail },
  { path: 'questions/new', component: QuestionsForm },
  { path: 'questions/edit/:id', component: QuestionsForm },
  { path: 'questions/exam/:examId', component: QuestionsByExam },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' },
];
