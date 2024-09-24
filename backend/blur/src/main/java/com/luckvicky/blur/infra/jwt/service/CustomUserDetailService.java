package com.luckvicky.blur.infra.jwt.service;

import com.luckvicky.blur.domain.member.exception.NotExistMemberException;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import com.luckvicky.blur.infra.jwt.model.CustomUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomUserDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;

    public CustomUserDetailService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(username)
                .orElseThrow(NotExistMemberException::new);

        ContextMember contextMember = new ContextMember(member.getId(), member.getEmail(), member.getRole());

        return new CustomUserDetails(contextMember);
    }
}
