package com.course.platform.payment.model;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import com.course.platform.course.Course;
import com.course.platform.user.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private PaymentStatus status = PaymentStatus.PENDIENTE;

    @Builder.Default
    private OffsetDateTime paymentDate = OffsetDateTime.now();

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
}
