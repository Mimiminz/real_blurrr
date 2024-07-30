package com.luckvicky.blur.global.config;

import com.luckvicky.blur.global.jwt.model.ContextMember;

import static com.luckvicky.blur.global.constant.StringFormat.AUTH;
import static com.luckvicky.blur.global.constant.StringFormat.GENERAL_USER_URI;
import static com.luckvicky.blur.global.constant.StringFormat.JWT;
import static com.luckvicky.blur.global.constant.StringFormat.NO_AUTH;
import static com.luckvicky.blur.global.constant.StringFormat.PERMIT_ALL_URI;
import static com.luckvicky.blur.global.constant.StringFormat.TOKEN_PREFIX;

import com.luckvicky.blur.infra.swagger.NoAuthorization;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import java.lang.annotation.Annotation;
import java.util.Objects;
import org.springdoc.core.models.GroupedOpenApi;
import org.springdoc.core.utils.SpringDocUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Pageable;

@Configuration
public class SwaggerConfig {

    static {
        SpringDocUtils.getConfig().addRequestWrapperToIgnore(Pageable.class, ContextMember.class);
    }

    @Bean
    public GroupedOpenApi noAuthApi() {

        return GroupedOpenApi.builder()
                .group(NO_AUTH)
                .addOpenApiMethodFilter(method -> {
                    if (Objects.isNull(method.getAnnotation(NoAuthorization.class))){
                        return false;
                    }
                    return true;
                })
                .build();

    }

    @Bean
    public GroupedOpenApi authApi() {

        return GroupedOpenApi.builder()
                .group(AUTH)
                .addOpenApiMethodFilter(method -> {
                    if (Objects.isNull(method.getAnnotation(NoAuthorization.class))){
                        return true;
                    }
                    return false;
                })
                .addOpenApiCustomizer(openApi
                        -> openApi.addSecurityItem(
                                new SecurityRequirement().addList(TOKEN_PREFIX)
                        )
                )
                .build();

    }

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(apiInfo())
                .components(new Components()
                        .addSecuritySchemes(
                                TOKEN_PREFIX,
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme(TOKEN_PREFIX)
                                        .bearerFormat(JWT)));
    }

    private Info apiInfo() {
        return new Info()
                .title("블러 API")
                .description("블러 OpenAPI")
                .version("v1");
    }

}
