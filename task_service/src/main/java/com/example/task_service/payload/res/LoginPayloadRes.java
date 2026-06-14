package com.example.task_service.payload.res;

public class LoginPayloadRes {

    private String usernameRes;

    private String emailRes;

    private String tokenRes;

    public String getUsernameRes() {
        return usernameRes;
    }

    public void setUsernameRes(String usernameRes) {
        this.usernameRes = usernameRes;
    }

    public String getEmailRes() {
        return emailRes;
    }

    public void setEmailRes(String emailRes) {
        this.emailRes = emailRes;
    }

    public String getTokenRes() {
        return tokenRes;
    }

    public void setTokenRes(String tokenRes) {
        this.tokenRes = tokenRes;
    }
}