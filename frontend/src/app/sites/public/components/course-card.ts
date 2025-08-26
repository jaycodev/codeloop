import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a
      [routerLink]="['/cursos', courseId]"
      class="block relative overflow-hidden rounded-lg shadow-lg group w-full h-72 hover:shadow-2xl transition-shadow duration-300"
    >
      <img
        [src]="image"
        alt="{{ title }}"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>

      <div
        class="absolute bottom-0 right-0 w-full text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center"
      >
        <div>
          <h5 class="!text-white text-lg font-bold leading-tight truncate">{{ title }}</h5>
          <p class="text-md font-semibold mt-1">S/. {{ price }}</p>
        </div>
        <span
          class="ml-4 px-4 py-1 text-sm font-medium bg-white/30 dark:bg-gray-200/30 rounded-md whitespace-nowrap"
        >
          Ir al curso
        </span>
      </div>
    </a>
  `,
})
export class CourseCard {
  @Input() courseId!: number;
  @Input() image!: string;
  @Input() title!: string;
  @Input() price!: string;
}
