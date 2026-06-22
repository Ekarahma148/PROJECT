package com.example.task_service.payload.req;

import java.sql.Timestamp;


public class TaskPayloadReq {
    private Long idReq;

    private String titleReq;

    private String descriptionReq;

    private Timestamp deadlineReq;

    private String priorityReq;

    private String statusReq;

    private Long userIdReq;

    private Timestamp createdAtReq;

    public Long getIdReq() {
        return idReq;
    }

    public void setIdReq(Long idReq) {
        this.idReq = idReq;
    }

    public String getTitleReq() {
        return titleReq;
    }

    public void setTitleReq(String titleReq) {
        this.titleReq = titleReq;
    }

    public String getDescriptionReq() {
        return descriptionReq;
    }

    public void setDescriptionReq(String descriptionReq) {
        this.descriptionReq = descriptionReq;
    }

    public Timestamp getDeadlineReq() {
        return deadlineReq;
    }

    public void setDeadlineReq(Timestamp deadlineReq) {
        this.deadlineReq = deadlineReq;
    }

    public String getPriorityReq() {
        return priorityReq;
    }

    public void setPriorityReq(String priorityReq) {
        this.priorityReq = priorityReq;
    }

    public String getStatusReq() {
        return statusReq;
    }

    public void setStatusReq(String statusReq) {
        this.statusReq = statusReq;
    }

    public Long getUserIdReq() {
        return userIdReq;
    }

    public void setUserIdReq(Long userIdReq) {
        this.userIdReq = userIdReq;
    }

    public Timestamp getCreatedAtReq() {
        return createdAtReq;
    }

    public void setCreatedAtReq(Timestamp createdAtReq) {
        this.createdAtReq = createdAtReq;
    }
}
