package com.luckvicky.blur.domain.league.service;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.dto.SimpleLeagueDto;
import com.luckvicky.blur.domain.league.model.dto.request.LeagueCreateRequest;
import com.luckvicky.blur.domain.league.model.dto.response.LeagueListResponse;
import com.luckvicky.blur.domain.league.model.dto.response.LeagueRankingResponse;
import java.util.List;

public interface LeagueService {

    Boolean createLeague(LeagueCreateRequest request);

    LeagueListResponse getLeagues(String leagueType);

    LeagueRankingResponse getLeagueRanking();

}
