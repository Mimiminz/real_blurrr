package com.luckvicky.blur.domain.leaguemember.controller;

import com.luckvicky.blur.domain.leaguemember.service.LeagueMemberService;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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


}
