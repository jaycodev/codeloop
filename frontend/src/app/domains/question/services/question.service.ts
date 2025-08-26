/* import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionDTO } from '../dtos/question.dto';
import { QuestionCreateDTO } from '../dtos/question-create.dto';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private http = inject(HttpClient);
  private readonly urlBase = 'http://localhost:8080/questions';

  listar(): Observable<QuestionDTO[]> {
    return this.http.get<QuestionDTO[]>(this.urlBase);
  }

  buscarPorId(id: number): Observable<QuestionDTO> {
    return this.http.get<QuestionDTO>(`${this.urlBase}/${id}`);
  }

  listarPorExamen(examId: number): Observable<QuestionDTO[]> {
    return this.http.get<QuestionDTO[]>(`${this.urlBase}/exam/${examId}`);
  }

  crear(q: QuestionCreateDTO): Observable<QuestionDTO> {
    return this.http.post<QuestionDTO>(this.urlBase, q);
  }

  actualizar(id: number, q: QuestionCreateDTO): Observable<QuestionDTO> {
    return this.http.put<QuestionDTO>(`${this.urlBase}/${id}`, q);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }
}
 */
