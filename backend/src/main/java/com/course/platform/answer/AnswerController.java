package com.course.platform.answer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
<<<<<<< HEAD
=======

import com.course.platform.shared.util.ApiError;
import com.course.platform.shared.util.ApiResponse;
>>>>>>> b24e3afdc1c04cea81e6fcf85ef961f0f1eaf3fe

@RestController
@RequestMapping("/answers")
public class AnswerController {

    private final AnswerService answerService;

    @Autowired
    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping
<<<<<<< HEAD
    public ResponseEntity<Answer> submit(@RequestBody Answer a) {
        Answer submitted = answerService.submit(a);
        return ResponseEntity.status(HttpStatus.CREATED).body(submitted);
    }

    @GetMapping("/question/{questionId}")
    public ResponseEntity<List<Answer>> findByQuestion(@PathVariable Integer questionId) {
        List<Answer> answers = answerService.findByQuestion(questionId);
        if (answers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(answers);
    }

    // Si deseas habilitarlo:
    // @GetMapping("/exam/{examId}/student/{studentId}")
    // public ResponseEntity<List<Answer>> byExamAndStudent(@PathVariable Integer examId, @PathVariable Integer studentId) {
    //     List<Answer> answers = answerService.findByExamAndStudent(examId, studentId);
    //     if (answers.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    //     }
    //     return ResponseEntity.ok(answers);
=======
    public ResponseEntity<?> submit(@RequestBody Answer a) {
        try {
            Answer submitted = answerService.submit(a);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, submitted));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiError(false, e.getMessage(), "submission_failed", 400));
        }
    }

    @GetMapping("/question/{questionId}")
    public ResponseEntity<?> findByQuestion(@PathVariable Integer questionId) {
        List<Answer> answers = answerService.findByQuestion(questionId);
        if (answers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiError(false, "No answers found for this question.", "no_content", 204));
        }
        return ResponseEntity.ok(new ApiResponse(true, answers));
    }

    // Descomentado y refactorizado, si deseas habilitarlo:
    // @GetMapping("/exam/{examId}/student/{studentId}")
    // public ResponseEntity<?> byExamAndStudent(@PathVariable Integer examId, @PathVariable Integer studentId) {
    //     List<Answer> answers = answerService.findByExamAndStudent(examId, studentId);
    //     if (answers.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.NO_CONTENT)
    //                 .body(new ApiError(false, "No answers found for this exam and student.", "no_content", 204));
    //     }
    //     return ResponseEntity.ok(new ApiResponse(true, answers));
>>>>>>> b24e3afdc1c04cea81e6fcf85ef961f0f1eaf3fe
    // }
}
