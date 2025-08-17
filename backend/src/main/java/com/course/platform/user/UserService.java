package com.course.platform.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.course.platform.user.dto.UserSummaryDto;

import jakarta.persistence.EntityNotFoundException;
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
    
    @Autowired
    private UserRepository userRepository;

    public List<User> list() {
        return userRepository.findAll();
    }

    public User search(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    public User create(User user) {
        return userRepository.save(user);
    }

    public User update(Integer id, User userDetails) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        if (userDetails.getName() != null) existing.setName(userDetails.getName());
        if (userDetails.getEmail() != null) existing.setEmail(userDetails.getEmail());
        if (userDetails.getRole() != null) existing.setRole(userDetails.getRole());
        if (userDetails.getStatus() != null) existing.setStatus(userDetails.getStatus());

        return userRepository.save(existing);
    }

    public void delete(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}
