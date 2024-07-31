package com.luckvicky.blur.domain.channelboard.repository;

import com.luckvicky.blur.domain.channelboard.model.dto.ChannelBoardMentionDto;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoardMention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChannelBoardMentionRepository extends JpaRepository<ChannelBoardMention, Long> {
    List<ChannelBoardMention> findByChannelBoard(ChannelBoard channelBoard);

}
