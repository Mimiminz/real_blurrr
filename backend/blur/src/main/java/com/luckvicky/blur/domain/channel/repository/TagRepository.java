package com.luckvicky.blur.domain.channel.repository;

import com.luckvicky.blur.domain.channel.model.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {
    List<Tag> findAllByNameIn(Collection<String> names);

    List<Tag> findAllByNameContainingIgnoreCase(String keyword);
}
