// ...existing code...
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { User } from '../models/user.model';
import { UserSummaryDto } from '../models/dto/user-summary.dto';
import { ApiError } from '../../../shared/models/api-error.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios (array directo | ApiResponse | ApiError)
  getUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]> | ApiError | User[]>(this.baseUrl).pipe(
      map(res => {
        if (Array.isArray(res)) return res as User[];
        if ((res as ApiResponse<User[]>).success === true && (res as ApiResponse<User[]>).data)
          return (res as ApiResponse<User[]>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return [] as User[];
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Obtener un usuario por ID (ApiResponse | ApiError | User)
  getUserById(id: number): Observable<User> {
    return this.http.get<ApiResponse<User> | ApiError | User>(`${this.baseUrl}/${id}`).pipe(
      map(res => {
        if ((res as ApiResponse<User>).success === true && (res as ApiResponse<User>).data)
          return (res as ApiResponse<User>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as User;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Crear usuario -> devuelve User dentro de ApiResponse o ApiError
  createUser(user: User): Observable<User> {
    return this.http.post<ApiResponse<User> | ApiError>(this.baseUrl, user).pipe(
      map(res => {
        if ((res as ApiResponse<User>).success === true && (res as ApiResponse<User>).data)
          return (res as ApiResponse<User>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as unknown as User;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Actualizar usuario -> devuelve User dentro de ApiResponse o ApiError
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<ApiResponse<User> | ApiError>(`${this.baseUrl}/${id}`, user).pipe(
      map(res => {
        if ((res as ApiResponse<User>).success === true && (res as ApiResponse<User>).data)
          return (res as ApiResponse<User>).data;
        if ((res as ApiError).success === false) throw res as ApiError;
        return res as unknown as User;
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  // Eliminar usuario -> backend devuelve ApiResponse(success,true,message) o ApiError
  deleteUser(id: number): Observable<void> {
    return this.http.delete<ApiResponse<any> | ApiError>(`${this.baseUrl}/${id}`).pipe(
      map(res => {
        if ((res as ApiError).success === false) throw res as ApiError;
        return void 0;
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
