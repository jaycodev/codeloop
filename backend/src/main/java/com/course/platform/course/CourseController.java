package com.course.platform.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    
    @PutMapping("/{id}")
    public ResponseEntity<Course> update(@PathVariable Integer id, @RequestBody CourseCreateDTO courseDto) {
        User teacher = userService.search(courseDto.getTeacherId());
        Course updatedCourse = Course.builder()
                .title(courseDto.getTitle())
                .description(courseDto.getDescription())
                .price(courseDto.getPrice())
                .teacher(teacher)
                .build();

        Course saved = coursesService.update(updatedCourse);
        return ResponseEntity.ok(saved);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        coursesService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
