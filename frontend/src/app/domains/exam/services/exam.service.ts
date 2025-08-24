import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Exam } from '../models/exam.model';
import { environment } from '../../../../environments/environment.prod';
import { ApiError } from '../../../shared/models/api-error.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class ExamService {
  private baseUrl = `${environment.apiUrl}/exams`;

  constructor(private http: HttpClient) {}

  // Listar todos (array directo | ApiResponse | ApiError)
  getAll(): Observable<Exam[]> {
    return this.http.get<ApiResponse<Exam[]> | ApiError | Exam[]>(this.baseUrl).pipe(
      map(res => {
        if (Array.isArray(res)) return res as Exam[];
        if ((res as ApiResponse<Exam[]>).success === true && (res as ApiResponse<Exam[]>).data)
          return (res as ApiResponse<Exam[]>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return [] as Exam[];
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Obtener por id (ApiResponse | ApiError | Exam)
  getById(id: number): Observable<Exam> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ApiResponse<Exam> | ApiError | Exam>(url).pipe(
      map(res => {
        if ((res as ApiResponse<Exam>).success === true && (res as ApiResponse<Exam>).data)
          return (res as ApiResponse<Exam>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as Exam;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Listar por curso (según controlador devuelve ApiResponse(true, exams) o ApiError/no-content)
  getByCourse(courseId: number): Observable<Exam[]> {
    const url = `${this.baseUrl}/course/${courseId}`;
    return this.http.get<ApiResponse<Exam[]> | ApiError | Exam[]>(url).pipe(
      map(res => {
        if (Array.isArray(res)) return res as Exam[];
        if ((res as ApiResponse<Exam[]>).success === true && (res as ApiResponse<Exam[]>).data)
          return (res as ApiResponse<Exam[]>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return [] as Exam[];
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
