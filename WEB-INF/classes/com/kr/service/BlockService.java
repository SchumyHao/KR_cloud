package com.kr.service;

import org.springframework.stereotype.Service;

import com.kr.domain.Block;

@Service
public interface BlockService {
	
	Block selectByPrimaryKey(int id);
	
	int selectLength();
	
	void insert(Block block);
}
