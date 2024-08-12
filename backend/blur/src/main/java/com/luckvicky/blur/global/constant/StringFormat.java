package com.luckvicky.blur.global.constant;

public class StringFormat {

    public static final String BLANK = " ";
    public static final String JWT = "JWT";

    public static final String VALID_ERROR_RESULT = "{message: '%s'}, {field: '%s'}, {input: '%s'}";
    public static final String VALIDATED_ERROR_RESULT = "{message: '%s'}, {input: '%s'}";

    public static final String TOKEN_HEADER_NAME = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer";

    public static final String PROBLEM_DETAIL_KEY_ERROR = "error";

    public static final String TIMESTAMP_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String REFRESH_TOKEN_PREFIX = "refreshToken:";

    public static final String EMAIL_AUTH_PREFIX = "emailauth:";
    public static final String EMAIL_AVAILABLE_PREFIX = "validEmail";

    public static final String PASSWORD_AUTH_PREFIX = "passwordAuth:";
    public static final String PASSWORD_CHANGE_AVAILABLE_PREFIX = "validPasswordChange:";

    public static final String CRITERIA_TIME = "createdAt";
    public static final String CRITERIA_LIKE = "likeCount";
    public static final String CRITERIA_VIEW = "viewCount";
    public static final String CRITERIA_COMMENT = "commentCount";
    public static final String CRITERIA_NAME = "name";
    public static final String CRITERIA_PEOPLE = "peopleCount";
    public static final String CRITERIA_VOTE = "totalVoteCount";

    public static final String CONDITION_TITLE = "title";
    public static final String CONDITION_CONTENT = "comment";
    public static final String CONDITION_NICKNAME = "nickname";

    public static final String SUBSCRIBE = "subscribe";

    public static final String REDISSON_ADDRESS = "redis://localhost:6379";

    public static final String THUMBNAIL_BUCKET = "blurrr-thumbnail-img-bucket";
    public static final String VIDEO_BUCKET = "blurrr-img-bucket";
    public static final String THUMBNAIL = "_thumbnail";
    public static final String THUMBNAIL_EXTENSION = ".jpg";

    // Utility 관련 URI
    public static final String[] UTILITY_URI = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.index.html",
            "/webjars/**",
            "/swagger-resources/**",
            "/h2-console/**",
            "/health"
    };

    // 회원가입 관련 URI
    public static final String SIGN_UP_URI = "/v1/auth/**";

    // 공용 URI
    public static final String[] GUEST_URI = {
            "/v1/leagues/ranking",
            "/v1/hot",
            "/v1/mycar",
            "/v1/today/mycar",
            "/v1/dashcam",
            "/v1/channels",
            "/v1/channels/*",
            "/v1/channels/search",
            "/v1/channels/*/boards",
            "/v1/channels/*/boards/*",
            "/v1/channels/board/*/votes"
    };

    // 리그 URI
    public static final String[] GUEST_URI_OF_LEAGUE = {
            "/v1/leagues",
            "/v1/leagues/search",
            "/v1/leagues/*/boards",
            "/v1/leagues/*/boards/search"
    };

    // 차량 미인증 허용 URI (회원가입 O)
    public static final String[] BASIC_USER_URI = {
            "/v1/alarm/**",
            "/v1/members/**",
            "/v1/boards/*/comments",
            "/v1/channels/check/tags/*",
            "/v1/leagues/check/*"
    };

    // 차량 인증 허용 URI (회원가입 O)
    public static final String[] AUTH_USER_URI = {
            "/v1/leagues/members",
            "/v1/leagues/likes/**",
            "/v1/leagues/*/boards/*/comments",
            "/v1/leagues/*/boards/*/comments/*",
            "/v1/leagues/boards/*",
            "/v1/leagues/boards/*/comments",
            "/v1/leagues/boards/*/likes",
            "/v1/leagues/*/mentions",
    };


}

