package com.luckvicky.blur.domain.leaguemember.service;

import com.luckvicky.blur.domain.leaguemember.model.dto.LeagueMemberDto;
import com.luckvicky.blur.domain.leaguemember.model.dto.request.LeagueMemberCreateRequest;
import java.util.List;
import java.util.UUID;

public interface LeagueMemberService {

    Boolean createLeagueMember(LeagueMemberCreateRequest leagueId, UUID memberId);

    List<LeagueMemberDto> findLeagueMemberByMember(UUID memberId);

}
