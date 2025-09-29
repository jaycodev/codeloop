import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);

  listar(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  crear(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, user);
  }

  buscarPorId(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  actualizar(id: number, user: User): Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/${id}`, user)
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`, { responseType: 'text' as 'json'})
  }
}
