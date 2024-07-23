package com.luckvicky.blur.domain.member.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "유저 API", description = "사용자 관련 API")
@RestController
@RequestMapping("/v1/members")
public class MemberController {

}
