package com.course.platform.question.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.course.platform.question.model.Question;
import com.course.platform.question.repository.QuestionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {

	private final QuestionRepository questionRepo;
	
	public List<Question> list() {
		return questionRepo.findAll();
	}
	
	public Question create(Question q) { 
		return questionRepo.save(q); 
	}

    public Question update(Integer id, Question question){
        Question q = findById(id);
        
        q.setStatement(q.getStatement());
        q.setOptionA(q.getOptionA());
        q.setOptionB(q.getOptionB());
        q.setOptionC(q.getOptionC());
        q.setOptionD(q.getOptionD());
        q.setCorrectAnswer(q.getCorrectAnswer());
        
        return questionRepo.save(q);
    }
    
    public Question findById(Integer id) { 
    	return questionRepo.findById(id).orElseThrow(); 
    }
    
    public void delete(Integer id) {
    	questionRepo.deleteById(id);
    }

    public List<Question> listByExam(Integer examId) { 
    	return questionRepo.findQuestionByExamId(examId); 
    }
    

}
