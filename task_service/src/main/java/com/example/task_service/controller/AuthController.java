package com.example.task_service.controller;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import com.example.task_service.payload.req.LoginPayloadReq;
import com.example.task_service.service.AuthService;
import com.example.task_service.utility.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthService authService;

    @PostMapping("/loginJwt")
    public ResponseEntity<?> loginJwt(
            @RequestBody LoginPayloadReq user
    ) {

        boolean isValid =
                authService.login(
                        user.getUsernameReq(),
                        user.getPasswordReq()
                );

        if (!isValid) {

            return ResponseEntity.badRequest()
                    .body("Username atau password salah");
        }

        String token =
                jwtUtil.generateToken(
                        user.getUsernameReq()
                );

        return ResponseEntity.ok(token);
    }

    @PostMapping("/login")
    public String login(
            @RequestBody LoginPayloadReq user,
            HttpServletRequest request
    ) {

        boolean isValid =
                authService.login(
                        user.getUsernameReq(),
                        user.getPasswordReq()
                );

        if (isValid) {

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            user.getUsernameReq(),
                            null,
                            List.of()
                    );

            SecurityContext context =
                    SecurityContextHolder.createEmptyContext();

            context.setAuthentication(auth);

            SecurityContextHolder.setContext(
                    context
            );

            HttpSession session =
                    request.getSession(true);

            session.setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    context
            );

            session.setAttribute(
                    "username",
                    user.getUsernameReq()
            );

            return "Login Berhasil";
        }

        return "Login Gagal";
    }
}