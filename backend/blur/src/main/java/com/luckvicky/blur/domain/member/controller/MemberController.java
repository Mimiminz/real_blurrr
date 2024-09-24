package com.luckvicky.blur.domain.member.controller;

import com.luckvicky.blur.domain.channelboard.model.dto.response.ChannelBoardResponse;
import com.luckvicky.blur.domain.channelboard.service.ChannelBoardService;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardResponse;
import com.luckvicky.blur.domain.leagueboard.service.LeagueBoardService;
import com.luckvicky.blur.domain.member.model.dto.req.CarInfo;
import com.luckvicky.blur.domain.member.model.dto.req.ChangePassword;
import com.luckvicky.blur.domain.member.model.dto.req.CheckPassword;
import com.luckvicky.blur.domain.member.model.dto.req.MemberProfileUpdate;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfile;
import com.luckvicky.blur.domain.member.model.dto.resp.MemberProfileUpdateResp;
import com.luckvicky.blur.domain.member.service.MemberService;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
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
    private final LeagueBoardService leagueBoardService;
    private final ChannelBoardService channelBoardService;

    @Operation(summary = "사용자 정보 조회")
    @GetMapping("")
    public ResponseEntity<MemberProfile> findMember(@AuthUser ContextMember member) {
        return ResponseEntity.ok(memberService.findMember(member.getId()));
    }

    @Operation(summary = "비밀번호 확인")
    @PostMapping("/password")
    public ResponseEntity<Boolean> checkPassword(@AuthUser ContextMember member,
                                                 @Valid @RequestBody CheckPassword checkPassword) {
        return ResponseEntity.ok(memberService.checkPassword(member.getId(), checkPassword));
    }

    @Operation(summary = "정보 수정")
    @PutMapping("")
    public ResponseEntity<MemberProfileUpdateResp> modifyMember(@AuthUser ContextMember member,
                                                                @Valid @RequestBody MemberProfileUpdate update)
            throws MalformedURLException {
        return ResponseEntity.ok(memberService.modifyMember(member.getId(), update));
    }

    @Operation(summary = "로그아웃")
    @GetMapping("/logout")
    public ResponseEntity<Boolean> logout(@AuthUser ContextMember member) {
        memberService.logout(member.getId());
        return ResponseEntity.ok(true);
    }

    @Operation(summary = "좋아요 리그 게시글 조회 API", description = "사용자가 좋아요 누른 게시글 목록을 조회한다.")
    @GetMapping("/likes/leagues/boards")
    public ResponseEntity<Result<PaginatedResponse<com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardResponse>>> findLikeLeagueBoards(
            @AuthUser ContextMember member,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber
    ) {

        PaginatedResponse<com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardResponse> response = leagueBoardService.findLeagueBoardByLike(
                member.getId(), pageNumber
        );

        if (Objects.isNull(response.getContent()) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(response));

    }

    @Operation(summary = "좋아요 채널 게시글 조회 API", description = "사용자가 좋아요 누른 게시글 목록을 조회한다.")
    @GetMapping("/likes/channels/boards")
    public ResponseEntity<Result<PaginatedResponse<com.luckvicky.blur.domain.channelboard.model.dto.response.ChannelBoardResponse>>> findLikeChannelBoards(
            @AuthUser ContextMember member,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber
    ) {

        PaginatedResponse<com.luckvicky.blur.domain.channelboard.model.dto.response.ChannelBoardResponse> response =
                channelBoardService.findChannelBoardByLike(member.getId(), pageNumber);

        if (Objects.isNull(response.getContent()) || response.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(response));

    }

    @Operation(summary = "작성한 리그 게시글 조회 API", description = "사용자가 작성한 게시글 목록을 조회한다.")
    @GetMapping("/leagues/boards")
    public ResponseEntity<Result<PaginatedResponse<LeagueBoardResponse>>> findLeagueBoardsByMember(
            @AuthUser ContextMember member,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber
    ) {

        PaginatedResponse<LeagueBoardResponse> boards = leagueBoardService.findMyBoard(
                member.getId(), pageNumber
        );

        if (Objects.isNull(boards.getContent()) || boards.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(boards));

    }

    @Operation(summary = "작성한 채널 게시글 조회 API", description = "사용자가 작성한 게시글 목록을 조회한다.")
    @GetMapping("/channels/boards")
    public ResponseEntity<Result<PaginatedResponse<ChannelBoardResponse>>> findChannelBoardsByMember(
            @AuthUser ContextMember member,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber
    ) {

        PaginatedResponse<ChannelBoardResponse> boards = channelBoardService.findMyBoard(
                member.getId(), pageNumber
        );

        if (Objects.isNull(boards.getContent()) || boards.getContent().isEmpty()) {
            return ResponseUtil.noContent(Result.empty());
        }

        return ResponseUtil.ok(Result.of(boards));

    }

    @Operation(summary = "마이페이지 비밀번호 변경")
    @PutMapping("/password")
    public ResponseEntity<Boolean> modifyPassword(@Valid @RequestBody ChangePassword changePassword,
                                                  @AuthUser ContextMember contextMember) {
        return ResponseEntity.ok(memberService.modifyPassword(changePassword, contextMember.getId()));
    }

    @Operation(summary = "자동차 정보 등록")
    @PostMapping("/car")
    public ResponseEntity<Boolean> addCarInfo(@Valid @RequestBody CarInfo carInfo, @AuthUser ContextMember contextMember) {
        return ResponseEntity.ok(memberService.addCarInfo(carInfo, contextMember.getId()));
    }
}
