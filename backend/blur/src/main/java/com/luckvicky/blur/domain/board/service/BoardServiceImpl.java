package com.luckvicky.blur.domain.board.service;

import static com.luckvicky.blur.global.constant.Number.GENERAL_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.LEAGUE_BOARD_PAGE_SIZE;

import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.exception.UnauthorizedBoardDeleteException;
import com.luckvicky.blur.domain.board.factory.BoardFactory;
import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.board.model.dto.request.BoardCreateRequest;
import com.luckvicky.blur.domain.board.model.dto.response.BoardListResponse;
import com.luckvicky.blur.domain.board.model.dto.response.LikeBoardListResponse;
import com.luckvicky.blur.domain.board.model.dto.response.MyBoardListResponse;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.model.entity.BoardType;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.board.repository.MyCarRepository;
import com.luckvicky.blur.domain.channel.exception.NotExistChannelException;
import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.repository.ChannelRepository;
import com.luckvicky.blur.domain.like.repository.LikeRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import com.luckvicky.blur.global.model.dto.PaginatedResponse;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BoardServiceImpl implements BoardService {

    private final ModelMapper mapper;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final LikeRepository likeRepository;
    private final Map<BoardType, BoardFactory> factoryMap;
    private final ChannelRepository channelRepository;
    private final MyCarRepository myCarRepository;

    public BoardServiceImpl(ModelMapper mapper, BoardRepository boardRepository, MemberRepository memberRepository,
                            LikeRepository likeRepository, Map<BoardType, BoardFactory> factoryMap, ChannelRepository channelRepository,
                            MyCarRepository myCarRepository) {
        this.mapper = mapper;
        this.boardRepository = boardRepository;
        this.memberRepository = memberRepository;
        this.likeRepository = likeRepository;
        this.factoryMap = factoryMap;
        this.channelRepository = channelRepository;
        this.myCarRepository = myCarRepository;
    }

    @Transactional
    @Override
    public Boolean createBoard(BoardCreateRequest request, UUID memberId) {

        Member member = memberRepository.getOrThrow(memberId);
        BoardType boardType = BoardType.convertToEnum(request.getBoardType());

        Board createdBoard = factoryMap.get(boardType).createBoard(request, member);

        if (boardType != BoardType.LEAGUE) {
            Channel channel = channelRepository
                    .findByNameIs(boardType.getName())
                    .orElseThrow(NotExistChannelException::new);

            createdBoard.setChannel(channel);
        }
        boardRepository.save(createdBoard);

        return isCreated(createdBoard);

    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<LikeBoardListResponse> findLikeBoardsByMember(UUID id, int pageNumber, String criteria) {

        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);

        Pageable pageable = PageRequest.of(
                pageNumber,
                GENERAL_PAGE_SIZE,
                Sort.by(Direction.DESC, sortingCriteria.getCriteria())
        );

        Member member = memberRepository.getOrThrow(id);
        Page<Board> likeBoards = boardRepository.findLikeBoardListByMember(member, ActivateStatus.ACTIVE, pageable);

        return PaginatedResponse.of(
                likeBoards.getNumber(),
                likeBoards.getSize(),
                likeBoards.getTotalElements(),
                likeBoards.getTotalPages(),
                likeBoards.stream()
                        .map(LikeBoardListResponse::of)
                        .collect(Collectors.toList())
        );

    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponse<MyBoardListResponse> findMyBoard(UUID memberId, int pageNumber, String criteria) {

        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);
        Pageable pageable = PageRequest.of(
                pageNumber,
                LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, sortingCriteria.getCriteria())
        );

        Member member = memberRepository.getOrThrow(memberId);
        Page<Board> boards = boardRepository.findAllByMember(member, pageable);

        return PaginatedResponse.of(
                boards.getNumber(),
                boards.getSize(),
                boards.getTotalElements(),
                boards.getTotalPages(),
                boards.stream()
                        .map(MyBoardListResponse::of)
                        .collect(Collectors.toList())
        );

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
