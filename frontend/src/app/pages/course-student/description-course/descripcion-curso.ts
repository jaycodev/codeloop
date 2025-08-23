import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../domains/course/services/course.service';
import { Course } from '../../../domains/course/models/course.model';
import { ApiError } from '../../../shared/models/api-error.model';
import { CourseCoverComponent } from '../../../domains/course/components/course-cover/course-cover';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-description-course',
  imports: [CourseCoverComponent,CommonModule],
  templateUrl: './description-course.html'
})
export class CourseDescription implements OnInit {
  courseId: number | null = null;
  course?: Course;
  loading = false;
  error?: ApiError;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {}

  ngOnInit(): void {
    // Lee el parámetro de ruta :id (ruta ejemplo: /course-descripcion/1)
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      this.courseId = idStr ? Number(idStr) : null;
      if (this.courseId !== null) {
        this.loadCourse(this.courseId);
      }
    });
  }

  private loadCourse(id: number) {
    console.log('Cargando curso con id:', id);
    this.loading = true;
    this.error = undefined;
    console.log(this.course);
    this.courseService.getCourseById(id).subscribe({
      next: (c) => {
        this.course = c;
        this.loading = false;
        console.log(this.course);
      },
      error: (err: ApiError) => {
        this.error = err;
        this.course = undefined;
        this.loading = false;
      }
    });
    console.log(this.course);
  }
}
