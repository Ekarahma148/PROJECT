package com.example.task_service.payload.req;


public class LoginPayloadReq {

    private String usernameReq;
    
    private String passwordReq;
    
    public String getUsernameReq() {
        return usernameReq;
    }

    public void setUsernameReq(String usernameReq) {
        this.usernameReq = usernameReq;
    }

    public String getPasswordReq() {
        return passwordReq;
    }

    public void setPasswordReq(String passwordReq) {
        this.passwordReq = passwordReq;
    }
} 
