package com.luckvicky.blur.domain.member.controller;

import com.luckvicky.blur.domain.channel.service.ChannelService;
import com.luckvicky.blur.domain.member.model.dto.req.ChangeFindPassword;
import com.luckvicky.blur.domain.member.model.dto.req.EmailAuth;
import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.service.AuthService;
import com.luckvicky.blur.domain.member.service.MemberService;
import com.luckvicky.blur.domain.member.strategy.AuthCodeType;
import com.luckvicky.blur.global.annotation.custom.ValidEnum;
import com.luckvicky.blur.infra.jwt.model.JwtDto;
import com.luckvicky.blur.infra.jwt.model.ReissueDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "로그인, 회원가입 API")
@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    private final MemberService memberService;
    private final ChannelService channelService;
    private final AuthService authService;

    public AuthController(MemberService memberService, ChannelService channelService, AuthService authService) {
        this.memberService = memberService;
        this.channelService = channelService;
        this.authService = authService;
    }

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<Boolean> createMember(@Valid @RequestBody SignupDto signupDto) {
        UUID memberId = memberService.createMember(signupDto);
        memberService.createDefaultChannel(memberId);
        return ResponseEntity.ok(true);
    }

    @Operation(summary = "로그인")
    @PostMapping("/signin")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody SignInDto signInDto) {
        return ResponseEntity.ok(memberService.login(signInDto));
    }

    @Operation(summary = "토큰 재발급")
    @PostMapping("/reissue")
    public ResponseEntity<JwtDto> tokenReissue(@Valid @RequestBody ReissueDto reissue) {
        return ResponseEntity.ok(authService.reissueToken(reissue));
    }

    @Operation(summary = "닉네임 중복 체크")
    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<Boolean> checkNickName(
            @Schema(description = "닉네임")
            @PathVariable(name = "nickname")
            String nickname) {
        return ResponseEntity.ok(!authService.checkNickname(nickname));
    }

//    @GetMapping("/aws/test")
//    public ResponseEntity<Map<String, String>> test(
//            @RequestParam(name = "fileName")
//            @Schema(description = "확장자명을 포함해주세요")
//            String fileName) {
//        return ResponseEntity.ok(s3ImageService.getPresignedUrl("images", fileName));
//    }


    @Operation(summary = "비밀번호 변경")
    @PutMapping("/password")
    public ResponseEntity<Boolean> changePassword(@Valid @RequestBody ChangeFindPassword changeFindPassword) {
        return ResponseEntity.ok(memberService.modifyPassword(changeFindPassword));
    }

    @Operation(summary = "이메일 인증 코드 생성", description = "회원가입, 비밀번호 변경 시 등 이메일 인증 시 코드 생성 요청 API")
    @GetMapping("/email/code/{email}")
    public ResponseEntity<Boolean> createEmailAuthCode(
            @PathVariable(name = "email")
            String email,
            @Schema(description = "인증 코드 타입(password_change, signup)")
            @RequestParam(name = "type")
            @ValidEnum(enumClass = AuthCodeType.class, ignoreCase = true)
            String type
    ) {
        return ResponseEntity.ok(authService.createEmailAuthCode(email, AuthCodeType.of(type)));
    }

    @Operation(summary = "이메일 인증 코드 검증", description = "회원가입, 비밀번호 변경 시 등 이메일 인증 시 코드 검증 API")
    @PostMapping("/email/code")
    public ResponseEntity<Boolean> validEmailAuthCode(@Valid @RequestBody EmailAuth emailAuth) {
        return ResponseEntity.ok(authService.validAuthCode(emailAuth, AuthCodeType.of(emailAuth.type())));
    }
}
