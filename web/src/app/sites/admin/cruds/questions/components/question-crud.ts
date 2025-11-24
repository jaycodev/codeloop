import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { QuestionDTO } from '@domains/question/dtos/question.dto';
import { QuestionCreateDTO } from '@domains/question/dtos/question-create.dto';
import { QuestionService } from '@domains/question/services/question.service';
import { SelectModule } from 'primeng/select';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-question-crud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    SelectModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: '../pages/question-crud.html',
})
export class QuestionCrud implements OnInit {
  questionDialog: boolean = false;
  questions = signal<QuestionDTO[]>([]);
  selectedQuestions!: QuestionDTO[] | null;
  questionCreate: QuestionCreateDTO = {
    examId: 0,
    statement: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
  };
  tipoEdicion = false;
  submitted: boolean = false;
  cols: Column[] = [];
  editId?: number;
  searchExamId?: number;

  answerOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
  ];

  @ViewChild('dt') dt!: Table;

  constructor(
    private questionService: QuestionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadQuestions();
    this.cols = [
      { field: 'questionId', header: 'ID' },
      { field: 'examId', header: 'Exam' },
      { field: 'statement', header: 'Statement' },
      { field: 'optionA', header: 'A' },
      { field: 'optionB', header: 'B' },
      { field: 'optionC', header: 'C' },
      { field: 'optionD', header: 'D' },
      { field: 'correctAnswer', header: 'Correct' },
    ];
  }

  loadQuestions() {
    this.questionService.listar().subscribe({
      next: (data) => this.questions.set(data),
      error: (err) => console.error('Error loading questions', err),
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    table.filterGlobal(value, 'contains');
  }

  openNew() {
    this.questionCreate = {
      examId: 0,
      statement: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A',
    };
    this.tipoEdicion = false;
    this.submitted = false;
    this.editId = undefined;
    this.questionDialog = true;
  }

  editQuestion(question: QuestionDTO) {
    this.questionCreate = {
      examId: question.examId,
      statement: question.statement,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
    };
    this.tipoEdicion = true;
    this.editId = question.questionId;
    this.questionDialog = true;
  }

  deleteQuestion(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this question?',
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.questionService.eliminar(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Question deleted successfully',
              life: 3000,
            });
            this.loadQuestions();
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error deleting question',
              life: 3000,
            });
          },
        });
      },
    });
  }

  deleteSelectedQuestions() {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the selected questions?',
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      if (!this.selectedQuestions || this.selectedQuestions.length === 0) return;

      let deletedCount = 0;
      const total = this.selectedQuestions.length;

      this.selectedQuestions.forEach((question) => {
        this.questionService.eliminar(question.questionId).subscribe({
          next: () => {
            deletedCount++;
            if (deletedCount === total) {
              this.loadQuestions();
              this.selectedQuestions = null;
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Questions deleted successfully',
                life: 3000,
              });
            }
          },
          error: (err) => {
            console.error(`Error deleting question ${question.questionId}:`, err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Could not delete question ${question.questionId}`,
              life: 3000,
            });
          },
        });
      });
    },
  });
}


  findByExamId() {
    if (!this.searchExamId || this.searchExamId === 0) {
      // En caso este vacio, se lista todas las preguntas
      this.loadQuestions();
    } else {
      // Si existe un valor, filtra por examId
      this.questionService.listarPorExamen(this.searchExamId).subscribe({
        next: (data) => this.questions.set(data),
        error: (err) => console.error('Error loading questions by exam', err),
      });
    }
  }

  hideDialog() {
    this.questionDialog = false;
    this.submitted = false;
    this.editId = undefined;
  }

  saveQuestion() {
    this.submitted = true;

    if (this.questionCreate.statement?.trim()) {
      if (this.tipoEdicion && this.editId !== undefined) {
        this.questionService.actualizar(this.editId, this.questionCreate).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Question updated successfully',
              life: 3000,
            });
            this.loadQuestions();
            this.hideDialog();
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error updating question',
              life: 3000,
            });
          },
        });
      } else {
        this.questionService.crear(this.questionCreate).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Question created successfully',
              life: 3000,
            });
            this.loadQuestions();
            this.hideDialog();
          },
          error: (err) => {
            console.error(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error creating question',
              life: 3000,
            });
          },
        });
      }
    }
  }
}
