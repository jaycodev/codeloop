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
  template: `
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>

    <p-toolbar styleClass="mb-4">
      <ng-template pTemplate="left">
        <button
          pButton
          pRipple
          label="Nuevo Curso"
          icon="pi pi-plus"
          class="p-button-success mr-2"
          (click)="openNew()"
        ></button>
        <button
          pButton
          pRipple
          label="Eliminar"
          icon="pi pi-trash"
          class="p-button-danger"
          [disabled]="!selectedCourses || selectedCourses.length === 0"
          (click)="deleteSelectedCourses()"
        ></button>
      </ng-template>
      <ng-template pTemplate="right">
        <p-iconField iconPosition="left">
          <p-inputIcon class="pi pi-search"></p-inputIcon>
          <input
            pInputText
            type="text"
            (input)="onGlobalFilter(dt, $event)"
            placeholder="Buscar..."
          />
        </p-iconField>
      </ng-template>
    </p-toolbar>

    <p-table
      #dt
      [value]="courses()"
      [columns]="cols"
      [rows]="10"
      [paginator]="true"
      [globalFilterFields]="['title', 'description', 'teacher.name']"
      [rowHover]="true"
      dataKey="courseId"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} cursos"
      [showCurrentPageReport]="true"
      [rowsPerPageOptions]="[10, 20, 30]"
      [(selection)]="selectedCourses"
    >
      <ng-template pTemplate="caption">
        <h5 class="m-0">Gestión de Cursos</h5>
      </ng-template>
      <ng-template pTemplate="header" let-columns>
        <tr>
          <th style="width: 3rem">
            <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
          </th>
          <th *ngFor="let col of columns" pSortableColumn="{{ col.field }}">
            {{ col.header }}
            <p-sortIcon field="{{ col.field }}"></p-sortIcon>
          </th>
          <th style="min-width: 10rem">Acciones</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-course>
        <tr>
          <td style="width: 3rem">
            <p-tableCheckbox [value]="course"></p-tableCheckbox>
          </td>
          <td>{{ course.courseId }}</td>
          <td>{{ course.title }}</td>
          <td>{{ course.description }}</td>
          <td>{{ course.price | currency : 'USD' : 'symbol' : '1.2-2' }}</td>
          <td>{{ course.teacher.name }}</td>
          <td>
            <button
              pButton
              pRipple
              icon="pi pi-pencil"
              class="p-button-rounded p-button-info mr-2"
              (click)="editCourse(course)"
            ></button>
            <button
              pButton
              pRipple
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              (click)="deleteCourse(course.courseId!)"
            ></button>
          </td>
        </tr>
      </ng-template>
      <ng-template pTemplate="emptymessage">
        <tr>
          <td colspan="6" class="text-center">No se encontraron cursos.</td>
        </tr>
      </ng-template>
    </p-table>

    <p-dialog
      [(visible)]="courseDialog"
      [style]="{ width: '450px' }"
      header="{{ tipoEdicion ? 'Editar Curso' : 'Nuevo Curso' }}"
      [modal]="true"
    >
      <ng-template pTemplate="content">
        <div class="field mb-3">
          <label for="title">Título:</label>
          <input type="text" id="title" name="title" [(ngModel)]="courseCreate.title" required />
        </div>

        <div class="field mb-3">
          <label for="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            [(ngModel)]="courseCreate.description"
            required
          ></textarea>
        </div>

        <div class="field mb-3">
          <label for="price">Precio:</label>
          <input type="number" id="price" name="price" [(ngModel)]="courseCreate.price" required />
        </div>

        <div class="field mb-3">
          <label for="teacher">Docente:</label>
          <select id="teacher" name="teacher" [(ngModel)]="courseCreate.teacherId" required>
            <option *ngFor="let prof of profesores" [value]="prof.userId">{{ prof.name }}</option>
          </select>
        </div>
      </ng-template>

      <ng-template pTemplate="footer">
        <button
          pButton
          pRipple
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text"
          (click)="hideDialog()"
        ></button>
        <button
          pButton
          pRipple
          label="{{ tipoEdicion ? 'Actualizar' : 'Guardar' }}"
          icon="pi pi-check"
          class="p-button-text"
          (click)="saveCourse()"
        ></button>
      </ng-template>
    </p-dialog>
  `,
})
export class CourseCrud implements OnInit {
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
    this.courseCreate = { ...course, teacherId: course.teacher.userId };
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
        const idsToDelete = this.selectedCourses?.map((course) => course.courseId!);
        // Aquí podrías llamar a un servicio para eliminar varios cursos a la vez.
        // Como no tienes ese método, lo simulo con eliminaciones individuales.
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
