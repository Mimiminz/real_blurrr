package com.luckvicky.blur.domain.leagueboard.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_BOARD;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_BOARD;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_LEAGUE;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_MEMBER;

import com.luckvicky.blur.domain.board.exception.FailToCreateBoardException;
import com.luckvicky.blur.domain.board.exception.NotExistBoardException;
import com.luckvicky.blur.domain.board.model.dto.BoardDto;
import com.luckvicky.blur.domain.leagueboard.model.dto.response.LeagueBoardDetailResponse;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateRequest;
import com.luckvicky.blur.domain.leagueboard.model.entity.LeagueBoard;
import com.luckvicky.blur.domain.leagueboard.repository.LeagueBoardRepository;
import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeagueBoardServiceImpl implements LeagueBoardService {

    private final ModelMapper mapper;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final LeagueRepository leagueRepository;
    private final LeagueBoardRepository leagueBoardRepository;

    @Override
    public Boolean createLeagueBoard(UUID leagueId, LeagueBoardCreateRequest request) {

        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new NotExistMemberException(NOT_EXIST_MEMBER));

        League league = leagueRepository.findById(leagueId)
                .orElseThrow(() -> new NotExistLeagueException(NOT_EXIST_LEAGUE));

        Board createdLeagueBoard = boardRepository.save(
                request.toEntity(league, member)
        );

        return isCreated(createdLeagueBoard);

    }

    @Override
    public List<BoardDto> getLeagueBoards(UUID leagueId) {

        League league = leagueRepository.findById(leagueId)
                        .orElseThrow(() -> new NotExistLeagueException(NOT_EXIST_LEAGUE));

        List<LeagueBoard> leagueBoards = leagueBoardRepository.findByLeague(league);

        return leagueBoards.stream()
                .map(leagueBoard -> mapper.map(leagueBoard, BoardDto.class))
                .collect(Collectors.toList());

    }

    private boolean isCreated(Board createdLeagueBoard) {
        boardRepository.findById(createdLeagueBoard.getId())
                .orElseThrow(() -> new FailToCreateBoardException(FAIL_TO_CREATE_BOARD));

        return true;
    }

    @Override
    public LeagueBoardDetailResponse getLeagueBoardDetail(UUID boardId) {

        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new NotExistBoardException(NOT_EXIST_BOARD));

        return LeagueBoardDetailResponse.of(
                board.getViewCount(),
                board.getContent()
        );

    }

}
