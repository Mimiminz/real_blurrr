package com.luckvicky.blur.domain.league.service;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.dto.request.LeagueCreateRequest;
import com.luckvicky.blur.domain.leaguemember.model.dto.LeagueMemberDto;
import java.util.List;
import java.util.UUID;

public interface LeagueService {

    Boolean createLeague(LeagueCreateRequest request);

    List<LeagueDto> findLeagueByType(String leagueType);

    List<LeagueDto> getLeagueRanking();

}
