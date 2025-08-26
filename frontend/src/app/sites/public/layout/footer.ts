import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  template: `
    <div
      class="py-12 px-12 mx-0 mt-20 lg:mx-20 border-t border-surface-200 dark:border-surface-600"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-3 flex flex-col items-center md:items-start">
          <a routerLink="/" class="flex items-center cursor-pointer mb-4">
            <svg
              viewBox="0 0 54 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 mr-2"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467Z"
                fill="var(--primary-color)"
              />
            </svg>
            <h4 class="font-medium text-2xl text-surface-900 dark:text-surface-0">CodeLoop</h4>
          </a>
          <p class="text-surface-600 dark:text-surface-300 text-lg text-center md:text-left">
            Aprende programación desde cero hasta nivel profesional con nuestros cursos y mentorías.
          </p>
        </div>

        <div class="col-span-12 md:col-span-9 grid grid-cols-12 gap-8 text-center md:text-left">
          <div class="col-span-12 sm:col-span-4 lg:col-span-3">
            <h4 class="font-medium text-xl mb-4 text-surface-900 dark:text-surface-0">Nosotros</h4>
            <a class="block mb-2 text-surface-700 dark:text-surface-100 cursor-pointer"
              >Quiénes somos</a
            >
            <a class="block mb-2 text-surface-700 dark:text-surface-100 cursor-pointer"
              >Nuestro equipo</a
            >
            <a class="block text-surface-700 dark:text-surface-100 cursor-pointer">Testimonios</a>
          </div>

          <div class="col-span-12 sm:col-span-4 lg:col-span-3">
            <h4 class="font-medium text-xl mb-4 text-surface-900 dark:text-surface-0">Recursos</h4>
            <a class="block mb-2 text-surface-700 dark:text-surface-100 cursor-pointer">Comenzar</a>
            <a class="block mb-2 text-surface-700 dark:text-surface-100 cursor-pointer"
              >Guías de aprendizaje</a
            >
            <a class="block text-surface-700 dark:text-surface-100 cursor-pointer"
              >Proyectos prácticos</a
            >
          </div>

          <div class="col-span-12 sm:col-span-4 lg:col-span-3">
            <h4 class="font-medium text-xl mb-4 text-surface-900 dark:text-surface-0">Comunidad</h4>
            <a class="block mb-2 text-surface-700 dark:text-surface-100 cursor-pointer">Discord</a>
            <a class="block mb-2 text-surface-700 dark:text-surface-100 cursor-pointer">Eventos</a>
            <a class="block text-surface-700 dark:text-surface-100 cursor-pointer">Blog</a>
          </div>

          <div class="col-span-12 sm:col-span-4 lg:col-span-3">
            <h4 class="font-medium text-xl mb-4 text-surface-900 dark:text-surface-0">Legal</h4>
            <a class="block mb-2 text-surface-700 dark:text-surface-100 cursor-pointer"
              >Política de privacidad</a
            >
            <a class="block mb-2 text-surface-700 dark:text-surface-100 cursor-pointer"
              >Términos de uso</a
            >
            <a class="block text-surface-700 dark:text-surface-100 cursor-pointer">Cookies</a>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center text-surface-600 dark:text-surface-300 text-sm">
        © 2025 CodeLoop. Todos los derechos reservados.
      </div>
    </div>
  `,
})
export class Footer {
  constructor(public router: Router) {}
}
