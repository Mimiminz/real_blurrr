package com.luckvicky.blur;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class BlurApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlurApplication.class, args);
	}

}
