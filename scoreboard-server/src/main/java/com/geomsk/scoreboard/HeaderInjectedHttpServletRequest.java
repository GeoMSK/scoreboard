package com.geomsk.scoreboard;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.util.*;

final class HeaderInjectedHttpServletRequest extends HttpServletRequestWrapper {
	private final Map<String, String> customHeaders;

	public HeaderInjectedHttpServletRequest(HttpServletRequest request){
		super(request);
		this.customHeaders = new HashMap<>();
	}

	public void putHeader(String name, String value){
		this.customHeaders.put(name, value);
	}

	@Override
	public String getHeader(String name) {
		String headerValue = customHeaders.get(name);

		if (headerValue != null){
			return headerValue;
		}
		return ((HttpServletRequest) getRequest()).getHeader(name);
	}

	@Override
	public Enumeration<String> getHeaderNames() {
		Set<String> set = new HashSet<>(customHeaders.keySet());

		@SuppressWarnings("unchecked")
		Enumeration<String> e = ((HttpServletRequest) getRequest()).getHeaderNames();
		while (e.hasMoreElements()) {
			String n = e.nextElement();
			set.add(n);
		}
		return Collections.enumeration(set);
	}
}
