package com.luckvicky.blur.domain.channel.repository;

import com.luckvicky.blur.domain.channel.model.entity.Tags;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TagsRepository extends JpaRepository<Tags, UUID> {
}
