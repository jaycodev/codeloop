import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam.model';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private baseUrl = `${environment.apiUrl}/exams`;
  private http = inject(HttpClient);

  listar(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.baseUrl}`);
  }

  buscarPorId(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.baseUrl}/${id}`);
  }

  buscarPorCurso(courseId: number): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.baseUrl}/course/${courseId}`);
  }

  crear(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(`${this.baseUrl}`, exam);
  }

  actualizar(id: number, exam: Exam): Observable<Exam> {
    return this.http.put<Exam>(`${this.baseUrl}/${id}`, exam);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
