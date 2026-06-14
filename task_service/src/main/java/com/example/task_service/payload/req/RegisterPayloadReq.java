package com.example.task_service.payload.req;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterPayloadReq {
    @NotBlank
    private String fullnameReq;

    @NotBlank
    @Email
    private String emailReq;

    @NotBlank
    private String usernameReq;

    @NotBlank
    private String passwordReq;

    public String getFullnameReq() {
        return fullnameReq;
    }

    public void setFullnameReq(String fullnameReq) {
        this.fullnameReq = fullnameReq;
    }

    public String getEmailReq() {
        return emailReq;
    }

    public void setEmailReq(String emailReq) {
        this.emailReq = emailReq;
    }

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
