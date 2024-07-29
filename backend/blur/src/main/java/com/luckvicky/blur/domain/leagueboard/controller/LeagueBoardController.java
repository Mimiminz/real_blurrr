package com.luckvicky.blur.domain.leagueboard.controller;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardListResponse;
import com.luckvicky.blur.domain.leagueboard.service.LeagueBoardService;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
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
    @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH)
    @PostMapping("/{leagueId}/boards")
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
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "pageNumber", description = "페이지 번호"),
            @Parameter(
                    name = "criteria",
                    description = "정렬 기준",
                    examples = {
                            @ExampleObject(name = "최신", value = "TIME"),
                            @ExampleObject(name = "좋아요", value = "LIKE"),
                            @ExampleObject(name = "조회수", value = "VIEW"),
                            @ExampleObject(name = "댓글", value = "COMMENT"),
                    }
            ),
    })
    @GetMapping("/{leagueId}/boards")
    public ResponseEntity getLeagueBoards(
            @PathVariable(name = "leagueId") UUID leagueId,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        List<BoardDto> boardDtos = leagueBoardService.getLeagueBoards(
                leagueId,
                pageNumber,
                criteria
        );

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

    @Operation(summary = "리그 게시글 상세 조회 API")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 조회 성공",
                    content = @Content(schema = @Schema(implementation = LeagueBoardDetailResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글"
            )
    })
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/boards/{boardId}")
    public ResponseEntity getLeagueBoardDetail(@PathVariable(name = "boardId") UUID boardId) {

        return ResponseUtil.ok(
                Result.builder()
                        .data(LeagueBoardDetailResponse.of(leagueBoardService.getLeagueBoardDetail(boardId)))
                        .build()
        );

    }

    @Operation(
            summary = "특정 리그 게시글 검색 API",
            description = "특정 리그에 대한 게시물에 대하여 검색한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 검색 성공",
                    content = @Content(schema = @Schema(implementation = LeagueBoardListResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "게시글 검색 (단, 데이터 없음)"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "유효하지 않은 검색 조건"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 리그"
            )
    })
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(
                    name = "condition",
                    description = "검색 조건",
                    examples = {
                            @ExampleObject(name = "제목", value = "TITLE"),
                            @ExampleObject(name = "본문", value = "CONTENT"),
                            @ExampleObject(name = "작성자", value = "NICKNAME"),
                    }
            ),
            @Parameter(name = "pageNumber", description = "페이지 번호"),
            @Parameter(
                    name = "criteria",
                    description = "정렬 기준",
                    examples = {
                            @ExampleObject(name = "최신", value = "TIME"),
                            @ExampleObject(name = "좋아요", value = "LIKE"),
                            @ExampleObject(name = "조회수", value = "VIEW"),
                            @ExampleObject(name = "댓글", value = "COMMENT"),
                    }
            ),
    })
    @GetMapping("/{leagueId}/boards/search")
    public ResponseEntity search(
            @PathVariable("leagueId") UUID leagueId,
            @RequestParam(value = "keyword") String keyword,
            @RequestParam(required = false, defaultValue = "TITLE", value = "condition") String condition,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        List<BoardDto> boardDtos = leagueBoardService.search(leagueId, keyword, condition, pageNumber, criteria);

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