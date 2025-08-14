package com.course.platform.answer;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.course.platform.question.Question;
import com.course.platform.question.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AnswerService {
	
	private final AnswerRepository answerRepo;
	private final QuestionRepository questionRepo;
	
	public Answer submit(Answer a){
		Question q = questionRepo.findById(a.getQuestionId()).orElseThrow();
		
		boolean answer = a.getAnswer() != null && a.getAnswer().equalsIgnoreCase(q.getCorrectAnswer());
		a.setIsCorrect(answer);
		
		return answerRepo.save(a);
	}
	
	public List<Answer> findByQuestion(Integer questionId) {
		return answerRepo.findAnswerByQuestionId(questionId);
	}
	
//	public List<Answer> findByExamAndStudent(Integer examId, Integer studentId){
//		return answerRepo.findByExamIdAndStudentId(examId, studentId);
//	}
}
