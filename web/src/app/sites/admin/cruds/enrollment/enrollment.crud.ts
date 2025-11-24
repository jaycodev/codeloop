import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EnrollmentService } from '@domains/enrollment/services/enrollment.service';
import { Enrollment } from '@domains/enrollment/models/enrollment.model';
import { ProgressBarModule } from 'primeng/progressbar';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    ProgressBarModule
  ],
  templateUrl: './enrollment-crud.html',
  providers: [MessageService, EnrollmentService, ConfirmationService]
})
export class EnrollmentCrud implements OnInit {
  enrollmentDialog: boolean = false;

  enrollments = signal<Enrollment[]>([]); // señal de Angular

  enrollment!: Enrollment;

  selectedEnrollments: Enrollment[] | null = null;

  submitted: boolean = false;

  @ViewChild('dt') dt!: Table;

  exportColumns: ExportColumn[] = [];

  cols: Column[] = [];

  constructor(
    private enrollmentService: EnrollmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  exportCSV() {
    if (this.dt) {
      console.log(this.dt);
      this.dt.exportCSV();
    }
  }

  ngOnInit() {
    this.loadDemoData();
  }

  loadDemoData() {
    this.enrollmentService.listar().subscribe({
      next: (enrollments) => this.enrollments.set(enrollments),
      error: (err) => console.error('Error loading enrollments', err)
    });

    this.cols = [
      { field: 'enrollmentId', header: 'Id', customExportHeader: 'Enrollment Code' },
      { field: 'student', header: 'Student' },
      { field: 'email', header: 'Email' },
      { field: 'course', header: 'Course' },
      { field: 'teacher', header: 'Teacher' },
      { field: 'progress', header: 'Progress' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    console.log(value);
    table.filterGlobal(value, 'contains');
  }

  openNew() {
    this.enrollment = new Object() as Enrollment;
    this.submitted = false;
    this.enrollmentDialog = true;
  }
}
