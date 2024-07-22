package com.luckvicky.blur.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi noAuthApi() {
        // "/v1/**" 경로에 매칭되는 API를 그룹화하여 문서화한다.
        String[] noAuthPaths = {"/login", "/test"};

        return GroupedOpenApi.builder()
                .group("no auth")  // 그룹 이름을 설정한다.
                .pathsToMatch(noAuthPaths)     // 그룹에 속하는 경로 패턴을 지정한다.
                .build();
    }

    @Bean
    public GroupedOpenApi authApi() {
        String[] authPaths = {"/spots/**", "/leagues/**"};
        return GroupedOpenApi.builder()
                .group("auth")
                .pathsToMatch(authPaths)
                .build();
    }

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title("블러 API")
                .description("블러 OpenAPI")
                .version("v1");
    }
}
