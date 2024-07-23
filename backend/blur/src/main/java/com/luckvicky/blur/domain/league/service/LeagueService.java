package com.luckvicky.blur.domain.league.service;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.dto.request.LeagueCreateRequest;
import java.util.List;
import java.util.UUID;

public interface LeagueService {

    List<LeagueDto> findLeagueByType(String leagueType);

    Boolean createLeague(LeagueCreateRequest request);

    List<LeagueDto> getLeague(UUID memberId);

}
