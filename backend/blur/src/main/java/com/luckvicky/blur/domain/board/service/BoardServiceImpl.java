package com.luckvicky.blur.domain.board.service;

import static com.luckvicky.blur.global.constant.Number.GENERAL_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.LEAGUE_BOARD_PAGE_SIZE;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.exception.UnauthorizedBoardDeleteException;
import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.channelboard.repository.ChannelBoardRepository;
import com.luckvicky.blur.domain.like.repository.LikeRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
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
    private final LikeRepository likeRepository;
    private final ChannelBoardRepository channelBoardRepository;

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
    public List<BoardDto> findLikeBoardsByMember(UUID id, int pageNumber, String criteria) {

        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);

        Pageable pageable = PageRequest.of(
                pageNumber,
                GENERAL_PAGE_SIZE,
                Sort.by(Direction.DESC, sortingCriteria.getCriteria())
        );

        Member member = memberRepository.getOrThrow(id);
        List<Board> likeBoards = boardRepository.findByMember(member, ActivateStatus.ACTIVE, pageable);

        return likeBoards.stream()
                .map(likeBoard -> mapper.map(likeBoard, BoardDto.class))
                .collect(Collectors.toList());

    }

    @Override
    @Transactional(readOnly = true)
    public List<BoardDto> findBoardsByMember(UUID memberId, int pageNumber, String criteria) {

        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);
        Pageable pageable = PageRequest.of(
                pageNumber,
                LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, sortingCriteria.getCriteria())
        );

        Member member = memberRepository.getOrThrow(memberId);
        List<Board> boards = boardRepository.findAllByMember(member, pageable).getContent();

        return boards.stream()
                .map(board -> mapper.map(board,  BoardDto.class))
                .collect(Collectors.toList());

    }

    @Override
    @Transactional(readOnly = true)
    public BoardDetailDto getBoardDetail(UUID memberId, UUID boardId) {
        Member member = memberRepository.getOrThrow(memberId);
        Board board = boardRepository.findByIdWithCommentAndReply(boardId)
                .orElseThrow(NotExistBoardException::new);

        return BoardDetailDto.of(
                board, isLike(member, board)
        );

    }

    @Override
    @Transactional
    public Boolean deleteBoard(UUID boardId, UUID memberId) {
        Board board = boardRepository.getOrThrow(boardId);

        if(!board.getMember().getId().equals(memberId)){
            throw new UnauthorizedBoardDeleteException();
        }

        board.inactive();

        return true;
    }

    private Boolean isLike(Member member, Board board) {
        return likeRepository.existsByMemberAndBoard(member, board);
    }

    private boolean isCreated(Board createdBoard) {
        boardRepository.getOrThrow(createdBoard.getId());
        return true;
    }

    @Override
    public void increaseViewCount(UUID boardId) {
        var board = boardRepository.getOrThrow(boardId);
        board.increaseViewCount();
        boardRepository.save(board);
    }
}
