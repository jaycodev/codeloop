package com.course.platform.user.dto;

import java.time.LocalDateTime;

import com.course.platform.user.User;
import com.course.platform.user.util.EnumRole;

import lombok.Data;

@Data
public class UserDTO {

    private String name;
    private String email;
    private String password_hash;
    private EnumRole role;

}
