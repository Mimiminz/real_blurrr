package com.luckvicky.blur.domain.board.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyCarRepository extends JpaRepository<MyCarBoard, UUID> {

    Slice<MyCarBoard> findAllByChannel(Channel channel, Pageable pageable);
}
