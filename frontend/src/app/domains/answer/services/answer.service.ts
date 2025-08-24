import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Answer } from '../models/answer.model';
import { environment } from '../../../../environments/environment';
import { ApiError } from '../../../shared/models/api-error.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class AnswerService {
  private baseUrl = `${environment.apiUrl}/answers`;

  constructor(private http: HttpClient) {}

  // Enviar/guardar una respuesta: POST /answers  (backend devuelve ApiResponse o ApiError)
  submit(answer: Answer): Observable<Answer> {
    return this.http.post<ApiResponse<Answer> | ApiError>(this.baseUrl, answer).pipe(
      map(res => {
        // ApiResponse con data
        if ((res as ApiResponse<Answer>).success === true && (res as ApiResponse<Answer>).data) {
          return (res as ApiResponse<Answer>).data;
        }
        // ApiError del backend
        if ((res as ApiError).success === false) {
          throw res as ApiError;
        }
        // fallback: intentar tratar la respuesta como Answer directa
        return res as unknown as Answer;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Obtener respuestas por pregunta: GET /answers/question/{questionId} (devuelve ApiResponse o ApiError)
  findByQuestion(questionId: number): Observable<Answer[]> {
    const url = `${this.baseUrl}/question/${questionId}`;
    return this.http.get<ApiResponse<Answer[]> | ApiError | Answer[]>(url).pipe(
      map(res => {
        // Si el backend devuelve un array directo
        if (Array.isArray(res)) return res as Answer[];

        // Si viene envuelto en ApiResponse
        if ((res as ApiResponse<Answer[]>).success === true && (res as ApiResponse<Answer[]>).data) {
          return (res as ApiResponse<Answer[]>).data;
        }

        // Si viene ApiError (por ejemplo 204 con mensaje)
        if ((res as ApiError).success === false) {
          throw res as ApiError;
        }

        // fallback
        return [] as Answer[];
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Maneja HttpErrorResponse y ApiError ya lanzados desde map
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
    // Si ya es ApiError u otro objeto lanzado en map
    return throwError(() => err);
  }
}
