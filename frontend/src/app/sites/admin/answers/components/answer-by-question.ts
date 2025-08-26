import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AnswerService } from '@domains/answer/services/answer.service';
import { Answer } from '@domains/answer/models/answer.model';
import { ActivatedRoute, Router } from '@angular/router';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-answer-list-by-question',
  standalone: true,
  imports: [CommonModule, TableModule, ToolbarModule, ButtonModule],
  templateUrl: '../pages/answer-by-question.html',
})
export class AnswerListByQuestion implements OnInit {
  questionId!: number;
  answers: Answer[] = [];
  cols: Column[] = [
    { field: 'answerId', header: 'ID' },
    { field: 'studentId', header: 'Student ID' },
    { field: 'studentName', header: 'Student Name' },
    { field: 'answer', header: 'Answer' },
    { field: 'isCorrect', header: 'Correct?' },
  ];

  constructor(
    private answerService: AnswerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionId = Number(this.route.snapshot.paramMap.get('questionId'));
    if (this.questionId) {
      this.answerService.listarPorPregunta(this.questionId).subscribe({
        next: (data: Answer[]) => (this.answers = data),
        error: (err: any) => console.error('Error loading answers', err),
      });
    }
  }

  goBack() {
    this.router.navigate(['/admin/cruds/answer']);
  }
}