import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { ApiError } from '../../../shared/models/api-error.model';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { CreatePaymentDto } from '../models/dto/create-payment.dto';
import { PaymentDetailDto } from '../models/dto/payment-detail.dto';
import { PaymentListDto } from '../models/dto/payment-list.dto';
import { UpdatePaymentDto } from '../models/dto/update-payment.dto';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private baseUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  // Listar todos -> GET /payments
  getList(): Observable<PaymentListDto[]> {
    return this.http.get<ApiResponse<PaymentListDto[]> | ApiError | PaymentListDto[]>(this.baseUrl).pipe(
      map(res => {
        if (Array.isArray(res)) return res as PaymentListDto[];
        if ((res as ApiResponse<PaymentListDto[]>).success === true && (res as ApiResponse<PaymentListDto[]>).data)
          return (res as ApiResponse<PaymentListDto[]>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return [] as PaymentListDto[];
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Obtener detalle -> GET /payments/{id}
  getInfoById(id: number): Observable<PaymentDetailDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ApiResponse<PaymentDetailDto> | ApiError | PaymentDetailDto>(url).pipe(
      map(res => {
        if ((res as ApiResponse<PaymentDetailDto>).success === true && (res as ApiResponse<PaymentDetailDto>).data)
          return (res as ApiResponse<PaymentDetailDto>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as PaymentDetailDto;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Crear -> POST /payments
  create(dto: CreatePaymentDto): Observable<PaymentListDto> {
    return this.http.post<ApiResponse<PaymentListDto> | ApiError>(this.baseUrl, dto).pipe(
      map(res => {
        if ((res as ApiResponse<PaymentListDto>).success === true && (res as ApiResponse<PaymentListDto>).data)
          return (res as ApiResponse<PaymentListDto>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as unknown as PaymentListDto;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Actualizar -> PUT /payments/{id}
  update(id: number, dto: UpdatePaymentDto): Observable<PaymentListDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<ApiResponse<PaymentListDto> | ApiError>(url, dto).pipe(
      map(res => {
        if ((res as ApiResponse<PaymentListDto>).success === true && (res as ApiResponse<PaymentListDto>).data)
          return (res as ApiResponse<PaymentListDto>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as unknown as PaymentListDto;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Normaliza HttpErrorResponse a ApiError y propaga
  private handleHttpError(err: any): Observable<never> {
    if (err instanceof HttpErrorResponse) {
      const apiError: ApiError = {
        success: false,
        message: err.error?.message ?? err.message ?? 'Error desconocido',
        errorType: err.error?.errorType ?? err.statusText ?? 'http_error',
        statusCode: err.status ?? 0
      };
      return throwError(() => apiError);
    }
    return throwError(() => err); // ya es ApiError u otro objeto lanzado en map
  }
}
