package com.example.user_service.payload.res;

public class UserPayloadRes {
    private Long idRes;
    private String fullnameRes;
    private String usernameRes;
    private String passwordRes;
    private String emailRes;
    private String roleRes;
    public Long getIdRes() {
        return idRes;
    }
    public void setIdRes(Long idRes) {
        this.idRes = idRes;
    }
    public String getFullnameRes() {
        return fullnameRes;
    }
    public void setFullnameRes(String fullnameRes) {
        this.fullnameRes = fullnameRes;
    }
    public String getUsernameRes() {
        return usernameRes;
    }
    public void setUsernameRes(String usernameRes) {
        this.usernameRes = usernameRes;
    }
    public String getPasswordRes() {
        return passwordRes;
    }
    public void setPasswordRes(String passwordRes) {
        this.passwordRes = passwordRes;
    }
    public String getEmailRes() {
        return emailRes;
    }
    public void setEmailRes(String emailRes) {
        this.emailRes = emailRes;
    }
    public String getRoleRes() {
        return roleRes;
    }
    public void setRoleRes(String roleRes) {
        this.roleRes = roleRes;
    }
}
