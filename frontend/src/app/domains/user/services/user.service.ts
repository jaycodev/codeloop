// ...existing code...
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from '@environments/environment.prod';
import { User } from '../models/user.model';
import { UserSummaryDto } from '../dtos/user-summary.dto';
import { ApiError } from '@shared/models/api-error.model';
import { ApiResponse } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlBase = 'http://localhost:8080/users';
  private http = inject(HttpClient);

  listar(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlBase}`);
  }

  /* crear(course: CourseCreateDTO): Observable<CourseCreateDTO> {
    return this.http.post<CourseCreateDTO>(`${this.urlBase}`, course);
  }*/

  buscarPorId(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlBase}/${id}`);
  }

  /*actualizar(id: number, course: CourseCreateDTO): Observable<CourseCreateDTO>{
    return this.http.put<CourseCreateDTO>(`${this.urlBase}/${id}`, course)
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.urlBase}/${id}`, { responseType: 'text' as 'json'})
  }
    */
}
