import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseSummaryDto } from '../models/dto/course-summary.dto';
import { CourseCreateDTO } from '../models/dto/course-create.dto';
import { environment } from '../../../../environments/environment';
import { ApiError } from '../../../shared/models/api-error.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  // Listar todos los cursos (puede devolver array directo, ApiResponse o ApiError)
  getCourses(): Observable<Course[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<any>(url).pipe(
      map(res => {
        if (Array.isArray(res)) return res as Course[];
        if (res?.success === true && res?.data) return res.data as Course[];
        if (res?.success === false) throw res as ApiError;
        // fallback: intentar interpretar como Course[]
        return res as Course[];
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Buscar curso por ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(res => {
        if (res?.success === true && res?.data) return res.data as Course;
        if (res?.success === false) throw res as ApiError;
        return res as Course;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Crear un curso (consume POST /courses)
  createCourse(dto: CourseCreateDTO): Observable<Course> {
    return this.http.post<any>(`${this.baseUrl}`, dto).pipe(
      map(res => {
        if (res?.success === true && res?.data) return res.data as Course;
        if (res?.success === false) throw res as ApiError;
        return res as Course;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Listar cursos de un profesor (si existe endpoint)
  getCoursesByTeacher(teacherId: number): Observable<CourseSummaryDto[]> {
    return this.http.get<any>(`${this.baseUrl}/find/courses/${teacherId}`).pipe(
      map(res => {
        if (Array.isArray(res)) return res as CourseSummaryDto[];
        if (res?.success === true && res?.data) return res.data as CourseSummaryDto[];
        if (res?.success === false) throw res as ApiError;
        return res as CourseSummaryDto[];
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Normaliza y propaga errores: transforma HttpErrorResponse en ApiError
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
