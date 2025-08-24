import { Routes } from '@angular/router';
import { ListadoPrueba } from './domains/course/components/listado-prueba/listado-prueba';
import { CourseDescription } from './pages/course-student/description-course/descripcion-curso';

export const routes: Routes = [
  { path: '', component: ListadoPrueba }, // Ruta raíz
  { path: 'cursos-descripcion/:id', component: CourseDescription }, // Ruta con parámetro id
 // { path: '**', redirectTo: '' } // Redirección si la ruta no existe
];
