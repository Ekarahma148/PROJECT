package com.example.user_service.payload.req;

public class UserPayloadReq {
    private Long idReq;
    private String fullnameReq;
    private String usernameReq;
    private String passwordReq;
    private String emailReq;
    private String roleReq;
    public Long getIdReq() {
        return idReq;
    }
    public void setIdReq(Long idReq) {
        this.idReq = idReq;
    }
    public String getFullnameReq() {
        return fullnameReq;
    }
    public void setFullnameReq(String fullnameReq) {
        this.fullnameReq = fullnameReq;
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
    public String getEmailReq() {
        return emailReq;
    }
    public void setEmailReq(String emailReq) {
        this.emailReq = emailReq;
    }
    public String getRoleReq() {
        return roleReq;
    }
    public void setRoleReq(String roleReq) {
        this.roleReq = roleReq;
    }
}