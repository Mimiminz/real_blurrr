package com.luckvicky.blur.domain.member.strategy;

import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.model.entity.Role;
import com.luckvicky.blur.global.util.UuidUtil;
import org.springframework.test.util.ReflectionTestUtils;

public class MemberFactory {

    public static final String NICKNAME = "nickname";
    public static final String PASSWORD = "password";
    public static final String EMAIL = "email@example.com";
    public static final String PROFILE_URL = "profile_url";
    public static final String CAR_MODEL = "GV70";
    public static final String CAR_MANUFACTURE = "제네시스";

    public static Member createMember() {

        Member member = Member.builder()
                .profileUrl(PROFILE_URL)
                .nickname(NICKNAME)
                .password(PASSWORD)
                .email(EMAIL)
                .isAuth(true)
                .carModel(CAR_MODEL)
                .carManufacture(CAR_MANUFACTURE)
                .role(Role.ROLE_AUTH_USER)
                .carShow(true)
                .carTitle(CAR_MODEL)
                .build();

        ReflectionTestUtils.setField(member, "id", UuidUtil.createSequentialUUID());

        return member;

    }

}
