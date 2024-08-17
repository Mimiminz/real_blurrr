package com.luckvicky.blur.domain.vote.service;

import com.luckvicky.blur.domain.dashcam.exception.NotFoundDashcamException;
import com.luckvicky.blur.domain.dashcam.model.entity.DashCam;
import com.luckvicky.blur.domain.dashcam.repository.DashcamRepository;
import com.luckvicky.blur.domain.member.model.entity.Member;
import com.luckvicky.blur.domain.member.repository.MemberRepository;
import com.luckvicky.blur.domain.vote.exception.AlreadyVotedException;
import com.luckvicky.blur.domain.vote.exception.NotFoundOptionException;
import com.luckvicky.blur.domain.vote.model.dto.OptionDto;
import com.luckvicky.blur.domain.vote.model.dto.VoteResultDto;
import com.luckvicky.blur.domain.vote.model.entity.Option;
import com.luckvicky.blur.domain.vote.model.entity.Vote;
import com.luckvicky.blur.domain.vote.repository.VoteRepository;
import com.luckvicky.blur.infra.jwt.model.ContextMember;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService{

    private final VoteRepository voteRepository;
    private final DashcamRepository dashcamRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public boolean createVote(UUID memberId, UUID boardId, UUID optionId) {

        DashCam dashcam = dashcamRepository.findById(boardId)
                .orElseThrow(NotFoundDashcamException::new);


        Member member = memberRepository.getOrThrow(memberId);

        if (voteRepository.existsByDashCamIdAndMemberId(boardId, memberId)){
            throw new AlreadyVotedException();
        }

        Option selectedOption = dashcam.getOptions().stream()
                .filter(option -> option.getId().equals(optionId))
                .findFirst()
                .orElseThrow(NotFoundOptionException::new);

        Vote vote = Vote.builder()
                .dashCam(dashcam)
                .member(member)
                .selectedOption(selectedOption)
                .build();

        voteRepository.save(vote);
        selectedOption.increaseVoteCount();
        dashcam.increaseVoteCount();

        return true;
    }

    @Override
    public VoteResultDto getVoteResult(UUID boardId, ContextMember nullableMember) {

        DashCam dashCam = dashcamRepository.findById(boardId)
                .orElseThrow(NotFoundDashcamException::new);

        List<OptionDto> optionDtos = dashCam.getOptions().stream()
                .map(OptionDto::of)
                .collect(Collectors.toList());

        boolean hasVoted = false;
        UUID selectedOptionId = null;

        if(Objects.nonNull(nullableMember)){
            Optional<Vote> vote = voteRepository.findByMemberIdAndDashCamId(nullableMember.getId(), boardId);
            if (vote.isPresent()) {
                hasVoted = true;
                selectedOptionId = vote.get().getSelectedOption().getId();
            }
        }


        return VoteResultDto.builder()
                .hasVoted(hasVoted)
                .selectedOptionId(selectedOptionId)
                .options(optionDtos)
                .build();

    }

}
