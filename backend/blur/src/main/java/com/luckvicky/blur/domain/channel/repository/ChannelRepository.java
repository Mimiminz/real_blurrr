package com.luckvicky.blur.domain.channel.repository;

import com.luckvicky.blur.domain.channel.model.entity.Channel;
import com.luckvicky.blur.domain.channel.model.entity.ChannelTag;
import com.luckvicky.blur.domain.channel.model.entity.Tag;
import com.luckvicky.blur.domain.channelboard.exception.NotExistChannelException;
import com.luckvicky.blur.domain.member.model.entity.Member;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, UUID> {

    default Channel getOrThrow(UUID id){
        return findById(id).orElseThrow(NotExistChannelException::new);
    }

    Optional<Channel> findByNameIs(String name);

    List<Channel> findChannelsByOwner(Member member);

    @Query("SELECT DISTINCT c FROM Channel c "
            + "LEFT JOIN c.tags t "
            + "WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) "
            + "OR LOWER(t.name) LIKE LOWER(CONCAT('%', :keyword, '%'))"
    )
    Slice<Channel> findByKeyword(String keyword, Pageable Pageable);

}
