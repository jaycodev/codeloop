package com.course.platform.lesson;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.course.platform.lesson.dto.LessonListDto;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    @Query("""
        SELECT new com.course.platform.lesson.dto.LessonListDto(
            l.title,
            l.content,
            l.videoUrl,
            c.title,
            l.orderNum,
            l.lessonId
        )
        FROM Lesson l
        JOIN l.course c
        ORDER BY l.orderNum ASC
    """)
    List<LessonListDto> findList();
}
