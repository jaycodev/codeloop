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
import { PaymentService } from '@/domains/payment/services/payment.service';
import { PaymentListDto } from '@/domains/payment/models/dto/payment-list.dto';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PaymentStatus, PaymentMethod } from '@/domains/payment/models/payment.model';

@Component({
  selector: 'app-payment-crud',
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
    InputNumberModule,
    InputIconModule,
    IconFieldModule
  ],
  templateUrl: './payment-crud.html',
  providers: [MessageService, ConfirmationService],
})
export class PaymentCrud implements OnInit {
  paymentDialog: boolean = false;
  payments = signal<PaymentListDto[]>([]);
  payment!: PaymentListDto | any;
  selectedPayments!: PaymentListDto[] | null;
  submitted: boolean = false;
  PaymentStatus = PaymentStatus;
  PaymentMethod=PaymentMethod;

  @ViewChild('dt') dt!: Table;

  cols = [
    { field: 'studentName', header: 'Estudiante' },
    { field: 'courseTitle', header: 'Curso' },
    { field: 'amount', header: 'Monto' },
    { field: 'status', header: 'Estado' },
    { field: 'paymentDate', header: 'Fecha de pago' },
    { field: 'paymentMethod', header: 'Metodo' },
  ];

  isUpdateMode = false;

  constructor(
    private paymentService: PaymentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService.listar().subscribe({
      next: (data) => this.payments.set(data),
      error: (err) => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load payments' });
      },
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  hideDialog() {
    this.paymentDialog = false;
    this.submitted = false;
  }
}
