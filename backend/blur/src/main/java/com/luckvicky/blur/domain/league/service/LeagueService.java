package com.luckvicky.blur.domain.league.service;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.dto.request.LeagueCreateRequest;
import java.util.List;

public interface LeagueService {

    Boolean createLeague(LeagueCreateRequest request);

    List<LeagueDto> getLeagues(String leagueType);

    List<LeagueDto> getLeagueRanking();

}
