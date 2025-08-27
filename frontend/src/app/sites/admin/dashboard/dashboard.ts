import { Component, OnInit, signal, Signal } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentcourseswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { UserService } from '@/domains/user/services/user.service';
import { CourseService } from '@/domains/course/services/course-service';
import { User } from '@/domains/user/models/user.model';
import { CommonModule } from '@angular/common';
import { CourseStats } from '@/domains/course/dtos/course-stats.dto';
import { PaymentService } from '@/domains/payment/services/payment.service';
import { PaymentStatsResponse } from '@/domains/payment/models/dto/payment-stats.dto';

export interface UserResumen {
  alumnos: number;
  profesores: number;
  nuevosAlumnos: number;
  nuevosProfesores: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    StatsWidget,
    RecentSalesWidget,
    BestSellingWidget,
    RevenueStreamWidget,
    NotificationsWidget,
    CommonModule
  ],
  template: `
    <div class="grid grid-cols-12 gap-8">
      <app-stats-widget [totalCourses]="coursesStats().totalCourses" [resumenUsers]="resumen" class="contents"></app-stats-widget>
      <div class="col-span-12 xl:col-span-6">
        <app-recent-courses-widget [lastCourses]="coursesStats().lastCourses"/>
        <!-- <app-best-selling-widget /> -->
      </div>
      <div class="col-span-12 xl:col-span-6">
        <app-revenue-stream-widget [stats]="paymentsStats()"/>
        <!-- <app-notifications-widget /> -->
      </div>
    </div>
  `,
})
export class Dashboard implements OnInit {

  users = signal<User[]>([]);
  coursesStats = signal<CourseStats>({ lastCourses: [], coursesLastMonth: 0, totalCourses: 0, topCourses: [] });
  paymentsStats = signal<PaymentStatsResponse | null>(null);

  resumen: UserResumen = {
    alumnos: 0,
    profesores: 0,
    nuevosAlumnos: 0,
    nuevosProfesores: 0
  };

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCoursesStats();
    this.loadPayments();
  }

  private loadUsers(): void {
  this.userService.listar().subscribe({
    next: (data: User[]) => {
      this.users.set(data);

      const ahora = new Date();
      const mesAnterior = new Date();
      mesAnterior.setMonth(ahora.getMonth() - 1);

      this.resumen = data.reduce(
        (acc, u) => {
          // Contar total de alumnos y profesores
          if (u.role === 'ESTUDIANTE') acc.alumnos++;
          if (u.role === 'PROFESOR') acc.profesores++;

          // Contar nuevos alumnos y profesores del último mes
          if (u.createdAt) {
            const creado = new Date(u.createdAt);
            if (creado >= mesAnterior && creado < ahora) {
              if (u.role === 'ESTUDIANTE') acc.nuevosAlumnos++;
              if (u.role === 'PROFESOR') acc.nuevosProfesores++;
            }
          }

          return acc;
        },
        { alumnos: 0, profesores: 0, nuevosAlumnos: 0, nuevosProfesores: 0 }
      );

      console.log('Resumen de usuarios:', this.resumen);
      // resumen.alumnos -> total alumnos
      // resumen.profesores -> total profesores
      // resumen.nuevosAlumnos -> nuevos alumnos último mes
      // resumen.nuevosProfesores -> nuevos profesores último mes
    },
    error: (err) => {
      console.error(err);
    },
  });
}

   loadCoursesStats(): void {
    this.courseService.obtenerEstadisticas().subscribe({
      next: (stats) => {
        this.coursesStats.set(stats);
        console.log('Estadísticas de cursos cargadas:', stats);
      },
      error: (err) => {
        console.error('Error cargando estadísticas de cursos', err);
      },
    });
  }

  private loadPayments(): void {
  this.paymentService.getStats().subscribe({
    next: (stats) => {
      this.paymentsStats.set(stats);
      console.log('📊 Estadísticas de pagos cargadas:', stats);
    },
    error: (err) => {
      console.error('❌ Error cargando estadísticas de pagos', err);
    },
  });
}

}
