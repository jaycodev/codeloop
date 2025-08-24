package com.course.platform.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.course.platform.course.dto.CourseCreateDTO;
import com.course.platform.user.User;
import com.course.platform.user.UserService;
import org.springframework.http.HttpStatus;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    @Autowired
    private final CourseService coursesService;

    @Autowired
    private final UserService userService;

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
