import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-cover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-cover.html'
})
export class CourseCoverComponent {
  @Input() course?: Course;
  profileName?: string;
  profileImage?: string;
  coverImage?: string;
}
