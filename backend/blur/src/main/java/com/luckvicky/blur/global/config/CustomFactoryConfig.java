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
import com.luckvicky.blur.global.util.ResourceUtil;
import com.luckvicky.blur.infra.mail.model.EmailFormType;
import com.luckvicky.blur.infra.mail.service.AuthCodeEmailFormFactory;
import com.luckvicky.blur.infra.mail.service.EmailFormFactory;
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
    public Map<EmailFormType, EmailFormFactory> emailFormFactoryMap(
            AuthCodeEmailFormFactory authCodeEmailFormFactory
    ) {
        HashMap<EmailFormType, EmailFormFactory> emailFormFactoryMap = new HashMap<>();
        emailFormFactoryMap.put(EmailFormType.SIGNUP_AUTH, authCodeEmailFormFactory);
        emailFormFactoryMap.put(EmailFormType.PASSWORD_CHANGE_AUTH, authCodeEmailFormFactory);
        return emailFormFactoryMap;
    }

    @Bean
    public Map<BoardType, BoardFactory> boardFactoryMap() {
        HashMap<BoardType, BoardFactory> factoryHashMap = new HashMap<>();
        factoryHashMap.put(BoardType.MYCAR, new MyCarBoardFactory());
        return factoryHashMap;
    }

    @Bean
    public Map<AlarmType, NotificationFactory> factoryMap(
            CommentNotificationFactory commentNotificationFactory
    ) {
        Map<AlarmType, NotificationFactory> factoryMap = new HashMap<>();
        factoryMap.put(AlarmType.ADD_COMMENT, commentNotificationFactory);
        return factoryMap;
    }

    @Bean
    public Map<AuthCodeType, AuthCodeStrategy> authCodeStrategyMap(
            PasswordAuthStrategy passwordAuthStrategy,
            SingInAuthStrategy singInAuthStrategy
    ) {
        Map<AuthCodeType, AuthCodeStrategy> authCodeStrategyMap = new HashMap<>();
        authCodeStrategyMap.put(AuthCodeType.SIGNUP, singInAuthStrategy);
        authCodeStrategyMap.put(AuthCodeType.PASSWORD_CHANGE, passwordAuthStrategy);
        return authCodeStrategyMap;

    }

    @Bean
    public SingInAuthStrategy singInAuthStrategy(
            RedisAuthCodeAdapter redisAuthCodeAdapter, MemberRepository memberRepository) {
        return new SingInAuthStrategy(redisAuthCodeAdapter, memberRepository);
    }

    @Bean
    public PasswordAuthStrategy passwordAuthStrategy(
            RedisAuthCodeAdapter redisAuthCodeAdapter,
            MemberRepository memberRepository
    ) {
        return new PasswordAuthStrategy(redisAuthCodeAdapter, memberRepository);
    }

    @Bean
    public AuthCodeEmailFormFactory authCodeEmailFormFactory(ResourceUtil resourceUtil) {
        return new AuthCodeEmailFormFactory(resourceUtil);
    }

    @Bean
    public CommentNotificationFactory commentNotificationFactory() {
        return new CommentNotificationFactory();
    }
}
