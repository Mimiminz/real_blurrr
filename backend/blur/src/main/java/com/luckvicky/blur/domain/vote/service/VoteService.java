package com.luckvicky.blur.domain.vote.service;

import java.util.UUID;

public interface VoteService {
    boolean createVote(UUID memberId, UUID boardID, UUID optionId);
    Object getVoteResult(UUID boardID,UUID optionID);
}
