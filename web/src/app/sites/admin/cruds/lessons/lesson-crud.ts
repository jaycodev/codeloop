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
import { MessageService, ConfirmationService } from 'primeng/api';
import { SelectModule } from 'primeng/select';

import { LessonListDto } from '@/domains/lesson/dtos/lesson-list.dto';
import { LessonDetailDto } from '@/domains/lesson/dtos/lesson-detail.dto';
import { LessonCreateDto } from '@/domains/lesson/dtos/lesson-create.dto';
import { LessonUpdateDto } from '@/domains/lesson/dtos/lesson-update.dto';
import { LessonService } from '@/domains/lesson/services/lesson.service';
import { CourseSummaryDto } from '@/domains/course/dtos/course-summary.dto';
import { CourseService } from '@/domains/course/services/course-service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-lesson-crud',
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
    SelectModule,
    InputIconModule,
    IconFieldModule
  ],
  templateUrl: './lesson-crud.html',
  providers: [MessageService, ConfirmationService]
})
export class LessonCrud implements OnInit {
  lessonDialog = false;
  lessons = signal<LessonListDto[]>([]);
  lesson!: LessonDetailDto;
  selectedLessons!: LessonListDto[] | null;
  submitted = false;

  course!: CourseSummaryDto;
  coursesComboBox: CourseSummaryDto[] = [];

  @ViewChild('dt') dt!: Table;

  cols: Column[] = [];
  isUpdateMode = false;

  constructor(
    private lessonService: LessonService,
    private courseService: CourseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadLessons();
    this.loadCourses();
    this.cols = [
      { field: 'title', header: 'Leccion' },
      { field: 'courseTitle', header: 'Curso' },
      { field: 'orderNum', header: 'Orden' },
    ];
  }

  loadCourses() {
    this.courseService.listarResumen().subscribe({
      next: (data) => {
        this.coursesComboBox = [...data];
        if (this.coursesComboBox.length) this.course = this.coursesComboBox[0];
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load courses' })
    });
  }

  loadLessons() {
    this.lessonService.listar().subscribe({
      next: (data) => this.lessons.set(data),
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load lessons' })
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  openNew() {
    this.lesson = { id: 0, title: '', content: '', videoUrl: '', course: { id: 0, title: '', description: '' }, orderNum: 1 };
    this.submitted = false;
    this.lessonDialog = true;
    this.isUpdateMode = false;
  }

  editLesson(lesson: LessonListDto) {
    this.lesson = {
      id: lesson.id,
      title: lesson.title,
      content: lesson.content,
      videoUrl: lesson.videoUrl,
      course: this.coursesComboBox.find(c => c.title === lesson.courseTitle) || { id: 0, title: '', description: '' },
      orderNum: lesson.orderNum
    };
    this.lessonDialog = true;
    this.isUpdateMode = true;
    this.course = this.lesson.course;
  }

  saveLesson() {
    this.submitted = true;
    if (!this.lesson.title?.trim()) return;

    if (this.isUpdateMode && this.lesson.id) {
      const dto: LessonUpdateDto = {
        title: this.lesson.title,
        content: this.lesson.content,
        videoUrl: this.lesson.videoUrl,
        courseId: this.course.id,
        orderNum: this.lesson.orderNum
      };
      this.lessonService.actualizar(this.lesson.id, dto).subscribe({
        next: () => {
          this.loadLessons();
          this.lessonDialog = false;
          this.lesson = {} as LessonDetailDto;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lesson updated successfully', life: 3000 });
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not update lesson', life: 3000 })
      });
    } else {
      const dto: LessonCreateDto = {
        title: this.lesson.title,
        content: this.lesson.content,
        videoUrl: this.lesson.videoUrl,
        courseId: this.course.id,
        orderNum: this.lesson.orderNum
      };
      this.lessonService.crear(dto).subscribe({
        next: () => {
          this.loadLessons();
          this.lessonDialog = false;
          this.lesson = {} as LessonDetailDto;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lesson created successfully', life: 3000 });
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not create lesson', life: 3000 })
      });
    }
  }

  deleteLesson(lesson: LessonListDto) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${lesson.title}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lessonService.eliminar(lesson.id).subscribe({
          next: () => {
            this.loadLessons();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: `Lesson "${lesson.title}" deleted successfully`, life: 3000 });
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: `Could not delete lesson "${lesson.title}"`, life: 3000 })
        });
      }
    });
  }

  deleteSelectedLessons() {
    if (!this.selectedLessons || this.selectedLessons.length === 0) return;

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected lessons?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let deletedCount = 0;
        const total = this.selectedLessons!.length;
        this.selectedLessons!.forEach(l => {
          this.lessonService.eliminar(l.id).subscribe({
            next: () => {
              deletedCount++;
              if (deletedCount === total) {
                this.loadLessons();
                this.selectedLessons = null;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lessons deleted successfully', life: 3000 });
              }
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: `Could not delete lesson "${l.title}"`, life: 3000 })
          });
        });
      }
    });
  }

  hideDialog() {
    this.lessonDialog = false;
    this.submitted = false;
  }
}
