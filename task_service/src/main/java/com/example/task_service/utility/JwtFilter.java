package com.example.task_service.utility;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getServletPath();

        System.out.println("PATH : " + path);

        // SKIP LOGIN AUTH
        if (path.startsWith("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("JWT FILTER HIT");

        String authHeader =
                request.getHeader("Authorization");

        System.out.println("Test token: " + authHeader);

        if (authHeader != null &&
                authHeader.startsWith("Bearer ")) {

            String token =
                    authHeader.substring(7);

            if (jwtUtil.isValid(token)) {

                String username =
                        jwtUtil.extractUsername(token);

                User user =
                        new User(
                                username,
                                "",
                                java.util.List.of()
                        );

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                user,
                                null,
                                user.getAuthorities()
                        );

                auth.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }
}