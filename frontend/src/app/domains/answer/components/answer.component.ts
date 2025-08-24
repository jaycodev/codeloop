import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnswersService } from '../services/answer.service';
import { Answer } from '../models/answer.model';

@Component({
  selector: 'app-answers-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: '../pages/answers-list.html'
})
export class AnswersList implements OnInit {
  questionId!: number;
  answers: Answer[] = [];

  constructor(
    private answersSrv: AnswersService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(p => {
      const qid = Number(p.get('questionId'));
      if (!isNaN(qid)) {
        this.questionId = qid;
        this.cargar();
      }
    });
  }

  cargar() {
    this.answersSrv.listarPorPregunta(this.questionId).subscribe({
      next: (data) => {
        this.answers = data ?? [];
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Error en answers => ', err)
    });
  }
}