package com.geomsk.scoreboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Base64;
import java.util.Set;

public class IpWhitelistFilter extends GenericFilterBean {

	private ConfigProperties props;

	private Set<String> whitelist;

	public IpWhitelistFilter(Set<String> whitelist, ConfigProperties props) {
		this.whitelist = whitelist;
		this.props = props;
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		String ip = request.getRemoteAddr();
		HeaderInjectedHttpServletRequest injectedReq = new HeaderInjectedHttpServletRequest((HttpServletRequest) request);
		if (whitelist.contains(ip)) {
			String p = props.getBaUser() + ":" + props.getBaPass();
			String b64 = Base64.getEncoder().encodeToString(p.getBytes());
			injectedReq.putHeader("Authorization", "Basic " + b64);
		}
		chain.doFilter(injectedReq, response);
	}
}
