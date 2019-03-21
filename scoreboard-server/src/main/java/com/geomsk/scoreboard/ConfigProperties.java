package com.geomsk.scoreboard;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
@ConfigurationProperties
public class ConfigProperties {
	private String challengeFlagHash;

	public String getChallengeFlagHash() {
		return challengeFlagHash;
	}

	public void setChallengeFlagHash(String challengeFlagHash) {
		this.challengeFlagHash = challengeFlagHash;
	}
}
