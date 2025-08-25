import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './header';
import { Footer } from './footer';

@Component({
  selector: 'student-layout',
  standalone: true,
  imports: [RouterModule, Header, Footer],
  template: `
    <div class="bg-surface-0 dark:bg-surface-900">
      <div class="landing-wrapper overflow-hidden">
        <app-header
          class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static"
        />
        <router-outlet />
        <app-footer />
      </div>
    </div>
  `,
})
export class StudentLayout {}
