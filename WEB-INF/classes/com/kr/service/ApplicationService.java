package com.kr.service;

import org.springframework.stereotype.Service;
import com.kr.domain.Application;

@Service
public interface ApplicationService {
	
	void applicationStore(Application app);
	
	Application applicationSelect(int appid);
	
	Application[] SelectByUserid(int userid);
	
	Application SelectByName(String appname);
	
	void applicationDeleteByID(int appid);
}
