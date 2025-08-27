import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LessonService } from '@domains/lesson/services/lesson.service';
import { CourseService } from '@domains/course/services/course-service';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';

import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';

import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AsyncPipe,
    NgIf,
    NgFor,
    AvatarModule,
    CardModule,
    ButtonModule,
    TagModule,
    DividerModule,
    SkeletonModule,
  ],
  template: `
    <div class="px-6 lg:px-20 py-8 w-full max-w-screen-2xl mx-auto">
      <ng-container *ngIf="lessonWithSafe$ | async as lesson; else loading">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
          <!-- Video Section -->
          <div class="lg:col-span-2 flex flex-col">
            <div
              class="relative w-full aspect-[16/9] rounded-xl overflow-hidden border-1 border-surface"
            >
              <ng-container *ngIf="lesson.safeUrl; else noVideo">
                <iframe
                  [src]="lesson.safeUrl"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  class="w-full h-full rounded-xl"
                ></iframe>
              </ng-container>

              <ng-template #noVideo>
                <div class="w-full h-full flex items-center justify-center bg-surface rounded-xl">
                  <p class="text-muted-color">
                    Video no disponible.
                    <a
                      [href]="lesson.videoUrl"
                      target="_blank"
                      rel="noopener"
                      class="underline ml-2"
                      >Abrir en YouTube</a
                    >
                  </p>
                </div>
              </ng-template>
            </div>

            <div class="mt-4">
              <h2 class="text-2xl sm:text-3xl font-bold">{{ lesson.title }}</h2>
              <p class="text-base sm:text-lg leading-relaxed mt-2">{{ lesson.content }}</p>
            </div>
          </div>

          <!-- Lesson List -->
          <div class="space-y-6">
            <p-card header="Lecciones del curso" class="shadow-lg border-1 border-surface">
              <div *ngFor="let l of lessons$ | async">
                <a
                  [routerLink]="['/cursos', courseId, 'leccion', l.orderNum]"
                  class="flex justify-between items-center p-3 w-full text-left cursor-pointer rounded transition-colors"
                  [ngClass]="{
                    'bg-blue-100 dark:bg-blue-900 font-bold':
                      (currentOrderNum$ | async) === l.orderNum,
                    'hover:bg-surface-100 dark:hover:bg-surface-800':
                      (currentOrderNum$ | async) !== l.orderNum
                  }"
                >
                  <span class="text-gray-800 dark:text-gray-200">
                    Capítulo {{ l.orderNum }} - {{ l.title }}
                  </span>
                  <span class="text-sm text-primary">{{ l.durationMinutes }} min</span>
                </a>
              </div>
            </p-card>

            <p-card header="Docente" class="shadow-lg border-1 border-surface">
              <ng-container *ngIf="course$ | async as course">
                <div class="flex items-start gap-4">
                  <p-avatar
                    icon="pi pi-user"
                    size="large"
                    shape="circle"
                    class="text-muted-color bg-white dark:bg-gray-700"
                  ></p-avatar>
                  <div class="flex-1">
                    <h4 class="font-bold text-muted-color mb-1">{{ course.teacher.name }}</h4>
                    <p class="text-sm text-muted-color mb-2">Creador de Contenido</p>
                    <div class="flex items-center gap-2">
                      <i class="pi pi-briefcase text-muted-color" aria-hidden="true"></i>
                      <span class="text-sm text-muted-color">
                        +15 años de experiencia como Ingeniero de Software
                      </span>
                    </div>
                  </div>
                </div>
              </ng-container>
            </p-card>
          </div>
        </div>

        <!-- About Course -->
        <p-card header="Sobre este curso" class="shadow-lg border-1 border-surface">
          <p class="text-muted-color leading-relaxed">{{ (course$ | async)?.description }}.</p>
        </p-card>
      </ng-container>

      <!-- Loading Skeleton -->
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
            <p-card class="shadow-lg border-0"><p-skeleton height="300px" /></p-card>
          </div>
        </div>
      </ng-template>
    </div>
  `,
})
export class LessonDetail {
  private route = inject(ActivatedRoute);
  private lessonService = inject(LessonService);
  private courseService = inject(CourseService);
  private sanitizer = inject(DomSanitizer);

  courseId = Number(this.route.snapshot.paramMap.get('courseId'));

  lessons$ = this.lessonService.listarPorCurso(this.courseId);
  course$ = this.courseService.buscarPorId(this.courseId);
  currentOrderNum$ = this.route.paramMap.pipe(map((params) => Number(params.get('orderNum'))));

  private lessonRaw$: Observable<any> = this.route.paramMap.pipe(
    switchMap((params) => {
      const orderNum = Number(params.get('orderNum'));
      return this.lessons$.pipe(map((lessons) => lessons.find((l) => l.orderNum === orderNum)!));
    })
  );

  lessonWithSafe$: Observable<any> = this.lessonRaw$.pipe(
    map((l) => {
      const safe = this.toSafeEmbedUrl(l?.videoUrl);
      return { ...l, safeUrl: safe };
    })
  );

  lesson$ = this.lessonWithSafe$;

  private toSafeEmbedUrl(fullUrl?: string): SafeResourceUrl | null {
    if (!fullUrl) return null;
    try {
      const urlObj = new URL(fullUrl);
      let videoId = '';
      let start = 0;

      const host = urlObj.hostname.toLowerCase();

      if (host.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
        start = this.parseTimeParam(urlObj.searchParams.get('t'));
      } else if (host.includes('youtube.com')) {
        if (urlObj.pathname.startsWith('/watch')) {
          videoId = urlObj.searchParams.get('v') || '';
          start = this.parseTimeParam(urlObj.searchParams.get('t'));
        } else if (urlObj.pathname.startsWith('/embed/')) {
          videoId = urlObj.pathname.split('/')[2] || '';
          start = this.parseTimeParam(
            urlObj.searchParams.get('start') || urlObj.searchParams.get('t')
          );
        } else {
          videoId = urlObj.searchParams.get('v') || '';
          start = this.parseTimeParam(urlObj.searchParams.get('t'));
        }
      } else {
        return null;
      }

      if (!videoId) return null;

      const embed = `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ''}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embed);
    } catch (e) {
      console.error('Error parsing video URL', e);
      return null;
    }
  }

  private parseTimeParam(t: string | null): number {
    if (!t) return 0;
    if (/^\d+$/.test(t)) return Number(t);
    if (/^\d+s$/.test(t)) return Number(t.replace('s', ''));
    const m = t.match(/(?:(\d+)m)?(?:(\d+)s)?/);
    if (m) {
      const minutes = Number(m[1] || 0);
      const seconds = Number(m[2] || 0);
      return minutes * 60 + seconds;
    }
    return 0;
  }
}
