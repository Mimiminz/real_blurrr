package com.luckvicky.blur.domain.leaguemember.repository;

import com.luckvicky.blur.domain.league.model.entity.League;
import com.luckvicky.blur.domain.leaguemember.model.entity.LeagueMember;
import com.luckvicky.blur.domain.member.model.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface LeagueMemberRepository extends JpaRepository<LeagueMember, Long> {

   @EntityGraph(attributePaths = {"league", "member"})
   List<LeagueMember> findAllByMember(@Param("member") Member member);

   Boolean existsByLeagueAndMember(League league, Member member);

   Boolean existsByMember(Member member);

}
