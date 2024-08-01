package com.luckvicky.blur.global.config;

import static com.luckvicky.blur.global.constant.StringFormat.REDISSON_ADDRESS;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedissonConfig {

    @Bean
    RedissonClient redissonClient() {

        Config config = new Config();
        config.useSingleServer().setAddress(REDISSON_ADDRESS);

        return Redisson.create(config);

    }

}