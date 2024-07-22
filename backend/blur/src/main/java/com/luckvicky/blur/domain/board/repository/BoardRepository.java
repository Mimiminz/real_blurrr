package com.luckvicky.blur.domain.board.repository;

import com.luckvicky.blur.domain.board.model.entity.Board;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, UUID> {
}
