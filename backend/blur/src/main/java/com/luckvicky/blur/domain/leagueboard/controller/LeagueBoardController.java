package com.luckvicky.blur.domain.leagueboard.controller;

import static com.luckvicky.blur.global.constant.ErrorMessage.FAIL_TO_CREATE_LIKE_MESSAGE;
import static com.luckvicky.blur.global.constant.ErrorMessage.NOT_ALLOCATED_LEAGUE_MESSAGE;
import static com.luckvicky.blur.global.constant.ErrorMessage.NOT_EXIST_BOARD_MESSAGE;
import static com.luckvicky.blur.global.constant.ErrorMessage.NOT_EXIST_MEMBER_MESSAGE;
import static com.luckvicky.blur.global.constant.ErrorMessage.UNAUTHORIZED_ACCESS_MESSAGE;
import static com.luckvicky.blur.global.constant.Number.ZERO;
import static com.luckvicky.blur.global.constant.StringFormat.LEAGUE_TYPE_BRAND;
import static com.luckvicky.blur.global.constant.StringFormat.LEAGUE_TYPE_MODEL;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDto;
import com.luckvicky.blur.domain.comment.model.dto.response.CommentListResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardCreateResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardListResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.MentionLeagueListResponse;
import com.luckvicky.blur.domain.leagueboard.service.LeagueBoardService;
import com.luckvicky.blur.domain.leagueboard.service.LeagueCommentService;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardLikeResponse;
import com.luckvicky.blur.global.constant.ErrorMessage;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.security.CertificationMember;
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

@Tag(name = "리그 게시글 API")
@RestController
@RequestMapping("/v1/leagues")
@RequiredArgsConstructor
public class LeagueBoardController {

    private final LeagueBoardService leagueBoardService;
    private final LeagueCommentService leagueCommentService;

