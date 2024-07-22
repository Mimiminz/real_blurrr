package com.luckvicky.blur.domain.league.service;

import com.luckvicky.blur.domain.league.model.dto.LeagueDto;
import java.util.List;

public interface LeagueService {

    List<LeagueDto> searchLeaguesByLeagueType(String leagueType);

}
