package com.luckvicky.blur.domain.league.service;

import static com.luckvicky.blur.global.enums.code.ErrorCode.INVALID_LEAGUE_TYPE;

import com.luckvicky.blur.domain.league.exception.InvalidLeagueTypeException;
import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.league.model.entity.LeagueType;
import com.luckvicky.blur.domain.league.repository.LeagueRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeagueServiceImpl implements LeagueService {

    private final ModelMapper mapper;
    private final LeagueRepository leagueRepository;

    public List<LeagueDto> searchLeaguesByLeagueType(String leagueType) {

        LeagueType leagueTypeToEnum = convertToEnum(leagueType);

        List<League> leagues = leagueRepository
                .findAllByType(leagueTypeToEnum)
                .orElseGet(null);

        List<LeagueDto> leagueDtos = leagues.stream()
                .map(league -> mapper.map(league, LeagueDto.class))
                .collect(Collectors.toList());

        return leagueDtos;

    }

    private static LeagueType convertToEnum(String leagueType) {
        try {
            return LeagueType.valueOf(leagueType);
        } catch (IllegalArgumentException e) {
            throw new InvalidLeagueTypeException(INVALID_LEAGUE_TYPE);
        }
    }

}
