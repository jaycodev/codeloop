package com.course.platform.lesson;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.course.platform.lesson.dto.CreateLessonDto;
import com.course.platform.lesson.dto.LessonDetailDto;
import com.course.platform.lesson.dto.LessonListDto;
import com.course.platform.lesson.dto.UpdateLessonDto;
import com.course.platform.shared.util.ApiError;
import com.course.platform.shared.util.ApiResponse;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @GetMapping
    public ResponseEntity<?> list() {
        List<LessonListDto> lessons = lessonService.getList();
        if (lessons.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiError(false, "No lessons found.", "no_content", 204));
        }
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        try {
            LessonDetailDto lesson = lessonService.getInfoById(id);
            return ResponseEntity.ok(lesson);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, "Lesson not found.", "not_found", 404));
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateLessonDto dto) {
        try {
            LessonListDto created = lessonService.create(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, created));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiError(false, e.getMessage(), "creation_failed", 400));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody UpdateLessonDto dto) {
        try {
            LessonListDto updated = lessonService.update(id, dto);
            return ResponseEntity.ok(new ApiResponse(true, updated));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, e.getMessage(), "update_failed", 404));
        }
    }
}
