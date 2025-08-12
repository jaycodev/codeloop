package com.course.platform.lesson.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lesson")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer lessonId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT")
    private String videoUrl;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "course_id", nullable = false)
    @Column(name = "course_id", nullable = false)
    private Integer courseId;

    @Builder.Default
    @Column(name = "order_num")
    private Integer orderNum = 0;
}
