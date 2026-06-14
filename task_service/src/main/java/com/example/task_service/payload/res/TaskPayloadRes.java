package com.example.task_service.payload.res;

import java.sql.Timestamp;

import jakarta.persistence.Column;

public class TaskPayloadRes {
    private Long idRes;

    private String titleRes;

    private String descriptionRes;

    private Timestamp deadlineRes;

    private String priorityRes;

    private String statusRes;

    private Long userIdRes;

    private Timestamp createdAtRes;

    public Long getIdRes() {
        return idRes;
    }

    public void setIdRes(Long idRes) {
        this.idRes = idRes;
    }

    public String getTitleRes() {
        return titleRes;
    }

    public void setTitleRes(String titleRes) {
        this.titleRes = titleRes;
    }

    public String getDescriptionRes() {
        return descriptionRes;
    }

    public void setDescriptionRes(String descriptionRes) {
        this.descriptionRes = descriptionRes;
    }

    public Timestamp getDeadlineRes() {
        return deadlineRes;
    }

    public void setDeadlineRes(Timestamp deadlineRes) {
        this.deadlineRes = deadlineRes;
    }

    public String getPriorityRes() {
        return priorityRes;
    }

    public void setPriorityRes(String priorityRes) {
        this.priorityRes = priorityRes;
    }

    public String getStatusRes() {
        return statusRes;
    }

    public void setStatusRes(String statusRes) {
        this.statusRes = statusRes;
    }

    public Long getUserIdRes() {
        return userIdRes;
    }

    public void setUserIdRes(Long userIdRes) {
        this.userIdRes = userIdRes;
    }

    public Timestamp getCreatedAtRes() {
        return createdAtRes;
    }

    public void setCreatedAtRes(Timestamp createdAtRes) {
        this.createdAtRes = createdAtRes;
    }

}
