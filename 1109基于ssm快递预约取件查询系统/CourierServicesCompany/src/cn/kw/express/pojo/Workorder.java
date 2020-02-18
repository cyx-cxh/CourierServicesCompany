package cn.kw.express.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月25日 20时54分17秒
 */
public class Workorder implements Serializable {
    private static final long serialVersionUID = 3148176768559230877L;
    

	/** 
	 *  @Fields Id : id
	 * 
	 * */
	private Integer id;
	/** 
	 *  @Fields Code : code
	 * 
	 * */
	private String code;
	/** 
	 *  @Fields State : state
	 * 
	 * */
	private Integer state;
	/** 
	 *  @Fields Weight : weight
	 * 
	 * */
	private Double weight;
	/** 
	 *  @Fields Jg : jg
	 * 
	 * */
	private Double jg;
	/** 
	 *  @Fields IsQj : isQj
	 * 
	 * */
	private Integer isQj;
	/** 
	 *  @Fields IsPj : isPj
	 * 
	 * */
	private Integer isPj;
	/** 
	 *  @Fields ExpressPersonId : expressPersonId
	 * 
	 * */
	private Integer expressPersonId;
	/** 
	 *  @Fields ChannelId : channelId
	 * 
	 * */
	private Integer channelId;
	/** 
	 *  @Fields CompanyId : companyId
	 * 
	 * */
	private Integer companyId;
	/** 
	 *  @Fields NetworkId : networkId
	 * 
	 * */
	private Integer networkId;
	/** 
	 *  @Fields Addtime : addtime
	 * 
	 * */
	private Date addtime;
	/** 
	 *  @Fields UsersId : usersId
	 * 
	 * */
	private Integer usersId;
	/** 
	 *  @Fields Sjr : sjr
	 * 
	 * */
	private Integer sjr;
	/** 
	 *  @Fields SjrName : sjrName
	 * 
	 * */
	private String sjrName;
	/** 
	 *  @Fields SjrAddress : sjrAddress
	 * 
	 * */
	private String sjrAddress;
	private String sjrPhone;

	public Integer getId() {
		return this.id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getCode() {
		return this.code;
	}
	
	public void setCode(String code) {
		this.code = code;
	}
	
	public Integer getState() {
		return this.state;
	}
	
	public void setState(Integer state) {
		this.state = state;
	}
	
	public Double getWeight() {
		return this.weight;
	}
	
	public void setWeight(Double weight) {
		this.weight = weight;
	}
	
	public Double getJg() {
		return this.jg;
	}
	
	public void setJg(Double jg) {
		this.jg = jg;
	}
	
	public Integer getIsQj() {
		return this.isQj;
	}
	
	public void setIsQj(Integer isQj) {
		this.isQj = isQj;
	}
	
	public Integer getIsPj() {
		return this.isPj;
	}
	
	public void setIsPj(Integer isPj) {
		this.isPj = isPj;
	}
	
	public Integer getExpressPersonId() {
		return this.expressPersonId;
	}
	
	public void setExpressPersonId(Integer expressPersonId) {
		this.expressPersonId = expressPersonId;
	}
	
	public Integer getChannelId() {
		return this.channelId;
	}
	
	public void setChannelId(Integer channelId) {
		this.channelId = channelId;
	}
	
	public Integer getCompanyId() {
		return this.companyId;
	}
	
	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}
	
	public Integer getNetworkId() {
		return this.networkId;
	}
	
	public void setNetworkId(Integer networkId) {
		this.networkId = networkId;
	}
	
	public Date getAddtime() {
		return this.addtime;
	}
	
	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}	
	
	public Integer getUsersId() {
		return this.usersId;
	}
	
	public void setUsersId(Integer usersId) {
		this.usersId = usersId;
	}
	
	public Integer getSjr() {
		return this.sjr;
	}
	
	public void setSjr(Integer sjr) {
		this.sjr = sjr;
	}
	
	public String getSjrName() {
		return this.sjrName;
	}
	
	public void setSjrName(String sjrName) {
		this.sjrName = sjrName;
	}
	
	public String getSjrAddress() {
		return this.sjrAddress;
	}
	
	public void setSjrAddress(String sjrAddress) {
		this.sjrAddress = sjrAddress;
	}

	public String getSjrPhone() {
		return sjrPhone;
	}

	public void setSjrPhone(String sjrPhone) {
		this.sjrPhone = sjrPhone;
	}

	public Workorder() {
		
	}

	public Workorder(Integer id ,String code ,Integer state ,Double weight ,Double jg ,Integer isQj ,Integer isPj ,Integer expressPersonId ,Integer channelId ,Integer companyId ,Integer networkId ,Date addtime ,Integer usersId ,Integer sjr ,String sjrName ,String sjrAddress, String sjrPhone ){
	super();
	this.id=id;
	this.code=code;
	this.state=state;
	this.weight=weight;
	this.jg=jg;
	this.isQj=isQj;
	this.isPj=isPj;
	this.expressPersonId=expressPersonId;
	this.channelId=channelId;
	this.companyId=companyId;
	this.networkId=networkId;
	this.addtime=addtime;
	this.usersId=usersId;
	this.sjr=sjr;
	this.sjrName=sjrName;
	this.sjrAddress=sjrAddress;
	this.sjrPhone=sjrPhone;
	}
	
	@Override
	public String toString() {
		return "Workorder [id="+ id + ",code="+ code + ",state="+ state + ",weight="+ weight + ",jg="+ jg + ",isQj="+ isQj + ",isPj="+ isPj + ",expressPersonId="+ expressPersonId + ",channelId="+ channelId + ",companyId="+ companyId + ",networkId="+ networkId + ",addtime="+ addtime + ",usersId="+ usersId + ",sjr="+ sjr + ",sjrName="+ sjrName + ",sjrAddress="+ sjrAddress + ",sjrPhone="+ sjrPhone + "]";
	}


}

