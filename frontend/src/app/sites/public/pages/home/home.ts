import { Component, inject } from '@angular/core';
import { Hero } from '../../components/hero';
import { CourseCard } from '../../components/course-card';
import { Pricing } from '../../components/pricing';
import { CourseService } from '@domains/course/services/course-service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, CourseCard, Pricing, AsyncPipe],
  template: `
    <app-hero />

    <div class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
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
    </div>

    <app-pricing />
  `,
})
export class Home {
  private courseService = inject(CourseService);

  courses$ = this.courseService.listar().pipe(
    map(courses => courses.sort((a, b) => a.id - b.id))
  );
}
