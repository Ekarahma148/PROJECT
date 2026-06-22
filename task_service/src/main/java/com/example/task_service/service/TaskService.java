package com.example.task_service.service;

import java.io.ByteArrayInputStream;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import com.example.task_service.payload.req.TaskPayloadReq;
import com.example.task_service.payload.res.TaskPayloadRes;
import java.util.List;

public interface TaskService {

        TaskPayloadRes createTask(
                        TaskPayloadReq payload) throws Exception;

        List<TaskPayloadRes> getAllTask() throws Exception;

        TaskPayloadRes getTaskById(
                        TaskPayloadReq payload) throws Exception;

        TaskPayloadRes updateTask(
                        TaskPayloadReq payload) throws Exception;

        String deleteTask(
                        TaskPayloadReq payload) throws Exception;

        Page<TaskPayloadRes> getTaskList(
                        Long userId,
                        String title,
                        String status,
                        String priority,
                        Integer page,
                        Integer size) throws Exception;

        void uploadExcel(
                        MultipartFile file,
                        Long userId) throws Exception;

        ByteArrayInputStream downloadExcel()
                        throws Exception;

        ByteArrayInputStream generateUploadTemplate()
                        throws Exception;
        ByteArrayInputStream downloadExcelByUserId(
                        Long userId
                        ) throws Exception;
}
