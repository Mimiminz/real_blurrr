package com.luckvicky.blur.domain.leaguemember.model.dto.response;

import com.luckvicky.blur.domain.leaguemember.model.dto.LeagueMemberDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "사용자 리그 목록 조회 응답")
public record LeagueMemberListResponse(
        @Schema(description = "사용자 참여 리그 목록")
        List<LeagueMemberDto> leagueMembers
) {

    public static LeagueMemberListResponse of(List<LeagueMemberDto> leagueMembers) {
        return LeagueMemberListResponse.builder()
                .leagueMembers(leagueMembers)
                .build();
    }

}
