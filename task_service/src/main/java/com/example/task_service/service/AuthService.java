package com.example.task_service.service;

import com.example.task_service.payload.req.LoginPayloadReq;

public interface AuthService {
    public boolean login(String email, String password);
    // String login(
    //         LoginPayloadReq payload
    // ) throws Exception; 
}
