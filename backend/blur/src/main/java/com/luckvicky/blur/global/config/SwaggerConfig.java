package com.luckvicky.blur.global.config;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.infra.jwt.model.ContextMember;

import static com.luckvicky.blur.global.constant.StringFormat.JWT;
import static com.luckvicky.blur.global.constant.StringFormat.TOKEN_PREFIX;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
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
    public OpenAPI customOpenAPI() {

        Server devServer = new Server();
        devServer.setDescription("dev");
        devServer.setUrl("https://i11a307.p.ssafy.io");

        Server localServer = new Server();
        localServer.setDescription("local");
        localServer.setUrl("http://localhost:8080");

        return new OpenAPI()
                .info(apiInfo())
                .servers(List.of(devServer, localServer))
                .components(
                        new Components().addSecuritySchemes(
                                TOKEN_PREFIX,
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme(TOKEN_PREFIX)
                                        .bearerFormat(JWT))
                );

    }

    private Info apiInfo() {
        return new Info()
                .title("블러 API")
                .description("블러 Open API")
                .version("v1");
    }

    @Bean
    public GroupedOpenApi memberApi() {

        return GroupedOpenApi.builder()
                .group(Member.class.getSimpleName())
                .pathsToMatch("/v1/members/**", "/v1/auth/**")
                .addOpenApiCustomizer(openApi
                                -> openApi.addSecurityItem(
                                new SecurityRequirement().addList(TOKEN_PREFIX)
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi leagueApi() {

        return GroupedOpenApi.builder()
                .group(League.class.getSimpleName())
                .pathsToMatch("/v1/leagues/**")
                .addOpenApiCustomizer(openApi
                                -> openApi.addSecurityItem(
                                new SecurityRequirement().addList(TOKEN_PREFIX)
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi channelApi() {

        return GroupedOpenApi.builder()
                .group(Channel.class.getSimpleName())
                .pathsToMatch(
                        "/v1/channels/**",
                        "/v1/hot",
                        "/v1/mycar",
                        "/v1/today/mycar",
                        "/v1/dashcam",
                        "/v1/channels"
                )
                .addOpenApiCustomizer(openApi
                                -> openApi.addSecurityItem(
                                new SecurityRequirement().addList(TOKEN_PREFIX)
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi boardApi() {

        return GroupedOpenApi.builder()
                .group(Board.class.getSimpleName())
                .pathsToMatch("/v1/boards/**", "/v1/comments/**", "/v1/likes/**")
                .addOpenApiCustomizer(openApi
                                -> openApi.addSecurityItem(
                                new SecurityRequirement().addList(TOKEN_PREFIX)
                        )
                )
                .build();

    }

}
