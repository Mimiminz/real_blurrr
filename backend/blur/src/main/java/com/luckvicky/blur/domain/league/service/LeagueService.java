package com.luckvicky.blur.domain.league.service;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import com.luckvicky.blur.domain.league.model.dto.request.LeagueCreateDto;
import java.util.List;
import java.util.UUID;

public interface LeagueService {

    List<LeagueDto> searchLeaguesByLeagueType(String leagueType);

    Boolean createLeague(LeagueCreateDto request);

    List<LeagueDto> getLeagueByMember(UUID memberId);

    Boolean createLeagueMember(UUID leagueId, UUID memberId);

}
