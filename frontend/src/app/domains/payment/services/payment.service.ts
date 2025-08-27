import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePaymentDto } from '../models/dto/create-payment.dto';
import { PaymentDetailDto } from '../models/dto/payment-detail.dto';
import { PaymentListDto } from '../models/dto/payment-list.dto';
import { UpdatePaymentDto } from '../models/dto/update-payment.dto';
import { environment } from '@environments/environment.prod';
import { PaymentStatsResponse } from '../models/dto/payment-stats.dto';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient);
  private readonly urlBase = `${environment.apiUrl}/payments`;

  listar(): Observable<PaymentListDto[]> {
    return this.http.get<PaymentListDto[]>(this.urlBase);
  }

  buscarPorId(id: number): Observable<PaymentDetailDto> {
    return this.http.get<PaymentDetailDto>(`${this.urlBase}/${id}`);
  }

  crear(dto: CreatePaymentDto): Observable<PaymentListDto> {
    return this.http.post<PaymentListDto>(this.urlBase, dto);
  }

  actualizar(id: number, dto: UpdatePaymentDto): Observable<PaymentListDto> {
    return this.http.put<PaymentListDto>(`${this.urlBase}/${id}`, dto);
  }

  getStats(): Observable<PaymentStatsResponse> {
    return this.http.get<PaymentStatsResponse>(`${this.urlBase}/stats`);
  }
}
