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
    List<TaskEntity> findByTitleContainingIgnoreCase(
            String title
    );

    List<TaskEntity> findByStatus(
            String status
    );

    List<TaskEntity> findByPriority(
         String priority
    );

    Page<TaskEntity> findAll(
            Pageable pageable
    );
      List<TaskEntity> findByDeadlineBetween(
            Timestamp start,
            Timestamp end
    );
}