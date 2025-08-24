import { Routes } from '@angular/router';
import { CourseListado } from './domains/course/components/course-list-delete/course-list-delete';
import { CourseDescription } from './pages/course-student/description-course/descripcion-curso';
import { CourseFormCancel } from './domains/course/components/course-form-cancel/course-form-cancel';

export const routes: Routes = [
  { path: '', component: CourseListado }, // Ruta raíz
  { path: 'cursos-descripcion/:id', component: CourseDescription }, 
  { path: 'courses', component: CourseListado},//listado de cursos
  { path: 'courses/new', component: CourseFormCancel },
  { path: 'courses/edit/:id', component: CourseFormCancel },
  
  
  // Ruta con parámetro id
 // { path: '**', redirectTo: '' } // Redirección si la ruta no existe
];
