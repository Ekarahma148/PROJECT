package com.example.task_service.controller;

import java.io.ByteArrayInputStream;

import org.springframework.core.io.InputStreamResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.task_service.payload.req.TaskPayloadReq;
import com.example.task_service.payload.res.TaskPayloadRes;
import com.example.task_service.service.TaskService;
import com.example.task_service.utility.Message;

@RestController
@RequestMapping("/tasks")
public class TaskController {

        @Autowired
        TaskService taskService;

        @GetMapping("/getTask")
        public ResponseEntity getTask(
                        @RequestBody TaskPayloadReq payload) {

                try {

                        TaskPayloadRes result = taskService.getTaskById(payload);

                        return new Message()
                                        .getData("Success", result, 200);

                } catch (Exception e) {

                        return new Message()
                                        .error(
                                                        "Terjadi error : "
                                                                        + e.getMessage(),
                                                        500);
                }
        }

        @GetMapping("/getAllTask")
        public ResponseEntity getAllTask() {

                try {

                        return new Message()
                                        .getData(
                                                        "Success",
                                                        taskService.getAllTask(),
                                                        200);

                } catch (Exception e) {

                        return new Message()
                                        .error(
                                                        "Terjadi error : "
                                                                        + e.getMessage(),
                                                        500);
                }
        }

        @PostMapping("/insertTask")
        public ResponseEntity createTask(
                        @RequestBody TaskPayloadReq payload) {

                try {

                        return new Message()
                                        .getData(
                                                        "Insert Success",
                                                        taskService.createTask(payload),
                                                        200);

                } catch (Exception e) {

                        return new Message()
                                        .error(
                                                        "Terjadi error : "
                                                                        + e.getMessage(),
                                                        500);
                }
        }

        @PutMapping("/updateTask")
        public ResponseEntity updateTask(
                        @RequestBody TaskPayloadReq payload) {

                try {

                        return new Message()
                                        .getData(
                                                        "Update Success",
                                                        taskService.updateTask(payload),
                                                        200);

                } catch (Exception e) {

                        return new Message()
                                        .error(
                                                        "Terjadi error : "
                                                                        + e.getMessage(),
                                                        500);
                }
        }

        @DeleteMapping("/deleteTask")
        public ResponseEntity deleteTask(
                        @RequestBody TaskPayloadReq payload) {

                try {

                        taskService.deleteTask(payload);

                        return new Message()
                                        .getData(
                                                        "Delete Success",
                                                        null,
                                                        200);

                } catch (Exception e) {

                        return new Message()
                                        .error(
                                                        "Terjadi error : "
                                                                        + e.getMessage(),
                                                        500);
                }
        }

        @GetMapping("/list")
        public ResponseEntity getTaskList(

                        @RequestParam Long userId,
                        @RequestParam(defaultValue = "") String title,

                        @RequestParam(defaultValue = "") String status,

                        @RequestParam(defaultValue = "") String priority,

                        @RequestParam(defaultValue = "0") Integer page,

                        @RequestParam(defaultValue = "5") Integer size

        ) {

                try {

                        return new Message()
                        .getData(
                                "Success",
                                taskService.getTaskList(
                                        userId,
                                        title,
                                        status,
                                        priority,
                                        page,
                                        size),
                                        200);

                } catch (Exception e) {

                        return new Message()
                                        .error(
                                                        e.getMessage(),
                                                        500);
                }
        }

        @PostMapping("/uploadExcel")
        public ResponseEntity<?> uploadExcel(
                        @RequestParam("file") MultipartFile file,
                        @RequestParam("userId") Long userId) {

                try {

                        taskService.uploadExcel(
                                        file,
                                        userId);

                        return ResponseEntity.ok(
                                        "Upload berhasil");

                } catch (Exception e) {

                        return ResponseEntity.badRequest()
                                        .body(e.getMessage());
                }
        }

        @GetMapping("/downloadExcel")
        public ResponseEntity<InputStreamResource> downloadExcel() {

                try {

                        ByteArrayInputStream in = taskService.downloadExcel();

                        HttpHeaders headers = new HttpHeaders();

                        headers.add(
                                        "Content-Disposition",
                                        "attachment; filename=data_task.xlsx");

                        return ResponseEntity.ok()
                                        .headers(headers)
                                        .contentType(
                                                        MediaType.APPLICATION_OCTET_STREAM)
                                        .body(
                                                        new InputStreamResource(in));

                } catch (Exception e) {

                        return ResponseEntity.internalServerError()
                                        .build();
                }
        }

        @GetMapping("/downloadTemplate")
        public ResponseEntity<InputStreamResource> downloadTemplate() {

                try {

                        ByteArrayInputStream in = taskService.generateUploadTemplate();

                        HttpHeaders headers = new HttpHeaders();

                        headers.add(
                                        "Content-Disposition",
                                        "attachment; filename=template_task.xlsx");

                        return ResponseEntity.ok()
                                        .headers(headers)
                                        .contentType(
                                                        MediaType.APPLICATION_OCTET_STREAM)
                                        .body(
                                                        new InputStreamResource(in));

                } catch (Exception e) {

                        return ResponseEntity.internalServerError()
                                        .build();
                }
        }

        @GetMapping("/downloadExcelUser")
        public ResponseEntity<InputStreamResource> downloadExcelUser(
                        @RequestParam Long userId) {

                try {

                        ByteArrayInputStream in = taskService
                                        .downloadExcelByUserId(
                                                        userId);

                        HttpHeaders headers = new HttpHeaders();

                        headers.add(
                                        "Content-Disposition",
                                        "attachment; filename=my_task.xlsx");

                        return ResponseEntity.ok()
                                        .headers(headers)
                                        .contentType(
                                                        MediaType.APPLICATION_OCTET_STREAM)
                                        .body(
                                                        new InputStreamResource(in));

                } catch (Exception e) {

                        return ResponseEntity
                                        .internalServerError()
                                        .build();
                }
        }
}
