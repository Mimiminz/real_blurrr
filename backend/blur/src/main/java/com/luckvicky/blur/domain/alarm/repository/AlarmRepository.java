package com.luckvicky.blur.domain.alarm.repository;

import com.luckvicky.blur.domain.alarm.model.entity.Alarm;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, UUID> {
}
