package com.luckvicky.blur.domain.member.controller;

import com.luckvicky.blur.domain.member.model.dto.req.SignInDto;
import com.luckvicky.blur.domain.member.model.dto.req.SignupDto;
import com.luckvicky.blur.domain.member.service.MemberService;
import com.luckvicky.blur.global.jwt.model.JwtDto;
import com.luckvicky.blur.global.jwt.model.ReissueDto;
import com.luckvicky.blur.infra.aws.service.S3ImageService;
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
    private final S3ImageService s3ImageService;

    public AuthController(MemberService memberService, S3ImageService s3ImageService) {
        this.memberService = memberService;
        this.s3ImageService = s3ImageService;
    }

    @PostMapping("/signup")
    public ResponseEntity<Boolean> createMember(@Valid @RequestBody SignupDto signupDto) {
        memberService.createMember(signupDto);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody SignInDto signInDto) {
        return ResponseEntity.ok(memberService.login(signInDto));
    }

    @Operation(description = "토큰 재발급")
    @PostMapping("/reissue")
    public ResponseEntity<JwtDto> tokenReissue(@RequestBody ReissueDto reissue) {
        return ResponseEntity.ok(memberService.reissueToken(reissue));
    }

    @GetMapping("/aws/test")
    public ResponseEntity<Map<String, String>> test(
            @RequestParam(name = "fileName")
            @Schema(description = "확장자명을 포함해주세요")
            String fileName) {
        return ResponseEntity.ok(s3ImageService.getPresignedUrl("images", fileName));
    }

}
