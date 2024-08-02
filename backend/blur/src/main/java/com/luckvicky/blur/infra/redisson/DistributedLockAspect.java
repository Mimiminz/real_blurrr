package com.luckvicky.blur.infra.redisson;

import java.lang.reflect.Method;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class DistributedLockAspect {

    private final RedissonClient redissonClient;

    @Around("@annotation(com.luckvicky.blur.infra.redisson.DistributedLock)")
    public void DistributedLock(ProceedingJoinPoint joinPoint) throws Throwable {

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        DistributedLock distributedLock = method.getAnnotation(DistributedLock.class);

        String lockKey = new StringBuilder()
                .append(method.getName())
                .append(CustomSpringELParser.getDynamicValue(
                        signature.getParameterNames(), joinPoint.getArgs(), distributedLock.value()
                ))
                .toString();

        RLock rLock = redissonClient.getLock(lockKey);

        try {

            boolean lockable = rLock.tryLock(distributedLock.waitTime(), distributedLock.occupancyTime(), TimeUnit.MICROSECONDS);

            if (!lockable) {
                log.info("Fail to occupy lock={}", lockKey);
                return;
            }

            joinPoint.proceed();

        } catch (InterruptedException e) {
            throw e;
        } finally {
            rLock.unlock();;
        }

    }

}
