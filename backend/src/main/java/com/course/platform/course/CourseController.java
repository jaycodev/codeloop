package com.course.platform.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.course.platform.course.dto.CourseCreateDTO;
import com.course.platform.user.User;
import com.course.platform.user.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

	@Autowired
	private final CourseService coursesServices;
	
	@Autowired
	private final UserService userServices;
	
	@GetMapping("/list")
	public List<Course> list(){
		return coursesServices.listCours();
	}
	
	@GetMapping("/{id}")
	public Course search(@PathVariable("id") Integer id) {
		return coursesServices.search(id);
	}
	
	@PostMapping("/create")
	public Course create(@RequestBody CourseCreateDTO courseDto) {
		User teacher = userServices.search(courseDto.getTeacherId());
	    Course course = Course.builder()
	            .title(courseDto.getTitle())
	            .description(courseDto.getDescription())
	            .price(courseDto.getPrice())
	            .teacher(teacher)
	            .build();

	    return coursesServices.keep(course);
	}

	
	/*@GetMapping("/find/courses/{id}")
	public List<CourseDTO> listCourseByTeacher(@PathVariable("teacherid") Integer teacherid) {
		return coursesServices.listarCoursesByTeacher(teacherid);
	}*/

}
