import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '@domains/user/services/user.service';
import { User } from '@domains/user/models/user.model';
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

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-user-crud',
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
  templateUrl: 'users.html',
})
export class UserCrudComponent implements OnInit {
  userDialog: boolean = false;
  users = signal<User[]>([]);
  selectedUsers!: User[] | null;
  user: User = { name: '', email: '', password_hash: '', role: 'STUDENT' };
  submitted: boolean = false;
  cols: Column[] = [];

  @ViewChild('dt') dt!: Table;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();

    this.cols = [
      { field: 'userId', header: 'ID' },
      { field: 'name', header: 'Nombre' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Rol' },
    ];
  }

  cargarUsuarios() {
    this.userService.listar().subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('Error al cargar usuarios', err),
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  openNew() {
    this.user = { name: '', email: '', password_hash: '', role: 'STUDENT' };
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este usuario?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.eliminar(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Usuario eliminado con éxito',
              life: 3000,
            });
            this.cargarUsuarios();
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al eliminar el usuario',
              life: 3000,
            });
          },
        });
      },
    });
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar los usuarios seleccionados?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedUsers?.forEach((user) => {
          this.userService.eliminar(user.userId!).subscribe({
            next: () => this.cargarUsuarios(),
            error: (err) => console.error(`Error al eliminar usuario ${user.userId!}:`, err),
          });
        });
        this.selectedUsers = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuarios eliminados con éxito',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser() {
    this.submitted = true;

    if (this.user.userId) {
      this.userService.actualizar(this.user.userId, this.user).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario actualizado con éxito',
            life: 3000,
          });
          this.cargarUsuarios();
          this.hideDialog();
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el usuario',
            life: 3000,
          });
        },
      });
    } else {
      this.userService.crear(this.user).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario creado con éxito',
            life: 3000,
          });
          this.cargarUsuarios();
          this.hideDialog();
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al crear el usuario',
            life: 3000,
          });
        },
      });
    }
  }
}