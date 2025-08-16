package com.course.platform.user;

import org.springframework.stereotype.Service;

import com.course.platform.user.dto.UserSummaryDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    public UserSummaryDto toSummaryDto(User user) {
        return UserSummaryDto.builder()
                .id(user.getUserId())
                .name(user.getName())
                .roleName(user.getRole().name())
                .build();
    }
}
