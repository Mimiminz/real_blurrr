package com.luckvicky.blur.domain.vote.controller;

import com.luckvicky.blur.domain.vote.model.dto.VoteResultDto;
import com.luckvicky.blur.domain.vote.service.VoteService;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.security.NullableAuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "투표 API")
@RestController
@RequestMapping("/v1/channels/board/{boardId}/votes")
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;

    @Operation(
            summary = "투표하는 API",
            description = " memberId, boardId, optionId를 받아서 투표하기"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "투표 완료"),
            @ApiResponse(responseCode = "400", description = "이미 투표한 사용자"),
            @ApiResponse(responseCode = "404", description = "존재하지않는 게시물 혹은 옵션")
    })
    @Parameter(name = "optionId", description = "옵션 고유 식별값", in = ParameterIn.PATH)
    @Parameter(name = "boardId", description = "게시물 고유 식별값", in = ParameterIn.PATH)
    @PostMapping("/{optionId}")
    public ResponseEntity<Result<Boolean>> createVote(
            @AuthUser ContextMember contextMember,
            @PathVariable("boardId") UUID boardId,
            @PathVariable("optionId") UUID optionId
    ) {
        return ResponseUtil.created(
                Result.of(voteService.createVote(contextMember.getId(), boardId, optionId))
        );
    }

    @Operation(
            summary = "투표 옵션 확인 API",
            description = "memberId, boardId를 받아서 투표 옵션 확인"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "옵션 반환 성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 게시물 혹은 옵션")
    })
    @Parameter(name = "boardId", description = "게시물 고유 식별값", in = ParameterIn.PATH)
    @GetMapping
    public ResponseEntity<Result<VoteResultDto>> getVote(
            @NullableAuthUser ContextMember contextMember,
            @PathVariable("boardId") UUID boardId
    ) {
        return ResponseUtil.ok(
                Result.of(voteService.getVoteResult(boardId, contextMember))
        );
    }
}
