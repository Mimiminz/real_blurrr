package com.luckvicky.blur.domain.leagueboard.controller;

import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateDto;
import com.luckvicky.blur.domain.leagueboard.service.LeagueBoardService;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "게시글 API")
@RestController
@RequestMapping("/boards")
@RequiredArgsConstructor
public class LeagueBoardController {

    private final LeagueBoardService leagueBoardService;

    @Operation(summary = "리그 게시글 생성 API")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "게시글 생성 성공"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "게시글 생성 실패"
            )
    })
    @Parameter(name = "leagueId", description = "리그 고유 식별값")
    @PostMapping("/leagues/{leagueId}")
    public ResponseEntity createLeagueBoard(
            @PathVariable(name = "leagueId") UUID leagueId,
            @RequestBody LeagueBoardCreateDto request
    ) {
        return ResponseUtil.created(
                Result.builder()
                        .data(leagueBoardService.createLeagueBoard(leagueId ,request))
                        .build()
        );

    }

}
