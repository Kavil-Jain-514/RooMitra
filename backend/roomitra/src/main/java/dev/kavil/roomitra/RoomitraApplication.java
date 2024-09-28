package dev.kavil.roomitra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class RoomitraApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoomitraApplication.class, args);
	}

	@GetMapping("/")
	public String apiRoot() {
		return "Hello World!";
	}

}
