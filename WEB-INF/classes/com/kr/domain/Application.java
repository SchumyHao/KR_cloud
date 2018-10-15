package com.kr.domain;

public class Application {
    private Integer appid;

    private Integer userid;

    private String appcontent;

    private String appname;

    private String appdescribtion;

    private String appauthor;

    private String appauthoremails;

    private String appauthorimg;

    private byte[] appimg;

    public Integer getAppid() {
        return appid;
    }

    public void setAppid(Integer appid) {
        this.appid = appid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getAppcontent() {
        return appcontent;
    }

    public void setAppcontent(String appcontent) {
        this.appcontent = appcontent == null ? null : appcontent.trim();
    }

    public String getAppname() {
        return appname;
    }

    public void setAppname(String appname) {
        this.appname = appname == null ? null : appname.trim();
    }

    public String getAppdescribtion() {
        return appdescribtion;
    }

    public void setAppdescribtion(String appdescribtion) {
        this.appdescribtion = appdescribtion == null ? null : appdescribtion.trim();
    }

    public String getAppauthor() {
        return appauthor;
    }

    public void setAppauthor(String appauthor) {
        this.appauthor = appauthor == null ? null : appauthor.trim();
    }

    public String getAppauthoremails() {
        return appauthoremails;
    }

    public void setAppauthoremails(String appauthoremails) {
        this.appauthoremails = appauthoremails == null ? null : appauthoremails.trim();
    }

    public String getAppauthorimg() {
        return appauthorimg;
    }

    public void setAppauthorimg(String appauthorimg) {
        this.appauthorimg = appauthorimg == null ? null : appauthorimg.trim();
    }

    public byte[] getAppimg() {
        return appimg;
    }

    public void setAppimg(byte[] appimg) {
        this.appimg = appimg;
    }
}