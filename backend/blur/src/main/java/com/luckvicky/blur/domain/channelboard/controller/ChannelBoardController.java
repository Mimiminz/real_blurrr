package com.luckvicky.blur.domain.channelboard.controller;

import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardListDto;
import com.luckvicky.blur.domain.channelboard.model.dto.response.ChannelBoardListResponse;
import com.luckvicky.blur.domain.channelboard.service.ChannelBoardService;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardListResponse;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Tag(name = "채널 게시글 API")
@RestController
@RequestMapping("/v1/channels/{channelId}/boards")
@RequiredArgsConstructor
public class ChannelBoardController {

    private final ChannelBoardService channelBoardService;

    @Operation(
            summary = "특정 채널 게시글 목록 조회 API",
            description = "특정 채널에 대한 게시물 목록을 가져온다."
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
    @Parameter(name = "channelId", description = "채널 고유 식별값", in = ParameterIn.PATH)
    @GetMapping
    public ResponseEntity getChannelBoard(@PathVariable(name = "channelId")UUID channelId){
        List<ChannelBoardListDto> channelBoardListDtos = channelBoardService.getChannelBoards(channelId);

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
}
