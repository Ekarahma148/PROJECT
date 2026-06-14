package com.example.task_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.task_service.entity.UserEntity;


@Repository
public interface AuthUserRepository
        extends JpaRepository<UserEntity, Long> {

    UserEntity getByEmail(
            String email
    );

}