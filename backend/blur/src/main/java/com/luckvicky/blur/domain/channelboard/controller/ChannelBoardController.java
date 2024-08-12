package com.luckvicky.blur.domain.channelboard.controller;

import static com.luckvicky.blur.global.constant.Number.CHANNEL_BOARD_PAGE_SIZE;

import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardDetailDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.request.ChannelBoardCreateRequest;
import com.luckvicky.blur.domain.channelboard.model.dto.response.ChannelBoardDetailResponse;
import com.luckvicky.blur.domain.channelboard.service.ChannelBoardService;
import com.luckvicky.blur.global.annotation.custom.ValidEnum;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "채널 게시글 API")
@RestController
@RequestMapping("/v1/channels/{channelId}/boards")
@RequiredArgsConstructor
public class ChannelBoardController {

    private final ChannelBoardService channelBoardService;

    @Operation(summary = "채널 게시글 생성 API")
    @Parameter(name = "channelId", description = "채널 고유 식별값", in = ParameterIn.PATH)
    @PostMapping
    public ResponseEntity<Result<ChannelBoardDetailDto>> createChannelBoard(
            @PathVariable(name = "channelId") UUID channelId,
            @Valid @RequestBody ChannelBoardCreateRequest request,
            @AuthUser ContextMember contextMember
            ) {
        ChannelBoardDetailDto createdBoard = channelBoardService.createChannelBoard(channelId, request,contextMember.getId(),
                BoardType.CHANNEL);
        return ResponseUtil.created(
                Result.<ChannelBoardDetailDto>builder()
                        .data(createdBoard)
                        .build()
        );
    }

    @Operation(
            summary = "채널 게시글 목록 검색 조회 API",
            description = "채널에 대한 게시물 목록을 검색한다."
    )
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
    public ResponseEntity<Result<PaginatedResponse<ChannelBoardListDto>>> getChannelBoards(
            @PathVariable(name = "channelId") UUID channelId,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria")
            @ValidEnum(enumClass = SortingCriteria.class) String criteria
    ){
        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);
        Pageable pageable = PageRequest.of(
                pageNumber, CHANNEL_BOARD_PAGE_SIZE,
                Sort.by(Sort.Direction.DESC, sortingCriteria.getCriteria())
        );

        PaginatedResponse<ChannelBoardListDto> response = channelBoardService.getChannelBoards(
                channelId,
                keyword,
                pageable
        );

        if (Objects.isNull(response.getContent()) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(
                    Result.empty()
            );
        }

        return ResponseUtil.ok(
                Result.of(response)
        );
    }

    @Operation(
            summary = "채널 게시글 상세 조회 API",
            description = "특정 게시글에 대한 본문, 조회수를 조회한다. \n 댓글 조회는 '/v1/boards/{boardId}/comments' 활용"
    )
    @Parameter(name = "boardId", description = "게시글 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/{boardId}")
    public ResponseEntity<Result<ChannelBoardDetailResponse>> getBoardDetail(
            @PathVariable(name = "boardId") UUID boardId,
            @NullableAuthUser ContextMember nullableMember
    ) {

        ChannelBoardDetailDto boardDetail = channelBoardService.getBoardDetail(boardId, nullableMember);

        return ResponseUtil.ok(
                Result.of(ChannelBoardDetailResponse.of(boardDetail))
        );

    }

}
