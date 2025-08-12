package com.course.platform.payment.service;

import org.springframework.stereotype.Service;

import com.course.platform.payment.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
}
