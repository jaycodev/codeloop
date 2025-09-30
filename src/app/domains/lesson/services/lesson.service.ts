import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LessonListDto } from '../dtos/lesson-list.dto';
import { LessonDetailDto } from '../dtos/lesson-detail.dto';
import { LessonCreateDto } from '../dtos/lesson-create.dto';
import { LessonUpdateDto } from '../dtos/lesson-update.dto';
import { environment } from '@environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class LessonService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/lessons`;

  listar(): Observable<LessonListDto[]> {
    return this.http.get<LessonListDto[]>(this.baseUrl);
  }

  listarPorCurso(courseId: number): Observable<LessonListDto[]> {
    return this.http.get<LessonListDto[]>(`${this.baseUrl}/course/${courseId}`);
  }

  buscarPorId(id: number): Observable<LessonDetailDto> {
    return this.http.get<LessonDetailDto>(`${this.baseUrl}/${id}`);
  }

  crear(dto: LessonCreateDto): Observable<LessonListDto> {
    return this.http.post<LessonListDto>(this.baseUrl, dto);
  }

  actualizar(id: number, dto: LessonUpdateDto): Observable<LessonListDto> {
    return this.http.put<LessonListDto>(`${this.baseUrl}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
