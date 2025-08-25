import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RippleModule, StyleClassModule, ButtonModule, DividerModule],
  template: ``,
})
export class Courses {}
