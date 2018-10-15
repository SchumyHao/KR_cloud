package com.kr.controller;


import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Random;

import javax.imageio.stream.FileImageOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.kr.domain.Application;
import com.kr.service.ApplicationService;
@Controller
@RequestMapping("/application")
public class ApplicationAction {
	
	@Autowired
	private ApplicationService applicationService;
	
	@RequestMapping("/new_app")
	public @ResponseBody JSONObject storeApp(Application application,Model model,HttpServletRequest request){
		HttpSession session = request.getSession();
		JSONObject user = JSON.parseObject(session.getAttribute("userInfo").toString());
		int userid = user.getIntValue("userInfo");
		System.out.println(Arrays.toString(application.getAppimg()));
		//System.out.println(application.getAppimg());
//		Application application = new Application();
//		application.setAppname(appname);
//		application.setAppdescribtion(appdescribtion);
//		application.setAppauthoremails(appAuthorEmail);
		//application.setAppimg(img);
		
	
		
		
		
		
		
		
		Random rand = new Random();
		int i = rand.nextInt(100000000);
		application.setAppid(i);
		application.setUserid(userid);
		applicationService.applicationStore(application);
		JSONObject json = new JSONObject();
		json.put("appid", i);
		json.put("status", true);
		return json;
		
		 
		
		
		
	}
	@RequestMapping("/selectAppByUserid")
	public @ResponseBody JSONObject selectAppByUserid(Model model,HttpServletRequest request){
		HttpSession session = request.getSession();
		JSONObject json = new JSONObject();
		
		System.out.println(session.getAttribute("userInfo"));
		if(session.getAttribute("userInfo") == null){
			return json;
		}
		JSONObject user = JSON.parseObject(session.getAttribute("userInfo").toString());
		
		int userid = user.getIntValue("userInfo");
		//System.out.println(userid);
		
		Application[] application=applicationService.SelectByUserid(userid);
		
		
		for(int i = 0;i <application.length;i++){
			JSONObject jsonApp = new JSONObject();
			jsonApp.put("authorname", application[i].getAppauthor());
			jsonApp.put("name", application[i].getAppname());
			System.out.println(Arrays.toString(application[i].getAppimg()));
			//byte[] bimg = application[i].getAppimg();
		
			
			jsonApp.put("appid", application[i].getAppid());
			json.put("name"+i, jsonApp);
			System.out.println(json);
		}
		//System.out.println(json);
		return json;
	}
	@RequestMapping("/selectAppById")
	public @ResponseBody String selectAppById(int appid){
		System.out.println(applicationService.applicationSelect(appid).getAppcontent());
		return applicationService.applicationSelect(appid).getAppcontent();
	}
	@RequestMapping("/savaContent")
	public  @ResponseBody String savaContent(int appid,String content,Model model){
		
		Application application = applicationService.applicationSelect(appid);
		application.setAppcontent(content);
		applicationService.applicationDeleteByID(appid);
		applicationService.applicationStore(application);
		return "success";
	}
	
	@RequestMapping("/delete")
	public @ResponseBody String  deleteById(int appid){
		JSONObject json = new JSONObject();
		JSONObject codeContent = new JSONObject();
		codeContent.put("status", "delete");
		codeContent.put("appid", appid);
		codeContent.put("code", "");
		json.put("type", "callService");
		json.put("comContent", codeContent);
		applicationService.applicationDeleteByID(appid);
		return json.toJSONString();
		

	}
	@RequestMapping("/sentMessageToLocal")
	public @ResponseBody String load_device_blocks(String code,int appid,Model model){
		//code.replace('\n','');
		System.out.println(code);
		
		JSONObject json = new JSONObject();
		JSONObject codeContent = new JSONObject();
		codeContent.put("status", "running");
		codeContent.put("appid", appid);
		codeContent.put("code", code);
		json.put("type", "callService");
		json.put("comContent", codeContent);
		System.out.println(json);
		return json.toJSONString();
	}
	@RequestMapping("/suspentMessageToLocal")
	public @ResponseBody String suspentMessageToLocal(String code,int appid,Model model){
		System.out.println(code+"   "+appid);
		JSONObject json = new JSONObject();
		JSONObject codeContent = new JSONObject();
		codeContent.put("status", "suspend");
		codeContent.put("appid", appid);
		codeContent.put("code", code);
		json.put("type", "callService");
		json.put("comContent", codeContent);
		return json.toJSONString();
	}
}
