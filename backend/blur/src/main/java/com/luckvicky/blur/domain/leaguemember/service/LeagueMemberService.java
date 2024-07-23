package com.luckvicky.blur.domain.leaguemember.service;

import java.util.UUID;

public interface LeagueMemberService {

    Boolean createLeagueMember(UUID leagueId, UUID memberId);

}
