import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer.model';

@Injectable({ providedIn: 'root' })
export class AnswerService {
  private urlBase = 'http://localhost:8080/answers';
  private http = inject(HttpClient);

  // Respuestas de todos los alumnos de una pregunta
  listarPorPregunta(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.urlBase}/question/${questionId}`);
  }

  listarTodas(): Observable<Answer[]> {
  return this.http.get<Answer[]>(`${this.urlBase}`);
  }
}
