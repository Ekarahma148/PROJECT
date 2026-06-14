package com.example.user_service.repository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.user_service.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository <UserEntity, Long> {
UserEntity findByEmail(
        String email
);
UserEntity findByUsername(String username);

Boolean existsByUsername(String username);

Boolean existsByEmail(String email);
}