package com.kr.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kr.dao.hassMapper;
import com.kr.domain.hass;
import com.kr.service.HassService;

@Service
public class HassServiceImp implements HassService{
	@Autowired
	private hassMapper hassmapper;
	
	public void insertHass(hass record){
		hassmapper.insert(record);
	}
}
