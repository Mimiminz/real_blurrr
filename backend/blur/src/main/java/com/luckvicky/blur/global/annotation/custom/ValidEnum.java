package com.luckvicky.blur.global.annotation.custom;

import com.luckvicky.blur.global.annotation.resolver.EnumValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = EnumValidator.class)
@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidEnum {
    Class<? extends Enum<?>> enumClass();
    String message() default "Invalid Value";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    boolean ignoreCase() default false;
}
