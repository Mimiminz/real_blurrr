package com.luckvicky.blur.global.enums.code;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import javax.swing.text.html.HTML;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum ErrorCode {

    /**
     * [400 Bad Request]
     * - 응답 상태 코드는 서버가 클라이언트 오류를 감지해 요청 불가
     */

    INVALID_BOARD_TYPE(HttpStatus.BAD_REQUEST,"유효하지 않은 게시판 유형입니다."),
    INVALID_LEAGUE_TYPE(HttpStatus.BAD_REQUEST,"유효하지 않은 리그 유형입니다."),

    FAIL_TO_VALIDATE(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),

    //사용자 관련 요청 예외
    MISSMATCH_PASSWROD(HttpStatus.BAD_REQUEST, "패스워드가 일치하지 않습니다."),
    DUPLICATE_EMAIL(HttpStatus.BAD_REQUEST, "중복된 이메일이 존재합니다."),

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
    NOT_EXIST_COMMENT(HttpStatus.NOT_FOUND, "존재하지 않는 댓글입니다."),
    NOT_EXIST_BOARD(HttpStatus.NOT_FOUND, "존재하지 않는 게시글입니다."),
    NOT_EXIST_LEAGUE(HttpStatus.NOT_FOUND, "존재하지 않는 리그입니다."),
    NOT_EXIST_MEMBER(HttpStatus.NOT_FOUND, "존재하지 않는 사용자입니다."),
    NOT_EXIST_DASHCAM(HttpStatus.NOT_FOUND, "존재하지 않는 게시물입니다."),
    NOT_EXIST_CHANNEL(HttpStatus.NOT_FOUND, "존재하지 않는 채널입니다."),

    /**
     * [500 INTERNAL_SERVER_ERROR]
     * - 서버 오류
     */
    FAIL_TO_CREATE_COMMENT(HttpStatus.INTERNAL_SERVER_ERROR, "댓글 생성을 실패했습니다."),
    FAIL_TO_CREATE_LEAGUE(HttpStatus.INTERNAL_SERVER_ERROR, "리그 생성을 실패했습니다."),
    FAIL_TO_CREATE_BOARD(HttpStatus.INTERNAL_SERVER_ERROR, "게시글 생성을 실패했습니다.");

    private final HttpStatus code;
    private final String message;

}
