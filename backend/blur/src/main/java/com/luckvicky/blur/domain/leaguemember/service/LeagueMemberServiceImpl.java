package com.luckvicky.blur.domain.leaguemember.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_LEAGUE;

import com.luckvicky.blur.domain.league.exception.FailToCreateLeagueException;
import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leaguemember.model.dto.LeagueMemberDto;
import com.luckvicky.blur.domain.leaguemember.model.dto.response.LeagueMemberListResponse;
import com.luckvicky.blur.domain.leaguemember.model.entity.LeagueMember;
import com.luckvicky.blur.domain.leaguemember.repository.LeagueMemberRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.model.entity.Role;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LeagueMemberServiceImpl implements LeagueMemberService {

    private final ModelMapper mapper;
    private final LeagueMemberRepository leagueMemberRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public LeagueMemberListResponse findLeagueMemberByMember(UUID memberId) {

        Member member = memberRepository.getOrThrow(memberId);
        List<LeagueMember> leagueMembers = leagueMemberRepository.findAllByMember(member);

        return LeagueMemberListResponse.of(
                leagueMembers.stream()
                        .map(league -> mapper.map(league, LeagueMemberDto.class))
                        .collect(Collectors.toList())
        );

    }

    public Boolean checkLeagueAllocationOfMember(League league, Member member) {
        return leagueMemberRepository.existsByLeagueAndMember(league, member);
    }

}
