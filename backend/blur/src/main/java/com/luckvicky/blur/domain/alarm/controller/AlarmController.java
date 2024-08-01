package com.luckvicky.blur.domain.alarm.controller;

import com.luckvicky.blur.domain.alarm.model.dto.AlarmEvent;
import com.luckvicky.blur.domain.alarm.model.entity.AlarmType;
import com.luckvicky.blur.domain.alarm.service.AlarmService;
import com.luckvicky.blur.global.jwt.model.ContextMember;
import com.luckvicky.blur.global.security.AuthUser;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.UUID;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Tag(name = "알림 API")
@RequestMapping("/v1/alarm")
@RestController
public class AlarmController {

    private final AlarmService alarmService;

    public AlarmController(AlarmService alarmService) {
        this.alarmService = alarmService;
    }

    @GetMapping(value = "/subscribe/{memberId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(
//            @AuthUser ContextMember member
            @PathVariable(name = "memberId") UUID memberId
    ) {
        return alarmService.subscribe(memberId);
    }

    @GetMapping(value = "/test")
    public ResponseEntity<Boolean> test(@AuthUser ContextMember member) {
        alarmService.sendAlarm(new AlarmEvent(member.getId(), AlarmType.ADD_COMMENT, "link", "test", "dddd"));
        return ResponseEntity.ok(true);
    }
}
