import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private http = inject(HttpClient);
  private readonly urlBase = 'http://localhost:8080/questions';

  listar(): Observable<Question[]> {
    return this.http.get<Question[]>(this.urlBase);
  }

  buscarPorId(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.urlBase}/${id}`);
  }

  listarPorExamen(examId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.urlBase}/exam/${examId}`);
  }

  crear(q: Question): Observable<Question> {
    return this.http.post<Question>(this.urlBase, q);
  }

  actualizar(id: number, q: Question): Observable<Question> {
    return this.http.put<Question>(`${this.urlBase}/${id}`, q);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}