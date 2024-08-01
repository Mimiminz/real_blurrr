package com.luckvicky.blur.domain.leaguemember.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_LEAGUE;

import com.luckvicky.blur.domain.league.exception.FailToCreateLeagueException;
import com.luckvicky.blur.domain.league.exception.NotExistLeagueException;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.domain.leaguemember.model.dto.LeagueMemberDto;
import com.luckvicky.blur.domain.leaguemember.model.dto.request.LeagueMemberCreateRequest;
import com.luckvicky.blur.domain.leaguemember.model.entity.LeagueMember;
import com.luckvicky.blur.domain.leaguemember.repository.LeagueMemberRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.model.entity.Role;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import java.util.ArrayList;
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
    private final LeagueRepository leagueRepository;
    private final LeagueMemberRepository leagueMemberRepository;
    private final MemberRepository memberRepository;

    @Override
    public Boolean createLeagueMember(LeagueMemberCreateRequest request, UUID memberId) {

        Member member = memberRepository.getOrThrow(memberId);
        List<LeagueMember> createdLeagueMembers = new ArrayList<>();
        for (UUID leagueId : request.leagueIds()) {

            League league =  leagueRepository.findByIdForUpdate(leagueId)
                    .orElseThrow(NotExistLeagueException::new);

           isCreated(
                   leagueMemberRepository.save(
                           LeagueMember.builder()
                                   .league(league)
                                   .member(member)
                                   .build()
                   )
           );

            league.increasePeopleCount();

        }

        member.updateRole(Role.ROLE_AUTH_USER);
        return true;

    }

    @Transactional(readOnly = true)
    public List<LeagueMemberDto> findLeagueMemberByMember(UUID memberId) {

        Member member = memberRepository.getOrThrow(memberId);
        List<LeagueMember> leagueMembers = leagueMemberRepository.findAllByMember(member);

        return leagueMembers.stream()
                .map(league -> mapper.map(league, LeagueMemberDto.class))
                .collect(Collectors.toList());

    }

    private void isCreated(LeagueMember leagueMember) {

        leagueMemberRepository.findById(leagueMember.getId())
                .orElseThrow(() -> new FailToCreateLeagueException(NOT_EXIST_LEAGUE));

    }

}
