package com.kr.controller;


import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;














import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.kr.domain.User;
import com.kr.service.UserService;

@Controller
@RequestMapping("/user")
public class UserAction {
	//注入Service
	@Autowired
	private UserService userService;
	
	@RequestMapping("regist")
	public String regist(User user,Model model){
		
		//System.out.println("用户注册："+user.getUsername()+user.getUserpassword());
		Random rand = new Random();
		int i = rand.nextInt(1000000000);
		user.setTaken(String.valueOf(i));
		userService.regist(user);
		
		model.addAttribute("msg", "注册成功");
		//注册成功后跳转success.jsp页面
		return "apps";
	}
	@RequestMapping("login")
	
	public @ResponseBody  JSONObject login(String username,String userpassword,Model model,HttpServletRequest request){
		
		System.out.println("用户登录："+username+userpassword);
		//ModelAndView mav = new ModelAndView();
		/*Map<String, String> map=new LinkedHashMap<String,String>();
		
		map.put("name", user.getName());
		map.put("password", user.getPassword());*/
		
		//Category
		//mav.addObject("situation", "success");
		//mav.setViewName("login");
		JSONObject json = new JSONObject();
		HttpSession session = request.getSession();
		
		//model.addAttribute("situation", "success");
		User user = userService.login(username,userpassword);
		//System.out.println(user);
		//System.out.println(json);
		
		//session.setAttribute("userid", user.getUserid());
		//session.setAttribute("userid", user.getUserid());
		if(user != null){
			json.put("situation", "success");
			json.put("userInfo", user.getUserid());
			session.setAttribute("userInfo",json.toJSONString());
			return json;
		}else{
			json.put("situation", "failed");
			return json;
		}
		//System.out.println(model);
		//System.out.println(mav);
	}
	
	@RequestMapping("getUser")
	public @ResponseBody JSONObject getUser(Model model,HttpServletRequest request){
		System.out.println("this is getUserInfo");
		//System.out.println("用户注册："+user.getUsername()+user.getUserpassword());
		//Random rand = new Random();
		HttpSession session = request.getSession();
		
		
		//System.out.println(session.getAttribute("userInfo"));
		//String jsonString = session.getAttribute("userInfo").toString();
		//user.setUserid(rand.nextInt(1000000000));
		
		if(session.getAttribute("userInfo") !=null){
			JSONObject user = JSON.parseObject(session.getAttribute("userInfo").toString());
			
			int userid = user.getIntValue("userInfo");
			
			JSONObject json =new  JSONObject();
			//System.out.println(json);
			json.put("status", "success");
			json.put("name", userService.selectById(userid).getUsername());
			json.put("email", userService.selectById(userid).getUseremail());
			System.out.println("this is getUserId +_"+json);
			return json;
		}else{
			JSONObject json = new JSONObject();
			json.put("status", "failed");
			//System.out.println(json);
			return json;
		}
		
		//model.addAttribute("msg", "注册成功");
		//注册成功后跳转success.jsp页面
		//return "apps";
	}
	@RequestMapping("check")
	public @ResponseBody JSONObject check(Model model,String username,String userpassword){
		JSONObject json = new JSONObject();
		System.out.println(username+"  "+userpassword);
		User user = userService.login(username,userpassword);
		if(user!=null){ 
			json.put("check", "success");
			json.put("token", user.getTaken());
		}else{
			json.put("check", "failed");
		}
		return json;
	}
	
	
	@RequestMapping("getname")
	public @ResponseBody JSONObject getname(Model model,String username,String userpassword){
		JSONObject json = new JSONObject();
		System.out.println(username+"  "+userpassword);
		User user = userService.login(username,userpassword);
		if(user!=null){ 
			json.put("check", "success");
			json.put("token", user.getTaken());
		}else{
			json.put("check", "failed");
		}
		return json;
	}
	
	@RequestMapping("getToken")
	public @ResponseBody String getToken(Model model,HttpServletRequest request){
		HttpSession session = request.getSession();
		
		JSONObject user = JSON.parseObject(session.getAttribute("userInfo").toString());
		
		int userid = user.getIntValue("userInfo");
		System.out.println(userid);
		return userService.selectById(userid).getTaken();
	}

}