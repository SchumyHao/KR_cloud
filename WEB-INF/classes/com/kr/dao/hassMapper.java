package com.kr.dao;

import org.mybatis.spring.annotation.MapperScan;

import com.kr.domain.hass;
@MapperScan
public interface hassMapper {
    int deleteByPrimaryKey(Integer hassid);

    int insert(hass record);

    int insertSelective(hass record);

    hass selectByPrimaryKey(Integer hassid);

    int updateByPrimaryKeySelective(hass record);

    int updateByPrimaryKey(hass record);
}