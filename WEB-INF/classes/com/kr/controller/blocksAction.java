package com.kr.controller;

import java.io.File;
//import java.io.FileOutputStream;
import java.io.IOException;
//import java.io.OutputStreamWriter;








import javax.servlet.http.HttpServletRequest;

//import org.apache.commons.io.FileUtils;


















import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.kr.domain.Block;
import com.kr.service.BlockService;

@Controller
@RequestMapping("/blocks")

public class blocksAction {
	@Autowired
	private BlockService blockservice;
	@Autowired
	private UserAction useraction;
	
	//静态block块存入数据库
	@RequestMapping("/load_static_blocks")
	public @ResponseBody  JSONObject load_static_blocks(Model model,HttpServletRequest request) throws IOException{
		JSONObject json = new JSONObject();
		//获取block块的地址
		String path = request.getSession().getServletContext().getRealPath("");
		path = path+ "\\static\\static_blocks";
		
		File[] filelist = new File(path).listFiles();
		int index = 0 ; //索引大的json
		for(File fl:filelist){
			File[] filename = fl.listFiles();
			
			for(File fn:filename){
				
				if(!fn.isDirectory()){
					String content = FileUtils.readFileToString(fn,"UTF-8");
					JSONObject jsonBlock = JSON.parseObject(content);
					String domain = fl.getName();
					String service = fn.getName().substring(0,fn.getName().lastIndexOf("."));
					
					jsonBlock.put("domain", domain);
					jsonBlock.put("service", service);
					Block block = new Block();
					//block.setBlockid(index);
					block.setBlockcontent(jsonBlock.toJSONString());
					blockservice.insert(block);
					index = index +1 ;
					//System.out.print(jsonBlock);
					//System.out.println("\'"+index+"\'");
					json.put("name"+index, jsonBlock);
				}else if(fn.isDirectory()){
					
					File[] filenameChild = fn.listFiles();
					
					for(File f:filenameChild){
						
						String content = FileUtils.readFileToString(f,"UTF-8");
						JSONObject jsonBlock = JSON.parseObject(content);
						String domain = fn.getName();
						String service = f.getName().substring(0,f.getName().lastIndexOf("."));
						
						jsonBlock.put("domain", domain);
						jsonBlock.put("service", service);
						Block block = new Block();
						//block.setBlockid(index);
						block.setBlockcontent(jsonBlock.toJSONString());
						blockservice.insert(block);
						index = index +1 ;
						json.put("\'"+index+"\'", jsonBlock);
						//System.out.print(jsonBlock);
					}
				}else{
					return json;
				}
			}
		}
		
		 //FileOutputStream fio = new FileOutputStream("f:\\json.txt");
		//OutputStreamWriter writer=new OutputStreamWriter(fio, "utf-8");
		//writer.write(json.toString());
		//writer.close();
		//fio.close();
		//System.out.println(json.toJSONString());
		System.out.println(json);
		return json;
		
	
	}
	@RequestMapping("/load_sql_blocks")
	public @ResponseBody  JSONObject load_sql_blocks(Model model){
		JSONObject json = new JSONObject();
		//获取block块的地址
		//String path = request.getSession().getServletContext().getRealPath("");
		//path = path+ "\\static\\static_blocks";
		
		//File[] filelist = new File(path).listFiles();
		int index = blockservice.selectLength(); //索引大的json
		String content = "";
		Integer intx = 0;
		for(int i = 0;i < index;i++){
			intx = intx+1;
			content = blockservice.selectByPrimaryKey(intx).getBlockcontent();
			if(content != null){
			//System.out.println(content);
			JSONObject jsonBlock = JSON.parseObject(content);
			
			json.put("name"+intx, jsonBlock);
			}
		}
		
		return json;
		
	
	}
	@RequestMapping("/load_device_blocks")
	public @ResponseBody JSONObject load_device_blocks(Model model){
		JSONObject json = new JSONObject();
		json.put("type", "getDevices");
		json.put("comContent", "");
		return json;
	}
}
