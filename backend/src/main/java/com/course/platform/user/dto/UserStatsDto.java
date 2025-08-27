package com.course.platform.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserStatsDto {
    private String role;
    private int totalUsers;
    private int newLastMonth;
    }
