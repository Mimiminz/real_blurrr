package com.luckvicky.blur.global.interceptor;

import static com.luckvicky.blur.global.constant.StringFormat.LEAGUE_TYPE_BRAND;
import static com.luckvicky.blur.global.constant.StringFormat.LEAGUE_TYPE_MODEL;

import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import com.luckvicky.blur.domain.member.model.entity.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;

public class LeagueInterceptor implements HandlerInterceptor {

    private static final Map<String, String> REQUIRED_ROLES = new HashMap<>();

    static {
        REQUIRED_ROLES.put(LeagueType.MODEL.getValue(), Role.ROLE_AUTH_USER.getValue());
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String leagueType = request.getParameter("leagueType");

        if (Objects.isNull(leagueType)) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN);
            return false;
        }

        switch (leagueType) {

            case LEAGUE_TYPE_MODEL -> {

                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                if (Objects.isNull(authentication)) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
                    return false;
                }

                if (!isAccessible(authentication, leagueType)) {
                    response.sendError(HttpServletResponse.SC_FORBIDDEN);
                    return false;
                }
            }
        }

        return true;

    }

    private boolean isAccessible(Authentication authentication, String leagueType) {

        return authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority ->
                        grantedAuthority.getAuthority()
                                .equals(REQUIRED_ROLES.get(leagueType))
                );

    }

}
