package com.course.platform.enrollment;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.course.platform.shared.util.ApiError;
import com.course.platform.shared.util.ApiResponse;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @Autowired
    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping
    public ResponseEntity<?> list() {
        List<Enrollment> enrollments = enrollmentService.list();
        if (enrollments.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiError(false, "No enrollments found.", "no_content", 204));
        }
        return ResponseEntity.ok(enrollments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        try {
            Enrollment enrollment = enrollmentService.search(id);
            return ResponseEntity.ok(enrollment);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, "Enrollment not found.", "not_found", 404));
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Enrollment enrollment) {
        try {
            Enrollment created = enrollmentService.create(enrollment);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, created));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiError(false, e.getMessage(), "creation_failed", 400));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Enrollment enrollmentDetails) {
        try {
            Enrollment updated = enrollmentService.update(id, enrollmentDetails);
            return ResponseEntity.ok(new ApiResponse(true, updated));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, e.getMessage(), "update_failed", 404));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            enrollmentService.delete(id);
            return ResponseEntity.ok(new ApiResponse(true, "Enrollment deleted successfully"));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, e.getMessage(), "delete_failed", 404));
        }
    }
}
