package com.course.platform.course;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.course.platform.course.dto.CourseCreateDTO;
import com.course.platform.course.dto.CourseSummaryDto;
import com.course.platform.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

	@Autowired
	private final CourseRepository courseRepository;

	@Autowired
	private UserRepository userRepository;

	public List<Course> listCours() {
		return courseRepository.findAll();
	}

	public Course create(CourseCreateDTO dto) {
	    Course course = new Course();

	    if (dto.getTitle() == null || dto.getTitle().isBlank()) {
	        throw new IllegalArgumentException("El título del curso es obligatorio");
	    }
	    course.setTitle(dto.getTitle());

	    if (dto.getDescription() == null || dto.getDescription().isBlank()) {
	        throw new IllegalArgumentException("La descripción del curso es obligatoria");
	    }
	    course.setDescription(dto.getDescription());

	    if (dto.getPrice() == null || dto.getPrice().compareTo(BigDecimal.ZERO) < 0) {
	        throw new IllegalArgumentException("El precio debe ser mayor o igual a 0");
	    }
	    course.setPrice(dto.getPrice());

	    if (dto.getTeacherId() == null) {
	        throw new IllegalArgumentException("El ID del profesor es obligatorio");
	    }

	    course.setTeacher(
	    		userRepository.findById(dto.getTeacherId())
	            .orElseThrow(() -> new RuntimeException("Profesor no encontrado con ID: " + dto.getTeacherId()))
	    );

	    return courseRepository.save(course);
	}


	public Course search(Integer id) {
		return courseRepository.findById(id).orElseThrow();
	}

	public void delete(Integer id) {
		courseRepository.deleteById(id);
	}

	public Course update(Integer id, CourseCreateDTO updatedCourse) {
		Course existing = courseRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Curso no encontrado con ID: " + id));

		if (updatedCourse.getTitle() != null) {
			existing.setTitle(updatedCourse.getTitle());
		}

		if (updatedCourse.getDescription() != null) {
			existing.setDescription(updatedCourse.getDescription());
		}

		if (updatedCourse.getPrice() != null) {
			existing.setPrice(updatedCourse.getPrice());
		}

		if (updatedCourse.getTeacherId() != null) {
			existing.setTeacher(userRepository.findById(updatedCourse.getTeacherId())
					.orElseThrow(() -> new RuntimeException("Profesor no encontrado")));
		}

		return courseRepository.save(existing);
	}

	/*
	 * public List<CourseDTO> listarCoursesByTeacher(Integer teacherid){ return
	 * courseRepository.listarCoursesByTeacher(teacherid); }
	 */

	public CourseSummaryDto toSummaryDto(Course course) {
		return CourseSummaryDto.builder().id(course.getCourseId()).title(course.getTitle())
				.description(course.getDescription()).build();
	}
}
