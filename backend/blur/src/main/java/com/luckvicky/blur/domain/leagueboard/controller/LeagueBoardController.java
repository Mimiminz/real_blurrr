package com.luckvicky.blur.domain.leagueboard.controller;

import com.luckvicky.blur.domain.comment.model.dto.response.CommentListResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardCreateResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardResponse;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueMentionListResponse;
import com.luckvicky.blur.domain.leagueboard.service.LeagueBoardService;
import com.luckvicky.blur.domain.leagueboard.service.LeagueCommentService;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.security.CertificationMember;
import com.luckvicky.blur.global.security.NullableAuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(
                    name = "leagueType", description = "리그 유형",
                    examples = {
                            @ExampleObject(name = "브랜드", value = "BRAND"),
                            @ExampleObject(name = "모델", value = "MODEL")
                    }
            )
    })
    @CertificationMember
    @PostMapping("/{leagueId}/boards")
    public ResponseEntity<Result<LeagueBoardCreateResponse>> createLeagueBoard(
            @AuthUser ContextMember member,
            @PathVariable(name = "leagueId") UUID leagueId,
            @RequestParam(defaultValue = "BRAND", value = "leagueType") String leagueType,
            @RequestBody @Valid LeagueBoardCreateRequest request
    ) {

        return ResponseUtil.created(
                Result.of(
                        leagueBoardService.createLeagueBoard(member.getId(), leagueId, leagueType, request)
                )
        );

    }

    @Operation(summary = "리그 게시글 목록 조회 API", description = "리그에 대한 게시글 목록을 가져온다.")
    @Parameters({
            @Parameter(name = "leagueId", description = "리그 고유 식별값", in = ParameterIn.PATH),
            @Parameter(
                    name = "leagueType", description = "리그 유형",
                    examples = {
                            @ExampleObject(name = "브랜드", value = "BRAND"),
                            @ExampleObject(name = "모델", value = "MODEL")
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
    public ResponseEntity<Result<PaginatedResponse<LeagueBoardResponse>>> getLeagueBoards(
            @PathVariable(name = "leagueId") UUID leagueId,
            @NullableAuthUser ContextMember contextMember,
            @RequestParam(defaultValue = "BRAND", value = "leagueType") String leagueType,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        PaginatedResponse<LeagueBoardResponse> response = leagueBoardService.getLeagueBoards(
                contextMember,
                leagueId,
                leagueType,
                pageNumber,
                criteria
        );

        if (Objects.isNull(response.getContent()) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(response));

    }

    @Operation(summary = "멘션 리그 게시글 목록 조회 API", description = "리그가 멘션된 채널 게시글 목록을 가져온다.")
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
    public ResponseEntity<Result<PaginatedResponse<LeagueMentionListResponse>>> getModelLeagueBoards(
            @PathVariable(name = "leagueId") UUID leagueId,
            @AuthUser ContextMember member,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        PaginatedResponse<LeagueMentionListResponse> response = leagueBoardService.getMentionLeagueBoards(
                leagueId,
                member.getId(),
                pageNumber,
                criteria
        );

        if (Objects.isNull(response.getContent()) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(response));

    }

    @Operation(summary = "리그 게시글 상세 조회 API", description = "리그 게시물에 대한 정보를 가져온다.")
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @CertificationMember
    @GetMapping("/boards/{boardId}")
    public ResponseEntity<Result<LeagueBoardDetailResponse>> getLeagueBoardDetail(
            @AuthUser ContextMember member,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        LeagueBoardDetailResponse response = leagueBoardService.getLeagueBoardDetail(member.getId(), boardId);

        return ResponseUtil.ok(
                Result.of(response)
        );

    }

    @Operation(summary = "리그 게시글 댓글 목록 조회 API", description = "리그 게시물의 댓글 목록을 가져온다.")
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @CertificationMember
    @GetMapping("/{leagueId}/boards/{boardId}/comments")
    public ResponseEntity<Result<CommentListResponse>> getLeagueBoardComments(
            @AuthUser ContextMember member,
            @PathVariable(name = "leagueId") UUID leagueId,
            @PathVariable(name = "boardId") UUID boardId
    ) {

        CommentListResponse response =
                leagueCommentService.findCommentsByLeagueBoard(member.getId(), leagueId, boardId);

        if (Objects.isNull(response.comments()) || response.comments().isEmpty()) {
            return ResponseUtil.noContent(
                    Result.empty()
            );
        }

        return ResponseUtil.ok(Result.of(response));

    }

}