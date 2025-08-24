import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseService } from '../../domains/course/services/course-service';

@Component({
  selector: 'app-description-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description-course.html'
})
export class CourseDescription {

  course: Course = { title: '', description: '', price: 0, teacherId: 0 };

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.buscarPorId(parseInt(id)).subscribe(c => {
        this.course = c;
        this.cdr.markForCheck();
      });
    }
  }
}
