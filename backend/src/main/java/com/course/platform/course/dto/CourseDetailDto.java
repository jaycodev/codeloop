package com.course.platform.course.dto;

import java.math.BigDecimal;

import com.course.platform.user.dto.UserSummaryDto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseDetailDto {
    private Integer id;
    private String title;
    private String description;
    private UserSummaryDto teacher;
    private BigDecimal price;
}
