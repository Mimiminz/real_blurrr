package com.luckvicky.blur.domain.channelboard.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.ChannelBoard;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChannelBoardSearchRepository {

    Page<ChannelBoard> findAllByKeywordAndChannel(Pageable pageable, ActivateStatus status, String keyword, Channel channel);
}
