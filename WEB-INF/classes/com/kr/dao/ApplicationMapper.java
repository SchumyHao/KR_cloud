package com.kr.dao;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import com.kr.domain.Application;

@Repository
@MapperScan
public interface ApplicationMapper {
	int deleteByPrimaryKey(Integer appid);

    int insert(Application record);

    int insertSelective(Application record);

    Application selectByPrimaryKey(Integer appid);
    
    Application selectByName(String name);
    
    int updateByPrimaryKeySelective(Application record);

    int updateByPrimaryKey(Application record);
    
    Application[] selectByUserid(@Param("userid")Integer userid);

}