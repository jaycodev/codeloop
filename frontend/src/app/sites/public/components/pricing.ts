import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-pricing',
  imports: [DividerModule, ButtonModule, RippleModule],
  template: `
    <div id="pricing" class="py-6 px-6 lg:px-20 my-2 md:my-6">
      <div class="text-center mb-6">
        <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">
          Planes de Suscripción
        </div>
        <span class="text-muted-color text-2xl"
          >Elige el plan que mejor se adapte a tu camino como programador</span
        >
      </div>

      <div class="grid grid-cols-12 gap-4 justify-between mt-20 md:mt-0">
        <div class="col-span-12 lg:col-span-4 p-0 md:p-4">
          <div
            class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all"
            style="border-radius: 10px"
          >
            <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">Gratis</div>
            <img
              src="https://primefaces.org/cdn/templates/sakai/landing/free.svg"
              class="w-10/12 mx-auto"
              alt="free"
            />
            <div class="my-8 flex flex-col items-center gap-4">
              <div class="flex items-center">
                <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">S/.0</span>
                <span class="text-surface-600 dark:text-surface-200">/mes</span>
              </div>
              <button
                pButton
                pRipple
                label="Comenzar"
                class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"
              ></button>
            </div>
            <p-divider class="w-full bg-surface-200"></p-divider>
            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Acceso a cursos
                gratuitos
              </li>
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Comunidad de
                estudiantes
              </li>
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Ejercicios básicos
              </li>
            </ul>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-4 p-0 md:p-4 mt-6 md:mt-0">
          <div
            class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all"
            style="border-radius: 10px"
          >
            <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">
              Estudiante
            </div>
            <img
              src="https://primefaces.org/cdn/templates/sakai/landing/startup.svg"
              class="w-10/12 mx-auto"
              alt="student"
            />
            <div class="my-8 flex flex-col items-center gap-4">
              <div class="flex items-center">
                <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">S/.9</span>
                <span class="text-surface-600 dark:text-surface-200">/mes</span>
              </div>
              <button
                pButton
                pRipple
                label="Suscribirme"
                class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"
              ></button>
            </div>
            <p-divider class="w-full bg-surface-200"></p-divider>
            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Acceso a todos los
                cursos
              </li>
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Ejercicios prácticos y
                retos
              </li>
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Certificados al
                completar cursos
              </li>
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Soporte por chat
              </li>
            </ul>
          </div>
        </div>

        <div class="col-span-12 lg:col-span-4 p-0 md:p-4 mt-6 md:mt-0">
          <div
            class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all"
            style="border-radius: 10px"
          >
            <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">
              Profesional
            </div>
            <img
              src="https://primefaces.org/cdn/templates/sakai/landing/enterprise.svg"
              class="w-10/12 mx-auto"
              alt="pro"
            />
            <div class="my-8 flex flex-col items-center gap-4">
              <div class="flex items-center">
                <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0"
                  >S/.19</span
                >
                <span class="text-surface-600 dark:text-surface-200">/mes</span>
              </div>
              <button
                pButton
                pRipple
                label="Probar Gratis"
                class="p-button-rounded border-0 ml-4 font-light leading-tight bg-blue-500 text-white"
              ></button>
            </div>
            <p-divider class="w-full bg-surface-200"></p-divider>
            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Todo lo del plan
                Estudiante
              </li>
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Proyectos guiados
              </li>
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Mentorías
                personalizadas
              </li>
              <li class="py-2">
                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i> Acceso a material
                exclusivo
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Pricing {}
