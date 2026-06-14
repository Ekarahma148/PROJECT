package com.example.task_service.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import com.example.task_service.entity.TaskEntity;
import com.example.task_service.payload.req.TaskPayloadReq;
import com.example.task_service.payload.res.TaskPayloadRes;
import com.example.task_service.repository.TaskRepository;
import com.example.task_service.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    TaskRepository taskRepository;

    

    @Override
    public TaskPayloadRes createTask(
            TaskPayloadReq payload
    ) throws Exception {

        TaskPayloadRes res =
                new TaskPayloadRes();

        try {

            TaskEntity ent =
                    new TaskEntity();

            ent.setTitle(
                    payload.getTitleReq());

            ent.setDescription(
                    payload.getDescriptionReq());

            ent.setDeadline(
                    payload.getDeadlineReq());

            ent.setPriority(
                    payload.getPriorityReq());

            ent.setStatus(
                    payload.getStatusReq());

            ent.setUserId(
                    payload.getUserIdReq());
            

            taskRepository.save(ent);
                
            res.setIdRes(ent.getId());
            res.setTitleRes(ent.getTitle());
            res.setDescriptionRes(ent.getDescription());
            res.setDeadlineRes(ent.getDeadline());
            res.setPriorityRes(ent.getPriority());
            res.setStatusRes(ent.getStatus());
            res.setUserIdRes(ent.getUserId());

        } catch (Exception e) {
            throw e;
        }

        return res;
    }

    @Override
    public List<TaskPayloadRes> getAllTask()
            throws Exception {

        List<TaskPayloadRes> listRes =
                new ArrayList<>();

        try {

            List<TaskEntity> listEnt =
                    taskRepository.findAll();

            for (TaskEntity ent : listEnt) {

                TaskPayloadRes res =
                        new TaskPayloadRes();

                res.setIdRes(ent.getId());
                res.setTitleRes(ent.getTitle());
                res.setDescriptionRes(ent.getDescription());
                res.setDeadlineRes(ent.getDeadline());
                res.setPriorityRes(ent.getPriority());
                res.setStatusRes(ent.getStatus());
                res.setUserIdRes(ent.getUserId());

                listRes.add(res);
            }

        } catch (Exception e) {
            throw e;
        }

        return listRes;
    }

    @Override
    public TaskPayloadRes getTaskById(
            TaskPayloadReq payload
    ) throws Exception {

        TaskPayloadRes res =
                new TaskPayloadRes();

        try {

            TaskEntity ent =
                    taskRepository.findById(
                            payload.getIdReq())
                            .orElse(null);

            if (ent == null) {

                throw new Exception(
                        "Task tidak ditemukan");
            }

            res.setIdRes(ent.getId());
            res.setTitleRes(ent.getTitle());
            res.setDescriptionRes(ent.getDescription());
            res.setDeadlineRes(ent.getDeadline());
            res.setPriorityRes(ent.getPriority());
            res.setStatusRes(ent.getStatus());
            res.setUserIdRes(ent.getUserId());

        } catch (Exception e) {
            throw e;
        }

        return res;
    }

    @Override
    public TaskPayloadRes updateTask(
            TaskPayloadReq payload
    ) throws Exception {

        TaskPayloadRes res =
                new TaskPayloadRes();

        try {

            TaskEntity ent =
                    taskRepository.findById(
                            payload.getIdReq())
                            .orElse(null);

            if (ent == null) {

                throw new Exception(
                        "Task tidak ditemukan");
            }

            ent.setTitle(
                    payload.getTitleReq());

            ent.setDescription(
                    payload.getDescriptionReq());

            ent.setDeadline(
                    payload.getDeadlineReq());

            ent.setPriority(
                    payload.getPriorityReq());

            ent.setStatus(
                    payload.getStatusReq());

            ent.setUserId(
                    payload.getUserIdReq());

            taskRepository.save(ent);
               
            res.setIdRes(ent.getId());
            res.setTitleRes(ent.getTitle());
            res.setDescriptionRes(ent.getDescription());
            res.setDeadlineRes(ent.getDeadline());
            res.setPriorityRes(ent.getPriority());
            res.setStatusRes(ent.getStatus());
            res.setUserIdRes(ent.getUserId());

        } catch (Exception e) {
            throw e;
        }

        return res;
    }

    @Override
    public String deleteTask(
            TaskPayloadReq payload
    ) throws Exception {

        try {

            TaskEntity ent =
                    taskRepository.findById(
                            payload.getIdReq())
                            .orElse(null);

            if (ent == null) {

                throw new Exception(
                        "Task tidak ditemukan");
            }

            taskRepository.delete(ent);

        } catch (Exception e) {
            throw e;
        }

        return "Task berhasil dihapus";
    }

@Override
public List<TaskPayloadRes> searchTask(
        TaskPayloadReq payload
) throws Exception {

    List<TaskPayloadRes> listRes =
            new ArrayList<>();

    try {

        List<TaskEntity> listEnt =
                taskRepository
                        .findByTitleContainingIgnoreCase(
                                payload.getTitleReq()
                        );

        for (TaskEntity ent : listEnt) {

            TaskPayloadRes res =
                    new TaskPayloadRes();

            res.setIdRes(ent.getId());
            res.setTitleRes(ent.getTitle());
            res.setDescriptionRes(ent.getDescription());
            res.setDeadlineRes(ent.getDeadline());
            res.setPriorityRes(ent.getPriority());
            res.setStatusRes(ent.getStatus());
            res.setUserIdRes(ent.getUserId());

            listRes.add(res);
        }

    } catch (Exception e) {
        throw e;
    }

    return listRes;
}
@Override
public List<TaskPayloadRes> filterByStatus(
        TaskPayloadReq payload
) throws Exception {

    List<TaskPayloadRes> listRes =
            new ArrayList<>();

    try {

        List<TaskEntity> listEnt =
                taskRepository.findByStatus(
                        payload.getStatusReq()
                );

        for (TaskEntity ent : listEnt) {

            TaskPayloadRes res =
                    new TaskPayloadRes();

            res.setIdRes(ent.getId());
            res.setTitleRes(ent.getTitle());
            res.setDescriptionRes(ent.getDescription());
            res.setDeadlineRes(ent.getDeadline());
            res.setPriorityRes(ent.getPriority());
            res.setStatusRes(ent.getStatus());
            res.setUserIdRes(ent.getUserId());

            listRes.add(res);
        }

    } catch (Exception e) {
        throw e;
    }

    return listRes;
}
@Override
public List<TaskPayloadRes> filterByPriority(
        TaskPayloadReq payload
) throws Exception {

    List<TaskPayloadRes> listRes =
            new ArrayList<>();

    try {

        List<TaskEntity> listEnt =
                taskRepository.findByPriority(
                        payload.getPriorityReq()
                );

        for (TaskEntity ent : listEnt) {

            TaskPayloadRes res =
                    new TaskPayloadRes();

            res.setIdRes(ent.getId());
            res.setTitleRes(ent.getTitle());
            res.setDescriptionRes(ent.getDescription());
            res.setDeadlineRes(ent.getDeadline());
            res.setPriorityRes(ent.getPriority());
            res.setStatusRes(ent.getStatus());
            res.setUserIdRes(ent.getUserId());

            listRes.add(res);
        }

    } catch (Exception e) {
        throw e;
    }

    return listRes;
}
@Override
public Page<TaskEntity> getTaskPagination(
        Integer page,
        Integer size
) throws Exception {

    return taskRepository.findAll(
            PageRequest.of(page, size)
    );
}
}