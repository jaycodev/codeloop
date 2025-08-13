package com.course.platform.course;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourseRepository extends JpaRepository<Course, Integer>{
	
	/*@Query("SELECT new "
			+ "com.course.platform.course.CourseDTO( "
			+ "c.courseid, c.title, c.description, u.name, c.price, c.created_at"
			+ " )"
			+ " FROM Course c"
			+ " join c.teacher u"
			+ " WHERE u.userId = :teacherid")
	List<CourseDTO> listarCoursesByTeacher(@Param("teacherid") Integer teacherid);
	*/
}
