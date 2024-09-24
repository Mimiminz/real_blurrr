package com.luckvicky.blur.global.config;

import com.luckvicky.blur.global.security.AuthArgumentResolver;
import com.luckvicky.blur.global.security.NullableAuthArgumentResolver;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new AuthArgumentResolver());
        argumentResolvers.add(new NullableAuthArgumentResolver());
    }

}
