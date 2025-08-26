import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '@domains/course/services/course-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCreateDTO } from '@domains/course/dtos/course-create.dto';
import { User } from '@domains/user/models/user.model';
import { UserService } from '@domains/user/services/user.service';

@Component({
  selector: 'app-course-form-cancel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form-cancel.html',
})
export class CourseFormCancel {
  courseCreate: CourseCreateDTO = { title: '', description: '', price: 0, teacherId: 0 };
  profesores: User[] = [];

  tipoEdicion = false;

  constructor(
    private route: ActivatedRoute,
    private CourseService: CourseService,
    private UserService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.UserService.listar().subscribe((data) => {
      this.profesores = data;
    });

    if (id) {
      this.tipoEdicion = true;
      this.CourseService.buscarPorId(parseInt(id)).subscribe((c) => {
        this.courseCreate = {
          courseId: c.courseId,
          title: c.title,
          description: c.description,
          price: c.price,
          teacherId: c.teacher.userId,
        };
        this.cdr.markForCheck();
      });
    }
  }

  guardar() {
    if (this.tipoEdicion) {
      this.CourseService.actualizar(this.courseCreate.courseId!, this.courseCreate).subscribe(
        () => {
          this.router.navigate(['/courses']);
        }
      );
    } else {
      this.CourseService.crear(this.courseCreate).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/courses']);
  }
}
