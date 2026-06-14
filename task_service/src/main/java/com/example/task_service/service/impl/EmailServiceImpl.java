package com.example.task_service.service.impl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.task_service.payload.req.EmailPayloadReq;
import com.example.task_service.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    @Value("${smtp.host}")
    private String smtpHost;
    @Value("${smtp.port}")
    private int smtpPort;

//    @Scheduled(fixedRate = 300000)
public void schedulerEmail() {
    try {

        EmailPayloadReq payload = new EmailPayloadReq();
        payload.setSenderEmail("ekaarahma010@gmail.com");
        payload.setSenderPassword("skmxrgyqzscqxlrh");
        payload.setReceiverEmailTo("ekaarahma010@gmail.com");
        payload.setReceiverEmailCc(null);
        payload.setReceiverEmailBcc(null);
        payload.setBody("Tes scheduler");
        payload.setEmailSubject("Scheduler Email");

        sendEmail(payload);

        System.out.println("Email berhasil dikirim oleh scheduler");

    } catch (Exception e) {
        e.printStackTrace();
    }
}

    @Override
    public void sendEmail(EmailPayloadReq payload) throws Exception {
        // Implementasi logika untuk mengirim email menggunakan JavaMail API
        // Anda dapat menggunakan SMTP server yang telah dikonfigurasi di application.properties
        // Contoh kode untuk mengirim email dapat ditemukan di dokumentasi JavaMail API

        try{
            InternetAddress[] senderEmailWithoutName = InternetAddress.parse(payload.getSenderEmail());
            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", smtpHost);
            props.put("mail.smtp.port", smtpPort);

            Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(senderEmailWithoutName[0].getAddress(), payload.getSenderPassword());
                    
                }
    });
    try{
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);

        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(payload.getSenderEmail()));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(payload.getReceiverEmailTo()));

        if(payload.getReceiverEmailCc() != null && !payload.getReceiverEmailCc().isEmpty()){
            message.setRecipients(Message.RecipientType.CC, InternetAddress.parse(payload.getReceiverEmailCc()));
        }
        message.setSubject("PUB Mailing System-"+formattedDateTime+" - "+payload.getEmailSubject());
        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent(payload.getBody(),"text/html;charset=UTF-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);
        message.setContent(multipart);
        Transport.send(message);

    }catch (MessagingException e){
        e.printStackTrace();
        throw new RuntimeException(e);
    }
    
}
catch (Exception e){
    e.printStackTrace();
    throw new Exception(e);
}
    }
}

