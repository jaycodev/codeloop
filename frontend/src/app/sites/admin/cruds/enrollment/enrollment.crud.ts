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
  /*
    editProduct(product: Product) {
      this.product = { ...product };
      this.enrollmentDialog = true;
    }

    deleteSelectedProducts() {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected enrollments?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.enrollments.set(this.enrollments().filter((val) => !this.selectedProducts?.includes(val)));
          this.selectedProducts = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000
          });
        }
      });
    }

    hideDialog() {
      this.enrollmentDialog = false;
      this.submitted = false;
    }

    deleteProduct(product: Product) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.enrollments.set(this.enrollments().filter((val) => val.id !== product.id));
          this.product = {};
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000
          });
        }
      });
    }

    findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.enrollments().length; i++) {
        if (this.enrollments()[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    }

    createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    }

    getSeverity(status: string) {
      switch (status) {
        case 'INSTOCK':
          return 'success';
        case 'LOWSTOCK':
          return 'warn';
        case 'OUTOFSTOCK':
          return 'danger';
        default:
          return 'info';
      }
    }

    saveProduct() {
      this.submitted = true;
      let _enrollments = this.enrollments();
      if (this.product.name?.trim()) {
        if (this.product.id) {
          _enrollments[this.findIndexById(this.product.id)] = this.product;
          this.enrollments.set([..._enrollments]);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Updated',
            life: 3000
          });
        } else {
          this.product.id = this.createId();
          this.product.image = 'product-placeholder.svg';
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Created',
            life: 3000
          });
          this.enrollments.set([..._enrollments, this.product]);
        }

        this.enrollmentDialog = false;
        this.product = {};
      }
    }*/
}
