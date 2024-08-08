package com.luckvicky.blur.global.config;

import com.luckvicky.blur.domain.alarm.factory.CommentNotificationFactory;
import com.luckvicky.blur.domain.alarm.factory.NotificationFactory;
import com.luckvicky.blur.domain.alarm.model.entity.AlarmType;
import com.luckvicky.blur.domain.board.factory.BoardFactory;
import com.luckvicky.blur.domain.board.factory.MyCarBoardFactory;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.domain.member.strategy.AuthCodeStrategy;
import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import com.luckvicky.blur.domain.member.strategy.PasswordAuthStrategy;
import com.luckvicky.blur.domain.member.strategy.SingInAuthStrategy;
import com.luckvicky.blur.infra.redis.service.RedisAuthCodeAdapter;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class CustomFactoryConfig {

    @Bean
    public Map<BoardType, BoardFactory> boardFactoryMap() {
        HashMap<BoardType, BoardFactory> factoryHashMap = new HashMap<>();
        factoryHashMap.put(BoardType.MYCAR, new MyCarBoardFactory());

        return factoryHashMap;
    }

    @Bean
    public Map<String, NotificationFactory> factoryMap() {
        Map<String, NotificationFactory> factoryMap = new HashMap<>();
        factoryMap.put(AlarmType.ADD_COMMENT.getType(), commentNotificationFactory());
        return factoryMap;
    }

    @Bean
    public Map<AuthCodeType, AuthCodeStrategy> authCodeStrategyMap(
            PasswordAuthStrategy passwordAuthStrategy,
            SingInAuthStrategy singInAuthStrategy
    ) {
        Map<AuthCodeType, AuthCodeStrategy> authCodeStrategyMap = new HashMap<>();
        authCodeStrategyMap.put(AuthCodeType.SIGNIN, singInAuthStrategy);
        authCodeStrategyMap.put(AuthCodeType.PASSWORD_CHANGE, passwordAuthStrategy);
        return authCodeStrategyMap;

    }
    @Bean
    public SingInAuthStrategy singInAuthStrategy(RedisAuthCodeAdapter redisAuthCodeAdapter) {
        return new SingInAuthStrategy(redisAuthCodeAdapter);
    }

    @Bean
    public PasswordAuthStrategy passwordAuthStrategy(
            RedisAuthCodeAdapter redisAuthCodeAdapter,
            MemberRepository memberRepository
    ) {
        return new PasswordAuthStrategy(redisAuthCodeAdapter, memberRepository);
    }

    @Bean
    public CommentNotificationFactory commentNotificationFactory() {
        return new CommentNotificationFactory();
    }
}
