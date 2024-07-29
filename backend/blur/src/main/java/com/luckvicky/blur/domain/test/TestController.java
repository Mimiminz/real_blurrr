package com.luckvicky.blur.domain.test;

import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/health")
    public ResponseEntity healthCheck() {
        return ResponseUtil.ok(
                Result.builder()
                        .data("OK")
                        .build()
        );
    }

}
