import { Component } from '@angular/core';
import {  } from './domains/course/components/listado-prueba/listado-prueba';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `
})
export class App {
  title = 'frontend';
}
