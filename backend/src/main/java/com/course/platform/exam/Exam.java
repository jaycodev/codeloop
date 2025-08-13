package com.course.platform.exam;

import java.time.OffsetDateTime;

import com.course.platform.course.Course;

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
@Table(name = "exam")
@Builder
public class Exam {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_id")
	private Integer examid;
	
	@ManyToOne
	@JoinColumn(name = "course_id", nullable = false)
	private Course course;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "created_at")
	@Builder.Default
	private OffsetDateTime createdAt = OffsetDateTime.now();

}
