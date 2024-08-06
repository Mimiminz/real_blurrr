package com.luckvicky.blur.domain.mycar.controller;

import static com.luckvicky.blur.global.constant.Number.ALARM_PAGE_SIZE;

import com.luckvicky.blur.domain.board.service.BoardService;
import com.luckvicky.blur.domain.channelboard.model.dto.request.MyCarCreateRequest;
import com.luckvicky.blur.domain.mycar.service.MyCarBoardService;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import com.luckvicky.blur.global.security.AuthUser;
import com.luckvicky.blur.global.security.NullableAuthUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.UUID;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "내 차 자랑")
@RequestMapping("/v1/channels/mycar/boards")
@RestController
public class MyCarBoardController {

    private final BoardService boardService;

    private final MyCarBoardService myCarBoardService;

    public MyCarBoardController(BoardService boardService, MyCarBoardService myCarBoardService) {
        this.boardService = boardService;
        this.myCarBoardService = myCarBoardService;
    }

    @Operation(description = "내 차 자랑 게시글 생성")
    @PostMapping
    public ResponseEntity<Boolean> addMyCarBoard(
            @AuthUser ContextMember contextMember,
            @Valid @RequestBody MyCarCreateRequest myCarCreateRequest) {
        return ResponseEntity.ok(myCarBoardService.createMyCarBoard(myCarCreateRequest, contextMember.getId()));
    }

    @Operation(description = "내 차 자랑 리스트 조회")
    @GetMapping
    public ResponseEntity findMyCars(@RequestParam(required = false, defaultValue = "0", value = "page") int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 10,
                Sort.by(Direction.DESC, SortingCriteria.valueOf("VIEW").getCriteria()));
        return ResponseEntity.ok(PaginatedResponse.of(myCarBoardService.findMyCars(pageable)));
    }

    @Operation(description = "차 자랑 상세 조회")
    @GetMapping("/{id}")
    public ResponseEntity findMyCarDetail(
            @PathVariable(name = "id") UUID id,
            @NullableAuthUser ContextMember contextMember) {
        return ResponseEntity.ok(myCarBoardService.findMyCarDetail(id, contextMember));
    }
}
