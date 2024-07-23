package com.luckvicky.blur.domain.leagueboard.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.FAIL_TO_CREATE_BOARD;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_LEAGUE;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_MEMBER;

import com.luckvicky.blur.domain.board.exception.FailToCreateBoardException;
import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.board.repository.BoardRepository;
import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateDto;
import com.luckvicky.blur.domain.member.execption.NotExistMemberException;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeagueBoardServiceImpl implements LeagueBoardService {

    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;
    private final LeagueRepository leagueRepository;

    @Override
    public boolean createLeagueBoard(UUID leagueId, LeagueBoardCreateDto request) {

        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new NotExistMemberException(NOT_EXIST_MEMBER));

        League league = leagueRepository.findById(leagueId)
                .orElseThrow(() -> new NotExistLeagueException(NOT_EXIST_LEAGUE));

        Board createdLeagueBoard = boardRepository.save(
                request.toEntity(league, member)
        );

        return isCreated(createdLeagueBoard);

    }

    private boolean isCreated(Board createdLeagueBoard) {
        boardRepository.findById(createdLeagueBoard.getId())
                .orElseThrow(() -> new FailToCreateBoardException(FAIL_TO_CREATE_BOARD));

        return true;
    }

}
