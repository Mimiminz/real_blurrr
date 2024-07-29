package com.luckvicky.blur.domain.leagueboard.service;

import static com.luckvicky.blur.global.constant.Number.LEAGUE_BOARD_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_CONTENT;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_NICKNAME;
import static com.luckvicky.blur.global.constant.StringFormat.CONDITION_TITLE;
import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_BOARD;

import com.luckvicky.blur.domain.board.exception.FailToCreateBoardException;
import com.luckvicky.blur.domain.board.exception.InValidSearchConditionException;
import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.dto.BoardDetailDto;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.comment.model.dto.CommentDto;
import com.luckvicky.blur.domain.comment.model.entity.CommentType;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.leagueboard.repository.LeagueBoardRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.global.enums.filter.SearchCondition;
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
public class LeagueBoardServiceImpl implements LeagueBoardService {

    private final ModelMapper mapper;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final LeagueRepository leagueRepository;
    private final LeagueBoardRepository leagueBoardRepository;

    @Override
    public Boolean createLeagueBoard(UUID memberId, UUID leagueId, LeagueBoardCreateRequest request) {

        Member member = memberRepository.getOrThrow(memberId);
        League league = leagueRepository.getOrThrow(leagueId);

        Board createdLeagueBoard = boardRepository.save(
                request.toEntity(league, member)
        );

        return isCreated(createdLeagueBoard);

    }

    @Override
    @Transactional(readOnly = true)
    public List<BoardDto> getLeagueBoards(UUID leagueId, int pageNumber, String criteria) {

        League league = leagueRepository.getOrThrow(leagueId);

        Pageable pageable = PageRequest.of(
                pageNumber, LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.valueOf(criteria).getCriteria())
        );

        List<LeagueBoard> leagueBoards = leagueBoardRepository
                .findAllByLeagueAndStatus(league, pageable, ActivateStatus.ACTIVE).getContent();

        return leagueBoards.stream()
                .map(leagueBoard -> mapper.map(leagueBoard, BoardDto.class))
                .collect(Collectors.toList());

    }

    @Override
    @Transactional(readOnly = true)
    public BoardDetailDto getLeagueBoardDetail(UUID boardId) {

        Board board = boardRepository.findByIdWithCommentAndReply(boardId)
                .orElseThrow(NotExistBoardException::new);

        List<CommentDto> comments = board.getComments().stream()
                .filter(comment -> comment.getType().equals(CommentType.COMMENT))
                .map(comment -> mapper.map(comment, CommentDto.class))
                .collect(Collectors.toList());

        return BoardDetailDto.of(board.getContent(), board.getViewCount(), comments);

    }

    @Override
    public List<BoardDto> search(UUID leagueId, String keyword, String condition, int pageNumber, String criteria) {

        League league = leagueRepository.getOrThrow(leagueId);
        SortingCriteria sortingCriteria = SortingCriteria.convertToEnum(criteria);
        SearchCondition searchCondition = SearchCondition.convertToEnum(condition);

        Pageable pageable = PageRequest.of(
                pageNumber,
                LEAGUE_BOARD_PAGE_SIZE,
                Sort.by(Direction.DESC, sortingCriteria.getCriteria())
        );

        List<LeagueBoard> leagueBoards;
        switch (searchCondition.getCondition()) {

            case CONDITION_TITLE ->
                leagueBoards = leagueBoardRepository
                        .findAllByLeagueAndTitleContainingIgnoreCase(league, keyword.toLowerCase(), pageable).getContent();

            case CONDITION_CONTENT ->
                leagueBoards =  leagueBoardRepository
                        .findAllByLeagueAndContentContainingIgnoreCase(league, keyword.toLowerCase(), pageable).getContent();

            case CONDITION_NICKNAME ->
                leagueBoards =  leagueBoardRepository
                        .findAllByLeagueAndMemberNicknameContainingIgnoreCase(league, keyword.toLowerCase(), pageable).getContent();

            default -> throw new InValidSearchConditionException();

        }

        return leagueBoards.stream()
                .map(leagueBoard -> mapper.map(leagueBoard, BoardDto.class))
                .collect(Collectors.toList());

    }

    private boolean isCreated(Board createdLeagueBoard) {

        boardRepository.findById(createdLeagueBoard.getId())
                .orElseThrow(() -> new FailToCreateBoardException());

        return true;
    }

}