package com.luckvicky.blur.global.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

    public static String getCookieValue(HttpServletRequest request, String boardId) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for(Cookie cookie : cookies) {
                if(boardId.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

    public static void setCookieValue(HttpServletResponse response, String boardId, String value, int maxAge) {
        Cookie cookie = new Cookie(boardId, value);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }
}
