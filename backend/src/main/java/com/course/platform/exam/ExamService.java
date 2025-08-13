package com.course.platform.exam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExamService {

	@Autowired
	private final ExamRepository examRepository;
	
	public List<Exam> listExam(){
			return examRepository.findAll();
	}
	
	public Exam keep(Exam exam) {
		return examRepository.save(exam);
	}
	
	public Exam search(Integer id) {
		return examRepository.findById(id).orElseThrow();
	}
	
	public void delete(Integer id) {
		examRepository.deleteById(id);
	}
	
	public List<Exam> listExamByCourse(Integer id){
		return examRepository.findByCourseCourseid(id);
	}
}
