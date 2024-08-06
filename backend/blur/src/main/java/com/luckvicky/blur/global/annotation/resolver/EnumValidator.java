package com.luckvicky.blur.global.annotation.resolver;

import com.luckvicky.blur.global.annotation.custom.ValidEnum;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Arrays;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class EnumValidator implements ConstraintValidator<ValidEnum, String> {

    private ValidEnum enumValue;

    @Override
    public void initialize(final ValidEnum constraintAnnotation) {
        this.enumValue = constraintAnnotation;
    }

    @Override
    public boolean isValid(final String value, final ConstraintValidatorContext context) {
        final Enum<?>[] enumConstants = this.enumValue.enumClass().getEnumConstants();
        if (enumConstants == null) {
            return false;
        }

        return Arrays.stream(enumConstants)
                .anyMatch(enumConstant -> convertible(value, enumConstant) || convertibleIgnoreCase(value, enumConstant));
    }

    private boolean convertibleIgnoreCase(final String value, final Enum<?> enumConstant) {
        return this.enumValue.ignoreCase() && value.trim().equalsIgnoreCase(enumConstant.name());
    }

    private boolean convertible(final String value, final Enum<?> enumConstant) {
        return value.trim().equals(enumConstant.name());
    }
}
