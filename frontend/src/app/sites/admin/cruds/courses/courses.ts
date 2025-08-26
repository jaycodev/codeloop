import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '@domains/course/services/course-service';
import { CourseDTO } from '@domains/course/dtos/course.dto';
import { User } from '@domains/user/models/user.model';
import { UserService } from '@domains/user/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CourseCreateDTO } from '@domains/course/dtos/course-create.dto';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-course-crud',
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
    TextareaModule,
    InputNumberModule,
    DialogModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: 'courses.html',
})
export class CourseCrudComponent implements OnInit {
  courseDialog: boolean = false;
  courses = signal<CourseDTO[]>([]);
  selectedCourses!: CourseDTO[] | null;
  profesores: User[] = [];
  courseCreate: CourseCreateDTO = { title: '', description: '', price: 0, teacherId: 0 };
  tipoEdicion = false;
  submitted: boolean = false;
  cols: Column[] = [];

  @ViewChild('dt') dt!: Table;

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarProfesores();

    this.cols = [
      { field: 'courseId', header: 'ID' },
      { field: 'title', header: 'Título' },
      { field: 'description', header: 'Descripción' },
      { field: 'price', header: 'Precio' },
      { field: 'teacher.name', header: 'Profesor' },
    ];
  }

  cargarCursos() {
    this.courseService.listar().subscribe({
      next: (data) => this.courses.set(data),
      error: (err) => console.error('Error al cargar cursos', err),
    });
  }

  cargarProfesores() {
    this.userService.listar().subscribe({
      next: (data) => (this.profesores = data),
      error: (err) => console.error('Error al cargar profesores', err),
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  openNew() {
    this.courseCreate = { title: '', description: '', price: 0, teacherId: 0 };
    this.tipoEdicion = false;
    this.submitted = false;
    this.courseDialog = true;
  }

  editCourse(course: CourseDTO) {
    this.courseCreate = { ...course, teacherId: course.teacher.userId ?? 0 };
    this.tipoEdicion = true;
    this.courseDialog = true;
  }

  deleteCourse(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este curso?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.courseService.eliminar(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Curso eliminado con éxito',
              life: 3000,
            });
            this.cargarCursos();
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al eliminar el curso',
              life: 3000,
            });
          },
        });
      },
    });
  }

  deleteSelectedCourses() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar los cursos seleccionados?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedCourses?.forEach((course) => {
          this.courseService.eliminar(course.courseId!).subscribe({
            next: () => this.cargarCursos(),
            error: (err) => console.error(`Error al eliminar curso ${course.courseId!}:`, err),
          });
        });
        this.selectedCourses = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cursos eliminados con éxito',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.courseDialog = false;
    this.submitted = false;
  }

  saveCourse() {
    this.submitted = true;

    if (this.tipoEdicion) {
      this.courseService.actualizar(this.courseCreate.courseId!, this.courseCreate).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Curso actualizado con éxito',
            life: 3000,
          });
          this.cargarCursos();
          this.hideDialog();
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el curso',
            life: 3000,
          });
        },
      });
    } else {
      this.courseService.crear(this.courseCreate).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Curso creado con éxito',
            life: 3000,
          });
          this.cargarCursos();
          this.hideDialog();
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear el curso',
            life: 3000,
          });
        },
      });
    }
  }
}