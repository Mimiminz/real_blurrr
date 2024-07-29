package com.luckvicky.blur.domain.member.controller;

import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.service.MemberService;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.model.ReissueDto;
import com.luckvicky.blur.infra.aws.service.S3ImageService;
import com.luckvicky.blur.infra.mail.service.AmazonSMTPService;
import com.luckvicky.blur.infra.mail.service.MailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "로그인, 회원가입 API")
@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    private final MemberService memberService;
    private final MailService mailService;
    private final AmazonSMTPService amazonSMTPService;

    public AuthController(MemberService memberService, MailService mailService,
                          AmazonSMTPService amazonSMTPService) {
        this.memberService = memberService;
        this.mailService = mailService;
        this.amazonSMTPService = amazonSMTPService;
    }

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<Boolean> createMember(@Valid @RequestBody SignupDto signupDto) {
        memberService.createMember(signupDto);
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
        return ResponseEntity.ok(memberService.reissueToken(reissue));
    }

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
    @GetMapping("/email/{email}")
    public ResponseEntity<Boolean> createEmailAuth(@RequestParam String email) {
        return ResponseEntity.ok(memberService.authEmail(email));
    }

}
