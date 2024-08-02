package com.luckvicky.blur.domain.member.controller;

import com.luckvicky.blur.domain.member.model.dto.req.ChangePassword;
import com.luckvicky.blur.domain.member.model.dto.req.EmailAuth;
import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.service.MemberService;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.model.ReissueDto;
import com.luckvicky.blur.global.security.GeneralMember;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "로그인, 회원가입 API")
@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    private final MemberService memberService;

    public AuthController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GeneralMember
    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<Boolean> createMember(@Valid @RequestBody SignupDto signupDto) {
        memberService.createMember(signupDto);
        return ResponseEntity.ok(true);
    }

    @GeneralMember
    @Operation(summary = "로그인")
    @PostMapping("/signin")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody SignInDto signInDto) {
        return ResponseEntity.ok(memberService.login(signInDto));
    }

    @GeneralMember
    @Operation(summary = "토큰 재발급")
    @PostMapping("/reissue")
    public ResponseEntity<JwtDto> tokenReissue(@Valid @RequestBody ReissueDto reissue) {
        return ResponseEntity.ok(memberService.reissueToken(reissue));
    }

    @GeneralMember
    @Operation(summary = "닉네임 중복 체크")
    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<Boolean> checkNickName(
            @Schema(description = "닉네임")
            @PathVariable(name = "nickname")
            String nickname) {
        return ResponseEntity.ok(!memberService.checkNickname(nickname));
    }

//    @GetMapping("/aws/test")
//    public ResponseEntity<Map<String, String>> test(
//            @RequestParam(name = "fileName")
//            @Schema(description = "확장자명을 포함해주세요")
//            String fileName) {
//        return ResponseEntity.ok(s3ImageService.getPresignedUrl("images", fileName));
//    }


    @Operation(summary = "이메일 인증번호 생성 API")
    @Parameter(name = "email", example = "teamluckyvickyblurrr@gmail.com")
    @GeneralMember
    @GetMapping("/email/{email}")
    public ResponseEntity<Boolean> createEmailAuth(@PathVariable("email") String email) {
        return ResponseEntity.ok(memberService.createEmailAuthCode(email));
    }

    @GeneralMember
    @Operation(summary = "이메일 인증번호 확인")
    @PostMapping("/email")
    public ResponseEntity<Boolean> validEmailAuth(@Valid @RequestBody EmailAuth emailAuth) {
        return ResponseEntity.ok(memberService.validEmailAuth(emailAuth));
    }

    @GeneralMember
    @Operation(summary = "비밀번호 찾기 이메일 인증 요청")
    @GetMapping("/passwrod/email/{email}")
    public ResponseEntity<Boolean> createPaaswordChangeAuthcode(@PathVariable String email){
        return ResponseEntity.ok(memberService.createPasswordAuthCode(email));
    }

    @GeneralMember
    @Operation(summary = "비밀번호 찾기 이메일 인증 코드 확인")
    @PostMapping("/password/email")
    public ResponseEntity<Boolean> validPasswordAuthCode(@Valid @RequestBody EmailAuth emailAuth) {
        return ResponseEntity.ok(memberService.validPasswordAuthCode(emailAuth));
    }

    @GeneralMember
    @Operation(summary = "비밀번호 변경")
    @PutMapping("/password")
    public ResponseEntity<Boolean> changePassword(@Valid @RequestBody ChangePassword changePassword) {
        return ResponseEntity.ok(memberService.modifyPassword(changePassword));
    }
}
