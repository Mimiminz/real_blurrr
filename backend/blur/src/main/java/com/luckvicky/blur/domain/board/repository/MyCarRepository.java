package com.luckvicky.blur.domain.board.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.model.entity.MyCarBoard;
import com.luckvicky.blur.domain.mycar.repository.MyCarCustomRepository;
import com.luckvicky.blur.global.enums.status.ActivateStatus;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyCarRepository extends JpaRepository<MyCarBoard, UUID> , MyCarCustomRepository {

    Page<MyCarBoard> findAllByChannel(Channel channel, Pageable pageable);
    Optional<MyCarBoard> findByIdAndStatus(UUID id, ActivateStatus activateStatus);
}
