package com.course.platform.payment.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import com.course.platform.course.dto.CourseSummaryDto;
import com.course.platform.user.dto.UserSummaryDto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDetailDto {
    private Integer id;
    private UserSummaryDto student;
    private CourseSummaryDto course;
    private BigDecimal amount;
    private String status;
    private OffsetDateTime paymentDate;
    private String paymentMethod;
}
