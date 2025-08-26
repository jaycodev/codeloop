import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '@domains/course/services/course-service';
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
import { CourseListDto } from '@domains/course/dtos/course-list.dto';
import { CreateCourseDto } from '@domains/course/dtos/create-course.dto';
import { UpdateCourseDto } from '@domains/course/dtos/update-course-dto';

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
export class CourseCrud implements OnInit {
  courseDialog: boolean = false;
  courses = signal<CourseListDto[]>([]);
  selectedCourses!: CourseListDto[] | null;
  profesores: User[] = [];
  courseForm: CreateCourseDto | UpdateCourseDto = {
    title: '',
    description: '',
    price: 0,
    teacherId: 0,
  };
  tipoEdicion = false;
  editingCourseId: number | null = null;
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
      { field: 'id', header: 'Código' },
      { field: 'title', header: 'Título' },
      { field: 'description', header: 'Descripción' },
      { field: 'price', header: 'Precio' },
      { field: 'teacherName', header: 'Profesor' },
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
    this.courseForm = { title: '', description: '', price: 0, teacherId: 0 };
    this.tipoEdicion = false;
    this.editingCourseId = null;
    this.submitted = false;
    this.courseDialog = true;
  }

  editCourse(course: CourseListDto) {
    this.tipoEdicion = true;
    this.editingCourseId = course.id;

    this.courseService.buscarPorId(course.id).subscribe({
      next: (courseDetail) => {
        this.courseForm = {
          title: courseDetail.title,
          description: courseDetail.description,
          price: courseDetail.price,
          teacherId: courseDetail.teacher.id,
        };
        this.courseDialog = true;
      },
      error: (err) => {
        console.error('Error al cargar detalles del curso:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los detalles del curso',
          life: 3000,
        });
      },
    });
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
        if (this.selectedCourses) {
          let deletedCount = 0;
          const totalToDelete = this.selectedCourses.length;

          this.selectedCourses.forEach((course) => {
            this.courseService.eliminar(course.id).subscribe({
              next: () => {
                deletedCount++;
                if (deletedCount === totalToDelete) {
                  this.cargarCursos();
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Cursos eliminados con éxito',
                    life: 3000,
                  });
                }
              },
              error: (err) => {
                console.error(`Error al eliminar curso ${course.id}:`, err);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: `Error al eliminar el curso ${course.title}`,
                  life: 3000,
                });
              },
            });
          });

          this.selectedCourses = null;
        }
      },
    });
  }

  hideDialog() {
    this.courseDialog = false;
    this.submitted = false;
  }

  isFormValid(): boolean {
    return !!(
      this.courseForm.title.trim() &&
      this.courseForm.description.trim() &&
      (this.courseForm.price === 0 || this.courseForm.price) &&
      this.courseForm.teacherId > 0
    );
  }

  saveCourse() {
    this.submitted = true;

    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete todos los campos requeridos',
        life: 3000,
      });
      return;
    }

    if (this.tipoEdicion && this.editingCourseId) {
      this.courseService
        .actualizar(this.editingCourseId, this.courseForm as UpdateCourseDto)
        .subscribe({
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
      this.courseService.crear(this.courseForm as CreateCourseDto).subscribe({
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