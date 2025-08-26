import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseCreateDTO } from '../dtos/course-create.dto';
import { CourseDTO } from '../dtos/course.dto';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private urlBase = 'http://localhost:8080/courses';
  private http = inject(HttpClient);

  listar(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(`${this.urlBase}`);
  }

  crear(course: CourseCreateDTO): Observable<CourseCreateDTO> {
    return this.http.post<CourseCreateDTO>(`${this.urlBase}`, course);
  }

  buscarPorId(id: number): Observable<CourseDTO> {
    return this.http.get<CourseDTO>(`${this.urlBase}/${id}`);
  }

  actualizar(id: number, course: CourseCreateDTO): Observable<CourseCreateDTO> {
    return this.http.put<CourseCreateDTO>(`${this.urlBase}/${id}`, course);
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.urlBase}/${id}`, { responseType: 'text' as 'json' });
  }
}
