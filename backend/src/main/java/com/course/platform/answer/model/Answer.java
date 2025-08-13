package com.course.platform.answer.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "answer")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Answer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer answerId;
	
	@Column(name = "question_id", nullable = false)
	private Integer questionId;
	
	@Column(name = "student_id", nullable = false)
	private Integer studentId;
    
	@Column(name = "answer", length = 1)
	private String answer;
	
	@Column(name = "is_correct")
	private Boolean isCorrect;
}
