package com.example.task_service.utility;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
private final String SECRET = "1234567890123456789012345678901234567890"; // minimal 256 bit (32 karakter)
private final long EXPIRATION = 1000*60*60; // 1 jam

private Key getKey(){
    return new SecretKeySpec(
        SECRET.getBytes(),
        SignatureAlgorithm.HS256.getJcaName()   
    );
}
public String generateToken(String username){
    return Jwts.builder()
        .subject(username)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
        .signWith(getKey())
        .compact();
}
public String extractUsername(String token){
    Claims claims = Jwts.parser()
    .verifyWith((javax.crypto.SecretKey) getKey())
    .build()
    .parseSignedClaims(token)
    .getPayload();
    return claims.getSubject();
}
public boolean isValid(String token){
    try{
        Jwts.parser()
        .verifyWith((javax.crypto.SecretKey) getKey())
        .build()
        .parseSignedClaims(token);
        return true;
    } catch (Exception e) {
        return false;
    }
}
}