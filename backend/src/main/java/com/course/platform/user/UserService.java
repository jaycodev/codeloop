package com.course.platform.user;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.course.platform.user.dto.UserDTO;
import com.course.platform.user.dto.UserStatsDto;
import com.course.platform.user.dto.UserSummaryDto;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    private final JdbcTemplate jdbcTemplate;

    public UserSummaryDto toSummaryDto(User user) {
        return UserSummaryDto.builder()
                .id(user.getUserId())
                .name(user.getName())
                .roleName(user.getRole().name())
                .build();
    }
    
    public List<User> list() {
        return userRepository.findAll();
    }

    public User search(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    public User create(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword_hash(userDTO.getPassword_hash());
        user.setRole(userDTO.getRole());
        user.setStatus("ACTIVE"); // O el estado por defecto que desees
        return userRepository.save(user);
    }

    public User update(Integer id, UserDTO userDTO) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        if (userDTO.getName() != null) existing.setName(userDTO.getName());
        if (userDTO.getEmail() != null) existing.setEmail(userDTO.getEmail());
        if (userDTO.getPassword_hash() != null) existing.setPassword_hash(userDTO.getPassword_hash());
        if (userDTO.getRole() != null) existing.setRole(userDTO.getRole());

        return userRepository.save(existing);
    }

    public void delete(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
    
    /*
    @Transactional
    public List<UserStatsDto> getUserStats() {
        List<UserStatsDto> results = new ArrayList<>();

        jdbcTemplate.execute((Connection con) -> {
            CallableStatement cs = con.prepareCall("{ CALL get_user_stats_all(?) }");
            cs.registerOutParameter(1, Types.OTHER); // OUT refcursor
            cs.execute();

            ResultSet rs = (ResultSet) cs.getObject(1); // obtenemos el cursor
            while (rs.next()) {
                results.add(new UserStatsDto(
                        rs.getString("role"),
                        rs.getInt("total_users"),
                        rs.getInt("new_last_month")
                ));
            }

            rs.close();
            cs.close();
            return null;
        });

        return results;
    }
*/

}