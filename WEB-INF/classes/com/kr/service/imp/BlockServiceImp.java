package com.kr.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kr.dao.BlockMapper;
import com.kr.domain.Block;
import com.kr.service.BlockService;

@Service
public class BlockServiceImp implements BlockService{
	@Autowired
	private BlockMapper blockmapper;
	
	@Override
	public Block selectByPrimaryKey(int id) {
		// TODO Auto-generated method stub
		
		return blockmapper.selectByPrimaryKey(id);
	}

	@Override
	public int selectLength() {
		// TODO Auto-generated method stub
		return blockmapper.selectLength();
	}

	@Override
	public void insert(Block block) {
		// TODO Auto-generated method stub
		blockmapper.insert(block);
		
	}

}
