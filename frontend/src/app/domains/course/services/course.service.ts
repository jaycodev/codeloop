import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseSummaryDto } from '../models/dto/course-summary.dto';
import { environment } from '../../../environments/environment'; // importa el env

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  // Listar todos los cursos
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/list`);
  }

  // Buscar curso por ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  // Listar cursos de un profesor
  getCoursesByTeacher(teacherId: number): Observable<CourseSummaryDto[]> {
    return this.http.get<CourseSummaryDto[]>(`${this.baseUrl}/find/courses/${teacherId}`);
  }
}
