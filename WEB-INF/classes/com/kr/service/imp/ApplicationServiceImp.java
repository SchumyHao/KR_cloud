package com.kr.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kr.dao.ApplicationMapper;
import com.kr.domain.Application;
import com.kr.service.ApplicationService;

@Service
public class ApplicationServiceImp implements ApplicationService{
	@Autowired
	private ApplicationMapper applicationmapper;

	@Override
	public void applicationStore(Application app) {
		// TODO Auto-generated method stub
		applicationmapper.insert(app);
	}

	@Override
	public Application applicationSelect(int appid) {
		// TODO Auto-generated method stub
		return applicationmapper.selectByPrimaryKey(appid);
	}

	@Override
	public Application[] SelectByUserid(int userid) {
		// TODO Auto-generated method stub
		return applicationmapper.selectByUserid(userid);
	}

	@Override
	public Application SelectByName(String appname) {
		// TODO Auto-generated method stub
		return applicationmapper.selectByName(appname);
	}

	@Override
	public void applicationDeleteByID(int appid) {
		// TODO Auto-generated method stub
		applicationmapper.deleteByPrimaryKey(appid);
	}

	
}
