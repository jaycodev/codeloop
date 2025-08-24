package com.course.platform.question;

import java.util.List;

<<<<<<< HEAD
=======
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> b24e3afdc1c04cea81e6fcf85ef961f0f1eaf3fe
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.course.platform.shared.util.ApiError;
import com.course.platform.shared.util.ApiResponse;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;

<<<<<<< HEAD
    @GetMapping
    public ResponseEntity<List<Question>> list() {
        List<Question> questions = questionService.list();
        if (questions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
=======
    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<?> list() {
        List<Question> questions = questionService.list();
        if (questions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiError(false, "No questions found.", "no_content", 204));
>>>>>>> b24e3afdc1c04cea81e6fcf85ef961f0f1eaf3fe
        }
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/{id}")
<<<<<<< HEAD
    public ResponseEntity<Question> findById(@PathVariable Integer id) {
        Question question = questionService.findById(id); // lanza EntityNotFoundException si no existe
        return ResponseEntity.ok(question);
    }

    @PostMapping
    public ResponseEntity<Question> create(@RequestBody Question q) {
        Question created = questionService.create(q);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> update(@PathVariable Integer id, @RequestBody Question q) {
        Question updated = questionService.update(id, q);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        questionService.delete(id);
        return ResponseEntity.noContent().build(); // 204 vacío en borrado exitoso
    }

    @GetMapping("/exam/{examId}")
    public ResponseEntity<List<Question>> byExam(@PathVariable Integer examId) {
        List<Question> questions = questionService.listByExam(examId);
        if (questions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(questions);
=======
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        try {
            Question question = questionService.findById(id);
            return ResponseEntity.ok(question);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, "Question not found.", "not_found", 404));
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Question q) {
        try {
            Question created = questionService.create(q);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, created));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiError(false, e.getMessage(), "creation_failed", 400));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Question q) {
        try {
            Question updated = questionService.update(id, q);
            return ResponseEntity.ok(new ApiResponse(true, updated));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, e.getMessage(), "update_failed", 404));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            questionService.delete(id);
            return ResponseEntity.ok(new ApiResponse(true, "Question deleted successfully"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, e.getMessage(), "delete_failed", 404));
        }
    }

    @GetMapping("/exam/{examId}")
    public ResponseEntity<?> byExam(@PathVariable Integer examId) {
        List<Question> questions = questionService.listByExam(examId);
        if (questions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiError(false, "No questions found for this exam.", "no_content", 204));
        }
        return ResponseEntity.ok(new ApiResponse(true, questions));
>>>>>>> b24e3afdc1c04cea81e6fcf85ef961f0f1eaf3fe
    }
}
