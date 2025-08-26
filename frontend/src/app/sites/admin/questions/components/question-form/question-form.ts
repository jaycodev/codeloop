import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '@domains/question//models/question.model';
import { QuestionService } from '@domains/question//services/question.service';

@Component({
  selector: 'app-questions-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-form.html',
})
export class QuestionsForm implements OnInit {
  question: Question = {
    questionId: 0,
    examId: 0,
    statement: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
  };

  tipoEdicion = false;

  constructor(
    private questionSrv: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tipoEdicion = true;
      this.questionSrv.buscarPorId(+id).subscribe((q) => {
        this.question = q;
        this.cdr.markForCheck();
      });
    }
  }

  guardar() {
    this.question.examId = Number(this.question.examId);
    this.question.correctAnswer = (this.question.correctAnswer || 'A').toUpperCase() as
      | 'A'
      | 'B'
      | 'C'
      | 'D';

    if (this.tipoEdicion) {
      this.questionSrv.actualizar(this.question.questionId, this.question).subscribe(() => {
        this.router.navigate(['/questions']);
      });
    } else {
      const { questionId, ...payload } = this.question as any;
      this.questionSrv.crear(payload as Question).subscribe(() => {
        this.router.navigate(['/questions']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/questions']);
  }
}
