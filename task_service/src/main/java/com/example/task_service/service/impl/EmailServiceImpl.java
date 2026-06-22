package com.example.task_service.service.impl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.task_service.entity.TaskEntity;
import com.example.task_service.payload.req.EmailPayloadReq;
import com.example.task_service.repository.TaskRepository;
import com.example.task_service.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

        @Autowired
        private TaskRepository taskRepository;
        @Autowired
        private RestTemplate restTemplate;
        
        @Value("${smtp.host}")
        private String smtpHost;

        @Value("${smtp.port}")
        private int smtpPort;

        @Override
        @Scheduled(fixedRate = 60000) 
        public void schedulerEmail() {
                try {
                        // 1. Pastikan menggunakan Zona Waktu Indonesia Barat (WIB / GMT+7)
                        ZoneId jktZone = ZoneId.of("Asia/Jakarta");
                        LocalDateTime now = LocalDateTime.now(jktZone);

                        // ==================== LOGIKA H-1 HARI ====================
                        LocalDateTime targetDay = now.plusDays(1);
                        Timestamp dayStart = Timestamp.valueOf(targetDay.withSecond(0).withNano(0));
                        Timestamp dayEnd = Timestamp.valueOf(targetDay.withSecond(59).withNano(999999999));

                        // ==================== LOGIKA H-1 JAM ====================
                        LocalDateTime targetHour = now.plusHours(1);
                        Timestamp hourStart = Timestamp.valueOf(targetHour.withSecond(0).withNano(0));
                        Timestamp hourEnd = Timestamp.valueOf(targetHour.withSecond(59).withNano(999999999));

                        System.out.println("--- SCHEDULER CHECK ("
                                        + now.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) + ") ---");
                        System.out.println("Mencari H-1 Hari antara: " + dayStart + " s/d " + dayEnd);
                        System.out.println("Mencari H-1 Jam antara : " + hourStart + " s/d " + hourEnd);

                        // 2. Ambil data task dari database
                        List<TaskEntity> oneDayTasks = taskRepository.findByDeadlineBetween(dayStart, dayEnd);
                        List<TaskEntity> oneHourTasks = taskRepository.findByDeadlineBetween(hourStart, hourEnd);

                        // 3. Kirim jika ada task yang ditemukan
                        if (!oneDayTasks.isEmpty()) {
                                sendReminder(oneDayTasks, "1 Hari");
                        }

                        if (!oneHourTasks.isEmpty()) {
                                sendReminder(oneHourTasks, "1 Jam");
                        }

                } catch (Exception e) {
                        System.err.println("Gagal menjalankan scheduler email:");
                        e.printStackTrace();
                }
        }

        @Override
        public void sendEmail(EmailPayloadReq payload) throws Exception {
                try {
                        InternetAddress[] senderEmailWithoutName = InternetAddress.parse(payload.getSenderEmail());
                        Properties props = new Properties();

                        props.put("mail.smtp.auth", "true");
                        props.put("mail.smtp.starttls.enable", "true");
                        props.put("mail.smtp.host", smtpHost);
                        props.put("mail.smtp.port", smtpPort);

                        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
                                protected PasswordAuthentication getPasswordAuthentication() {
                                        return new PasswordAuthentication(
                                                        senderEmailWithoutName[0].getAddress(),
                                                        payload.getSenderPassword());
                                }
                        });

                        LocalDateTime currentDateTime = LocalDateTime.now();
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                        String formattedDateTime = currentDateTime.format(formatter);

                        Message message = new MimeMessage(session);
                        message.setFrom(new InternetAddress(payload.getSenderEmail()));
                        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(payload.getReceiverEmailTo()));

                        if (payload.getReceiverEmailCc() != null && !payload.getReceiverEmailCc().isEmpty()) {
                                message.setRecipients(Message.RecipientType.CC, InternetAddress.parse(payload.getReceiverEmailCc()));
                        }

                        message.setSubject("Task Reminder - " + formattedDateTime + " - " + payload.getEmailSubject());

                        MimeBodyPart messageBodyPart = new MimeBodyPart();
                        messageBodyPart.setContent(payload.getBody(), "text/html;charset=UTF-8");

                        Multipart multipart = new MimeMultipart();
                        multipart.addBodyPart(messageBodyPart);
                        message.setContent(multipart);

                        Transport.send(message);

                } catch (MessagingException e) {
                        e.printStackTrace();
                        throw new RuntimeException(e);
                }
        }

        @SuppressWarnings("unchecked")
        private void sendReminder(List<TaskEntity> tasks, String reminderType) {
                System.out.println("SEND REMINDER " + reminderType + " -> " + tasks.size() + " TASK");

                for (TaskEntity task : tasks) {
                        try {
                                // Menggunakan Map.class untuk mengambil response JSON global secara dinamis
                                Map<String, Object> response = restTemplate.getForObject(
                                                "http://localhost:8088/users/id/" + task.getUserId(),
                                                Map.class);

                                System.out.println("USER RESPONSE RAW: " + response);

                                if (response == null || !response.containsKey("data") || response.get("data") == null) {
                                        System.out.println("⚠️ SKIP TASK: User dengan ID " + task.getUserId() + " tidak ditemukan.");
                                        continue;
                                }

                                // Ambil inner map dari key "data"
                                Map<String, Object> dataNode = (Map<String, Object>) response.get("data");
                                
                                String emailTarget = dataNode.containsKey("emailRes") && dataNode.get("emailRes") != null 
                                                ? dataNode.get("emailRes").toString() : null;
                                                
                                String fullnameTarget = dataNode.containsKey("fullnameRes") && dataNode.get("fullnameRes") != null 
                                                ? dataNode.get("fullnameRes").toString() : "User";

                                System.out.println("EMAIL TARGET : " + emailTarget);

                                if (emailTarget == null || emailTarget.trim().isEmpty() || emailTarget.equalsIgnoreCase("null")) {
                                        System.out.println("⚠️ SKIP TASK '" + task.getTitle() + "': Alamat email kosong.");
                                        continue;
                                }

                                String body = "<h2>Task Reminder</h2>"
                                                + "<p>Halo " + fullnameTarget + "</p>"
                                                + "<p>Tugas berikut akan deadline dalam " + reminderType + "</p><br>"
                                                + "<b>Title :</b> " + task.getTitle() + "<br><br>"
                                                + "<b>Description :</b> " + task.getDescription() + "<br><br>"
                                                + "<b>Priority :</b> " + task.getPriority() + "<br><br>"
                                                + "<b>Status :</b> " + task.getStatus() + "<br><br>"
                                                + "<b>Deadline :</b> " + task.getDeadline() + "<br><br>"
                                                + "<p>Segera selesaikan tugas Anda.</p>";

                                EmailPayloadReq payload = new EmailPayloadReq();
                                payload.setSenderEmail("ekaarahma010@gmail.com");
                                payload.setSenderPassword("skmxrgyqzscqxlrh");
                                payload.setReceiverEmailTo(emailTarget);
                                payload.setReceiverEmailCc(null);
                                payload.setReceiverEmailBcc(null);
                                payload.setEmailSubject("Task Reminder");
                                payload.setBody(body);

                                System.out.println("TASK : " + task.getTitle());
                                System.out.println("DEADLINE : " + task.getDeadline());

                                sendEmail(payload);
                                System.out.println("Reminder terkirim ke " + emailTarget);

                        } catch (Exception e) {
                                System.err.println("Gagal memproses pengiriman reminder untuk task ID: " + task.getId());
                                e.printStackTrace();
                        }
                }
        }
}