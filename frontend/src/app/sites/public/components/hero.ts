import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-hero',
    imports: [ButtonModule, RippleModule],
    template: `
        <div
            id="hero"
            class="flex flex-col items-center justify-center text-center py-20 px-6"
        >
            <h1 class="text-7xl md:text-8xl font-bold text-gray-900 leading-tight dark:!text-gray-100">
                Conviértete en un <br class="hidden md:block"/>
                <span class="text-primary">Desarrollador Web Experto</span>
            </h1>
            <p class="font-normal text-lg md:text-2xl mt-6 max-w-2xl text-gray-700 dark:text-gray-300">
                Aprende desde cero hasta nivel profesional con cursos prácticos, proyectos reales y mentoría de expertos.
            </p>
        </div>
    `
})
export class Hero {}
