package com.luckvicky.blur.global.config;

import static com.luckvicky.blur.domain.member.model.entity.Role.ROLE_AUTH_USER;
import static com.luckvicky.blur.domain.member.model.entity.Role.ROLE_BASIC_USER;
import static com.luckvicky.blur.global.constant.StringFormat.AUTH_USER_URI;
import static com.luckvicky.blur.global.constant.StringFormat.BASIC_USER_URI;
import static com.luckvicky.blur.global.constant.StringFormat.GUEST_URI;
import static com.luckvicky.blur.global.constant.StringFormat.GUEST_URI_OF_LEAGUE;
import static com.luckvicky.blur.global.constant.StringFormat.SIGN_UP_URI;
import static com.luckvicky.blur.global.constant.StringFormat.UTILITY_URI;
import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;
import static org.springframework.security.web.util.matcher.RegexRequestMatcher.regexMatcher;

import com.luckvicky.blur.infra.jwt.filter.JwtFilter;
import com.luckvicky.blur.infra.jwt.handler.JwtAccessDeniedHandler;
import com.luckvicky.blur.infra.jwt.handler.JwtAuthenticationEntryPoint;
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

                .cors(cors -> cors.configurationSource(CorsConfig.corsConfigurationSource()))

                .headers(header ->
                        header.frameOptions(
                                HeadersConfigurer.FrameOptionsConfig::sameOrigin
                        ))

                .sessionManagement(sessionManagementConfigurer
                        -> sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(requestConfigurer -> requestConfigurer

                        // 프리플라이트 관련 설정
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()

                        .requestMatchers(antMatcher(HttpMethod.GET, "/v1/leagues/save")).permitAll()

                        // todo: 추후에 삭제
                        .requestMatchers(antMatcher(HttpMethod.POST, "/v1/leagues/members")).permitAll()

                        // Utility URI
                        .requestMatchers(UTILITY_URI).permitAll()

                        // 회원가입 관련 URI
                        .requestMatchers(HttpMethod.GET ,SIGN_UP_URI).permitAll()
                        .requestMatchers(HttpMethod.POST ,SIGN_UP_URI).permitAll()
                        .requestMatchers(HttpMethod.PUT ,SIGN_UP_URI).permitAll()

                        // GEUST URI
                        .requestMatchers(HttpMethod.GET, GUEST_URI).permitAll()
                        .requestMatchers(HttpMethod.POST, GUEST_URI).hasAnyRole(ROLE_BASIC_USER.getRole(), ROLE_AUTH_USER.getRole())

                        // 리그 URI (만약, leagueType=MODEL이 포함될 경우 권한 확인)
                        .requestMatchers(regexMatcher(".*/leagues.*[?&]leagueType=MODEL(&.*)?$")).hasRole(ROLE_AUTH_USER.getRole())
                        .requestMatchers(HttpMethod.GET, GUEST_URI_OF_LEAGUE).permitAll()
                        .requestMatchers(HttpMethod.POST, GUEST_URI_OF_LEAGUE).hasRole(ROLE_AUTH_USER.getRole())

                        .requestMatchers(HttpMethod.POST, GUEST_URI_OF_LEAGUE).hasRole(ROLE_AUTH_USER.getRole())

                        // 자동차 미인증 유저 URI
                        .requestMatchers(BASIC_USER_URI).hasAnyRole(ROLE_BASIC_USER.getRole(), ROLE_AUTH_USER.getRole())

                        // 자동차 인증 유저 URI
                        .requestMatchers(HttpMethod.GET, "/v1/leagues/members").hasRole(ROLE_AUTH_USER.getRole())
                        .requestMatchers(AUTH_USER_URI).hasRole(ROLE_AUTH_USER.getRole())


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
