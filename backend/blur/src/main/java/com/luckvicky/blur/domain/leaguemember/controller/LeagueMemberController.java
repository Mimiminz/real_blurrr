package com.luckvicky.blur.domain.leaguemember.controller;

import com.luckvicky.blur.domain.leaguemember.model.dto.request.LeagueMemberCreateRequest;
import com.luckvicky.blur.domain.leaguemember.model.dto.response.LeagueMemberListResponse;
import com.luckvicky.blur.domain.leaguemember.model.dto.LeagueMemberDto;
import com.luckvicky.blur.domain.leaguemember.service.LeagueMemberService;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.security.CertificationMember;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "리그 API")
@RestController
@RequestMapping("/v1/leagues")
@RequiredArgsConstructor
public class LeagueMemberController {

    private final LeagueMemberService leagueMemberService;

    @Operation(
            summary = "사용자 리그 할당 API",
            description = "사용자에게 리그를 할당한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "성공"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "실패"
            )
    })
    @PostMapping("/{leagueId}/members")
    public ResponseEntity createLeagueMember(
            @RequestBody LeagueMemberCreateRequest request,
            @AuthUser ContextMember member
    ) {

        return ResponseUtil.created(
                Result.builder()
                        .data(leagueMemberService.createLeagueMember(request, member.getId()))
                        .build()
        );

    }

    @Operation(
            summary = "사용자 참여 리그 조회 API",
            description = "사용자가 참여한 리그 목록을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "성공",
                    content = @Content(schema = @Schema(implementation = LeagueMemberListResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "성공 (단, 데이터 없음)"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 사용자"
            )
    })
    @CertificationMember
    @GetMapping("/members")
    public ResponseEntity getLeague(
            @AuthUser ContextMember member
    ) {

        List<LeagueMemberDto> leagues = leagueMemberService.findLeagueMemberByMember(member.getId());

        if (Objects.isNull(leagues) || leagues.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder().build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(LeagueMemberListResponse.of(leagues))
                        .build()
        );

    }

}
