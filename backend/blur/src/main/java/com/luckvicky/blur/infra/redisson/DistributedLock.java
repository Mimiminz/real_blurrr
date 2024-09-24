package com.luckvicky.blur.infra.redisson;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.concurrent.TimeUnit;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DistributedLock {

    String value();

    TimeUnit timeUnit() default TimeUnit.SECONDS;

    long waitTime() default 5L;

    long occupancyTime() default 2L;

}
