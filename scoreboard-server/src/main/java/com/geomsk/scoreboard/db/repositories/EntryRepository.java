package com.geomsk.scoreboard.db.repositories;

import com.geomsk.scoreboard.db.entities.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends JpaRepository<Entry, String> {

}
