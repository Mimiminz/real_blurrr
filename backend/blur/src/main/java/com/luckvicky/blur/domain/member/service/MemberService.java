package com.luckvicky.blur.domain.member.service;

import com.luckvicky.blur.domain.member.model.dto.req.CarInfo;
import com.luckvicky.blur.domain.member.model.dto.req.ChangeFindPassword;
import com.luckvicky.blur.domain.member.model.dto.req.ChangePassword;
import com.luckvicky.blur.domain.member.model.dto.req.CheckPassword;
import com.luckvicky.blur.domain.member.model.dto.req.EmailAuth;
import com.luckvicky.blur.domain.member.model.dto.req.MemberProfileUpdate;
import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfileUpdateResp;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.model.ReissueDto;
import java.net.MalformedURLException;
import java.util.UUID;

public interface MemberService {
    UUID createMember(SignupDto signupDto);
    JwtDto login(SignInDto signInDto);
    MemberProfile findMember(UUID memberId);
    MemberProfileUpdateResp modifyMember(UUID memberId, MemberProfileUpdate updateInfo) throws MalformedURLException;
    boolean modifyPassword(ChangePassword changePassword, UUID memberId);
    boolean modifyPassword(ChangeFindPassword changeFindPassword);
    boolean checkPassword(UUID memberId, CheckPassword checkPassword);
    void logout(UUID memberId);
    boolean addCarInfo(CarInfo carInfo, UUID memberId);
    void createDefaultChannel(UUID memberId);
}
