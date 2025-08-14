package com.course.platform.course;

import org.springframework.data.jpa.repository.JpaRepository;

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
