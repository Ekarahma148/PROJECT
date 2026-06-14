// package com.example.task_service.service.impl;

// import java.security.MessageDigest;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.security.autoconfigure.SecurityProperties.User;
// import org.springframework.stereotype.Service;

// import com.example.task_service.entity.AuthUserEntity;
// import com.example.task_service.repository.AuthUserRepository;
// import com.example.task_service.service.AuthService;

// @Service
// public class AuthServiceImpl implements AuthService {
//     @Autowired
//     AuthUserRepository authUserRepository;
//    @Override
//     public boolean login(String username, String password) {
//        try{
//         AuthUserEntity usersEntity = authUserRepository.getByEmail(username);
//         if (usersEntity != null){
//             if(usersEntity.getPassword().equals(md5Encrypt(password))){
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//        } catch (Exception e) {
//         e.printStackTrace();
//        }
//        return false;
//     } 

//     private String md5Encrypt(String input){
//         try {
//             MessageDigest md = MessageDigest.getInstance("MD5");
//             byte[] messageDigest = md.digest(input.getBytes());
//             StringBuilder hexString = new StringBuilder();
//             for (byte b : messageDigest) {
//                 hexString.append(String.format("%02x", b));
//             }
//             return hexString.toString();
//         } catch (Exception e) {
//            throw new RuntimeException(e);
            
//         }
//     }
// }

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