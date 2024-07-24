package com.luckvicky.blur.domain.leaguemember.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_LEAGUE;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_MEMBER;

import com.luckvicky.blur.domain.league.exception.FailToCreateLeagueException;
import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leaguemember.model.entity.LeagueMember;
import com.luckvicky.blur.domain.leaguemember.repository.LeagueMemberRepository;
import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeagueMemberServiceImpl implements LeagueMemberService {

    private final LeagueRepository leagueRepository;
    private final LeagueMemberRepository leagueMemberRepository;
    private final MemberRepository memberRepository;

    @Override
    public Boolean createLeagueMember(UUID leagueId, UUID memberId) {

        League league = leagueRepository.findById(leagueId)
                .orElseThrow(() -> new NotExistLeagueException(NOT_EXIST_LEAGUE));

        Member member = memberRepository.getOrThrow(memberId);

        LeagueMember createdLeagueMember = leagueMemberRepository.save(
                LeagueMember.builder()
                        .league(league)
                        .member(member)
                        .build()
        );

        return isCreated(createdLeagueMember);

    }

    private boolean isCreated(LeagueMember leagueMember) {

        leagueMemberRepository.findById(leagueMember.getId())
                .orElseThrow(() -> new FailToCreateLeagueException(NOT_EXIST_LEAGUE));

        return true;

    }

}
