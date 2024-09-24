package com.luckvicky.blur.domain.mycar.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MyCarCustomRepository {
    Page<MyCarBoard> findAllByKeywordAndChannel(Pageable pageable, String keyword, Channel channel);
}
