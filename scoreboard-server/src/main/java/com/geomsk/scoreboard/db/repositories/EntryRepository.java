package com.geomsk.scoreboard.db.repositories;

import com.geomsk.scoreboard.db.entities.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface EntryRepository extends JpaRepository<Entry, String> {

	@Query("SELECT count(*) FROM Entry WHERE date <= :date")
	public int getRank(@Param("date") Date date);
}
