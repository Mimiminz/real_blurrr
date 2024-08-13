package com.luckvicky.blur.domain.league.controller;

import com.luckvicky.blur.domain.league.model.dto.response.LeagueListResponse;
import com.luckvicky.blur.domain.league.model.dto.response.LeagueRankingResponse;
import com.luckvicky.blur.domain.league.service.LeagueService;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "리그 API")
@RestController
@RequestMapping("/v1/leagues")
@RequiredArgsConstructor
public class LeagueController {

    private final LeagueService leagueService;

    @Operation(summary = "리그 조회 API", description = "리그 목록을 조회한다.")
    @Parameter(
            name = "leagueType", description = "조회할 리그 유형",
            examples = {
                    @ExampleObject(name = "brand", value = "BRAND", description = "브랜드"),
                    @ExampleObject(name = "model", value ="MODEL", description = "모델 ")
            }
    )
    @GetMapping
    public ResponseEntity<Result<LeagueListResponse>> getLeagues(
            @RequestParam(name = "leagueType") String leagueType
    ) {

        LeagueListResponse response = leagueService.getLeagues(leagueType);

        if (Objects.isNull(response.leagues()) || response.leagues().isEmpty()) {
            return ResponseUtil.noContent(
                    Result.empty()
            );
        }

        return ResponseUtil.ok(
                Result.of(response)
        );

    }

    @Operation(summary = "리그 랭킹 조회 API", description = "리그 인원수를 기준으로 내림차순 조회한다.")
    @GetMapping("/ranking")
    public ResponseEntity<Result<LeagueRankingResponse>> getLeagueRanking() {
        return ResponseUtil.ok(
                Result.of(leagueService.getLeagueRanking())
        );
    }

}
