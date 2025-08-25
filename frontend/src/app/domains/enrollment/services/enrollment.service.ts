import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';
import { EnrollmentCreateOrUpdateDto } from '../models/dto/enrollment-create-update.dto';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private baseUrl = `${environment.apiUrl}/enrollments`;
  private http = inject(HttpClient);

  listar(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}`);
  }

  crear(dto: EnrollmentCreateOrUpdateDto): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.baseUrl}`, dto);
  }

  actualizar(id: number, dto: EnrollmentCreateOrUpdateDto): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.baseUrl}/${id}`, dto);
  }

  buscarPorId(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.baseUrl}/${id}`);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
