package com.luckvicky.blur.global.util;

import com.fasterxml.uuid.Generators;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UuidUtil {

    public static UUID createSequentialUUID() {

        UUID uuid = Generators.timeBasedGenerator().generate();

        String[] uuidArr = uuid.toString().split("-");
        String uuidStr = uuidArr[2]+uuidArr[1]+uuidArr[0]+uuidArr[3]+uuidArr[4];

        StringBuilder sb = new StringBuilder(uuidStr)
                .insert(8, "-").insert(13, "-").insert(18, "-").insert(23, "-");

        return UUID.fromString(sb.toString());

    }

}
