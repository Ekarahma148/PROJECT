package com.example.task_service.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.task_service.payload.req.EmailPayloadReq;
import com.example.task_service.service.EmailService;

@Controller
@RequestMapping("/email")
public class EmailController {
    @Autowired
    EmailService emailService;

    @PostMapping("/kirimEmail")
    public ResponseEntity kirimEmail(@RequestBody EmailPayloadReq payload) {
        try {
            emailService.sendEmail(payload);
            return new ResponseEntity("Email berhasil dikirim", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Gagal mengirim email: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
