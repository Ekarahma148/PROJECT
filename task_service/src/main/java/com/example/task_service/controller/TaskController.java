package com.example.task_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        @RequestBody TaskPayloadReq payload
) {

    try {

        TaskPayloadRes result =
                taskService.getTaskById(payload);

        return new Message()
                .getData("Success", result, 200);

    } catch (Exception e) {

        return new Message()
                .error(
                        "Terjadi error : "
                                + e.getMessage(),
                        500
                );
    }
}

@GetMapping("/getAllTask")
public ResponseEntity getAllTask() {

    try {

        return new Message()
                .getData(
                        "Success",
                        taskService.getAllTask(),
                        200
                );

    } catch (Exception e) {

        return new Message()
                .error(
                        "Terjadi error : "
                                + e.getMessage(),
                        500
                );
    }
}

@PostMapping("/insertTask")
public ResponseEntity createTask(
        @RequestBody TaskPayloadReq payload
) {

    try {

        return new Message()
                .getData(
                        "Insert Success",
                        taskService.createTask(payload),
                        200
                );

    } catch (Exception e) {

        return new Message()
                .error(
                        "Terjadi error : "
                                + e.getMessage(),
                        500
                );
    }
}

@PutMapping("/updateTask")
public ResponseEntity updateTask(
        @RequestBody TaskPayloadReq payload
) {

    try {

        return new Message()
                .getData(
                        "Update Success",
                        taskService.updateTask(payload),
                        200
                );

    } catch (Exception e) {

        return new Message()
                .error(
                        "Terjadi error : "
                                + e.getMessage(),
                        500
                );
    }
}

@DeleteMapping("/deleteTask")
public ResponseEntity deleteTask(
        @RequestBody TaskPayloadReq payload
) {

    try {

        taskService.deleteTask(payload);

        return new Message()
                .getData(
                        "Delete Success",
                        null,
                        200
                );

    } catch (Exception e) {

        return new Message()
                .error(
                        "Terjadi error : "
                                + e.getMessage(),
                        500
                );
    }
}

@GetMapping("/search")
public ResponseEntity searchTask(
        @RequestParam String title
) {

    try {

        TaskPayloadReq req =
                new TaskPayloadReq();

        req.setTitleReq(title);

        return new Message()
                .getData(
                        "Success",
                        taskService.searchTask(req),
                        200
                );

    } catch (Exception e) {

        return new Message()
                .error(
                        e.getMessage(),
                        500
                );
    }
}
@GetMapping("/filterStatus")
public ResponseEntity filterStatus(
        @RequestParam String status
) {

    try {

        TaskPayloadReq req =
                new TaskPayloadReq();

        req.setStatusReq(status);

        return new Message()
                .getData(
                        "Success",
                        taskService.filterByStatus(req),
                        200
                );

    } catch (Exception e) {

        return new Message()
                .error(
                        e.getMessage(),
                        500
                );
    }
}
@GetMapping("/filterPriority")
public ResponseEntity filterPriority(
        @RequestParam String priority
) {

    try {

        TaskPayloadReq req =
                new TaskPayloadReq();

        req.setPriorityReq(priority);

        return new Message()
                .getData(
                        "Success",
                        taskService.filterByPriority(req),
                        200
                );

    } catch (Exception e) {

        return new Message()
                .error(
                        e.getMessage(),
                        500
                );
    }
}
@GetMapping("/pagination")
public ResponseEntity pagination(
        @RequestParam Integer page,
        @RequestParam Integer size
) {

    try {

        return new Message()
                .getData(
                        "Success",
                        taskService.getTaskPagination(
                                page,
                                size
                        ),
                        200
                );

    } catch (Exception e) {

        return new Message()
                .error(
                        e.getMessage(),
                        500
                );
    }
}
}
