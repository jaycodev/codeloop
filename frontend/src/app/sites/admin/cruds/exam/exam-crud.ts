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
import { Exam } from '@domains/exam/models/exam.model';
import { ExamService } from '@domains/exam/services/exam.service';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ExamCreateDTO } from '@/domains/exam/dtos/exam-create.dto';
import { ExamUpdateDTO } from '@/domains/exam/dtos/exam-update.dto';
import { CourseService } from '@/domains/course/services/course-service';
import { CourseSummaryDto } from '@domains/course/dtos/course-summary.dto';
import { SelectModule } from 'primeng/select';

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
    IconFieldModule,
    SelectModule
  ],
  templateUrl: './exam-crud.html',
  providers: [MessageService, ConfirmationService]
})
export class ExamCrud implements OnInit {
  examDialog: boolean = false;
  exams = signal<Exam[]>([]);
  exam!: Exam;
  selectedExams!: Exam[] | null;
  submitted: boolean = false;

  course!:CourseSummaryDto;
  coursesComboBox:CourseSummaryDto[]=[];

  @ViewChild('dt') dt!: Table;

  exportColumns: ExportColumn[] = [];
  cols: Column[] = [];

  isUpdateMode = false;

  constructor(
    private examService: ExamService,
    private courseService: CourseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadExams();
    this.loadCourses();
  }

  loadCourses() {
   this.courseService.listarResumen().subscribe({
      next: (data) =>{ this.coursesComboBox=[...data];
        this.course=this.coursesComboBox[0];
        console.log(this.course);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load courses' });
      }
    });
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
    this.isUpdateMode = false;
    this.course = {id:0, title:'', description:''};
  }

  editExam(exam: Exam) {
    this.exam = { ...exam };
    this.examDialog = true;
    this.isUpdateMode = true;
    this.course = this.coursesComboBox.find(c => c.id === this.exam.course.courseId)!;
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
      // 🟢 Map a ExamUpdateDTO
      const dto: ExamUpdateDTO = {
        title: this.exam.title
      };

      this.examService.actualizar(this.exam.examId, dto).subscribe(() => {
        this.loadExams();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exam Updated', life: 3000 });
      });
    } else {
      // 🟢 Map a ExamCreateDTO
      const dto: ExamCreateDTO = {
        title: this.exam.title,
        course_id: this.course?.id ?? 0
      };

      this.examService.crear(dto).subscribe(() => {
        this.loadExams();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exam Created', life: 3000 });
      });
    }

    this.examDialog = false;
    this.exam = {} as Exam;
  }
}
