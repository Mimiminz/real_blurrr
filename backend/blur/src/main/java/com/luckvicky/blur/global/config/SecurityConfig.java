package com.luckvicky.blur.global.config;

import com.luckvicky.blur.global.jwt.filter.LoginFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationConfiguration configuration;

    private final String[] permitAll = {
            "/v1/auth/**",
            "/v1/leagues/**",
            "/v1/boards/**",
            "/swagger-ui/**",
            "/h2-console/**",
            "/channels/**"
    };

    private final String[] SWAGGER_URI = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.index.html",
            "/webjars/**",
            "/swagger-resources/**"
    };

    public SecurityConfig(AuthenticationConfiguration configuration) {
        this.configuration = configuration;
    }

    @Bean
    public SecurityFilterChain fiterChain(HttpSecurity http) throws Exception {
        http.csrf(csrfConfigurer -> csrfConfigurer.disable());

        http.formLogin(formLoginConfigurer -> formLoginConfigurer.disable());

        http.httpBasic(httpBasicConfigurer -> httpBasicConfigurer.disable());

        http.headers(header ->
                header.frameOptions(
                        HeadersConfigurer.FrameOptionsConfig::sameOrigin
                )
        );

        http.sessionManagement(sessionManagementConfigurer -> sessionManagementConfigurer.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));

        http.authorizeHttpRequests(requestConfigurer -> requestConfigurer
                .requestMatchers(SWAGGER_URI).permitAll()
                .requestMatchers(permitAll).permitAll()
                .anyRequest().authenticated());

        //username
        http.addFilterAt(new LoginFilter(authenticationManager(configuration)),
                UsernamePasswordAuthenticationFilter.class);
        // 인증되지 않은 요청에 대한 처리 (401 Unauthorized 응답)
        http
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint(
                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                        )
                );
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
