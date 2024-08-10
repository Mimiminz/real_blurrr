package com.luckvicky.blur.domain.member.model.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Schema(name = "자동차 정보 등록")
@Builder
public record CarInfo(
        @Schema(description = "브랜드")
        @NotBlank
        String brand,
        @NotBlank
        @Schema(description = "모델")
        String model,
        @Schema(description = "차 표시명 ")
        @NotBlank
        String carTitle
) {
}
