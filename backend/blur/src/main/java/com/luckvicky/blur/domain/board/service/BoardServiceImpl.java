package com.luckvicky.blur.domain.board.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_BOARD;
import static com.luckvicky.blur.global.enums.code.ErrorCode.INVALID_BOARD_TYPE;

import com.luckvicky.blur.domain.board.exception.FailToCreateBoardException;
import com.luckvicky.blur.domain.board.exception.InvalidBoardTypeException;
import com.luckvicky.blur.domain.board.model.dto.request.CreateBoardRequest;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;

    @Override
    public Boolean createBoard(CreateBoardRequest request) {
        BoardType type = convertToEnum(request.boardType());

        // todo: memberId와 일치하는 멤버 가져오기

        Board createdBoard = boardRepository.save(request.toEntity(type));
        return isCreated(createdBoard);
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
