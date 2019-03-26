package com.geomsk.scoreboard;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.*;

@Configuration
@ConfigurationProperties
public class ConfigProperties {
	private String challengeFlagHash;
	private Set<String> whitelist = new HashSet<>();
	private String baUser;
	private String baPass;

	public String getChallengeFlagHash() {
		return challengeFlagHash;
	}

	public void setChallengeFlagHash(String challengeFlagHash) {
		this.challengeFlagHash = challengeFlagHash;
	}

	public Set<String> getWhitelist() {
		return whitelist;
	}

	public void setWhitelist(Set<String> whitelist) {
		this.whitelist = whitelist;
	}

	public String getBaUser() {
		return baUser;
	}

	public void setBaUser(String baUser) {
		this.baUser = baUser;
	}

	public String getBaPass() {
		return baPass;
	}

	public void setBaPass(String baPass) {
		this.baPass = baPass;
	}
}
