package com.example.user_service.service;

import java.util.List;

import com.example.user_service.payload.req.RegisterPayloadReq;
import com.example.user_service.payload.req.UserPayloadReq;
import com.example.user_service.payload.res.UserPayloadRes;



public interface UserService {

    UserPayloadRes createUser(
            UserPayloadReq payload
    ) throws Exception;

    List<UserPayloadRes> getAllUsers()
            throws Exception;

    UserPayloadRes getUserById(
            UserPayloadReq payload
    ) throws Exception;

    UserPayloadRes updateUser(
            UserPayloadReq payload
    ) throws Exception;

    String deleteUser(
            UserPayloadReq payload
    ) throws Exception;
UserPayloadRes getByEmail(
       UserPayloadReq payload
) throws Exception;

UserPayloadRes getByUsername(
        UserPayloadReq payload
) throws Exception;
RegisterPayloadReq registerUser(
        RegisterPayloadReq payload
) throws Exception;
}