package com.luckvicky.blur.domain.league.service;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.dto.request.LeagueCreateDto;
import java.util.List;

public interface LeagueService {

    List<LeagueDto> searchLeaguesByLeagueType(String leagueType);

    Boolean createLeague(LeagueCreateDto request);
}
