package com.course.platform.question;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

	private final QuestionService questionService;

	@GetMapping("/list")
	public List<Question> list(){
		return questionService.list();
	}

    @GetMapping("/{id}")
    public Question findById(@PathVariable("id") Integer id) {
    	return questionService.findById(id); 
	}
    
    @PostMapping("/new")
    public Question create(@RequestBody Question q) {
    	return questionService.create(q); 
	}

    @PutMapping("/{id}")
    public Question update(@PathVariable("id") Integer id, @RequestBody Question q) {
    	return questionService.update(id, q); 
	}

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") Integer id) {
    	questionService.delete(id);
    	
    	return "Question deleted successfully";
	}
    
    @GetMapping("/exam/{examId}")
    public List<Question> byExam(@PathVariable("examId") Integer examId) {
    	return questionService.listByExam(examId); 
	}
}
