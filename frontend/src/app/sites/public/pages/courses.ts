import { Component, inject } from '@angular/core';
import { CourseService } from '@domains/course/services/course-service';
import { CourseCard } from '../components/course-card';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCard, AsyncPipe],
  template: ` <div class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      @for (course of courses$ | async; track course.id) {
      <app-course-card
        [id]="course.id"
        [title]="course.title"
        [price]="course.price.toString()"
        [imageUrl]="course.imageUrl"
      />
      }
    </div>
  </div>`,
})
export class Courses {
  private courseService = inject(CourseService);

  courses$ = this.courseService
    .listar()
    .pipe(map((courses) => courses.sort((a, b) => a.id - b.id)));
}
