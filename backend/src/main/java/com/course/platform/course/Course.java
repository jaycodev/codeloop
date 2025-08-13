package com.course.platform.course;

import java.time.OffsetDateTime;

import com.course.platform.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "course")
@Builder
public class Course {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
	private Integer courseid;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "description")
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "teacher_id", nullable = false)
	private User teacher;
	
	@Column(name = "price")
	private Double price;
	
	@Column(name = "created_at")
	@Builder.Default
	private OffsetDateTime createdAt = OffsetDateTime.now();


}
