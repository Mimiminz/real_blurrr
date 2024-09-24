package com.luckvicky.blur.infra.jwt.service;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtProvider {
    private final SecretKey secretKey;
    private long expireAccessToken;
    private long expireRefreshToken;

    public JwtProvider(@Value("${jwt.secret}") String secret,
                       @Value("${jwt.expire.time.access}") long expireAccessToken,
                       @Value("${jwt.expire.time.refresh}") long expireRefreshToken) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),
                Jwts.SIG.HS256.key().build().getAlgorithm());
        this.expireAccessToken = expireAccessToken;
        this.expireRefreshToken = expireRefreshToken;
    }

    /**
     * Access Token 발급
     */
    public String createAccessToken(String username, String role) {
        return Jwts.builder()
                .claim("username", username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expireAccessToken))
                .signWith(secretKey)
                .compact();
    }

    /**
     * Refresh Token 발급
     */
    public String createRefreshToken(String username) {
        return Jwts.builder()
                .claim("username", username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expireRefreshToken))
                .signWith(secretKey)
                .compact();
    }
    /**
     * 이메일 정보 반환
     */
    public String getEmail(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token.replace(" ", "")).getPayload()
                .get("username", String.class);
    }

    /**
     * 토큰의 만료기한 확인
     */
    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration()
                .before(new Date());
    }

    /**
     *
     */
    public Boolean validation(String token) {
        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.info("만료된 토큰입니다");
        }
        return false;
    }
}
