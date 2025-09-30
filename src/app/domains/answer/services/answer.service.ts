import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AnswerService {
  private baseUrl = `${environment.apiUrl}/answers`;
  private http = inject(HttpClient);

  listarPorPregunta(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.baseUrl}/question/${questionId}`);
  }

  listarTodas(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.baseUrl}`);
  }
}
