package com.course.platform.payment.model;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

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

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "student_id", nullable = false)
    @Column(nullable = false)
    private Integer studentId;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "course_id", nullable = false)
    @Column(nullable = false)
    private Integer courseId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Builder.Default
    private String status = "PENDIENTE";

    @Builder.Default
    private OffsetDateTime paymentDate = OffsetDateTime.now();

    private String paymentMethod;
}
