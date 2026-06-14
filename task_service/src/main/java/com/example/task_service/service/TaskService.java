package com.example.task_service.service;

import com.example.task_service.entity.TaskEntity;
import org.springframework.data.domain.Page;
import com.example.task_service.payload.req.TaskPayloadReq;
import com.example.task_service.payload.res.TaskPayloadRes;
import java.util.List;
public interface TaskService {

    TaskPayloadRes createTask(
            TaskPayloadReq payload
    ) throws Exception;

    List<TaskPayloadRes> getAllTask()
            throws Exception;

    TaskPayloadRes getTaskById(
            TaskPayloadReq payload
    ) throws Exception;

    TaskPayloadRes updateTask(
            TaskPayloadReq payload
    ) throws Exception;

    String deleteTask(
            TaskPayloadReq payload
    ) throws Exception;
    List<TaskPayloadRes> searchTask(
        TaskPayloadReq payload
) throws Exception;

List<TaskPayloadRes> filterByStatus(
        TaskPayloadReq payload
) throws Exception;

List<TaskPayloadRes> filterByPriority(
        TaskPayloadReq payload
) throws Exception;

Page<TaskEntity> getTaskPagination(
        Integer page,
        Integer size
) throws Exception;
}
