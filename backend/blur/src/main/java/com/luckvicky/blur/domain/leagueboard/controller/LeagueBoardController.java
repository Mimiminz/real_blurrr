package com.luckvicky.blur.domain.leagueboard.controller;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardListResponse;
import com.luckvicky.blur.domain.leagueboard.service.LeagueBoardService;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "게시글 API")
@RestController
@RequestMapping("/v1/boards")
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
            @RequestBody LeagueBoardCreateRequest request
    ) {
        return ResponseUtil.created(
                Result.builder()
                        .data(leagueBoardService.createLeagueBoard(leagueId ,request))
                        .build()
        );

    }

    @Operation(
            summary = "특정 리그 게시글 목록 조회 API",
            description = "특정 리그에 대한 게시물 목록을 가져온다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = LeagueBoardListResponse.class))
            ),
            @ApiResponse(
                    responseCode = "201",
                    description = "게시글 목록 조회 성공 (단, 게시글 없음)"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "게시글 목록 조회 실패"
            )
    })
    @Parameter(name = "leagueId", description = "리그 고유 식별값")
    @GetMapping("/legues/{leagueId}")
    public ResponseEntity getLeagueBoard(
            @PathVariable(name = "leagueId") UUID leagueId
    ) {

        List<BoardDto> boardDtos = leagueBoardService.getLeagueBoard(leagueId);

        if (Objects.isNull(boardDtos) || boardDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder().build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(LeagueBoardListResponse.of(boardDtos))
                        .build()
        );

    }

}
