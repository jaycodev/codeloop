import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '@domains/course/services/course-service';
import { Router, RouterModule } from '@angular/router';
import { CourseDTO } from '@domains/course/dtos/course.dto';

@Component({
  selector: 'app-course-list-cancel',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './course-list-delete.html',
})
export class CourseListado implements OnInit {
  courses: CourseDTO[] = [];

  constructor(
    private CourseService: CourseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCourses();
  }

  cargarCourses() {
    this.CourseService.listar().subscribe({
      next: (data: CourseDTO[]) => {
        this.courses = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(`Error en course => ${err}`);
      },
    });
  }

  eliminar(id: number) {
    if (confirm('Está seguro de eliminar este curso?')) {
      this.CourseService.eliminar(id).subscribe({
        next: (resp) => {
          alert(resp);
          this.cargarCourses();
        },
        error: (err) => {
          console.error(`Error en cursos => ${JSON.stringify(err)}`);
        },
      });
    }
  }
}
