import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Exam } from '@/domains/exam/models/exam.model';
import { ExamService } from '@/domains/exam/services/exam.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

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
  selector: 'app-exam-crud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule
  ],
  template: `
    <p-toolbar styleClass="mb-6">
      <ng-template #start>
        <p-button label="New Exam" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
        <p-button severity="secondary" label="Delete" icon="pi pi-trash" outlined
          (onClick)="deleteSelectedExams()"
          [disabled]="!selectedExams || !selectedExams.length" />
      </ng-template>
    </p-toolbar>

    <p-table
      #dt
      [value]="exams()"
      [rows]="10"
      [columns]="cols"
      [paginator]="true"
      [globalFilterFields]="['course.title', 'title']"
      [tableStyle]="{ 'min-width': '75rem' }"
      [(selection)]="selectedExams"
      [rowHover]="true"
      dataKey="examId"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} exams"
      [showCurrentPageReport]="true"
      [rowsPerPageOptions]="[10, 20, 30]"
    >
     <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage Exam</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="texLa mascota, la mascota. Dice. Te amo. A t" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>
                </div>
            </ng-template>

      <ng-template #header>
        <tr>
          <th style="width: 3rem">
            <p-tableHeaderCheckbox />
          </th>
          <th pSortableColumn="title">Title <p-sortIcon field="title" /></th>
          <th pSortableColumn="title">Course <p-sortIcon field="course" /></th>
          <th pSortableColumn="createdAt">Created At <p-sortIcon field="createdAt" /></th>
          <th style="min-width: 8rem"></th>
        </tr>
      </ng-template>
      <ng-template #body let-exam>
        <tr>
          <td>
            <p-tableCheckbox [value]="exam" />
          </td>
          <td>{{ exam.title }}</td>
          <td>{{ exam.course?.title }}</td>
          <td>{{ exam.createdAt | date:'short' }}</td>
          <td>
            <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editExam(exam)" />
            <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteExam(exam)" />
          </td>
        </tr>
      </ng-template>
    </p-table>

    <!-- Dialog -->
    <p-dialog [(visible)]="examDialog" [style]="{ width: '450px' }" header="Exam Details" [modal]="true">
      <ng-template #content>
        <div class="flex flex-col gap-6">
          <div>
            <label for="title" class="block font-bold mb-3">Title</label>
            <input type="text" pInputText id="title" [(ngModel)]="exam.title" required autofocus fluid />
            <small class="text-red-500" *ngIf="submitted && !exam.title">Title is required.</small>
          </div>

          <div>
            <label for="course" class="block font-bold mb-3">Course</label>
            <input type="text" pInputText id="course" [(ngModel)]="exam.course.title" placeholder="Course Title" required fluid />
          </div>
        </div>
      </ng-template>

      <ng-template #footer>
        <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()" />
        <p-button label="Save" icon="pi pi-check" (click)="saveExam()" />
      </ng-template>
    </p-dialog>

    <p-confirmdialog [style]="{ width: '450px' }" />
  `,
  providers: [MessageService, ConfirmationService]
})
export class ExamCrud implements OnInit {
  examDialog: boolean = false;
  exams = signal<Exam[]>([]);
  exam!: Exam;
  selectedExams!: Exam[] | null;
  submitted: boolean = false;

  @ViewChild('dt') dt!: Table;

   exportColumns: ExportColumn[] = [];

   cols: Column[] = [];

  constructor(
    private examService: ExamService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.examService.listar().subscribe({
      next: (data) => this.exams.set(data),
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load exams' });
      }
    });

    this.cols = [
      { field: 'title', header: 'Title'},
      { field: 'course', header: 'Course' },
      { field: 'createdAt', header: 'Created' },
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  openNew() {
    this.exam = { title: '', course: { id: 0, title: '' } } as any;
    this.submitted = false;
    this.examDialog = true;
  }

  editExam(exam: Exam) {
    this.exam = { ...exam };
    this.examDialog = true;
  }

  deleteSelectedExams() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected exams?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedExams?.forEach(e => {
          if (e.examId) this.examService.eliminar(e.examId).subscribe(() => this.loadExams());
        });
        this.selectedExams = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Exams Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.examDialog = false;
    this.submitted = false;
  }

  deleteExam(exam: Exam) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + exam.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (exam.examId) {
          this.examService.eliminar(exam.examId).subscribe(() => this.loadExams());
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Exam Deleted',
          life: 3000
        });
      }
    });
  }

  saveExam() {
    this.submitted = true;
    if (!this.exam.title?.trim()) return;

    if (this.exam.examId) {
      this.examService.actualizar(this.exam.examId, this.exam).subscribe(() => {
        this.loadExams();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exam Updated', life: 3000 });
      });
    } else {
      this.examService.crear(this.exam).subscribe(() => {
        this.loadExams();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exam Created', life: 3000 });
      });
    }

    this.examDialog = false;
    this.exam = {} as Exam;
  }
}
