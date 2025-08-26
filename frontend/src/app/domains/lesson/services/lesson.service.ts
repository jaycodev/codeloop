import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { LessonListDto } from '../dtos/lesson-list.dto';
import { LessonDetailDto } from '../dtos/lesson-detail.dto';
import { LessonCreateDto } from '../dtos/lesson-create.dto';
import { LessonUpdateDto } from '../dtos/lesson-update.dto';
import { environment } from '@environments/environment.prod';
import { ApiError } from '@shared/models/api-error.model';
import { ApiResponse } from '@shared/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class LessonService {
  private baseUrl = `${environment.apiUrl}/lessons`;

  constructor(private http: HttpClient) {}

  // Listar todas las lecciones (puede devolver array directo, ApiResponse o ApiError)
  getAll(): Observable<LessonListDto[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<ApiResponse<LessonListDto[]> | ApiError | LessonListDto[]>(url).pipe(
      map((res) => {
        if (Array.isArray(res)) return res as LessonListDto[];
        if ((res as ApiResponse<LessonListDto[]>).success === true && (res as ApiResponse<LessonListDto[]>).data)
          return (res as ApiResponse<LessonListDto[]>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return [] as LessonListDto[]; // fallback
      }),
      catchError((err) => this.handleHttpError(err))
    );
  }

  // Listar por curso
  getByCourse(courseId: number): Observable<LessonListDto[]> {
    const url = `${this.baseUrl}/course/${courseId}`;
    return this.http.get<ApiResponse<LessonListDto[]> | ApiError | LessonListDto[]>(url).pipe(
      map((res) => {
        if (Array.isArray(res)) return res as LessonListDto[];
        if ((res as ApiResponse<LessonListDto[]>).success === true && (res as ApiResponse<LessonListDto[]>).data)
          return (res as ApiResponse<LessonListDto[]>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return [] as LessonListDto[];
      }),
      catchError((err) => this.handleHttpError(err))
    );
  }

  // Obtener detalle por id
  getById(id: number): Observable<LessonDetailDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ApiResponse<LessonDetailDto> | ApiError | LessonDetailDto>(url).pipe(
      map((res) => {
        if ((res as ApiResponse<LessonDetailDto>).success === true && (res as ApiResponse<LessonDetailDto>).data)
          return (res as ApiResponse<LessonDetailDto>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as LessonDetailDto;
      }),
      catchError((err) => this.handleHttpError(err))
    );
  }

  // Crear (POST) -> ApiResponse o ApiError
  create(dto: LessonCreateDto): Observable<LessonListDto> {
    return this.http.post<ApiResponse<LessonListDto> | ApiError>(this.baseUrl, dto).pipe(
      map((res) => {
        if ((res as ApiResponse<LessonListDto>).success === true && (res as ApiResponse<LessonListDto>).data)
          return (res as ApiResponse<LessonListDto>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as unknown as LessonListDto;
      }),
      catchError((err) => this.handleHttpError(err))
    );
  }

  // Actualizar (PUT) -> ApiResponse o ApiError
  update(id: number, dto: LessonUpdateDto): Observable<LessonListDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<ApiResponse<LessonListDto> | ApiError>(url, dto).pipe(
      map((res) => {
        if ((res as ApiResponse<LessonListDto>).success === true && (res as ApiResponse<LessonListDto>).data)
          return (res as ApiResponse<LessonListDto>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as unknown as LessonListDto;
      }),
      catchError((err) => this.handleHttpError(err))
    );
  }

  // Normaliza y propaga errores HTTP en ApiError para que el componente los maneje
  private handleHttpError(err: any): Observable<never> {
    if (err instanceof HttpErrorResponse) {
      const apiError: ApiError = {
        success: false,
        message: err.error?.message ?? err.message ?? 'Error desconocido',
        errorType: err.error?.errorType ?? err.statusText ?? 'http_error',
        statusCode: err.status ?? 0,
      };
      return throwError(() => apiError);
    }
    return throwError(() => err); // ya es ApiError u otro objeto lanzado en map
  }
}
