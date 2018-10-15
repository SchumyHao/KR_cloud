package com.kr.dao;

import org.mybatis.spring.annotation.MapperScan;

import com.kr.domain.Block;
@MapperScan
public interface BlockMapper {
    int deleteByPrimaryKey(Integer blockid);

    int insert(Block record);

    int insertSelective(Block record);

    Block selectByPrimaryKey(Integer blockid);

    int updateByPrimaryKeySelective(Block record);

    int updateByPrimaryKey(Block record);
    
    int selectLength();
}