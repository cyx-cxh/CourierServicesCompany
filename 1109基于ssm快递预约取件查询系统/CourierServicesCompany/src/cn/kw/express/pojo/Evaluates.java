package cn.kw.express.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月25日 20时12分28秒
 */
public class Evaluates implements Serializable {
    private static final long serialVersionUID = 3148176768559230877L;
    

	/** 
	 *  @Fields Id : id
	 * 
	 * */
	private Integer id;
	/** 
	 *  @Fields AddTime : addTime
	 * 
	 * */
	private Date addTime;
	/** 
	 *  @Fields Pf : pf
	 * 
	 * */
	private double pf;
	/** 
	 *  @Fields WorkId : workId
	 * 
	 * */
	private Integer workId;
	/** 
	 *  @Fields Bz : bz
	 * 
	 * */
	private String bz;

	private Integer usersId;

	public Integer getId() {
		return this.id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public Date getAddTime() {
		return this.addTime;
	}
	
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}	
	
	public double getPf() {
		return this.pf;
	}
	
	public void setPf(double pf) {
		this.pf = pf;
	}
	
	public Integer getWorkId() {
		return this.workId;
	}
	
	public void setWorkId(Integer workId) {
		this.workId = workId;
	}
	
	public String getBz() {
		return this.bz;
	}
	
	public void setBz(String bz) {
		this.bz = bz;
	}

	public Integer getUsersId() {
		return usersId;
	}

	public void setUsersId(Integer usersId) {
		this.usersId = usersId;
	}

	public Evaluates() {
		
	}

	public Evaluates(Integer id ,Date addTime ,double pf ,Integer workId ,String bz, Integer usersId ){
	super();
	this.id=id;
	this.addTime=addTime;
	this.pf=pf;
	this.workId=workId;
	this.bz=bz;
	this.usersId=usersId;
	}
	
	@Override
	public String toString() {
		return "Evaluates [id="+ id + ",addTime="+ addTime + ",pf="+ pf + ",workId="+ workId + ",bz="+ bz +  ",usersId="+ usersId + "]";
	}


}

