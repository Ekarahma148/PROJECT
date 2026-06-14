package com.example.task_service.service;

import com.example.task_service.payload.req.EmailPayloadReq;

public interface EmailService {
public void sendEmail(EmailPayloadReq payload)throws Exception;
public void schedulerEmail();
}
