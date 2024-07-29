package com.luckvicky.blur.domain.board.service;

import static com.luckvicky.blur.global.constant.Number.HOT_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.LEAGUE_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.ZERO;
import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_BOARD;
import static com.luckvicky.blur.global.enums.code.ErrorCode.INVALID_BOARD_TYPE;

import com.luckvicky.blur.domain.board.exception.FailToCreateBoardException;
import com.luckvicky.blur.domain.board.exception.InvalidBoardTypeException;
import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.HotBoardDto;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.entity.Comment;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.comment.repository.CommentRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.util.ClockUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final ModelMapper mapper;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;

    @Override
    public Boolean createBoard(BoardCreateRequest request) {

        BoardType boardType = BoardType.convertToEnum(request.boardType());
        Member member = memberRepository.getOrThrow(request.memberId());

        Board createdBoard = boardRepository.save(
                request.toEntity(member, boardType)
        );

        return isCreated(createdBoard);

    }

    @Override
    @Transactional(readOnly = true)
    public List<BoardDto> findBoardsByType(String type, int pageNumber, String criteria) {

        BoardType boardType = BoardType.convertToEnum(type);
        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);

        Pageable pageable = PageRequest.of(
                pageNumber, LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, sortingCriteria.getCriteria())
        );

        List<Board> boards = boardRepository
                .findAllByTypeAndStatus(boardType, pageable, ActivateStatus.ACTIVE).getContent();

        return boards.stream()
                .map(board -> mapper.map(board, BoardDto.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public BoardDetailDto getBoardDetail(UUID boardId) {

        Board board = boardRepository.findByIdWithCommentAndReply(boardId)
                .orElseThrow(NotExistBoardException::new);

        List<CommentDto> comments = board.getComments().stream()
                .filter(comment -> comment.getType().equals(CommentType.COMMENT))
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

        return BoardDetailDto.of(board.getContent(), board.getViewCount(), comments);

    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentDto> getComments(UUID boardId) {

        Board board = boardRepository.getOrThrow(boardId);
        List<Comment> comments = commentRepository.findAllByBoardAndType(board, CommentType.COMMENT);

        return  comments.stream()
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

    }

    @Override
    public List<HotBoardDto> getHotBoard() {

        Pageable pageable = PageRequest.of(
                ZERO,
                HOT_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.LIKE.getCriteria())
        );

        LocalDateTime now = ClockUtil.getLocalDateTime();
        List<Board> boards = boardRepository
                .findAllByTypeAndStatusAndCreatedAtBetween(BoardType.CHANNEL, pageable, ActivateStatus.ACTIVE, now.minusWeeks(1), now)
                .getContent();

        return boards.stream()
                .map(board -> mapper.map(board, HotBoardDto.class))
                .collect(Collectors.toList());

    }

    private boolean isCreated(Board createdBoard) {
        boardRepository.getOrThrow(createdBoard.getId());
        return true;
    }

}
