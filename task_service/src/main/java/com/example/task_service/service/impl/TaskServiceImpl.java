package com.example.task_service.service.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import java.nio.file.Files;
import java.nio.file.Path;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl; 
import com.example.task_service.entity.TaskEntity;
import com.example.task_service.payload.req.TaskPayloadReq;
import com.example.task_service.payload.res.TaskPayloadRes;
import com.example.task_service.repository.TaskRepository;
import com.example.task_service.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    TaskRepository taskRepository;

    @Value("${app.file.upload-path}")
    private String uploadPath;

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
public Page<TaskPayloadRes> getTaskList(
        Long userId,
        String title,
        String status,
        String priority,
        Integer page,
        Integer size
) throws Exception {

    if (title == null) { title = ""; }
    if (status == null) { status = ""; }
    if (priority == null) { priority = ""; }

    // 1. Ambil data page entity mentah dari repository
    Page<TaskEntity> taskPage = taskRepository
            .findByUserIdAndTitleContainingIgnoreCaseAndStatusContainingIgnoreCaseAndPriorityContainingIgnoreCase(
                    userId,
                    title,
                    status,
                    priority,
                    PageRequest.of(page, size)
            );


    // 2. Map list Entity ke list PayloadRes (Sama seperti logika getAllTask )
    List<TaskPayloadRes> listRes = new ArrayList<>();
    for (TaskEntity ent : taskPage.getContent()) {
        TaskPayloadRes res = new TaskPayloadRes();
        res.setIdRes(ent.getId());
        res.setTitleRes(ent.getTitle());
        res.setDescriptionRes(ent.getDescription());
        res.setDeadlineRes(ent.getDeadline());
        res.setPriorityRes(ent.getPriority());
        res.setStatusRes(ent.getStatus());
        res.setUserIdRes(ent.getUserId());
        listRes.add(res);
    }

    // 3. Kembalikan dalam bentuk objek Page baru yang membungkus TaskPayloadRes
    return new PageImpl<>(listRes, taskPage.getPageable(), taskPage.getTotalElements());
}
@Override
public void uploadExcel(
        MultipartFile file,
        Long userId
) throws Exception {

    if(file.isEmpty()){
        throw new RuntimeException(
                "File tidak boleh kosong"
        );
    }

    if(!file.getOriginalFilename()
            .endsWith(".xlsx")){
        throw new RuntimeException(
                "File harus .xlsx"
        );
    }

    Path folderPath =
            Paths.get(uploadPath);

    if(!Files.exists(folderPath)){
        Files.createDirectories(folderPath);
    }

    String savedFilename =
            System.currentTimeMillis()
            + "_"
            + file.getOriginalFilename();

    Path filePath =
            folderPath.resolve(savedFilename);

    Files.copy(
            file.getInputStream(),
            filePath
    );

    InputStream inputStream =
            file.getInputStream();

    Workbook workbook =
            new XSSFWorkbook(inputStream);

    Sheet sheet =
            workbook.getSheetAt(0);

    for(int i = 1;
        i <= sheet.getLastRowNum();
        i++){

        Row row = sheet.getRow(i);

        TaskEntity task =
                new TaskEntity();

        task.setTitle(
                row.getCell(0)
                        .getStringCellValue()
        );

        task.setDescription(
                row.getCell(1)
                        .getStringCellValue()
        );

        task.setDeadline(
        new Timestamp(
                row.getCell(2)
                        .getDateCellValue()
                        .getTime()
        )
);

        task.setPriority(
                row.getCell(3)
                        .getStringCellValue()
        );

        task.setStatus(
                row.getCell(4)
                        .getStringCellValue()
        );

        task.setUserId(userId);

        taskRepository.save(task);
    }

    workbook.close();
    inputStream.close();
}
@Override
public ByteArrayInputStream
downloadExcel()
        throws Exception {

    List<TaskEntity> tasks =
            taskRepository.findAll();

    Workbook workbook =
            new XSSFWorkbook();

    Sheet sheet =
            workbook.createSheet(
                    "Data Task"
            );

    Row header =
            sheet.createRow(0);

    header.createCell(0)
            .setCellValue("ID");

    header.createCell(1)
            .setCellValue("Title");

    header.createCell(2)
            .setCellValue("Description");

    header.createCell(3)
            .setCellValue("Deadline");

    header.createCell(4)
            .setCellValue("Priority");

    header.createCell(5)
            .setCellValue("Status");

    header.createCell(6)
            .setCellValue("User ID");

    header.createCell(7)
            .setCellValue("Created At");

    int rowNum = 1;

    for(TaskEntity task : tasks){

        Row row =
                sheet.createRow(rowNum++);

        row.createCell(0)
                .setCellValue(task.getId());

        row.createCell(1)
                .setCellValue(task.getTitle());

        row.createCell(2)
                .setCellValue(
                        task.getDescription()
                );

        row.createCell(3)
                .setCellValue(
                        String.valueOf(
                                task.getDeadline()
                        )
                );

        row.createCell(4)
                .setCellValue(
                        task.getPriority()
                );

        row.createCell(5)
                .setCellValue(
                        task.getStatus()
                );

        row.createCell(6)
                .setCellValue(
                        task.getUserId()
                );

        row.createCell(7)
                .setCellValue(
                        String.valueOf(
                                task.getCreatedAt()
                        )
                );
    }

    ByteArrayOutputStream out =
            new ByteArrayOutputStream();

    workbook.write(out);

    workbook.close();

    return new ByteArrayInputStream(
            out.toByteArray()
    );
}
@Override
public ByteArrayInputStream
generateUploadTemplate()
        throws Exception {

    Workbook workbook =
            new XSSFWorkbook();

    Sheet sheet =
            workbook.createSheet(
                    "Template Task"
            );

    Row header =
            sheet.createRow(0);

    header.createCell(0)
            .setCellValue("Title");

    header.createCell(1)
            .setCellValue("Description");

    header.createCell(2)
            .setCellValue("Deadline");

    header.createCell(3)
            .setCellValue("Priority");

    header.createCell(4)
            .setCellValue("Status");

    ByteArrayOutputStream out =
            new ByteArrayOutputStream();

    workbook.write(out);

    workbook.close();

    return new ByteArrayInputStream(
            out.toByteArray()
    );
}
@Override
public ByteArrayInputStream downloadExcelByUserId(
        Long userId
) throws Exception {

    List<TaskEntity> listTask =
            taskRepository.findByUserId(
                    userId
            );

    Workbook workbook =
            new XSSFWorkbook();

    Sheet sheet =
            workbook.createSheet(
                    "Data Task"
            );

    Row headerRow =
            sheet.createRow(0);

    headerRow.createCell(0)
            .setCellValue("Title");

    headerRow.createCell(1)
            .setCellValue("Description");

    headerRow.createCell(2)
            .setCellValue("Deadline");

    headerRow.createCell(3)
            .setCellValue("Priority");

    headerRow.createCell(4)
            .setCellValue("Status");

    int rowNum = 1;

    for(TaskEntity task : listTask){

        Row row =
                sheet.createRow(rowNum++);

        row.createCell(0)
                .setCellValue(
                        task.getTitle()
                );

        row.createCell(1)
                .setCellValue(
                        task.getDescription()
                );

        row.createCell(2)
                .setCellValue(
                        task.getDeadline()
                                .toString()
                );

        row.createCell(3)
                .setCellValue(
                        task.getPriority()
                );

        row.createCell(4)
                .setCellValue(
                        task.getStatus()
                );
    }

    ByteArrayOutputStream out =
            new ByteArrayOutputStream();

    workbook.write(out);

    workbook.close();

    return new ByteArrayInputStream(
            out.toByteArray()
    );
}
}