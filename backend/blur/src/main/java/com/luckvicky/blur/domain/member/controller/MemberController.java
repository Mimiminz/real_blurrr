package com.luckvicky.blur.domain.member.controller;

import com.luckvicky.blur.domain.board.model.dto.response.LikeBoardListResponse;
import com.luckvicky.blur.domain.board.model.dto.response.MyBoardListResponse;
import com.luckvicky.blur.domain.board.service.BoardService;
import com.luckvicky.blur.domain.member.model.dto.req.ChangePassword;
import com.luckvicky.blur.domain.member.model.dto.req.CheckPassword;
import com.luckvicky.blur.domain.member.model.dto.req.MemberProfileUpdate;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfileUpdateResp;
import com.luckvicky.blur.domain.member.service.MemberService;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.MalformedURLException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "사용자 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/members")
public class MemberController {

    private final MemberService memberService;
    private final BoardService boardService;

    @Operation(description = "사용자 정보 조회")
    @GetMapping("")
    public ResponseEntity<MemberProfile> findMember(@AuthUser ContextMember member) {
        return ResponseEntity.ok(memberService.findMember(member.getId()));
    }

    @Operation(description = "비밀번호 확인")
    @PostMapping("/password")
    public ResponseEntity<Boolean> checkPassword(@AuthUser ContextMember member,
                                                 @Valid @RequestBody CheckPassword checkPassword) {
        return ResponseEntity.ok(memberService.checkPassword(member.getId(), checkPassword));
    }

    @Operation(description = "정보 수정")
    @PutMapping("")
    public ResponseEntity<MemberProfileUpdateResp> modifyMember(@AuthUser ContextMember member,
                                                                @Valid @RequestBody MemberProfileUpdate update)
            throws MalformedURLException {
        return ResponseEntity.ok(memberService.modifyMember(member.getId(), update));
    }

    @Operation(description = "로그아웃")
    @GetMapping("/logout")
    public ResponseEntity<Boolean> logout(@AuthUser ContextMember member) {
        memberService.logout(member.getId());
        return ResponseEntity.ok(true);
    }

    @Operation(
            summary = "좋아요 게시글 조회 API",
            description = "사용자가 좋아요 누른 게시글 목록을 조회한다."
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
    @GetMapping("/likes/boards")
    public ResponseEntity<Result<PaginatedResponse<LikeBoardListResponse>>> findLikeBoardsByMember(
            @AuthUser ContextMember member,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        PaginatedResponse<LikeBoardListResponse> response = boardService.findLikeBoardsByMember(
                member.getId(), pageNumber, criteria
        );

        if (Objects.isNull(response.getContent()) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(response));

    }

    @Operation(
            summary = "작성 게시글 조회 API",
            description = "사용자가 작성한 게시글 목록을 조회한다."
    )
    @GetMapping("/boards")
    public ResponseEntity<Result<PaginatedResponse<MyBoardListResponse>>> findBoardsByMember(
            @AuthUser ContextMember member,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        PaginatedResponse<MyBoardListResponse> boards = boardService.findMyBoard(
                member.getId(), pageNumber, criteria
        );

        if (Objects.isNull(boards.getContent()) || boards.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(boards));

    }

    @Operation(description = "마이페이지 비밀번호 변경")
    @PutMapping("/password")
    public ResponseEntity<Boolean> modifyPassword(@Valid @RequestBody ChangePassword changePassword,
                                                  @AuthUser ContextMember contextMember) {
        return ResponseEntity.ok(memberService.modifyPassword(changePassword, contextMember.getId()));
    }

}
