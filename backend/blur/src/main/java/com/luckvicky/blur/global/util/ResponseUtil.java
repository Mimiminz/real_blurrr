package com.luckvicky.blur.global.util;

import com.luckvicky.blur.global.model.dto.Result;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {

    public static ResponseEntity ok(Result result) {
        return new ResponseEntity(
                result,
                HttpStatus.OK
        );
    }

    public static ResponseEntity noContent(Result result) {
        return new ResponseEntity(
                result,
                HttpStatus.NO_CONTENT
        );
    }

    public static ResponseEntity created(Result result) {
        return new ResponseEntity(
                result,
                HttpStatus.CREATED
        );
    }

}
