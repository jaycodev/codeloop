import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionDTO } from '../dtos/question.dto';
import { QuestionCreateDTO } from '../dtos/question-create.dto';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/questions`;

  listar(): Observable<QuestionDTO[]> {
    return this.http.get<QuestionDTO[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<QuestionDTO> {
    return this.http.get<QuestionDTO>(`${this.baseUrl}/${id}`);
  }

  listarPorExamen(examId: number): Observable<QuestionDTO[]> {
    return this.http.get<QuestionDTO[]>(`${this.baseUrl}/exam/${examId}`);
  }

  crear(q: QuestionCreateDTO): Observable<QuestionDTO> {
    return this.http.post<QuestionDTO>(this.baseUrl, q);
  }

  actualizar(id: number, q: QuestionCreateDTO): Observable<QuestionDTO> {
    return this.http.put<QuestionDTO>(`${this.baseUrl}/${id}`, q);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
