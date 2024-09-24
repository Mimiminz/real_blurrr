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
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class DistributedLockAspect {

    private static final String REDISSON_LOCK_PREFIX = "LOCK:";
    private final RedissonClient redissonClient;
    private final DistributedLockTransaction distributedLockTransaction;

    @Around("@annotation(com.luckvicky.blur.infra.redisson.DistributedLock)")
    public Object DistributedLock(ProceedingJoinPoint joinPoint) throws Throwable {

        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        DistributedLock distributedLock = method.getAnnotation(DistributedLock.class);

        String key = new StringBuilder()
                .append(REDISSON_LOCK_PREFIX)
                .append(method.getName())
                .append(CustomSpringELParser.getDynamicValue(
                        signature.getParameterNames(), joinPoint.getArgs(), distributedLock.value()
                ))
                .toString();

        RLock rLock = redissonClient.getLock(key);

        try {

            boolean lockable = rLock.tryLock(distributedLock.waitTime(), distributedLock.occupancyTime(), TimeUnit.MICROSECONDS);

            if (!lockable) {
                log.info("Fail to occupy lock={}", key);
                throw new InterruptedException();
            }

            return distributedLockTransaction.proceed(joinPoint);

        } catch (InterruptedException e) {
            throw new InterruptedException();
        } finally {

            try {
                rLock.unlock();
            } catch (IllegalMonitorStateException e) {
                log.info("Redisson Lock Already UnLock {}:{}", method.getName(), key);
            }

        }

    }

}
