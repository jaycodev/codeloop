import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseListDto } from '../dtos/course-list.dto';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { CourseDetailDto } from '../dtos/course-detail.dto';
import { UpdateCourseDto } from '../dtos/update-course-dto';
import { CourseSummaryDto } from '../dtos/course-summary.dto';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private urlBase = 'http://localhost:8080/courses';
  private http = inject(HttpClient);

  listar(): Observable<CourseListDto[]> {
    return this.http.get<CourseListDto[]>(`${this.urlBase}`);
  }

  buscarPorId(id: number): Observable<CourseDetailDto> {
    return this.http.get<CourseDetailDto>(`${this.urlBase}/${id}`);
  }

  crear(course: CreateCourseDto): Observable<CourseListDto> {
    return this.http.post<CourseListDto>(`${this.urlBase}`, course);
  }

  actualizar(id: number, course: UpdateCourseDto): Observable<CourseListDto> {
    return this.http.put<CourseListDto>(`${this.urlBase}/${id}`, course);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }

  listarResumen(): Observable<CourseSummaryDto[]> {
    return this.http.get<CourseSummaryDto[]>(`${this.urlBase}/summary`);
  }
}
