package com.course.platform.course;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CourseDTO {

	Integer courseId;
	String title;
	String description;
	String teacherName;
	Double price;
	OffsetDateTime createdAt;

}
