package com.luckvicky.blur.domain.league.repository;

import com.luckvicky.blur.domain.league.model.entity.LeagueMember;
import com.luckvicky.blur.domain.member.model.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeagueMemberRepository extends JpaRepository<LeagueMember, Long> {

    List<LeagueMember> findAllByMember(Member member);

}
