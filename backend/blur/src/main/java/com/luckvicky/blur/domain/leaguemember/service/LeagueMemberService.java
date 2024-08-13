package com.luckvicky.blur.domain.leaguemember.service;

import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.leaguemember.model.dto.response.LeagueMemberListResponse;
import com.luckvicky.blur.domain.member.model.entity.Member;
import java.util.UUID;

public interface LeagueMemberService {

    LeagueMemberListResponse findLeagueMemberByMember(UUID memberId);

}
