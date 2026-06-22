package com.example.task_service.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.task_service.entity.TaskEntity;

@Repository
public interface TaskRepository
        extends JpaRepository<TaskEntity, Long> {

    TaskEntity getTaskById(Long id);
    Page<TaskEntity> findByUserIdAndTitleContainingIgnoreCaseAndStatusContainingIgnoreCaseAndPriorityContainingIgnoreCase(
    Long userId, String title, String status, String priority, Pageable pageable
);
      List<TaskEntity> findByDeadlineBetween(
            Timestamp start,
            Timestamp end
    );
     List<TaskEntity> findByUserId(Long userId);
}