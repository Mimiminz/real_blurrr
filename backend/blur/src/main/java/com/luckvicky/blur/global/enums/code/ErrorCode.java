package com.luckvicky.blur.global.enums.code;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum ErrorCode {

    /**
     * [400 Bad Request]
     * - 응답 상태 코드는 서버가 클라이언트 오류를 감지해 요청 불가
     */
    INVALID_LEAGUE_TYPE(HttpStatus.BAD_REQUEST,"유효하지 않은 리그 타입입니다."),
    FAIL_TO_VALIDATE(HttpStatus.BAD_REQUEST, "잘못된 요청입니다.");

    /**
     * [401 UnAuthorized]
     * - 요청된 리소스에 대한 유효한 인증 자격 증명이 없음
     */

    /**
     * [403 Forbidden]
     * -  요청한 자원에 대해 권한 없음
     */


    /**
     * [404 Not Found]
     * - 존재하지 않는 자원
     */

    /**
     * [500 INTERNAL_SERVER_ERROR]
     * - 서버 오류
     */

    private final HttpStatus code;
    private final String message;

}