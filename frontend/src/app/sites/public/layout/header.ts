import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '@admin/layout/components/app.floatingconfigurator';

@Component({
  selector: 'app-header',
  imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, AppFloatingConfigurator],
  template: `<a class="flex items-center" href="#">
      <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-12 mr-2">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467Z"
          fill="var(--primary-color)"
        />
      </svg>
      <span class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal mr-20"
        >CodeLoop</span
      >
    </a>

    <a
      pButton
      [text]="true"
      severity="secondary"
      [rounded]="true"
      pRipple
      class="lg:hidden!"
      pStyleClass="@next"
      enterFromClass="hidden"
      leaveToClass="hidden"
      [hideOnOutsideClick]="true"
    >
      <i class="pi pi-bars text-2xl!"></i>
    </a>

    <div
      class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border"
    >
      <ul
        class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8"
      >
        <li>
          <a
            routerLink="/"
            pRipple
            class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
          >
            <span>Inicio</span>
          </a>
        </li>
        <li>
          <a
            routerLink="/cursos"
            pRipple
            class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
          >
            <span>Cursos</span>
          </a>
        </li>
      </ul>
      <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
        <button
          pButton
          pRipple
          label="Iniciar sesión"
          routerLink="/login"
          [rounded]="true"
          [text]="true"
        ></button>
        <button pButton pRipple label="Registrarse" routerLink="/login" [rounded]="true"></button>
        <app-floating-configurator [float]="false" />
      </div>
    </div> `,
})
export class Header {
  constructor(public router: Router) {}
}
