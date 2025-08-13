package com.course.platform.question.model;

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
@Table(name = "question")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer questionId;
	
    @Column(name = "exam_id", nullable = false)
    private Integer examId;
    
    @Column(nullable = false)
    private String statement;
    
	private String optionA;
	private String optionB;
	private String optionC;
	private String optionD;
	
    @Column(name = "correct_answer", length = 1)
    private String correctAnswer;
	
}
