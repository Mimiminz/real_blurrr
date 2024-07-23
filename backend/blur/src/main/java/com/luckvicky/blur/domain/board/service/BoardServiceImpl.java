package com.luckvicky.blur.domain.board.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_BOARD;
import static com.luckvicky.blur.global.enums.code.ErrorCode.INVALID_BOARD_TYPE;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_MEMBER;

import com.luckvicky.blur.domain.board.exception.FailToCreateBoardException;
import com.luckvicky.blur.domain.board.exception.InvalidBoardTypeException;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final ModelMapper mapper;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    @Override
    public Boolean createBoard(BoardCreateRequest request) {

        BoardType type = convertToEnum(request.boardType());

        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new NotExistMemberException(NOT_EXIST_MEMBER));

        Board createdBoard = boardRepository.save(
                request.toEntity(member, type)
        );

        return isCreated(createdBoard);

    }

    @Override
    public List<BoardDto> searchBoardByBoardType(String boardType) {

        BoardType type = convertToEnum(boardType);
        List<Board> boards = boardRepository.findAllByType(type);

        return boards.stream()
                .map(board -> mapper.map(board, BoardDto.class))
                .collect(Collectors.toList());
    }

    private boolean isCreated(Board createdBoard) {
        boardRepository.findById(createdBoard.getId())
                .orElseThrow(() -> new FailToCreateBoardException(FAIL_TO_CREATE_BOARD));

        return true;
    }

    public BoardType convertToEnum(String name) {
        try {
            return BoardType.valueOf(name);
        } catch (IllegalArgumentException e) {
            throw new InvalidBoardTypeException(INVALID_BOARD_TYPE);
        }
    }

}