    @Operation(summary = "리그 게시글 생성 API")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201", description = "게시글 생성 성공",
                    content = @Content(schema = @Schema(implementation = LeagueBoardCreateResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = ErrorMessage.UNAUTHORIZED_ACCESS_MESSAGE),
            @ApiResponse(responseCode = "403", description = ErrorMessage.NOT_ALLOCATED_LEAGUE_MESSAGE),
            @ApiResponse(responseCode = "404", description = ErrorMessage.FAIL_TO_CREATE_BOARD_MESSAGE)
    })
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(
                    name = "leagueType", description = "리그 유형",
                    examples = {
                            @ExampleObject(name = "브랜드", value = LEAGUE_TYPE_BRAND),
                            @ExampleObject(name = "모델", value = LEAGUE_TYPE_MODEL)
                    }
            )
    })
    @CertificationMember
    @PostMapping("/{leagueId}/boards")
    public ResponseEntity createLeagueBoard(
            @AuthUser ContextMember member,
            @PathVariable(name = "leagueId") UUID leagueId,
            @RequestParam(defaultValue = "BRAND", value = "leagueType") String leagueType,
            @RequestBody LeagueBoardCreateRequest request
    ) {
        return ResponseUtil.created(
                Result.builder()
                        .data(
                                LeagueBoardCreateResponse.of(
                                        leagueBoardService.createLeagueBoard(
                                                member.getId(),
                                                leagueId,
                                                leagueType,
                                                request
                                        )
                                )
                        )
                        .build()
        );

    }

    @Operation(
            summary = "리그 게시글 목록 조회 API",
            description = "리그에 대한 게시글 목록을 가져온다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200", description = "게시글 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = LeagueBoardListResponse.class))
            ),
            @ApiResponse(responseCode = "201", description = "게시글 목록 조회 성공 (단, 게시글 없음)"),
            @ApiResponse(responseCode = "401", description = ErrorMessage.UNAUTHORIZED_ACCESS_MESSAGE),
            @ApiResponse(responseCode = "403", description = ErrorMessage.NOT_ALLOCATED_LEAGUE_MESSAGE),
            @ApiResponse(responseCode = "404", description = ErrorMessage.NOT_EXIST_LEAGUE_MESSAGE)
    })
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(
                    name = "leagueType", description = "리그 유형",
                    examples = {
                            @ExampleObject(name = "브랜드", value = LEAGUE_TYPE_BRAND),
                            @ExampleObject(name = "모델", value = LEAGUE_TYPE_MODEL)
                    }
            ),
            @Parameter(name = "pageNumber", description = "페이지 번호"),
            @Parameter(
                    name = "criteria", description = "정렬 기준",
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
            @RequestParam(defaultValue = "BRAND", value = "leagueType") String leagueType,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        List<BoardDto> boardDtos = leagueBoardService.getLeagueBoards(
                leagueId,
                leagueType,
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

    @Operation(
            summary = "멘션 리그 게시글 목록 조회 API",
            description = "리그가 멘션된 채널 게시글 목록을 가져온다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = MentionLeagueListResponse.class))
            ),
            @ApiResponse(
                    responseCode = "201",
                    description = "게시글 목록 조회 성공 (단, 게시글 없음)"
            ),
            @ApiResponse(responseCode = "401", description = ErrorMessage.UNAUTHORIZED_ACCESS_MESSAGE),
            @ApiResponse(responseCode = "403", description = ErrorMessage.NOT_ALLOCATED_LEAGUE_MESSAGE),
            @ApiResponse(responseCode = "404", description = "게시글 목록 조회 실패")
    })
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(name = "pageNumber", description = "페이지 번호"),
            @Parameter(
                    name = "criteria", description = "정렬 기준",
                    examples = {
                            @ExampleObject(name = "최신", value = "TIME"),
                            @ExampleObject(name = "좋아요", value = "LIKE"),
                            @ExampleObject(name = "조회수", value = "VIEW"),
                            @ExampleObject(name = "댓글", value = "COMMENT"),
                    }
            ),
    })
    @CertificationMember
    @GetMapping("/{leagueId}/mentions")
    public ResponseEntity getModelLeagueBoards(
            @PathVariable(name = "leagueId") UUID leagueId,
            @AuthUser ContextMember member,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        List<ChannelBoardDto> channelBoards = leagueBoardService.getMentionLeagueBoards(
                leagueId,
                member.getId(),
                pageNumber,
                criteria
        );

        if (Objects.isNull(channelBoards) || channelBoards.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder().build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(MentionLeagueListResponse.of(channelBoards))
                        .build()
        );

    }

    @Operation(
            summary = "리그 게시글 상세 조회 API",
            description = "리그 게시물에 대한 정보를 가져온다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200", description = "게시글 조회 성공",
                    content = @Content(schema = @Schema(implementation = LeagueBoardDetailResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = ErrorMessage.UNAUTHORIZED_ACCESS_MESSAGE),
            @ApiResponse(responseCode = "403", description = ErrorMessage.NOT_ALLOCATED_LEAGUE_MESSAGE),
            @ApiResponse(responseCode = "404", description = ErrorMessage.NOT_EXIST_BOARD_MESSAGE)
    })
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @CertificationMember
    @GetMapping("/boards/{boardId}")
    public ResponseEntity getLeagueBoardDetail(
            @AuthUser ContextMember member,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        return ResponseUtil.ok(
                Result.builder()
                        .data(leagueBoardService.getLeagueBoardDetail(member.getId(), boardId))
                        .build()
        );

    }

    @Operation(
            summary = "게시글 좋아요 상태 조회",
            description = "사용자, 게시글 고유 식별값을 받아 좋아요 상태를 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200", description = "좋아요 여부 조회 완료",
                    content = @Content(schema = @Schema(implementation = LeagueBoardLikeResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = UNAUTHORIZED_ACCESS_MESSAGE),
            @ApiResponse(responseCode = "403", description = NOT_ALLOCATED_LEAGUE_MESSAGE),
            @ApiResponse(responseCode = "404", description = NOT_EXIST_MEMBER_MESSAGE + "or" + NOT_EXIST_BOARD_MESSAGE),
            @ApiResponse(responseCode = "500", description = FAIL_TO_CREATE_LIKE_MESSAGE)
    })
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/boards/{boardId}/likes")
    public ResponseEntity getLikeStatusByBoard(
            @AuthUser ContextMember member,
            @PathVariable(name = "boardId") UUID boardId
    ) {
        return ResponseUtil.created(
                Result.builder()
                        .data(leagueBoardService.getBoardLike(member.getId(), boardId))
                        .build()
        );
    }

    @Operation(
            summary = "리그 게시글 댓글 목록 조회 API",
            description = "리그 게시물의 댓글 목록을 가져온다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200", description = "댓글 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = CommentListResponse.class))
            ),
            @ApiResponse(responseCode = "204", description = "댓글 목록 조회 성공 (단, 데이터 없음)"),
            @ApiResponse(responseCode = "401", description = ErrorMessage.UNAUTHORIZED_ACCESS_MESSAGE),
            @ApiResponse(responseCode = "403", description = ErrorMessage.NOT_ALLOCATED_LEAGUE_MESSAGE),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 게시글")
    })
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @CertificationMember
    @GetMapping("/{leagueId}/boards/{boardId}/comments")
    public ResponseEntity getLeagueBoardComments(
            @AuthUser ContextMember member,
            @PathVariable(name = "leagueId") UUID leagueId,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        CommentListResponse commentsByLeagueBoard =
                leagueCommentService.findCommentsByLeagueBoard(member.getId(), leagueId, boardId);

        if (commentsByLeagueBoard.comments().isEmpty() || commentsByLeagueBoard.commentCount() == ZERO) {
            return ResponseUtil.noContent(
                    Result.builder().build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(commentsByLeagueBoard)
                        .build()
        );

    }

    @Operation(
            summary = "리그 게시글 검색 API",
            description = "리그에 대한 게시물에 대하여 검색한다."
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
            @ApiResponse(responseCode = "400", description = ErrorMessage.INVALID_SEARCH_CONDITION_MESSAGE),
            @ApiResponse(responseCode = "401", description = ErrorMessage.UNAUTHORIZED_ACCESS_MESSAGE),
            @ApiResponse(responseCode = "403", description = ErrorMessage.NOT_ALLOCATED_LEAGUE_MESSAGE),
            @ApiResponse(responseCode = "404", description = ErrorMessage.NOT_EXIST_LEAGUE_MESSAGE)
    })
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(
                    name = "leagueType",
                    description = "리그 유형",
                    examples = {
                            @ExampleObject(name = "브랜드", value = LEAGUE_TYPE_BRAND),
                            @ExampleObject(name = "모델", value = LEAGUE_TYPE_MODEL)
                    }
            ),
            @Parameter(
                    name = "condition",
                    description = "검색 조건",
                    examples = {
                            @ExampleObject(name = "제목", value = "TITLE"),
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
            @RequestParam(defaultValue = "BRAND", value = "leagueType") String leagueType,
            @RequestParam(value = "keyword") String keyword,
            @RequestParam(required = false, defaultValue = "TITLE", value = "condition") String condition,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        List<BoardDto> boardDtos = leagueBoardService.search(
                leagueId, leagueType, keyword, condition, pageNumber, criteria
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


}