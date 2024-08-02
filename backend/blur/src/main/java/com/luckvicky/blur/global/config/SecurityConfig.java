package com.luckvicky.blur.global.config;

import static com.luckvicky.blur.global.constant.StringFormat.AUTH_USER_URI;
import static com.luckvicky.blur.global.constant.StringFormat.BASIC_USER_URI;
import static com.luckvicky.blur.global.constant.StringFormat.GENERAL_USER_URI;
import static com.luckvicky.blur.global.constant.StringFormat.PERMIT_ALL_URI;
import static com.luckvicky.blur.global.constant.StringFormat.SWAGGER_URI;

import com.luckvicky.blur.global.jwt.filter.JwtFilter;
import com.luckvicky.blur.global.jwt.handler.JwtAccessDeniedHandler;
import com.luckvicky.blur.global.jwt.handler.JwtAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
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

                        // 허용 URI
                        .requestMatchers(PERMIT_ALL_URI).permitAll()

                        // SWAGGER URI
                        .requestMatchers(SWAGGER_URI).permitAll()

                        // 일반 유저 URI (GET METHOD만 허용)
                        .requestMatchers(HttpMethod.GET, GENERAL_USER_URI).permitAll()

                        // 미인증 유저 URI
                        .requestMatchers(BASIC_USER_URI).hasAnyRole("BASIC_USER", "AUTH_USER")

                        // 인증 유저 URI
                        .requestMatchers(AUTH_USER_URI).hasAnyRole("AUTH_USER")

                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()

                        .anyRequest().authenticated())

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
