import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '@/domains/enrollment/services/enrollment.service';
import { Enrollment } from '@/domains/enrollment/models/enrollment.model';
import { User } from '@/domains/user/models/user.model';
import { Course } from '@/student/courses/courses';

@Component({
  selector: 'app-enrollment-crud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule,
    TableModule
  ],
  template: `
    <p-toolbar styleClass="mb-6">
      <ng-template #start>
        <p-button label="New" icon="pi pi-plus" class="mr-2" (onClick)="openNew()" />
        <p-button label="Delete" icon="pi pi-trash" outlined (onClick)="deleteSelected()" [disabled]="!selectedEnrollments?.length" />
      </ng-template>
      <ng-template #end>
        <p-button label="Refresh" icon="pi pi-refresh" (onClick)="loadEnrollments()" />
      </ng-template>
    </p-toolbar>

    <p-table #dt [value]="enrollments()" [(selection)]="selectedEnrollments" dataKey="enrollmentId" [paginator]="true" [rows]="10" [rowsPerPageOptions]="[10,20,30]">
      <ng-template #header>
        <tr>
          <th style="width:3rem"><p-tableHeaderCheckbox /></th>
          <th>ID</th>
          <th>Student</th>
          <th>Course</th>
          <th>Status</th>
          <th>Progress</th>
          <th>Actions</th>
        </tr>
      </ng-template>
      <ng-template #body let-enrollment>
        <tr>
          <td><p-tableCheckbox [value]="enrollment" /></td>
          <td>{{ enrollment.enrollmentId }}</td>
          <td>{{ enrollment.studentId?.name }}</td>
          <td>{{ enrollment.courseId?.title }}</td>
          <td>{{ enrollment.status }}</td>
          <td>{{ enrollment.progress ?? 0 }}%</td>
          <td>
            <p-button icon="pi pi-pencil" class="mr-2" (click)="editEnrollment(enrollment)" />
            <p-button icon="pi pi-trash" severity="danger" (click)="deleteEnrollment(enrollment)" />
          </td>
        </tr>
      </ng-template>
    </p-table>

    <p-dialog [(visible)]="enrollmentDialog" header="Enrollment Details" [modal]="true" [style]="{ width: '450px' }">
      <div class="flex flex-col gap-4">
      </div>
      <ng-template #footer>
        <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()" />
        <p-button label="Save" icon="pi pi-check" (click)="saveEnrollment()" />
      </ng-template>
    </p-dialog>

    <p-confirmdialog [style]="{ width: '450px' }" />
  `,
  providers: [MessageService, EnrollmentService, ConfirmationService]
})
export class EnrollmentCrud implements OnInit {
  enrollments = signal<Enrollment[]>([]);
  enrollment!: Enrollment;
  selectedEnrollments!: Enrollment[] | null;
  enrollmentDialog: boolean = false;

  students: User[] = [];
  courses: Course[] = [];
  statuses = [
    { label: 'Active', value: 'Active' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];

  @ViewChild('dt') dt!: Table;

  constructor(
    private enrollmentService: EnrollmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadEnrollments();
    this.loadStudents();
    this.loadCourses();
  }

  loadEnrollments() {
    this.enrollmentService.listar().subscribe({
      next: (data) => this.enrollments.set(data),
      error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message })
    });
  }

  loadStudents() {
    // TODO: reemplazar con tu servicio real de usuarios
    // Ejemplo:
    // this.userService.listar().subscribe(data => this.students = data);
  }

  loadCourses() {
    // TODO: reemplazar con tu servicio real de cursos
    // Ejemplo:
    // this.courseService.listar().subscribe(data => this.courses = data);
  }

  openNew() {
    this.enrollment = {} as Enrollment;
    this.enrollmentDialog = true;
  }

  editEnrollment(enrollment: Enrollment) {
    this.enrollment = { ...enrollment };
    this.enrollmentDialog = true;
  }

  deleteEnrollment(enrollment: Enrollment) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete enrollment ${enrollment.enrollmentId}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (!enrollment.enrollmentId) return;
        this.enrollmentService.eliminar(enrollment.enrollmentId).subscribe(() => {
          this.enrollments.set(this.enrollments().filter(e => e.enrollmentId !== enrollment.enrollmentId));
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Enrollment deleted' });
        });
      }
    });
  }

  deleteSelected() {
    if (!this.selectedEnrollments) return;
    this.selectedEnrollments.forEach(e => {
      if (e.enrollmentId) this.enrollmentService.eliminar(e.enrollmentId).subscribe();
    });
    this.enrollments.set(this.enrollments().filter(e => !this.selectedEnrollments?.includes(e)));
    this.selectedEnrollments = null;
    this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Selected enrollments deleted' });
  }

  hideDialog() {
    this.enrollmentDialog = false;
  }

  saveEnrollment() {
    if (!this.enrollment.studentId || !this.enrollment.courseId) return;

    /*if (this.enrollment.enrollmentId) {
      this.enrollmentService.actualizar(this.enrollment.enrollmentId, this.enrollment).subscribe(updated => {
        const list = this.enrollments();
        const index = list.findIndex(e => e.enrollmentId === updated.enrollmentId);
        list[index] = updated;
        this.enrollments.set([...list]);
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Enrollment updated' });
        this.enrollmentDialog = false;
      });
    } else {
      this.enrollmentService.crear(this.enrollment).subscribe(created => {
        this.enrollments.set([...this.enrollments(), created]);
        this.messageService.add({ severity: 'success', summary: 'Created', detail: 'Enrollment created' });
        this.enrollmentDialog = false;
      });
    }*/
  }
}
