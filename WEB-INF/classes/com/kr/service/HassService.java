package com.kr.service;

import org.springframework.stereotype.Service;

import com.kr.domain.hass;

@Service
public interface HassService {
	void insertHass(hass record);
}
