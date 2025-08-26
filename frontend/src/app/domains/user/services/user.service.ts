// ...existing code...
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlBase = 'http://localhost:8080/users';
  private http = inject(HttpClient);

  listar(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlBase}`);
  }

  crear(user: User): Observable<User> {
    return this.http.post<User>(`${this.urlBase}`, user);
  }

  buscarPorId(id: number): Observable<User> {
    return this.http.get<User>(`${this.urlBase}/${id}`);
  }

  actualizar(id: number, user: User): Observable<User>{
    return this.http.put<User>(`${this.urlBase}/${id}`, user)
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.urlBase}/${id}`, { responseType: 'text' as 'json'})
  }
    
}
