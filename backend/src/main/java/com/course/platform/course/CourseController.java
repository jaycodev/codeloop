package com.course.platform.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

	@Autowired
	private final CourseService coursesServices;
	
	@GetMapping("/list")
	public List<Course> list(){
		return coursesServices.listCours();
	}
	
	@GetMapping("/{id}")
	public Course search(@PathVariable("id") Integer id) {
		return coursesServices.search(id);
	}
	
	/*@GetMapping("/find/courses/{id}")
	public List<CourseDTO> listCourseByTeacher(@PathVariable("teacherid") Integer teacherid) {
		return coursesServices.listarCoursesByTeacher(teacherid);
	}*/

}
