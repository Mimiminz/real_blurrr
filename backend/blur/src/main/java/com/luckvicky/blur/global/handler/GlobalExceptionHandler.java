package com.luckvicky.blur.global.handler;

import static com.luckvicky.blur.global.constant.StringFormat.PROBLEM_DETAIL_KEY_ERROR;
import static com.luckvicky.blur.global.constant.StringFormat.VALIDATED_ERROR_RESULT;
import static com.luckvicky.blur.global.constant.StringFormat.VALID_ERROR_RESULT;
import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_VALIDATE;

import com.luckvicky.blur.global.enums.code.ErrorCode;
import com.luckvicky.blur.global.execption.BaseException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({Exception.class})
    public ProblemDetail handleException(Exception e) {
        return ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BaseException.class)
    public ProblemDetail handleBaseException(BaseException e) {

        ErrorCode errorCode = e.getErrorCode();

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                errorCode.getCode(),
                errorCode.getMessage()
        );

        return problemDetail;

    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    protected ProblemDetail handleValidException(MethodArgumentNotValidException exception) {

        BindingResult bindingResult = exception.getBindingResult();
        List<String> errors = new ArrayList<>();

        bindingResult.getFieldErrors().stream()
                .forEach(fieldError -> {
                    errors.add(
                            String.format(
                                    VALID_ERROR_RESULT,
                                    fieldError.getDefaultMessage(),
                                    fieldError.getField(),
                                    fieldError.getRejectedValue()
                            )
                    );
                });

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                FAIL_TO_VALIDATE.getCode(),
                FAIL_TO_VALIDATE.getMessage()
        );

        problemDetail.setProperty(PROBLEM_DETAIL_KEY_ERROR, errors);

        return problemDetail;

    }

    @ExceptionHandler({ConstraintViolationException.class})
    protected ProblemDetail handleValidatedException(ConstraintViolationException e) {

        ArrayList<String> errors = new ArrayList<>();
        Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();
        constraintViolations.stream()
                .forEach(constraintViolation -> {
                    errors.add(
                            String.format(
                                    VALIDATED_ERROR_RESULT,
                                    constraintViolation.getMessage(),
                                    constraintViolation.getInvalidValue()
                            )
                    );
                });

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                FAIL_TO_VALIDATE.getCode(),
                FAIL_TO_VALIDATE.getMessage()
        );

        problemDetail.setProperty(PROBLEM_DETAIL_KEY_ERROR, errors);

        return problemDetail;

    }

}
