package com.luckvicky.blur.domain.league.controller;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.dto.request.LeagueCreateRequest;
import com.luckvicky.blur.domain.league.model.dto.response.LeagueListResponse;
import com.luckvicky.blur.domain.league.service.LeagueService;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "리그 API")
@RestController
@RequestMapping("/v1/leagues")
@RequiredArgsConstructor
public class LeagueController {

    private final LeagueService leagueService;

    @Operation(
            summary = "리그 생성 API",
            description = "리그 이름, 유형을 받아 생성한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "리그 생성 성공"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "리그 생성 실패"
            )
    })
    @PostMapping
    public ResponseEntity createLeague(
            @RequestBody LeagueCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.builder()
                        .data(leagueService.createLeague(request))
                        .build()
        );

    }

    @Operation(
            summary = "리그 유형별 조회 API",
            description = "유형이 일치하는 리그 목록을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료 응답",
                    content = @Content(schema = @Schema(implementation = LeagueListResponse.class))
            )
    })
    @Parameter(
            name = "type",
            description = "조회할 리그 유형",
            examples = {
                    @ExampleObject(name = "brand", value = "BRAND", description = "브랜드"),
                    @ExampleObject(name = "model", value = "MODEL", description = "모델 ")
            }
    )
    @GetMapping
    public ResponseEntity findLeagueByType(
            @RequestParam(name = "type") String type
    ) {

        List<LeagueDto> leagues = leagueService.findLeagueByType(type);

        if (Objects.isNull(leagues) || leagues.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder().build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(LeagueListResponse.of(leagues))
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
                    content = @Content(schema = @Schema(implementation = LeagueDto.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "실패"
            )
    })
    @Parameter(name = "memberId", description = "사용자 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/members/{memberId}")
    public ResponseEntity getLeague(
            @PathVariable(name = "memberId") UUID memberId
    ) {

        List<LeagueDto> leagues = leagueService.getLeague(memberId);

        if (Objects.isNull(leagues) || leagues.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder().build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(leagues)
                        .build()
        );

    }

}
