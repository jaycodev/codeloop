package com.course.platform.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.course.platform.payment.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
