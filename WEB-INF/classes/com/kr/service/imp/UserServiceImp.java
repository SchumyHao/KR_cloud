package com.kr.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kr.dao.UserMapper;
import com.kr.domain.User;
import com.kr.service.UserService;
@Service


public class UserServiceImp implements UserService{

	@Autowired
	private UserMapper usermapper;
	
	@Override
	public void regist(User user) {
		// TODO Auto-generated method stub
		System.out.println(user.getUsername()+user.getUserpassword());
		usermapper.insert(user);
		
	}

	@Override
	public User login(String username, String userpassword) {
		// TODO Auto-generated method stub
		//System.out.println("用户登录："+username+userpassword);
		User user;
		user = usermapper.findUserByNameAndPassword(username,userpassword);
		return user;
		
	}
	@Override
	public User selectById(int userid) {
		// TODO Auto-generated method stub
		//System.out.println("用户登录："+username+userpassword);
		User user;
		user = usermapper.selectByPrimaryKey(userid);
		return user;
		
	}
	
}
