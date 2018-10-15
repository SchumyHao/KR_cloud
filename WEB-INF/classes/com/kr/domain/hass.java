package com.kr.domain;

public class hass {
    private Integer hassid;

    private Integer userid;

    private String hassname;

    private String hasspassword;

    private String hassip;

    public Integer getHassid() {
        return hassid;
    }

    public void setHassid(Integer hassid) {
        this.hassid = hassid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getHassname() {
        return hassname;
    }

    public void setHassname(String hassname) {
        this.hassname = hassname == null ? null : hassname.trim();
    }

    public String getHasspassword() {
        return hasspassword;
    }

    public void setHasspassword(String hasspassword) {
        this.hasspassword = hasspassword == null ? null : hasspassword.trim();
    }

    public String getHassip() {
        return hassip;
    }

    public void setHassip(String hassip) {
        this.hassip = hassip == null ? null : hassip.trim();
    }
}