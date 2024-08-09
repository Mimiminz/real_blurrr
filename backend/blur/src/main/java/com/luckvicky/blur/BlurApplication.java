package com.luckvicky.blur;

import com.luckvicky.blur.global.util.ClockUtil;
import jakarta.annotation.PostConstruct;
import java.util.TimeZone;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class BlurApplication {

	@PostConstruct
	public void setTimeZone() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		System.out.println("---------------------------------------------------");
		System.out.println(ClockUtil.getLocalDateTime());
		System.out.println("---------------------------------------------------");
	}

	public static void main(String[] args) {

		SpringApplication.run(BlurApplication.class, args);

	}

}
