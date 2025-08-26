import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AnswerService } from '@domains/answer/services/answer.service';
import { Answer } from '@domains/answer/models/answer.model';
import { FormsModule } from '@angular/forms';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-answer-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ToolbarModule, InputTextModule, ButtonModule],
  templateUrl: '../pages/answer-list.html',
})
export class AnswerList implements OnInit {
  answers: Answer[] = [];
  cols: Column[] = [
    { field: 'answerId', header: 'ID' },
    { field: 'questionId', header: 'Question ID' },
    { field: 'studentId', header: 'Student ID' },
    { field: 'studentName', header: 'Student Name' },
    { field: 'answer', header: 'Answer' },
    { field: 'isCorrect', header: 'Correct?' },
  ];
  searchQuestionId?: number;

  constructor(private answerService: AnswerService, private router: Router) {}

  ngOnInit(): void {
    this.answerService.listarTodas().subscribe({
      next: (data: Answer[]) => (this.answers = data),
      error: (err: any) => console.error('Error loading answers', err),
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  goToQuestionAnswers() {
    if (this.searchQuestionId) {
      this.router.navigate(['/admin/cruds/answers/question', this.searchQuestionId]);
    }
  }
}