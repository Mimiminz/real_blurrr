package com.luckvicky.blur.domain.league.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.INVALID_LEAGUE_TYPE;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_LEAGUE;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_MEMBER;

import com.luckvicky.blur.domain.league.exception.FailToCreateLeagueException;
import com.luckvicky.blur.domain.league.exception.InvalidLeagueTypeException;
import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.dto.request.LeagueCreateRequest;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.leaguemember.model.entity.LeagueMember;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import com.luckvicky.blur.domain.leaguemember.repository.LeagueMemberRepository;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
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
public class LeagueServiceImpl implements LeagueService {

    private final ModelMapper mapper;
    private final LeagueRepository leagueRepository;
    private final LeagueMemberRepository leagueMemberRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<LeagueDto> findLeagueByType(String leagueType) {

        LeagueType leagueTypeToEnum = convertToEnum(leagueType);

        List<League> leagues = leagueRepository
                .findAllByType(leagueTypeToEnum)
                .orElseGet(null);

        List<LeagueDto> leagueDtos = leagues.stream()
                .map(league -> mapper.map(league, LeagueDto.class))
                .collect(Collectors.toList());

        return leagueDtos;

    }

    @Override
    public Boolean createLeague(LeagueCreateRequest request) {

        LeagueType type = LeagueType.valueOf(request.type());
        League createdLeague = leagueRepository.save(request.toEntity(type));

        return isCreated(createdLeague);

    }

    @Override
    public List<LeagueDto> getLeague(UUID memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NotExistMemberException(NOT_EXIST_MEMBER));

        List<LeagueMember> leagueMembers = leagueMemberRepository.findAllByMember(member);

        List<League> leagues = leagueMembers.stream()
                .map(leagueMember ->
                        leagueRepository.getReferenceById(leagueMember.getLeague().getId())
                ).toList();

        return leagues.stream()
                .map(league -> mapper.map(league, LeagueDto.class))
                .collect(Collectors.toList());

    }

    private boolean isCreated(League league) {

        leagueRepository.findById(league.getId())
                .orElseThrow(() -> new FailToCreateLeagueException(NOT_EXIST_LEAGUE));

        return true;

    }

    private LeagueType convertToEnum(String leagueType) {
        try {
            return LeagueType.valueOf(leagueType);
        } catch (IllegalArgumentException e) {
            throw new InvalidLeagueTypeException(INVALID_LEAGUE_TYPE);
        }
    }

}
