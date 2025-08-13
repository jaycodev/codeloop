package com.course.platform.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

	@Autowired
	private final CourseRepository courseRepository;
	
	public List<Course> listCours(){
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
	
	/*public List<CourseDTO> listarCoursesByTeacher(Integer teacherid){
		return courseRepository.listarCoursesByTeacher(teacherid);
	}*/
	
}
