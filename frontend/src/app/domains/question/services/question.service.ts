import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Question } from '../models/question.model';
import { ApiError } from '../../../shared/models/api-error.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private baseUrl = `${environment.apiUrl}/questions`;

  constructor(private http: HttpClient) {}

  // GET /questions
  getList(): Observable<Question[]> {
    return this.http.get<ApiResponse<Question[]> | ApiError | Question[]>(this.baseUrl).pipe(
      map(res => {
        if (Array.isArray(res)) return res as Question[];
        if ((res as ApiResponse<Question[]>).success === true && (res as ApiResponse<Question[]>).data)
          return (res as ApiResponse<Question[]>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return [] as Question[];
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // GET /questions/{id}
  getById(id: number): Observable<Question> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ApiResponse<Question> | ApiError | Question>(url).pipe(
      map(res => {
        if ((res as ApiResponse<Question>).success === true && (res as ApiResponse<Question>).data)
          return (res as ApiResponse<Question>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as Question;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // POST /questions
  create(dto: Question): Observable<Question> {
    return this.http.post<ApiResponse<Question> | ApiError>(this.baseUrl, dto).pipe(
      map(res => {
        if ((res as ApiResponse<Question>).success === true && (res as ApiResponse<Question>).data)
          return (res as ApiResponse<Question>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as unknown as Question;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // PUT /questions/{id}
  update(id: number, dto: Partial<Question>): Observable<Question> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<ApiResponse<Question> | ApiError>(url, dto).pipe(
      map(res => {
        if ((res as ApiResponse<Question>).success === true && (res as ApiResponse<Question>).data)
          return (res as ApiResponse<Question>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as unknown as Question;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // DELETE /questions/{id}
  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<ApiResponse<any> | ApiError>(url).pipe(
      map(res => {
        if ((res as ApiError).success === false) throw res as ApiError;
        return void 0;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // GET /questions/exam/{examId}
  getByExam(examId: number): Observable<Question[]> {
    const url = `${this.baseUrl}/exam/${examId}`;
    return this.http.get<ApiResponse<Question[]> | ApiError | Question[]>(url).pipe(
      map(res => {
        if (Array.isArray(res)) return res as Question[];
        if ((res as ApiResponse<Question[]>).success === true && (res as ApiResponse<Question[]>).data)
          return (res as ApiResponse<Question[]>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return [] as Question[];
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
