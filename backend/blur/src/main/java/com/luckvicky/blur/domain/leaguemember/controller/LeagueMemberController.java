package com.luckvicky.blur.domain.leaguemember.controller;

import com.luckvicky.blur.domain.leaguemember.model.dto.response.LeagueMemberListResponse;
import com.luckvicky.blur.domain.leaguemember.model.dto.LeagueMemberDto;
import com.luckvicky.blur.domain.leaguemember.service.LeagueMemberService;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "memberId", description = "사용자 고유 식별값", in = ParameterIn.PATH)
    })
    @PostMapping("/{leagueId}/members/{memberId}")
    public ResponseEntity createLeagueMember(
            @PathVariable(name = "leagueId") UUID leagueId,
            @PathVariable(name = "memberId") UUID memberId
    ) {

        return ResponseUtil.created(
                Result.builder()
                        .data(leagueMemberService.createLeagueMember(leagueId, memberId))
                        .build()
        );

    }

    @Operation(
            summary = "사용자 리그 조회 API",
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
    @Parameter(name = "memberId", description = "사용자 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/members/{memberId}")
    public ResponseEntity getLeague(
            @PathVariable(name = "memberId") UUID memberId
    ) {

        List<LeagueMemberDto> leagues = leagueMemberService.findLeagueMemberByMember(memberId);

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
