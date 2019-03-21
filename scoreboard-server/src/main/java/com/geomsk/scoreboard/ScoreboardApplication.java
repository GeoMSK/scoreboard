package com.geomsk.scoreboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ScoreboardApplication {

	public static void main(String[] args) {
		if (args.length == 1) {
			BCryptPasswordEncoder enc = new BCryptPasswordEncoder(12);
			System.out.println(enc.encode(args[0]));
		} else {
			SpringApplication.run(ScoreboardApplication.class, args);
		}
	}

}
