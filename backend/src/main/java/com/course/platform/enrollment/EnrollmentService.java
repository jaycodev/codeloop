package com.course.platform.enrollment;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public List<Enrollment> list() {
        return enrollmentRepository.findAll();
    }

    public Enrollment create(Enrollment enrollment) {
    	
        return enrollmentRepository.save(enrollment);
    }

    public Enrollment search(Integer id) {
        return enrollmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Enrollment not found with id: " + id));
    }

    public Enrollment update(Integer id, Enrollment enrollmentDetails) {
        Enrollment existing = enrollmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Enrollment not found with id: " + id));

        if (enrollmentDetails.getStudent() != null) {
            existing.setStudent(enrollmentDetails.getStudent());
        }
        if (enrollmentDetails.getCourse() != null) {
            existing.setCourse(enrollmentDetails.getCourse());
        }
        if (enrollmentDetails.getEnrollmentDate() != null) {
            existing.setEnrollmentDate(enrollmentDetails.getEnrollmentDate());
        }
        if (enrollmentDetails.getProgress() != null) {
            existing.setProgress(enrollmentDetails.getProgress());
        }
        if (enrollmentDetails.getStatus() != null) {
            existing.setStatus(enrollmentDetails.getStatus());
        }

        return enrollmentRepository.save(existing);
    }

    public void delete(Integer id) {
        if (!enrollmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Enrollment not found with id: " + id);
        }
        enrollmentRepository.deleteById(id);
    }
}
