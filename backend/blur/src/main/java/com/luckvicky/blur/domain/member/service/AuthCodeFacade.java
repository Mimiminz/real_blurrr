package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.strategy.AuthCodeStrategy;
import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class AuthCodeFacade {
    private final Map<AuthCodeType, AuthCodeStrategy> authCodeStrategyMap;

    public AuthCodeFacade(Map<AuthCodeType, AuthCodeStrategy> authCodeStrategyMap) {
        this.authCodeStrategyMap = authCodeStrategyMap;
    }

    public String createAuthCode(String email, AuthCodeType authCodeType) {
        AuthCodeStrategy strategy =  authCodeStrategyMap.get(authCodeType);
        return strategy.saveAuthCode(email);
    }
}
