package com.example.user_service.service.impl;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.user_service.entity.UserEntity;
import com.example.user_service.payload.req.RegisterPayloadReq;
import com.example.user_service.payload.req.UserPayloadReq;
import com.example.user_service.payload.res.UserPayloadRes;
import com.example.user_service.repository.UserRepository;
import com.example.user_service.service.UserService;

@Service
public class UserServiceImpl
                implements UserService {

        @Autowired
        UserRepository userRepository;

        @Override
        public List<UserPayloadRes> getAllUsers()
                        throws Exception {

                List<UserPayloadRes> listRes = new ArrayList<>();

                try {

                        List<UserEntity> listEnt = userRepository.findAll();

                        for (UserEntity ent : listEnt) {

                                if ("ADMIN".equals(ent.getRole())) {
                                        continue;
                                }

                                UserPayloadRes res = new UserPayloadRes();

                                res.setIdRes(ent.getId());
                                res.setFullnameRes(ent.getFullname());
                                res.setUsernameRes(ent.getUsername());
                                res.setPasswordRes(ent.getPassword());
                                res.setEmailRes(ent.getEmail());
                                res.setRoleRes(ent.getRole());

                                listRes.add(res);
                        }

                } catch (Exception e) {
                        throw e;
                }

                return listRes;
        }

        @Override
        public UserPayloadRes getUserById(
                        UserPayloadReq payload) throws Exception {

                UserPayloadRes res = new UserPayloadRes();

                try {

                        UserEntity ent = userRepository.findById(
                                        payload.getIdReq())
                                        .orElse(null);

                        if (ent == null) {

                                throw new Exception(
                                                "User tidak ditemukan");

                        }

                        res.setIdRes(ent.getId());
                        res.setFullnameRes(ent.getFullname());
                        res.setUsernameRes(ent.getUsername());
                        res.setPasswordRes(ent.getPassword());
                        res.setEmailRes(ent.getEmail());
                        res.setRoleRes(ent.getRole());

                } catch (Exception e) {
                        throw e;
                }

                return res;
        }

        @Override
        public UserPayloadRes updateUser(
                        UserPayloadReq payload) throws Exception {

                UserPayloadRes res = new UserPayloadRes();

                try {

                        UserEntity ent = userRepository.findById(
                                        payload.getIdReq())
                                        .orElse(null);

                        if (ent == null) {

                                throw new Exception(
                                                "User tidak ditemukan");

                        }
                        ent.setFullname(
                                        payload.getFullnameReq());
                        ent.setUsername(
                                        payload.getUsernameReq());

                        ent.setPassword(
                                        payload.getPasswordReq());

                        ent.setEmail(
                                        payload.getEmailReq());

                        ent.setRole(
                                        payload.getRoleReq());

                        userRepository.save(ent);

                        res.setIdRes(ent.getId());
                        res.setFullnameRes(ent.getFullname());
                        res.setUsernameRes(ent.getUsername());
                        res.setPasswordRes(ent.getPassword());
                        res.setEmailRes(ent.getEmail());
                        res.setRoleRes(ent.getRole());

                } catch (Exception e) {
                        throw e;
                }

                return res;
        }

        @Override
        public String deleteUser(
                        UserPayloadReq payload) throws Exception {

                try {

                        UserEntity ent = userRepository.findById(
                                        payload.getIdReq())
                                        .orElse(null);

                        if (ent == null) {

                                throw new Exception(
                                                "User tidak ditemukan");

                        }

                        userRepository.delete(ent);

                } catch (Exception e) {
                        throw e;
                }

                return "User berhasil dihapus";
        }

        @Override
        public UserPayloadRes getByEmail(
                        UserPayloadReq payload) throws Exception {

                UserEntity ent = userRepository.findByEmail(payload.getEmailReq());

                if (ent == null) {

                        throw new Exception(
                                        "User tidak ditemukan");
                }

                UserPayloadRes res = new UserPayloadRes();

                res.setIdRes(ent.getId());
                res.setFullnameRes(ent.getFullname());
                res.setUsernameRes(ent.getUsername());
                res.setPasswordRes(ent.getPassword());
                res.setEmailRes(ent.getEmail());
                res.setRoleRes(ent.getRole());

                return res;
        }

        @Override
        public UserPayloadRes getByUsername(
                        UserPayloadReq payload) throws Exception {

                UserEntity ent = userRepository.findByUsername(
                                payload.getUsernameReq());

                if (ent == null) {

                        throw new Exception(
                                        "User tidak ditemukan");
                }

                UserPayloadRes res = new UserPayloadRes();

                res.setIdRes(ent.getId());
                res.setFullnameRes(ent.getFullname());
                res.setUsernameRes(ent.getUsername());
                res.setPasswordRes(ent.getPassword());
                res.setEmailRes(ent.getEmail());
                res.setRoleRes(ent.getRole());

                return res;
        }

        @Override
        public RegisterPayloadReq registerUser(
                        RegisterPayloadReq payload) throws Exception {

                try {

                        if (userRepository.existsByUsername(
                                        payload.getUsernameReq())) {

                                throw new Exception(
                                                "Username sudah digunakan");
                        }

                        if (userRepository.existsByEmail(
                                        payload.getEmailReq())) {

                                throw new Exception(
                                                "Email sudah digunakan");
                        }

                        UserEntity user = new UserEntity();

                        user.setFullname(
                                        payload.getFullnameReq());

                        user.setEmail(
                                        payload.getEmailReq());

                        user.setUsername(
                                        payload.getUsernameReq());

                        user.setPassword(
                                        md5Encrypt(
                                                        payload.getPasswordReq()));

                        user.setRole("USER");

                        userRepository.save(user);

                        return payload;

                } catch (Exception e) {

                        throw new Exception(
                                        "Registrasi gagal : "
                                                        + e.getMessage());

                }

        }

        private String md5Encrypt(
                        String password) throws Exception {

                MessageDigest md = MessageDigest.getInstance("MD5");

                byte[] messageDigest = md.digest(password.getBytes());

                StringBuilder sb = new StringBuilder();

                for (byte b : messageDigest) {

                        sb.append(
                                        String.format(
                                                        "%02x",
                                                        b));

                }

                return sb.toString();

        }
}
