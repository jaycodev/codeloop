import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course-service';
import { Course } from '../../services/course-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-list-cancel',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './course-list-delete.html'
})
export class CourseListado implements OnInit {
  courses: Course[] = [];

  constructor(
    private CourseService: CourseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
    this.cargarCourses()
  }

cargarCourses(){
    this.CourseService.listar().subscribe({
      next: (data: Course[]) => {
        this.courses = data
        this.cdr.markForCheck()
      },
      error: (err) => {
        console.error(`Error en course => ${err}`)
      }
    })
  }

  //FALTA ELIMINAR
  
}
