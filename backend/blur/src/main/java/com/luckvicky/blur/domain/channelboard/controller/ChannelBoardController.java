package com.luckvicky.blur.domain.channelboard.controller;

import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.response.BoardDetailResponse;
import com.luckvicky.blur.domain.board.service.BoardService;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDetailDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.request.ChannelBoardCreateRequest;
import com.luckvicky.blur.domain.channelboard.model.dto.response.ChannelBoardDetailResponse;
import com.luckvicky.blur.domain.channelboard.model.dto.response.ChannelBoardListResponse;
import com.luckvicky.blur.domain.channelboard.service.ChannelBoardService;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
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
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Tag(name = "채널 게시글 API")
@RestController
@RequestMapping("/v1/channels/{channelId}/boards")
@RequiredArgsConstructor
public class ChannelBoardController {

    private final ChannelBoardService channelBoardService;

    @Operation(summary = "채널 게시글 생성 API")
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
    @Parameter(name = "channelId", description = "채널 고유 식별값", in = ParameterIn.PATH)
    @PostMapping
    public ResponseEntity createChannelBoard(
            @PathVariable(name = "channelId") UUID channelId,
            @Valid @RequestBody ChannelBoardCreateRequest request,
            @AuthUser ContextMember contextMember
            ) {
        ChannelBoardDetailDto createdBoard = channelBoardService.createChannelBoard(channelId, request,contextMember.getId());
        return ResponseUtil.created(
                Result.<ChannelBoardDetailDto>builder()
                        .data(createdBoard)
                        .build()
        );
    }


    @Operation(
            summary = "채널 게시글 목록 조회 API",
            description = "채널에 대한 게시물 목록을 가져온다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "게시물 목록 조회 성공",
                    content = @Content(schema = @Schema(implementation = ChannelBoardListResponse.class))
            ),
            @ApiResponse(
                    responseCode = "201",
                    description = "게시물 목록 조회 성공 (단, 게시글 없음)"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "게시물 목록 조회 실패"
            )
    })
    @Parameters({
            @Parameter(name = "channelId", description = "채널 고유 식별값", in = ParameterIn.PATH),
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
    @GetMapping
    public ResponseEntity getChannelBoard(
            @PathVariable(name = "channelId")UUID channelId,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ){
        List<ChannelBoardListDto> channelBoardListDtos = channelBoardService.getChannelBoards(
                channelId,
                pageNumber,
                criteria
        );

        if (Objects.isNull(channelBoardListDtos) || channelBoardListDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder().build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(ChannelBoardListResponse.of(channelBoardListDtos))
                        .build()
        );
    }

    @Operation(
            summary = "채널 게시글 상세 조회 API",
            description = "특정 게시글에 대한 본문, 조회수, 댓글을 조회한다."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료",
                    content = @Content(schema = @Schema(implementation = ChannelBoardDetailResponse.class))
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

        ChannelBoardDetailDto boardDetail = channelBoardService.getBoardDetail(boardId);

        return ResponseUtil.ok(
                Result.builder()
                        .data(ChannelBoardDetailResponse.of(boardDetail))
                        .build()
        );

    }

}
