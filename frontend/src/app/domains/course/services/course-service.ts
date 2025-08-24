import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseCreateDTO } from '../models/dto/course-create.dto';

export interface Course {
  courseId?: number;
  title: string;
  description: string;
  price: number;
  teacherId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private urlBase = 'http://localhost:8080/courses';
  private http = inject(HttpClient);

  listar(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.urlBase}`);
  }

  crear(course: CourseCreateDTO): Observable<any> {
    return this.http.post(`${this.urlBase}`, course);
  }

  buscarPorId(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.urlBase}/${id}`);
  }

  actualizar(id: number, course: CourseCreateDTO): Observable<Course>{
    return this.http.put<Course>(`${this.urlBase}/${id}`, course)
  }

  eliminar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.urlBase}/${id}`, { responseType: 'text' as 'json'})
  }
  // Agrega métodos de actualizar y eliminar si luego implementas esos endpoints
}
