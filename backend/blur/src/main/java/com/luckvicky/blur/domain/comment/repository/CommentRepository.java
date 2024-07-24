package com.luckvicky.blur.domain.comment.repository;

import com.luckvicky.blur.domain.comment.model.entity.Comment;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {

}
