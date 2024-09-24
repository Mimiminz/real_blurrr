package com.luckvicky.blur.domain.member.repository;

import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.model.entity.Member;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, UUID> {

    default Member getOrThrow(UUID id) {
        return findById(id).orElseThrow(NotExistMemberException::new);
    }

    boolean existsByEmail(String email);

    Optional<Member> findByEmail(String email);

    boolean existsByNickname(String nickname);

}
