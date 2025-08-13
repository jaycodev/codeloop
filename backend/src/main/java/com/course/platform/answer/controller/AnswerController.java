package com.course.platform.answer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.course.platform.answer.model.Answer;
import com.course.platform.answer.service.AnswerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
public class AnswerController {
	
	private final AnswerService answerService;
	
	@PostMapping("/submit")
	public Answer submit(@RequestBody Answer a) {
		return answerService.submit(a);
	}
	
	@GetMapping("/question/{questionId}")
	public List<Answer> findByQuestion(@PathVariable("questionId") Integer questionId){
		return answerService.findByQuestion(questionId);
	}
	
//	@GetMapping("/exam/{examId}/student/{studentId}")
//	public List<Answer> byExamAndStudent(@PathVariable("studentId") Integer examId, @PathVariable Integer studentId){
//		return answerService.findByExamAndStudent(examId, studentId);
//	}
}
