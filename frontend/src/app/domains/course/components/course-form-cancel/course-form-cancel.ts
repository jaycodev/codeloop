import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course, CourseService } from '../../services/course-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-form-cancel',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './course-form-cancel.html'
})
export class CourseFormCancel {

  course: Course = { title: '', description: '', price: 0, teacherId: 0 }
  tipoEdicion = false

  constructor(
    private route: ActivatedRoute,
    private CourseService: CourseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(id){
      this.tipoEdicion = true
      this.CourseService.buscarPorId(parseInt(id)).subscribe(c => {
        this.course = c
        this.cdr.markForCheck()
      })
    }
  }

  guardar(){
    if(this.tipoEdicion){
      this.CourseService.actualizar(this.course.courseId!, this.course).subscribe(() => {
        this.router.navigate(['/courses'])
      })
    }
    else{
      this.CourseService.crear(this.course).subscribe(() => {
        this.router.navigate(['/courses'])
      })
    }
  }

cancelar(){
    this.router.navigate(['/courses'])
  }
}
