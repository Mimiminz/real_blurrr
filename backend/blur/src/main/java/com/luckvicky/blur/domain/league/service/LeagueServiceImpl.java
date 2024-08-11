package com.luckvicky.blur.domain.league.service;

import static com.luckvicky.blur.global.constant.Number.RANKING_PAGE_SIZE;
import static com.luckvicky.blur.global.constant.Number.ZERO;
import static com.luckvicky.blur.global.enums.code.ErrorCode.NOT_EXIST_LEAGUE;

import com.luckvicky.blur.domain.league.exception.FailToCreateLeagueException;
import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.dto.SimpleLeagueDto;
import com.luckvicky.blur.domain.league.model.dto.request.LeagueCreateRequest;
import com.luckvicky.blur.domain.league.model.dto.response.LeagueListResponse;
import com.luckvicky.blur.domain.league.model.dto.response.LeagueRankingResponse;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import com.luckvicky.blur.global.enums.filter.SortingCriteria;
import java.util.List;
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
public class LeagueServiceImpl implements LeagueService {

    private final ModelMapper mapper;
    private final LeagueRepository leagueRepository;

    @Override
    public LeagueListResponse getLeagues(String leagueType) {

        List<League> leagues = leagueRepository.findAllByTypeOrderByPeopleCountDesc(LeagueType.convertToEnum(leagueType));

        return LeagueListResponse.of(
                leagues.stream()
                        .map(league -> mapper.map(league, LeagueDto.class))
                        .collect(Collectors.toList())
        );

    }

    @Override
    public LeagueRankingResponse getLeagueRanking() {

        Pageable pageable = PageRequest.of(
                ZERO,
                RANKING_PAGE_SIZE,
                Sort.by(Direction.DESC, SortingCriteria.PEOPLE.getCriteria())
        );

        return LeagueRankingResponse.of(
                leagueRepository.findAll(pageable).getContent().stream()
                        .map(league -> mapper.map(league, LeagueDto.class))
                        .collect(Collectors.toList())
        );

    }

    @Override
    @Transactional(readOnly = true)
    public List<SimpleLeagueDto> searchLeaguesByKeyword(String keyword) {

        List<League> leagues = leagueRepository.findAllByNameContainingIgnoreCase(keyword);


        return leagues.stream()
                .limit(5)
                .map(SimpleLeagueDto::of)
                .collect(Collectors.toList());
    }

    @Override
    public Boolean createLeague(LeagueCreateRequest request) {

        LeagueType type = LeagueType.valueOf(request.type());
        League createdLeague = leagueRepository.save(request.toEntity(type));

        return isCreated(createdLeague);

    }


    private boolean isCreated(League league) {

        leagueRepository.findById(league.getId())
                .orElseThrow(() -> new FailToCreateLeagueException(NOT_EXIST_LEAGUE));

        return true;

    }

}
