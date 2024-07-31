package com.luckvicky.blur.domain.board.controller;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.HotBoardDto;
import com.luckvicky.blur.domain.board.model.dto.HotDashcamDto;
import com.luckvicky.blur.domain.board.model.dto.response.TodayMyCarResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.MyCarDto;
import com.luckvicky.blur.domain.board.model.dto.response.BoardDetailResponse;
import com.luckvicky.blur.domain.board.model.dto.response.HotBoardResponse;
import com.luckvicky.blur.domain.board.model.dto.response.HotDashcamResponse;
import com.luckvicky.blur.domain.board.model.dto.response.HotMyCarResponse;
import com.luckvicky.blur.domain.board.model.dto.response.MemberBoardListResponse;
import com.luckvicky.blur.domain.board.service.BoardService;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.dto.response.CommentListResponse;
import com.luckvicky.blur.domain.like.model.response.LikeBoardListResponse;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import com.luckvicky.blur.infra.swagger.NoAuthorization;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "게시글 API")
@RestController
@RequestMapping("/v1/boards")
@RequiredArgsConstructor
public class BoardRetrieveController {

    private final BoardService boardService;

    @Operation(
            summary = "좋아요 게시글 조회 API",
            description = "사용자가 좋아요 누른 게시글 목록을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = LikeBoardListResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "사용자 정보 없음"
            )
    })
    @Parameters({
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
    @GetMapping("/likes")
    public ResponseEntity findLikeBoardsByMember(
            @AuthUser ContextMember member,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        List<BoardDto> likeBoards = boardService.findLikeBoardsByMember(
                member.getId(), pageNumber, criteria
        );

        if (Objects.isNull(likeBoards) || likeBoards.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder()
                            .build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(LikeBoardListResponse.of(likeBoards))
                        .build()
        );

    }

    @Operation(
            summary = "작성 게시글 조회 API",
            description = "사용자가 작성한 게시글 목록을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = LikeBoardListResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "사용자 정보 없음"
            )
    })
    @Parameters({
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
    @GetMapping("/members")
    public ResponseEntity findBoardsByMember(
            @AuthUser ContextMember member,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

       List<BoardDto> boards = boardService.findBoardsByMember(
               member.getId(), pageNumber, criteria
       );

        if (Objects.isNull(boards) || boards.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder()
                            .build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(MemberBoardListResponse.of(boards))
                        .build()
        );

    }

    @Operation(
            summary = "게시글 상세 조회 API",
            description = "특정 게시글에 대한 본문, 조회수, 댓글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = BoardDetailResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글"
            )
    })
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/{boardId}")
    public ResponseEntity getBoardDetail(
            @PathVariable(name = "boardId") UUID boardId
    ) {

        BoardDetailDto boardDetail = boardService.getBoardDetail(boardId);

        return ResponseUtil.ok(
                Result.builder()
                        .data(BoardDetailResponse.of(boardDetail))
                        .build()
        );

    }

    @Operation(
            summary = "게시글 댓글 목록 조회 API",
            description = "특정 게시글에 작성된 댓글 목록을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = CommentListResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "존재하지 않는 게시글"
            )
    })
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/{boardId}/comments")
    public ResponseEntity getComments(
            @PathVariable(name = "boardId") UUID boardId
    ) {

        List<CommentDto> boardDetail = boardService.getComments(boardId);

        return ResponseUtil.ok(
                Result.builder()
                        .data(CommentListResponse.of(boardDetail))
                        .build()
        );

    }

    @NoAuthorization
    @Operation(
            summary = "HOT 게시판 조회 API",
            description = "최근 1주일 동안 가장 좋아요를 많이 받은 10개의 게시글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = HotBoardResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            )
    })
    @GetMapping("/hot")
    public ResponseEntity getHotBoard() {

        List<HotBoardDto> boardDtos = boardService.getHotBoard();

        if (Objects.isNull(boardDtos) || boardDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder()
                            .build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(HotBoardResponse.of(boardDtos))
                        .build()
        );

    }

    @NoAuthorization
    @Operation(
            summary = "HOT 블랙박스 게시판 조회 API",
            description = "최근 1주일 동안 가장 투표를 많이 받은 5개의 게시글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = HotDashcamResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            )
    })
    @GetMapping("/dashcam")
    public ResponseEntity getHotDashcamBoard() {

        List<HotDashcamDto> dashcamDtos = boardService.getHotDashcamBoard();

        if (Objects.isNull(dashcamDtos) || dashcamDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder()
                            .build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(HotDashcamResponse.of(dashcamDtos))
                        .build()
        );

    }

    @NoAuthorization
    @Operation(
            summary = "오늘의차 조회 API",
            description = "어제 차자랑 게시글 중 가장 좋아요가 높았던 1개 게시글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = TodayMyCarResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            )
    })
    @GetMapping("/today/mycar")
    public ResponseEntity geTodayMyCarBoard() {

        MyCarDto todayMyCar = boardService.getTodayMyCarBoard();

        if (Objects.isNull(todayMyCar)) {
            return ResponseUtil.noContent(
                    Result.builder()
                            .build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(TodayMyCarResponse.of(todayMyCar))
                        .build()
        );

    }

    @NoAuthorization
    @Operation(
            summary = "HOT 차자랑 게시판 조회 API",
            description = "최근 1주일 동안 가장 조회수가 높은 많이 받은 20개의 게시글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = HotMyCarResponse.class))
            ),
            @ApiResponse(
                    responseCode = "204",
                    description = "조회 완료 (단, 데이터 없음)"
            )
    })
    @GetMapping("/mycar")
    public ResponseEntity getHotMyCarBoard() {

        List<MyCarDto> mycarDtos = boardService.getHotMyCarBoard();

        if (Objects.isNull(mycarDtos) || mycarDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder()
                            .build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(HotMyCarResponse.of(mycarDtos))
                        .build()
        );

    }

}
