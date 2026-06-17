package com.example.user_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.user_service.payload.req.RegisterPayloadReq;
import com.example.user_service.payload.req.UserPayloadReq;
import com.example.user_service.payload.res.UserPayloadRes;
import com.example.user_service.service.UserService;
import com.example.user_service.utility.Message;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/getUser")
    public ResponseEntity getUser(
            @RequestBody UserPayloadReq payload
    ) {

        try {

            UserPayloadRes result =
                    userService.getUserById(payload);

            return new Message()
                    .getData("Success", result, 200);

        } catch (Exception e) {

            return new Message()
                    .error(
                            "Terjadi error: "
                                    + e.getMessage(),
                            500
                    );
        }
    }
    @GetMapping("/getByEmail")
public UserPayloadRes getByEmail(
        @RequestParam String email
) throws Exception {

    UserPayloadReq payload =
            new UserPayloadReq();

    payload.setEmailReq(email);

    return userService.getByEmail(payload);
}
    @GetMapping("/getAllUser")
    public ResponseEntity getAllUsers() {

        try {

            return new Message()
                    .getData(
                            "Success",
                            userService.getAllUsers(),
                            200
                    );

        } catch (Exception e) {

            return new Message()
                    .error(
                            "Terjadi error: "
                                    + e.getMessage(),
                            500
                    );
        }
    }

    @PostMapping("/insertUser")
    public ResponseEntity createtUser(
            @RequestBody UserPayloadReq payload
    ) {

        try {

            return new Message()
                    .getData(
                            "Insert Success",
                            userService.createUser(payload),
                            200
                    );

        } catch (Exception e) {

            return new Message()
                    .error(
                            "Terjadi error: "
                                    + e.getMessage(),
                            500
                    );
        }
    }

    @PutMapping("/updateUser")
    public ResponseEntity updateUser(
            @RequestBody UserPayloadReq payload
    ) {

        try {

            return new Message()
                    .getData(
                            "Update Success",
                            userService.updateUser(payload),
                            200
                    );

        } catch (Exception e) {

            return new Message()
                    .error(
                            "Terjadi error: "
                                    + e.getMessage(),
                            500
                    );
        }
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity deleteUser(
            @RequestBody UserPayloadReq payload
    ) {

        try {

            userService.deleteUser(payload);

            return new Message()
                    .getData(
                            "Delete Success",
                            null,
                            200
                    );

        } catch (Exception e) {

            return new Message()
                    .error(
                            "Terjadi error: "
                                    + e.getMessage(),
                            500
                    );
        }
    }

@GetMapping("/username/{username}")
public ResponseEntity<?> getByUsername(
        @PathVariable String username
) throws Exception {

    UserPayloadReq req =
            new UserPayloadReq();

    req.setUsernameReq(username);

    return ResponseEntity.ok(
            userService.getByUsername(req)
    );
}
@PostMapping("/register")
public ResponseEntity<?> register(
        @RequestBody
        @Valid
        RegisterPayloadReq payload
) throws Exception {

    return ResponseEntity.ok(
            userService.registerUser(
                    payload
            )
    );

}
@GetMapping("/id/{id}")
public ResponseEntity getUserById(
        @PathVariable Long id
) {

    try {

        UserPayloadReq req =
                new UserPayloadReq();

        req.setIdReq(id);

        return new Message()
                .getData(
                        "Success",
                        userService.getUserById(req),
                        200
                );

    } catch (Exception e) {

        return new Message()
                .error(
                        e.getMessage(),
                        500
                );
    }
}

}