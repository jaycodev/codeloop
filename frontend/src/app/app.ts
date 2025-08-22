import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule,DatePickerModule,FormsModule],
  templateUrl: './app.html',
})
export class App {
  title = 'frontend';
}
