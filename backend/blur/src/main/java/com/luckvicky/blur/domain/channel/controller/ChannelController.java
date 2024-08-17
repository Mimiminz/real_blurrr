package com.luckvicky.blur.domain.channel.controller;

import static com.luckvicky.blur.global.constant.Number.CHANNEL_PAGE_SIZE;

import com.luckvicky.blur.domain.channel.model.dto.ChannelDto;
import com.luckvicky.blur.domain.channel.model.dto.TagDto;
import com.luckvicky.blur.domain.channel.model.dto.request.ChannelCreateRequest;
import com.luckvicky.blur.domain.channel.model.dto.response.ChannelListResponse;
import com.luckvicky.blur.domain.channel.model.dto.response.ChannelResponse;
import com.luckvicky.blur.domain.channel.model.dto.response.TagListResponse;
import com.luckvicky.blur.domain.channel.service.ChannelService;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.model.dto.SliceResponse;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.security.NullableAuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import com.luckvicky.blur.infra.aws.service.S3ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "채널 API")
@RestController
@RequestMapping("/v1/channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;
    private final S3ImageService s3ImageService;

    @Operation(summary = "채널 생성 API")
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



    @Operation(summary = "채널 생성 시 태그 검색 API")
    @GetMapping("/check/tags/{keyword}")
    public ResponseEntity<Result<TagListResponse>> checkTags(
            @Schema(description = "태그")
            @PathVariable(name = "keyword")
            String keyword) {

        List<TagDto> tags = channelService.searchTagsByKeyword(keyword);


        if (Objects.isNull(tags) || tags.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.empty()
            );
        }

        return ResponseUtil.ok(
                Result.of(TagListResponse.of(tags)));
    }


    @Operation(summary = "전체 채널 목록 조회 API")
    @GetMapping
    public ResponseEntity<Result<SliceResponse<ChannelDto>>> getAllChannels(
            @RequestParam(defaultValue = "0") int pageNumber) {

        Pageable pageable = PageRequest.of(pageNumber, CHANNEL_PAGE_SIZE);
        SliceResponse<ChannelDto> response = channelService.getAllChannels(pageable);

        if (response.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(
                Result.of(response)
        );
    }


    @Operation(summary = "팔로우 채널 목록 조회 API")
    @GetMapping("/followers")
    public ResponseEntity<Result<ChannelListResponse>> getFollowChannels(
            @AuthUser ContextMember contextMember) {
        List<ChannelDto> channelDtos = channelService.getFollowedChannels(contextMember.getId());

        if (Objects.isNull(channelDtos) || channelDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.empty()
            );
        }

        return ResponseUtil.ok(
                Result.of(ChannelListResponse.of(channelDtos))
        );
    }


    @Operation(summary = "생성 채널 목록 조회 API")
    @GetMapping("/created")
    public ResponseEntity<Result<ChannelListResponse>> getCreateChannels(
            @AuthUser ContextMember contextMember) {
        List<ChannelDto> channelDtos = channelService.getCreatedChannels(contextMember.getId());

        if (Objects.isNull(channelDtos) || channelDtos.isEmpty()) {
            return ResponseUtil.noContent(
                    Result.empty()
            );
        }

        return ResponseUtil.ok(
                Result.of(ChannelListResponse.of(channelDtos))
        );
    }


    @Operation(summary = "특정 채널 정보 조회 API")
    @Parameter(name = "channelId", description = "채널 고유 식별값", in = ParameterIn.PATH)
    @GetMapping("/{channelId}")
    public ResponseEntity<Result<ChannelResponse>> getChannel(@PathVariable(name = "channelId") UUID channelId,
                                                              @NullableAuthUser ContextMember nullableMember) {
        return ResponseUtil.ok(
                Result.of(ChannelResponse.of(channelService.getChannelById(channelId, nullableMember)))
        );
    }


    @Operation(summary = "채널 팔로우 생성")
    @Parameter(name = "channelId", description = "채널 고유 식별값", in = ParameterIn.PATH)
    @PostMapping("/{channelId}/followers")
    public ResponseEntity<Result<Boolean>> followChannel(@PathVariable(name = "channelId") UUID channelId, @AuthUser ContextMember contextMember) {

        return ResponseUtil.created(
                Result.of(channelService.createFollow(contextMember.getId(), channelId))
        );
    }

    @Operation(summary = "채널 팔로우 삭제")
    @Parameter(name = "channelId", description = "채널 고유 식별값", in = ParameterIn.PATH)
    @DeleteMapping("/{channelId}/followers")
    public ResponseEntity<Result<Boolean>> unfollowChannel(@PathVariable(name = "channelId") UUID channelId, @AuthUser ContextMember contextMember) {

        return ResponseUtil.created(
                Result.of(channelService.deleteFollow(contextMember.getId(), channelId))
        );
    }

    @Operation(summary = "채널 검색 API")
    @GetMapping("/search")
    public ResponseEntity<Result<SliceResponse<ChannelDto>>> searchChannelsByKeyword(
            @Parameter(description = "검색할 키워드", required = true)
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int pageNumber) {

        Pageable pageable = PageRequest.of(pageNumber, CHANNEL_PAGE_SIZE);

        SliceResponse<ChannelDto> response = channelService.searchChannelsByKeyword(keyword, pageable);

        if (Objects.isNull(response) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(
                    Result.empty()
            );
        }

        return ResponseUtil.ok(
                Result.of(response)
        );
    }




    @Operation(summary = "Presigned url 요청 API")
    @GetMapping("/aws")
    public ResponseEntity<Result<Map<String, String>>> getUrl(
            @RequestParam(name = "fileName")
            @Schema(description = "파일 이름 (확장자명 포함)") String fileName) throws MalformedURLException {
        return ResponseUtil.ok(
                Result.of(s3ImageService.getPresignedUrl("images", fileName)));
    }
}
