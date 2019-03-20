package com.geomsk.scoreboard.controllers;

import com.geomsk.scoreboard.db.entities.Entry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping({"/api"})
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class DataController {

	@GetMapping(path = {"/entries"})
	@ResponseBody
	public List<Entry> getAllEntries(){
		return Arrays.asList(new Entry("George", Calendar.getInstance().getTime()));
	}

	@PostMapping(path = {"/submitFlag"})
	public @ResponseBody ResponseEntity validateFlag(@RequestBody String flag) {
		System.out.println(flag);
		return new ResponseEntity(HttpStatus.OK);
	}
}
