package com.luckvicky.blur.domain.leagueboard.service;

import com.luckvicky.blur.domain.leagueboard.model.dto.request.LeagueBoardCreateDto;
import java.util.UUID;

public interface LeagueBoardService {

    boolean createLeagueBoard(UUID leagueId, LeagueBoardCreateDto request);

}
