package com.geomsk.scoreboard.controllers;

import com.geomsk.scoreboard.ConfigProperties;
import com.geomsk.scoreboard.db.entities.Entry;
import com.geomsk.scoreboard.db.repositories.EntryRepository;
import com.geomsk.scoreboard.dto.FlagSubmission;
import com.geomsk.scoreboard.dto.Rank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping({"/api"})
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class DataController {

	@Autowired
	private ConfigProperties props;

	@Autowired
	private EntryRepository repo;

	@GetMapping(path = {"/entries"})
	public List<Entry> getAllEntries() {
		return repo.findAll();
	}

	@PostMapping(path = {"/submitFlag"})
	public ResponseEntity<Rank> submitFlag(@RequestBody FlagSubmission flagSubmission) {
		/*
		 * Flag Check
		 */
		if (!validateFlag(flagSubmission.getFlag())) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}

		/*
		 * Duplicate entry check
		 */
		if (repo.existsById(flagSubmission.getName())) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}

		/*
		 * Successful submission
		 */
		if (flagSubmission.getName() != null && !flagSubmission.getName().equals("")) {
			Date now = Calendar.getInstance().getTime();
			repo.save(new Entry(flagSubmission.getName().trim(), now));
			int rank = repo.getRank(now);
			return new ResponseEntity<>(new Rank(rank), HttpStatus.OK);
		}

		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	/**
	 * Checks if the hash of the given flag matches with one in application.properties
	 *
	 * @param flag the flag to check
	 * @return true if the hash of the given flag matches with one in application.properties, else false
	 */
	private boolean validateFlag(String flag) {
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		return bcrypt.matches(flag, props.getChallengeFlagHash());
	}
}