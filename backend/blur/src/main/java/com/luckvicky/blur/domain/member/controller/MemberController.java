package com.luckvicky.blur.domain.member.controller;

import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.global.security.AuthUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "유저 API")
@RestController
@RequestMapping("/v1/members")
public class MemberController {
    
    @Operation(description = "사용자 정보 조회")
    @GetMapping("")
    public ResponseEntity findMember(@AuthUser Member member) {
        log.info(member.getEmail());
        return null;
    }
}
