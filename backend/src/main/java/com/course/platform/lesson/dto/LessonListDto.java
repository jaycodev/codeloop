package com.course.platform.lesson.dto;

public record LessonListDto(
    String title,
    String content,
    String videoUrl,
    String courseTitle,
    Integer orderNum,
    Integer id
) {}