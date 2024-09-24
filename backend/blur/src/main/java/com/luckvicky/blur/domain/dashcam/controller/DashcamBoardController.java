package com.luckvicky.blur.domain.dashcam.controller;

import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardDetailDto;
import com.luckvicky.blur.domain.dashcam.model.dto.DashcamBoardListDto;
import com.luckvicky.blur.domain.dashcam.model.dto.request.DashcamBoardCreateRequest;
import com.luckvicky.blur.domain.dashcam.model.dto.response.DashcamBoardCreateResponse;
import com.luckvicky.blur.domain.dashcam.model.dto.response.DashcamBoardResponse;
import com.luckvicky.blur.domain.dashcam.service.DashcamBoardService;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.security.NullableAuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import com.luckvicky.blur.infra.aws.service.S3ImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.MalformedURLException;
import java.util.Map;
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

@Tag(name = "블랙박스 게시글 API")
@RestController
@RequestMapping("/v1/channels/dashcams/boards")
@RequiredArgsConstructor
public class DashcamBoardController {

    private final DashcamBoardService dashcamBoardService;
    private final S3ImageService s3ImageService;

    @Operation(
            summary = "블랙박스 게시글 목록 검색 조회 API",
            description = "블랙박스 게시물을 검색한다."
    )
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
    @GetMapping
    public ResponseEntity<Result<PaginatedResponse<DashcamBoardListDto>>> getDashcamBoards(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ){
        PaginatedResponse<DashcamBoardListDto> response = dashcamBoardService.getDashcamBoards(
                keyword,
                pageNumber,
                criteria
        );

        if (Objects.isNull(response) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(
                    Result.empty()
            );
        }

        return ResponseUtil.ok(
                Result.of(response)
        );

    }


    @Operation(summary = "블랙박스 게시글 상세 조회 API",
            description = "특정 게시글에 대한 본문, 조회수를 조회한다. \n 댓글 조회는 '/v1/boards/{boardId}/comments' 활용. \n 투표 조회는 '/v1/channels/board/{boardId}/votes' 활용")
    @GetMapping("/{boardId}")
    public ResponseEntity<DashcamBoardResponse> getDashcamBoard(
            @Parameter(description = "게시글 ID", required = true) @PathVariable UUID boardId,
            @NullableAuthUser ContextMember nullableMember) {
        DashcamBoardDetailDto boardDto = dashcamBoardService.getDashcamBoardById(boardId, nullableMember);
        return ResponseEntity.ok(DashcamBoardResponse.of(boardDto));
    }


    @Operation(summary = "블랙박스 게시글 생성 API")
    @PostMapping
    public ResponseEntity<Result<DashcamBoardCreateResponse>> createDashcamBoard(
            @Valid
            @RequestBody DashcamBoardCreateRequest request,
            @AuthUser ContextMember contextMember) {

        return ResponseUtil.created(
                Result.<DashcamBoardCreateResponse>builder()
                        .data(dashcamBoardService.createDashcamBoard(request, contextMember.getId()))
                        .build()
        );
    }

    @Operation(summary = "비디오 presigned url 요청 API")
    @GetMapping("/aws")
    public ResponseEntity<Result<Map<String, String>>> getUrl(
            @RequestParam(name = "fileName")
            @Schema(description = "동영상파일 이름 (확장자명 포함)") String fileName) throws MalformedURLException {
        return ResponseUtil.ok(
                Result.of(s3ImageService.getPresignedUrl("videos", fileName))
        );
    }

}
