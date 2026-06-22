package com.example.task_service.service.impl;

import java.security.MessageDigest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.task_service.payload.res.UserPayloadRes;
import com.example.task_service.service.AuthService;

@Service
public class AuthServiceImpl
        implements AuthService {

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public boolean login(
            String username,
            String password
    ) {

        try {

            String url =
                    "http://localhost:8088/users/username/"
                            + username;

            UserPayloadRes user =
                    restTemplate.getForObject(
                            url,
                            UserPayloadRes.class
                    );

            if (user == null) {
                return false;
            }

            String md5Password =
                    md5Encrypt(password);

            return md5Password.equals(
                    user.getPasswordRes()
            );

        } catch (Exception e) {

            return false;

        }

    }

    private String md5Encrypt(
            String password
    ) throws Exception {

        MessageDigest md =
                MessageDigest.getInstance(
                        "MD5"
                );

        byte[] digest =
                md.digest(
                        password.getBytes()
                );

        StringBuilder sb =
                new StringBuilder();

        for (byte b : digest) {

            sb.append(
                    String.format(
                            "%02x",
                            b
                    )
            );

        }

        return sb.toString();
    }

}