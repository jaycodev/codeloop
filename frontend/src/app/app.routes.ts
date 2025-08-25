import { Routes } from '@angular/router';
import { AppLayout } from './admin/layout/component/app.layout';
import { Landing } from './admin/pages/landing/landing';
import { Notfound } from './admin/pages/notfound/notfound';
import { Dashboard } from './admin/pages/dashboard/dashboard';
import { AnswersList } from './domains/answer/components/answer.component';
import { QuestionsList } from './domains/question/components/question.component';
import { QuestionsByExam } from './domains/question/components/question-by-exam.component';
import { QuestionsForm } from './domains/question/components/question-form.component';
import { QuestionDetail } from './domains/question/components/question-detail.component';


export const appRoutes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AppLayout,
        children: [
          { path: 'dashboard', component: Dashboard },
          { path: 'cruds', loadChildren: () => import('./admin/pages/pages.routes') }
        ]
      },
      { path: '', component: Landing },
      { path: 'auth', loadChildren: () => import('./admin/pages/auth/auth.routes') },
    ]
  },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' },
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
];
