package com.luckvicky.blur.global.config;

import static com.luckvicky.blur.domain.member.model.entity.Role.ROLE_AUTH_USER;
import static com.luckvicky.blur.domain.member.model.entity.Role.ROLE_BASIC_USER;
import static com.luckvicky.blur.global.constant.StringFormat.AUTH_USER_URI;
import static com.luckvicky.blur.global.constant.StringFormat.BASIC_USER_URI;
import static com.luckvicky.blur.global.constant.StringFormat.GUEST_URI;
import static com.luckvicky.blur.global.constant.StringFormat.GUEST_URI_OF_LEAGUE;
import static com.luckvicky.blur.global.constant.StringFormat.SIGN_UP_URI;
import static com.luckvicky.blur.global.constant.StringFormat.UTILITY_URI;

import com.luckvicky.blur.global.jwt.filter.JwtFilter;
import com.luckvicky.blur.global.jwt.handler.JwtAccessDeniedHandler;
import com.luckvicky.blur.global.jwt.handler.JwtAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final JwtAccessDeniedHandler accessDeniedHandler;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {

        return http
                .httpBasic(AbstractHttpConfigurer::disable)

                .formLogin(AbstractHttpConfigurer::disable)

                .csrf(AbstractHttpConfigurer::disable)

                .cors(AbstractHttpConfigurer::disable)

                .headers(header ->
                        header.frameOptions(
                                HeadersConfigurer.FrameOptionsConfig::sameOrigin
                        ))

                .sessionManagement(sessionManagementConfigurer
                        -> sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(requestConfigurer -> requestConfigurer

                        // 프리플라이트 관련 설정
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()

                        // todo: 추후에 삭제
                        .requestMatchers(HttpMethod.POST, "/v1/leagues/members").permitAll()

                        // Utility URI
                        .requestMatchers(UTILITY_URI).permitAll()

                        // 회원가입 관련 URI
                        .requestMatchers(HttpMethod.GET ,SIGN_UP_URI).permitAll()
                        .requestMatchers(HttpMethod.POST ,SIGN_UP_URI).permitAll()
                        .requestMatchers(HttpMethod.PUT ,SIGN_UP_URI).permitAll()

                        // GEUST URI
                        .requestMatchers(HttpMethod.GET, GUEST_URI).permitAll()
                        .requestMatchers(HttpMethod.POST, GUEST_URI).hasAnyAuthority(ROLE_BASIC_USER.getValue(), ROLE_AUTH_USER.getValue())

                        // 리그 URI
                        .requestMatchers(HttpMethod.GET, GUEST_URI_OF_LEAGUE).permitAll()
                        .requestMatchers(HttpMethod.POST, GUEST_URI_OF_LEAGUE).hasAuthority(ROLE_AUTH_USER.getValue())

                        // 자동차 미인증 유저 URI
                        .requestMatchers(BASIC_USER_URI).hasAnyAuthority(ROLE_BASIC_USER.getValue(), ROLE_AUTH_USER.getValue())

                        // 자동차 인증 유저 URI
                        .requestMatchers(HttpMethod.GET, "/v1/leagues/members").hasAuthority(ROLE_AUTH_USER.getValue())
                        .requestMatchers(AUTH_USER_URI).hasAuthority(ROLE_AUTH_USER.getValue())

                        .anyRequest().authenticated()
                )

                //JwtFilter
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                .exceptionHandling(exceptionHandling ->
                        exceptionHandling
                                .accessDeniedHandler(accessDeniedHandler)
                                .authenticationEntryPoint(authenticationEntryPoint)
                ).build();

    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
