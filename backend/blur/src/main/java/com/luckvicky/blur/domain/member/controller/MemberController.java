package com.luckvicky.blur.domain.member.controller;

import com.luckvicky.blur.domain.member.model.dto.req.MemberProfileUpdate;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.service.MemberService;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.security.AuthUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.MalformedURLException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "유저 API")
@RestController
@RequestMapping("/v1/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @Operation(description = "사용자 정보 조회")
    @GetMapping("")
    public ResponseEntity<MemberProfile> findMember(@AuthUser ContextMember member) {
        return ResponseEntity.ok(memberService.findMember(member.getId()));
    }

    @Operation(description = "정보 수정")
    @PutMapping("")
    public ResponseEntity<MemberProfile> modifyMember(@AuthUser ContextMember member,
                                                      @Valid @RequestBody MemberProfileUpdate update)
            throws MalformedURLException {
        return ResponseEntity.ok(memberService.modifyMember(member.getId(), update));
    }
}
