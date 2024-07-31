package com.luckvicky.blur.domain.channelboard.repository;

import com.luckvicky.blur.domain.board.model.entity.Board;
import com.luckvicky.blur.domain.channelboard.model.entity.Mention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentionRepository extends JpaRepository<Mention, Long> {

    List<Mention> findAllByBoard(Board board);

}
