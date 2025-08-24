package com.course.platform.exam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
<<<<<<< HEAD
=======

import com.course.platform.shared.util.ApiError;
import com.course.platform.shared.util.ApiResponse;

import jakarta.persistence.EntityNotFoundException;
>>>>>>> b24e3afdc1c04cea81e6fcf85ef961f0f1eaf3fe

@RestController
@RequestMapping("/exams")
public class ExamController {

    private final ExamService examService;

    @Autowired
    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping
<<<<<<< HEAD
    public ResponseEntity<List<Exam>> list() {
        List<Exam> exams = examService.listExam();
        if (exams.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
=======
    public ResponseEntity<?> list() {
        List<Exam> exams = examService.listExam();
        if (exams.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiError(false, "No exams found.", "no_content", 204));
>>>>>>> b24e3afdc1c04cea81e6fcf85ef961f0f1eaf3fe
        }
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/{id}")
<<<<<<< HEAD
    public ResponseEntity<Exam> get(@PathVariable Integer id) {
        Exam exam = examService.search(id); // lanza excepción si no existe
        return ResponseEntity.ok(exam);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Exam>> listByCourse(@PathVariable("courseId") Integer courseId) {
        List<Exam> exams = examService.listExamByCourse(courseId);
        if (exams.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(exams);
=======
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
>>>>>>> b24e3afdc1c04cea81e6fcf85ef961f0f1eaf3fe
    }
}
