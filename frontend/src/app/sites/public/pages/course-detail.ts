import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '@domains/course/services/course-service';
import { LessonService } from '@domains/lesson/services/lesson.service';
import { AsyncPipe, NgIf } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AsyncPipe,
    NgIf,
    CardModule,
    ButtonModule,
    TagModule,
    AvatarModule,
    DividerModule,
    ChipModule,
    ProgressBarModule,
    SkeletonModule,
    AccordionModule,
  ],
  template: `
    <div class="px-6 lg:px-20 py-8 w-full max-w-screen-2xl mx-auto">
      <ng-container *ngIf="course$ | async as course; else loading">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
          <div class="lg:col-span-2 flex flex-col">
            <div
              class="relative w-full aspect-[16/9] rounded-xl overflow-hidden border-1 border-surface"
            >
              <img
                [src]="course.imageUrl || '/placeholder.svg'"
                alt="{{ course.title }}"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover"
                (error)="onImgError($event)"
              />
              <div
                class="mt-4 px-0 lg:px-6 lg:max-w-[75%] lg:absolute lg:bottom-6 lg:left-6 lg:bg-black/50 lg:backdrop-blur-sm lg:rounded-lg lg:p-4"
              >
                <h2 class="text-2xl sm:text-3xl font-bold !text-white">
                  {{ course.title }}
                </h2>
                <p class="text-base sm:text-lg leading-relaxed mt-2 !text-white">
                  {{ course.description }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <p-card header="El curso incluye:" class="shadow-lg border-1 border-surface">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <i class="pi pi-clock text-muted-color" aria-hidden="true"></i>
                    <span class="text-muted-color">Duración:</span>
                  </div>
                  <span class="font-semibold">{{ course.durationHours }} horas</span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <i class="pi pi-globe text-muted-color" aria-hidden="true"></i>
                    <span class="text-muted-color">Lenguaje:</span>
                  </div>
                  <span class="font-semibold">Español</span>
                </div>

                <p-divider />

                <div class="p-4 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <i class="pi pi-book text-primary" aria-hidden="true"></i>
                      <span class="text-sm text-muted-color">Lecciones</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <i class="pi pi-chart-line text-primary" aria-hidden="true"></i>
                      <span class="text-sm text-muted-color">Nivel</span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <span class="font-bold text-lg">{{ course.lessonCount }} clases</span>
                    <p-tag value="Básico" severity="info" />
                  </div>
                </div>

                <p-button
                  label="Empezar curso"
                  icon="pi pi-play"
                  styleClass="w-full bg-blue-500 border-blue-500 hover:bg-blue-600 font-semibold py-3 rounded-lg mb-2"
                  size="large"
                />

                <p class="text-xs text-muted-color text-center">
                  Acceso al curso mientras dure la suscripción
                </p>
              </div>
            </p-card>

            <p-card header="Docente" class="shadow-lg border-1 border-surface">
              <div class="flex items-start gap-4">
                <p-avatar
                  icon="pi pi-user"
                  size="large"
                  shape="circle"
                  class="text-muted-color bg-white dark:bg-gray-700"
                ></p-avatar>

                <div class="flex-1">
                  <h4 class="font-bold text-muted-color mb-1">
                    {{ course.teacher.name }}
                  </h4>
                  <p class="text-sm text-muted-color mb-2">Creador de Contenido</p>

                  <div class="flex items-center gap-2">
                    <i class="pi pi-briefcase text-muted-color" aria-hidden="true"></i>
                    <span class="text-sm text-muted-color">
                      +15 años de experiencia como Ingeniero de Software
                    </span>
                  </div>
                </div>
              </div>
            </p-card>
          </div>
        </div>

        <!-- Course Description -->
        <p-card header="Sobre este curso" class="shadow-lg border-1 border-surface mb-6">
          <p class="text-muted-color leading-relaxed">
            {{ course.description }}
          </p>
        </p-card>

        <p-card header="Contenido del curso" class="shadow-lg border-1 border-surface">
          <p-accordion [value]="0" [multiple]="true">
            @for (lesson of lessons$ | async; track lesson.id) {
            <p-accordion-panel [value]="lesson.id">
              <p-accordion-header>
                <div class="flex flex-col">
                  <span class="text-sm text-primary">Capítulo {{ lesson.orderNum }}</span>
                  <span class="font-medium">{{ lesson.title }}</span>
                </div>
              </p-accordion-header>

              <p-accordion-content>
                <a
                  [routerLink]="['leccion', lesson.id]"
                  class="flex justify-between items-center p-3 w-full text-left cursor-pointer rounded transition-colors hover:bg-surface-100 dark:hover:bg-surface-800"
                >
                  <span>{{ lesson.content }}</span>
                  <span class="text-sm text-primary">{{ lesson.durationMinutes }} min</span>
                </a>
              </p-accordion-content>
            </p-accordion-panel>
            }
          </p-accordion>
        </p-card>
      </ng-container>

      <!-- Loading State -->
      <ng-template #loading>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 flex flex-col">
            <div class="rounded-xl overflow-hidden aspect-[16/9]">
              <p-skeleton class="w-full h-full" />
            </div>
            <p-skeleton width="60%" height="2rem" class="mt-4 mb-2" />
            <p-skeleton width="100%" height="1rem" />
          </div>

          <div class="space-y-6">
            <p-card class="shadow-lg border-0">
              <p-skeleton height="200px" />
            </p-card>
            <p-card class="shadow-lg border-0">
              <p-skeleton height="300px" />
            </p-card>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class CourseDetail {
  private route = inject(ActivatedRoute);
  private lessonService = inject(LessonService);
  private courseService = inject(CourseService);

  id = Number(this.route.snapshot.paramMap.get('id'));
  course$ = this.courseService.buscarPorId(this.id);

  lessons$ = this.lessonService.listarPorCurso(this.id);

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = '/placeholder.svg';
  }
}
