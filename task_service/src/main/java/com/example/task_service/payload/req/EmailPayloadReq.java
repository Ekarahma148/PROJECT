package com.example.task_service.payload.req;

public class EmailPayloadReq {
private String senderEmail;
private String senderPassword;
private String receiverEmailTo;
private String receiverEmailCc;
private String receiverEmailBcc;
private Object body;
private String emailSubject;

public String getEmailSubject() {
    return emailSubject;
}
public void setEmailSubject(String emailSubject) {
    this.emailSubject = emailSubject;
}
public String getSenderEmail() {
    return senderEmail;
}
public void setSenderEmail(String senderEmail) {
    this.senderEmail = senderEmail;
}
public String getSenderPassword() {
    return senderPassword;
}
public void setSenderPassword(String senderPassword) {
    this.senderPassword = senderPassword;
}
public String getReceiverEmailTo() {
    return receiverEmailTo;
}
public void setReceiverEmailTo(String receiverEmailTo) {
    this.receiverEmailTo = receiverEmailTo;
}
public String getReceiverEmailCc() {
    return receiverEmailCc;
}
public void setReceiverEmailCc(String receiverEmailCc) {
    this.receiverEmailCc = receiverEmailCc;
}
public String getReceiverEmailBcc() {
    return receiverEmailBcc;
}
public void setReceiverEmailBcc(String receiverEmailBcc) {
    this.receiverEmailBcc = receiverEmailBcc;
}
public Object getBody() {
    return body;
}
public void setBody(Object body) {
    this.body = body;
}
}
