import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import { EnrollmentCreateOrUpdateDto } from '../models/dto/enrollment-create-update.dto';
import { environment } from '../../../../environments/environment';
import { ApiError } from '../../../shared/models/api-error.model';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private baseUrl = `${environment.apiUrl}/enrollments`;

  constructor(private http: HttpClient) {}

  // Listar todos (puede devolver array directo, ApiResponse{success:true,data:...} o ApiError{success:false,...})
  getAll(): Observable<Enrollment[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(res => {
        if (Array.isArray(res)) return res as Enrollment[];
        if (res?.success === true && res?.data) return res.data as Enrollment[];
        if (res?.success === false) throw res as ApiError;
        // fallback: formato inesperado
        return [] as Enrollment[];
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Obtener por id
  getById(id: number): Observable<Enrollment> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(res => {
        if (res?.success === true && res?.data) return res.data as Enrollment;
        if (res?.success === false) throw res as ApiError;
        return res as Enrollment;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Crear (POST) -> ApiResponse
  create(dto: EnrollmentCreateOrUpdateDto): Observable<Enrollment> {
    return this.http.post<any>(this.baseUrl, dto).pipe(
      map(res => {
        if (res?.success === true && res?.data) return res.data as Enrollment;
        if (res?.success === false) throw res as ApiError;
        return res as Enrollment;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Actualizar (PUT)
  update(id: number, dto: EnrollmentCreateOrUpdateDto): Observable<Enrollment> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, dto).pipe(
      map(res => {
        if (res?.success === true && res?.data) return res.data as Enrollment;
        if (res?.success === false) throw res as ApiError;
        return res as Enrollment;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Eliminar (DELETE)
  delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      map(res => {
        if (res?.success === true) return void 0;
        if (res?.success === false) throw res as ApiError;
        return void 0;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Normaliza y propaga errores: si viene HttpErrorResponse, transforma a ApiError con formato backend
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
    // si ya es ApiError u otro objeto lanzado desde map
    return throwError(() => err);
  }
}
