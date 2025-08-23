package com.course.platform.exam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.course.platform.shared.util.ApiError;
import com.course.platform.shared.util.ApiResponse;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/exams")
public class ExamController {

    private final ExamService examService;

    @Autowired
    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping
    public ResponseEntity<?> list() {
        List<Exam> exams = examService.listExam();
        if (exams.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiError(false, "No exams found.", "no_content", 204));
        }
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        try {
            Exam exam = examService.search(id);
            return ResponseEntity.ok(exam);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, "Exam not found.", "not_found", 404));
        }
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> listByCourse(@PathVariable("courseId") Integer courseId) {
        List<Exam> exams = examService.listExamByCourse(courseId);
        if (exams.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiError(false, "No exams found for this course.", "no_content", 204));
        }
        return ResponseEntity.ok(new ApiResponse(true, exams));
    }
}
