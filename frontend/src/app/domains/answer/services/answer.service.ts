import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer.model';
import { environment } from '../../../../environments/environment.prod';
import { ApiError } from '../../../shared/models/api-error.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class AnswersService {
  private urlBase = 'http://localhost:8080/answers';
  private http = inject(HttpClient);

  listarPorPregunta(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.urlBase}/question/${questionId}`);
  }
}