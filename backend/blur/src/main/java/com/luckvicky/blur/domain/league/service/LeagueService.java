package com.luckvicky.blur.domain.league.service;

import com.luckvicky.blur.domain.league.model.dto.response.LeagueListResponse;
import com.luckvicky.blur.domain.league.model.dto.response.LeagueRankingResponse;

public interface LeagueService {

    LeagueListResponse getLeagues(String leagueType);

    LeagueRankingResponse getLeagueRanking();

}
