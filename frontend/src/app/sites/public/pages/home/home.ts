import { Component } from '@angular/core';
import { Hero } from '../../components/hero';
import { CourseCard } from '../../components/course-card';
import { Pricing } from '../../components/pricing';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, CourseCard, Pricing],
  template: `
    <app-hero />
    <app-course-card />
    <app-pricing />
  `,
})
export class Home {}
