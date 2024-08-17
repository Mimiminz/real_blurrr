package com.luckvicky.blur.domain.leaguemember.controller;

import com.luckvicky.blur.domain.leaguemember.model.dto.response.LeagueMemberListResponse;
import com.luckvicky.blur.domain.leaguemember.service.LeagueMemberService;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.security.CertificationMember;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "리그 API")
@RestController
@RequestMapping("/v1/leagues")
@RequiredArgsConstructor
public class LeagueMemberController {

    private final LeagueMemberService leagueMemberService;

    @Operation(summary = "사용자 참여 리그 조회 API", description = "사용자가 참여한 리그 목록을 조회한다.")
    @CertificationMember
    @GetMapping("/members")
    public ResponseEntity<Result<LeagueMemberListResponse>> getLeague(
            @AuthUser ContextMember member
    ) {

        LeagueMemberListResponse response = leagueMemberService.findLeagueMemberByMember(member.getId());

        if (Objects.isNull(response.leagueMembers()) || response.leagueMembers().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(response));

    }

}
