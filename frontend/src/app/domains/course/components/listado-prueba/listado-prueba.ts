import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-listado-prueba',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-prueba.html'
})
export class ListadoPrueba implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        console.log('Cursos cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar cursos', err);
      }
    });
  }
}
