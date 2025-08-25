import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-questions-by-exam',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: '../pages/questions-by-exam.html'
})
export class QuestionsByExam implements OnInit {
  examId!: number;
  preguntas: Question[] = [];

  constructor(
    private questionSrv: QuestionService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      const id = Number(p.get('examId'));
      if (!isNaN(id)) {
        this.examId = id;
        this.cargar();
      }
    });
  }

  cargar() {
    this.questionSrv.listarPorExamen(this.examId).subscribe({
      next: (qs) => {
        this.preguntas = qs ?? [];
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error en questions by exam =>', err)
    });
  }
}