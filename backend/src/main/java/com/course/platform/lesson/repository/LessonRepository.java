package com.course.platform.lesson.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.course.platform.lesson.model.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
}
