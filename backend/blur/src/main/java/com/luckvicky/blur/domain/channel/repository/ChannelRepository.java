package com.luckvicky.blur.domain.channel.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channelboard.exception.NotExistChannelException;
import com.luckvicky.blur.global.enums.code.ErrorCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, UUID> {

    default Channel getOrThrow(UUID id){
        return findById(id).orElseThrow(() -> new NotExistChannelException(ErrorCode.NOT_EXIST_CHANNEL));
    }

    @Query("SELECT c.id FROM Channel c")
    List<UUID> findAllChannelIds();

    @Query("SELECT c.id FROM Channel c WHERE c.owner.id = :memberId")
    List<UUID> findChannelIdsByOwnerId(@Param("memberId") UUID memberId);

}
