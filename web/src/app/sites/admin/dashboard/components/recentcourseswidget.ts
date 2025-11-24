import { Component, Input } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LastCourseTuple } from '@/domains/course/dtos/course-stats.dto';

@Component({
  standalone: true,
  selector: 'app-recent-courses-widget',
  imports: [CommonModule, TableModule, ButtonModule, RippleModule],
  template: `
    <div class="card mb-8!">
      <div class="font-semibold text-xl mb-4">Cursos recién agregados</div>

      <p-table [value]="lastCourses" [paginator]="true" [rows]="5" responsiveLayout="scroll">

        <!-- Header -->
        <ng-template pTemplate="header">
          <tr>
            <th>Image</th>
            <th>Título</th>
            <th>Profesor</th>
            <th>Fecha</th>
            <th>Ver</th>
          </tr>
        </ng-template>

        <!-- Body -->
        <ng-template pTemplate="body" let-course>
          <tr>
              <td style="width: 15%; min-width: 5rem;">
            <img
              [src]="course[3]"
              class="shadow-lg"
              alt="{{ course[1] }}"
              width="50"
              height="50"
            />
          </td>
            <td>{{ course[1] }}</td> <!-- título -->
            <td>{{ course[2] }}</td> <!-- profesor -->
            <td>{{ course[4] | date:'short' }}</td> <!-- fecha -->
            <td>
              <button
                pButton
                pRipple
                type="button"
                icon="pi pi-search"
                class="p-button p-component p-button-text p-button-icon-only"
              ></button>
            </td>
          </tr>
        </ng-template>

      </p-table>
    </div>
  `,
})
export class RecentSalesWidget {
  @Input() lastCourses: LastCourseTuple[] = [];
}
