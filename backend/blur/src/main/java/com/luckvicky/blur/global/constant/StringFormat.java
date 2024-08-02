package com.luckvicky.blur.global.constant;

public class StringFormat {

    public static final String BLANK = " ";
    public static final String JWT = "JWT";
    public static final String AUTH = "Auth";
    public static final String NO_AUTH = "No Auth";

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

    // 허용 URI
    public static final String[] PERMIT_ALL_URI = {
            "/h2-console/**",
            "/v1/auth/**",
            "/health"
    };

    // 일반 회원 허용 URI
    public static final String[] GENERAL_USER_URI = {
            "/v1/channels/hot",
            "/v1/channels/mycar",
            "/v1/channels/today/mycar",
            "/v1/channels/dashcam",
            "/v1/leagues/ranking",
            "/v1/leagues/brands",
            "/v1/leagues/brands/*/boards",
            "/v1/leagues/*/boards/search",
            "/v1/channels",
            "/v1/channels/search",
            "/v1/channels/*",
            "/v1/channels/*/boards",
            "/v1/channels/*/boards/*",
            "/v1/alarm/**",
            "/v1/members/**"
    };

    // 차량 미인증 허용 URI
    public static final String[] BASIC_USER_URI = {
    };

    // 차량 인증 허용 URI
    public static final String[] AUTH_USER_URI = {

    };

    // Swagger 관련 URI
    public static final String[] SWAGGER_URI = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.index.html",
            "/webjars/**",
            "/swagger-resources/**"
    };

    // Swagger 관련 URI
    public static final String[] SWAGGER_EXCLUDE_METHOD_NAME = {
            "createLeagueBoard",
            "createLeague",
            "createBoard",
    };
}

