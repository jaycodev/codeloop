package com.course.platform.answer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
public class AnswerController {

	@Autowired
    private final AnswerService answerService;

    @PostMapping
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
    // }
}
