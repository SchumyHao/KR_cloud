package com.kr.domain;

public class Block {
    private Integer blockid;

    private String blockcontent;

    public Integer getBlockid() {
        return blockid;
    }

    public void setBlockid(Integer blockid) {
        this.blockid = blockid;
    }

    public String getBlockcontent() {
        return blockcontent;
    }

    public void setBlockcontent(String blockcontent) {
        this.blockcontent = blockcontent == null ? null : blockcontent.trim();
    }
}