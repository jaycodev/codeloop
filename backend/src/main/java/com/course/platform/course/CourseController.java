package com.course.platform.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;
=======
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
>>>>>>> b24e3afdc1c04cea81e6fcf85ef961f0f1eaf3fe

import com.course.platform.course.dto.CourseCreateDTO;
import com.course.platform.shared.util.ApiError;
import com.course.platform.shared.util.ApiResponse;
import com.course.platform.user.User;
import com.course.platform.user.UserService;
import org.springframework.http.HttpStatus;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

<<<<<<< HEAD
    @Autowired
    private final CourseService coursesService;

    @Autowired
    private final UserService userService;
=======
	@Autowired
	private final CourseService coursesService;
	
	@Autowired
	private final UserService userService;
	
    @GetMapping
    public ResponseEntity<?> list() {
        List<Course> courses = coursesService.listCours();
        if (courses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiError(false, "No courses found.", "no_content", 204));
        }
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        try {
            Course course = coursesService.search(id);
            return ResponseEntity.ok(course);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, "Course not found.", "not_found", 404));
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CourseCreateDTO courseDto) {
        try {
            User teacher = userService.search(courseDto.getTeacherId());
            Course course = Course.builder()
                    .title(courseDto.getTitle())
                    .description(courseDto.getDescription())
                    .price(courseDto.getPrice())
                    .teacher(teacher)
                    .build();

            Course created = coursesService.keep(course);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, created));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiError(false, e.getMessage(), "creation_failed", 400));
        }
    }
>>>>>>> b24e3afdc1c04cea81e6fcf85ef961f0f1eaf3fe

    @GetMapping
    public ResponseEntity<List<Course>> list() {
        List<Course> courses = coursesService.listCours();
        if (courses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> get(@PathVariable Integer id) {
        Course course = coursesService.search(id); // lanza excepción si no existe
        return ResponseEntity.ok(course);
    }

    @PostMapping
    public ResponseEntity<Course> create(@RequestBody CourseCreateDTO courseDto) {
        User teacher = userService.search(courseDto.getTeacherId());
        Course course = Course.builder()
                .title(courseDto.getTitle())
                .description(courseDto.getDescription())
                .price(courseDto.getPrice())
                .teacher(teacher)
                .build();

        Course created = coursesService.keep(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // @GetMapping("/find/courses/{teacherid}")
    // public List<CourseDTO> listCourseByTeacher(@PathVariable("teacherid") Integer teacherid) {
    //     return coursesService.listarCoursesByTeacher(teacherid);
    // }
}
