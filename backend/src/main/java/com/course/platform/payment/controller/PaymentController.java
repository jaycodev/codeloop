package com.course.platform.payment.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.course.platform.payment.dto.CreatePaymentDto;
import com.course.platform.payment.dto.PaymentDetailDto;
import com.course.platform.payment.dto.PaymentListDto;
import com.course.platform.payment.dto.UpdatePaymentDto;
import com.course.platform.payment.service.PaymentService;
import com.course.platform.shared.util.ApiError;
import com.course.platform.shared.util.ApiResponse;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<?> list() {
        List<PaymentListDto> payments = paymentService.getList();
        if (payments.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ApiError(false, "No payments found.", "no_content", 204));
        }
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        try {
            PaymentDetailDto payment = paymentService.getInfoById(id);
            return ResponseEntity.ok(payment);
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, "Payment not found.", "not_found", 404));
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreatePaymentDto dto) {
        try {
            PaymentListDto created = paymentService.create(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, created));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiError(false, e.getMessage(), "creation_failed", 400));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody UpdatePaymentDto dto) {
        try {
            PaymentListDto updated = paymentService.update(id, dto);
            return ResponseEntity.ok(new ApiResponse(true, updated));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiError(false, e.getMessage(), "update_failed", 404));
        }
    }
}
