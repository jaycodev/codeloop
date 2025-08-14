package com.course.platform.exam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/exams")
@RequiredArgsConstructor
public class ExamController {

    @Autowired
    private final ExamService examServices;

    @GetMapping("/list")
    public List<Exam> list() {
        return examServices.listExam();
    }

    @GetMapping("/{id}")
    public Exam search(@PathVariable("id") Integer id) {
        return examServices.search(id);
    }

    @GetMapping("/find/exams/{id}")
    public List<Exam> listExamByCourse(@PathVariable("courseid") Integer courseid) {
        return examServices.listExamByCourse(courseid);
    }
}
