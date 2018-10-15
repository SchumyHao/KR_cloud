package com.kr.service;

import org.springframework.stereotype.Service;

import com.kr.domain.User;
@Service
public interface UserService {
	//用户注册
	void regist(User user);
	//用户登录
	User login(String username,String userpassword);
	
	User selectById(int userid);
}
