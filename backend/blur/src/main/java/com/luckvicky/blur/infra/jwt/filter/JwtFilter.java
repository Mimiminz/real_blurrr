package com.luckvicky.blur.infra.jwt.filter;

import static com.luckvicky.blur.global.constant.StringFormat.BLANK;

import com.luckvicky.blur.global.constant.StringFormat;
import com.luckvicky.blur.infra.jwt.service.CustomUserDetailService;
import com.luckvicky.blur.infra.jwt.service.JwtProvider;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final CustomUserDetailService customUserDetailsService;

    public JwtFilter(JwtProvider jwtProvider, CustomUserDetailService customUserDetailsService) {
        this.jwtProvider = jwtProvider;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String token = resolveToken(request);
            // JWT 유효성 검증
            if (StringUtils.hasText(token) && jwtProvider.validation(token)) {
                String email = jwtProvider.getEmail(token);
                // 유저 정보 생성
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

                if (userDetails != null) {
                    // UserDetails, Password, Role 정보를 기반으로 접근 권한을 가지고 있는 Token 생성
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    // Security Context 해당 접근 권한 정보 설정
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
            // 다음 필터로 넘기기
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            // JWT가 만료된 경우
            log.error("Expired JWT token", e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Expired JWT token");
        } catch (SignatureException | MalformedJwtException e) {
            // JWT가 잘못된 서명이거나 형식이 잘못된 경우
            log.error("Invalid JWT token", e);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
        } catch (Exception e) {
            log.error("Unexpected error", e);
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An unexpected error occurred");
        }
    }
    /**
     * Request Header에서 토큰 조회 및 Bearer 문자열 제거 후 반환하는 메소드
     */
    private String resolveToken(HttpServletRequest request) {
        String token = request.getHeader(StringFormat.TOKEN_HEADER_NAME);
        // Token 정보 존재 여부 및 Bearer 토큰인지 확인
        if (token != null && token.startsWith(StringFormat.TOKEN_PREFIX.concat(BLANK))) {
            return token.substring(7);
        }

        return null;
    }
}
