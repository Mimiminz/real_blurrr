package com.luckvicky.blur.global.constant;

public class ErrorMessage {

    /**
     * [400 Bad Request]
     * - 응답 상태 코드는 서버가 클라이언트 오류를 감지해 요청 불가
     */
    public static final String INVALID_BOARD_TYPE_MESSAGE = "유효하지 않은 게시판 유형입니다.";
    public static final String INVALID_LEAGUE_TYPE_MESSAGE = "유효하지 않은 리그 유형입니다.";
    public static final String INVALID_SORTING_CRITERIA_MESSAGE = "유효하지 않은 정렬 기준입니다.";
    public static final String INVALID_SEARCH_CONDITION_MESSAGE = "유효하지 않은 검색 조건입니다.";
    public static final String INVALID_EMAIL_CODE_MESSAGE = "유효하지 않은 인증 코드입니다. 다시 시도해 주세요.";
    public static final String INVALID_EMAIL_VERIFIED_MESSAGE = "인증되지 않은 이메일입니다.";
    public static final String INVALID_BRAND_MESSAGE = "유효하지 않은 브랜드입니다.";
    public static final String INVALID_MODEL_MESSAGE = "유효하지 않은 모델입니다.";
    public static final String FAIL_TO_VALIDATE_MESSAGE = "잘못된 요청입니다.";

    // 사용자 관련 요청 예외
    public static final String MISSMATCH_PASSWORD_MESSAGE = "패스워드가 일치하지 않습니다.";
    public static final String DUPLICATE_EMAIL_MESSAGE = "중복된 이메일이 존재합니다.";
    public static final String DUPLICATE_NICKNAME_MESSAGE = "중복된 닉네임이 존재합니다.";
    
    public static final String EXPIRED_EMAIL_CODE_MESSAGE = "인증 코드의 유효시간이 경과했습니다. 다시 시도해 주세요.";
    public static final String ALREADY_VOTED_MESSAGE = "이미 투표한 사용자입니다.";
    public static final String KEYWORD_LIMIT_EXCEEDED_MESSAGE = "키워드는 최대 5개까지만 입력 가능합니다.";
    /**
     * [401 UnAuthorized]
     * - 요청된 리소스에 대한 유효한 인증 자격 증명이 없음
     */
    public static final String UNAUTHORIZED_ACCESS_MESSAGE = "접근 권한이 없습니다.";

    /**
     * [403 Forbidden]
     * - 요청한 자원에 대해 권한 없음
     */
    public static final String NOT_ALLOCATED_LEAGUE_MESSAGE = "리그 사용 권한이 없습니다.";
    public static final String UNAUTHORIZED_BOARD_DELETE_MESSAGE = "게시글 삭제 권한이 없습니다.";

    /**
     * [404 Not Found]
     * - 존재하지 않는 자원
     */
    public static final String NOT_EXIST_COMMENT_MESSAGE = "존재하지 않는 댓글입니다.";
    public static final String NOT_EXIST_BOARD_MESSAGE = "존재하지 않는 게시글입니다.";
    public static final String NOT_EXIST_LEAGUE_MESSAGE = "존재하지 않는 리그입니다.";
    public static final String NOT_EXIST_MEMBER_MESSAGE = "존재하지 않는 사용자입니다.";
    public static final String NOT_EXIST_DASHCAM_MESSAGE = "존재하지 않는 게시물입니다.";
    public static final String NOT_EXIST_CHANNEL_MESSAGE = "존재하지 않는 채널입니다.";
    public static final String NOT_EXIST_LIKE_MESSAGE = "존재하지 않는 좋아요입니다.";
    public static final String NOT_EXIST_FOLLOW_MESSAGE = "존재하지 않는 팔로우입니다.";
    public static final String NOT_EXIST_ALARM_MESSAGE = "존재하지 않는 알림입니다.";
    public static final String NOT_EXIST_OPTION_MESSAGE = "존재하지 않는 옵션입니다.";

    /**
     * [500 INTERNAL_SERVER_ERROR]
     * - 서버 오류
     */
    public static final String FAIL_TO_CREATE_COMMENT_MESSAGE = "댓글 생성을 실패했습니다.";
    public static final String FAIL_TO_CREATE_LEAGUE_MESSAGE = "리그 생성을 실패했습니다.";
    public static final String FAIL_TO_CREATE_BOARD_MESSAGE = "게시글 생성을 실패했습니다.";
    public static final String FAIL_TO_CREATE_LIKE_MESSAGE = "좋아요 생성을 실패했습니다.";
    public static final String FAIL_TO_DELETE_LIKE_MESSAGE = "좋아요 삭제를 실패했습니다.";
    public static final String FAIL_TO_DELETE_COMMENT_MESSAGE = "댓글 삭제를 실패했습니다.";
    public static final String FAIL_TO_CREATE_FOLLOW_MESSAGE = "팔로우 생성을 실패했습니다.";
    public static final String FAIL_TO_DELETE_FOLLOW_MESSAGE = "팔로우 삭제를 실패했습니다.";
    public static final String FAIL_TO_CREATE_THUMBNAIL_MESSAGE = "썸네일 생성을 실패했습니다.";

}
