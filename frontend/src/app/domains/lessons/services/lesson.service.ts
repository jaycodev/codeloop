import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LessonListDto } from '../models/dto/lesson-list.dto';
import { LessonDetailDto } from '../models/dto/lesson-detail.dto';
import { LessonCreateDto } from '../models/dto/lesson-create.dto';
import { LessonUpdateDto } from '../models/dto/lesson-update.dto';
import { environment } from '../../../environments/environment'; // importa el env

// interfaces para ApiResponse y ApiError
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class LessonService {private baseUrl = `${environment.apiUrl}/lessons`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LessonListDto[]> {
    return this.http.get<LessonListDto[]>(this.baseUrl);
  }

  getByCourse(courseId: number): Observable<LessonListDto[]> {
    return this.http.get<LessonListDto[]>(`${this.baseUrl}/course/${courseId}`);
  }

  getById(id: number): Observable<LessonDetailDto> {
    return this.http.get<LessonDetailDto>(`${this.baseUrl}/${id}`);
  }

  create(dto: LessonCreateDto): Observable<LessonListDto> {
    return this.http.post<ApiResponse<LessonListDto>>(this.baseUrl, dto).pipe(
      map((res) => res.data)
    );
  }

  update(id: number, dto: LessonUpdateDto): Observable<LessonListDto> {
    return this.http.put<ApiResponse<LessonListDto>>(`${this.baseUrl}/${id}`, dto).pipe(
      map((res) => res.data)
    );
  }
}
