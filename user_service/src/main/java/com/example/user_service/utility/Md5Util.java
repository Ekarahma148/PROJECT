package com.example.user_service.utility;

import java.math.BigInteger;
import java.security.MessageDigest;

import org.springframework.stereotype.Component;

@Component
public class Md5Util {

    public String encrypt(String value) {

        try {

            MessageDigest md = MessageDigest.getInstance("MD5");

            byte[] digest = md.digest(value.getBytes());

            BigInteger number = new BigInteger(1, digest);

            String hash = number.toString(16);

            while (hash.length() < 32) {
                hash = "0" + hash;
            }

            return hash;

        } catch (Exception e) {

            throw new RuntimeException(e);

        }

    }

}
