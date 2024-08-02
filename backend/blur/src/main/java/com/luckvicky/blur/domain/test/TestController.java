package com.luckvicky.blur.domain.test;

import com.luckvicky.blur.global.model.dto.Result;
import com.luckvicky.blur.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Health API")
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
