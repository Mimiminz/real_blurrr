package com.luckvicky.blur.domain.channel.controller;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.request.ChannelCreateRequest;
import com.luckvicky.blur.domain.channel.model.dto.response.ChannelListResponse;
import com.luckvicky.blur.domain.channel.service.ChannelService;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
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

@Tag(name = "채널 API")
@RestController
@RequestMapping("/v1/channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    @Operation(summary = "채널 생성 API")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "채널 생성 완료 응답",
                    content = @Content(schema = @Schema(implementation = ChannelDto.class))
            )
    })
    @PostMapping
    public ResponseEntity<Result<ChannelDto>> createChannel(
            @Valid @RequestBody ChannelCreateRequest request, @AuthUser ContextMember contextMember) {
        ChannelDto createdChannel = channelService.createChannel(request, contextMember.getId());
        return ResponseUtil.created(
                Result.<ChannelDto>builder()
                        .data(createdChannel)
                        .build()
        );
    }


    @Operation(summary = "전체 채널 목록 조회 API")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "조회 완료 응답",
                    content = @Content(schema = @Schema(implementation = ChannelListResponse.class))

            )
    })
    @GetMapping
    public ResponseEntity getAllChannels() {
        List<ChannelDto> channels = channelService.getAllChannels();

        if (Objects.isNull(channels) || channels.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder().build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(ChannelListResponse.of(channels))
                        .build()
        );
    }




    @Operation(summary = "태그 기반 채널 검색 API")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "검색 완료 응답",
                    content = @Content(schema = @Schema(implementation = ChannelListResponse.class))
            )
    })
    @GetMapping("/search")
    public ResponseEntity searchChannelsByTags(
            @Parameter(description = "검색할 태그 목록", required = true)
            @RequestParam List<String> tags) {
        List<ChannelDto> channels = channelService.searchChannelsByTags(tags);

        if (Objects.isNull(channels) || channels.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.builder().build()
            );
        }

        return ResponseUtil.ok(
                Result.builder()
                        .data(ChannelListResponse.of(channels))
                        .build()
        );
    }
}
