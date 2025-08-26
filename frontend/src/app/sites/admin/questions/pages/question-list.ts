import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionService } from '@domains/question//services/question.service';
import { Question } from '@domains/question//models/question.model';

@Component({
  selector: 'app-questions-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './question-list.html',
})
export class QuestionsList implements OnInit {
  preguntas: Question[] = [];

  constructor(private questionSrv: QuestionService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.questionSrv.listar().subscribe({
      next: (data) => {
        this.preguntas = data ?? [];
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error en questions =>', err),
    });
  }

  eliminar(id: number) {
    if (confirm('¿Está seguro de eliminar la pregunta?')) {
      this.questionSrv.eliminar(id).subscribe({
        next: () => this.cargarPreguntas(),
        error: (err) => console.error('Error al eliminar =>', err),
      });
    }
  }
}
