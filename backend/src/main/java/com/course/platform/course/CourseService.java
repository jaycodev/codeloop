package com.course.platform.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.course.platform.course.dto.CourseSummaryDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    @Autowired
    private final CourseRepository courseRepository;

    public List<Course> listCours() {
        return courseRepository.findAll();
    }

    public Course keep(Course course) {
        return courseRepository.save(course);
    }

    public Course search(Integer id) {
        return courseRepository.findById(id).orElseThrow();
    }

    public void delete(Integer id) {
        courseRepository.deleteById(id);
    }
    
    public Course update(Course updatedCourse) {
        Course existing = courseRepository.findById(updatedCourse.getCourseId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        existing.setTitle(updatedCourse.getTitle());
        existing.setDescription(updatedCourse.getDescription());
        existing.setPrice(updatedCourse.getPrice());
        existing.setTeacher(updatedCourse.getTeacher());

        return courseRepository.save(existing);
    }


    /*
     * public List<CourseDTO> listarCoursesByTeacher(Integer teacherid){
     * return courseRepository.listarCoursesByTeacher(teacherid);
     * }
     */

    public CourseSummaryDto toSummaryDto(Course course) {
        return CourseSummaryDto.builder()
                .id(course.getCourseId())
                .title(course.getTitle())
                .description(course.getDescription())
                .build();
    }
}
