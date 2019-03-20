package com.geomsk.scoreboard.controllers;

import com.geomsk.scoreboard.db.entities.Entry;
import com.geomsk.scoreboard.dto.FlagSubmission;
import com.geomsk.scoreboard.dto.Success;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping({"/api"})
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class DataController {

	@Value("${challenge_flag_hash}")
	private String challengeFlagHash;

	@GetMapping(path = {"/entries"})
	public List<Entry> getAllEntries(){
		return Arrays.asList(new Entry("George", Calendar.getInstance().getTime()));
	}

	@PostMapping(path = {"/submitFlag"})
	public Success submitFlag(@RequestBody FlagSubmission flagSubmission) {
		System.out.println("flag received: " + flagSubmission.getFlag());
		if(!validateFlag(flagSubmission.getFlag())) {
			return new Success(false);
		}
		if (flagSubmission.getName() != null && !flagSubmission.getName().equals("")) {
			// TODO: new entry
		}
		return new Success(true);
	}

	private boolean validateFlag(String flag) {
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		return bcrypt.matches(flag, challengeFlagHash);
	}
}