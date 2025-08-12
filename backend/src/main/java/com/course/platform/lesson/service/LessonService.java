package com.course.platform.lesson.service;

import org.springframework.stereotype.Service;

import com.course.platform.lesson.repository.LessonRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
}
