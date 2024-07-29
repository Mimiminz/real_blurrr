package com.luckvicky.blur.domain.leaguemember.service;

import com.luckvicky.blur.domain.leaguemember.model.dto.LeagueMemberDto;
import java.util.List;
import java.util.UUID;

public interface LeagueMemberService {

    Boolean createLeagueMember(UUID leagueId, UUID memberId);

    List<LeagueMemberDto> findLeagueMemberByMember(UUID memberId);

}
