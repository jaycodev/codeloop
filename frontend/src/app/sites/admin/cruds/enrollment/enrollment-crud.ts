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
  template: `
        <!-- <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
                <p-button severity="secondary" label="Delete" icon="pi pi-trash" outlined [disabled]="!selectedEnrollments || !selectedEnrollments.length" />
            </ng-template>

            <ng-template #end>
                <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar> -->

        <p-table
            #dt
            [value]="enrollments()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['student.name', 'student.email', 'course.title', 'course.teacher.name']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedEnrollments"
            [rowHover]="true"
            dataKey="enrollmentId"
            currentPageReportTemplate="Se visualiza {first} a {last} de {totalRecords} inscripciones"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage Enrollment</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="texLa mascota, la mascota. Dice. Te amo. A t" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <!-- <th style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th> -->
                    <th pSortableColumn="enrollmentId" style="min-width:16rem">
                        Id
                        <p-sortIcon field="id" />
                    </th>
                    <th pSortableColumn="student.name" style="min-width: 8rem">
                        Student
                        <p-sortIcon field="student" />
                    </th>
                    <th pSortableColumn="student.email" style="min-width:10rem">
                        Email Student
                        <p-sortIcon field="email" />
                    </th>
                    <th pSortableColumn="course.title" style="min-width: 12rem">
                        Curso
                        <p-sortIcon field="course" />
                    </th>
                    <th pSortableColumn="course.teacher.name" style="min-width: 12rem">
                        Profesor
                        <p-sortIcon field="teacher" />
                    </th>
                    <th pSortableColumn="progress" style="min-width: 12rem">
                        Progreso
                        <p-sortIcon field="progress" />
                    </th>
                    <!-- <th style="min-width: 12rem"></th> -->
                </tr>
            </ng-template>
            <ng-template #body let-enrollment>
                <tr>
                    <!-- <td style="width: 3rem">
                        <p-tableCheckbox [value]="enrollment" />
                    </td> -->
                    <td style="min-width: 12rem">{{ enrollment.enrollmentId }}</td>
                    <td style="min-width: 16rem">{{ enrollment.student.name }}</td>
                    <td style="min-width: 16rem">{{ enrollment.student.email }}</td>
                    <td style="min-width: 16rem">{{ enrollment.course.title }}</td>
                    <td style="min-width: 16rem">{{ enrollment.course.teacher.name }}</td>
                    <td style="min-width: 16rem">
                      <p-progressBar [value]="enrollment.progress"/>
                    </td>
                    <!-- <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true"  />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true"  />
                    </td> -->
                </tr>
            </ng-template>
        </p-table>

        <!-- <p-dialog [(visible)]="enrollmentDialog" [style]="{ width: '450px' }" header="Product Details" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.image" class="block m-auto pb-4" *ngIf="product.image" />
                    <div>
                        <label for="name" class="block font-bold mb-3">Name</label>
                        <input type="text" pInputText id="name" [(ngModel)]="product.name" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !product.name">Name is required.</small>
                    </div>
                    <div>
                        <label for="description" class="block font-bold mb-3">Description</label>
                        <textarea id="description" pTextarea [(ngModel)]="product.description" required rows="3" cols="20" fluid></textarea>
                    </div>

                    <div>
                        <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                        <p-select [(ngModel)]="product.inventoryStatus" inputId="inventoryStatus" [options]="statuses" optionLabel="label" optionValue="label" placeholder="Select a Status" fluid />
                    </div>

                    <div>
                        <span class="block font-bold mb-4">Category</span>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category1" name="category" value="Accessories" [(ngModel)]="product.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category2" name="category" value="Clothing" [(ngModel)]="product.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category3" name="category" value="Electronics" [(ngModel)]="product.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category4" name="category" value="Fitness" [(ngModel)]="product.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-6">
                            <label for="price" class="block font-bold mb-3">Price</label>
                            <p-inputnumber id="price" [(ngModel)]="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                        </div>
                        <div class="col-span-6">
                            <label for="quantity" class="block font-bold mb-3">Quantity</label>
                            <p-inputnumber id="quantity" [(ngModel)]="product.quantity" fluid />
                        </div>
                    </div>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Save" icon="pi pi-check" (click)="saveProduct()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" /> -->
    `,
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
