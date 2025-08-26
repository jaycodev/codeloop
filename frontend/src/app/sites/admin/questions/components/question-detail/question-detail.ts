import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionService } from '@domains/question//services/question.service';
import { Question } from '@domains/question//models/question.model';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './question-detail.html',
})
export class QuestionDetail implements OnInit {
  q?: Question;

  constructor(
    private route: ActivatedRoute,
    private srv: QuestionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.srv.buscarPorId(id).subscribe({
        next: (data) => {
          this.q = data;
          this.cdr.markForCheck();
        },
        error: (err) => console.error('Error detalle question =>', err),
      });
    }
  }
}
