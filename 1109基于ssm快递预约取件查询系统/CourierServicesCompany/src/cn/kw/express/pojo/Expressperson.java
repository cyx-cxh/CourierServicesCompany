package cn.kw.express.pojo;

import java.io.Serializable;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月22日 20时17分34秒
 */
public class Expressperson implements Serializable {
    private static final long serialVersionUID = 3148176768559230877L;
    

	/** 
	 *  @Fields Id : id
	 * 
	 * */
	private Integer id;
	/**
	 *  @Fields Name : name
	 *
	 * */
	private String name;
	/**
	 *  @Fields Phone : phone
	 *
	 * */
	private String phone;
	/**
	 *  @Fields Sex : sex
	 *
	 * */
	private Integer sex;
	/** 
	 *  @Fields NetworkId : networkId
	 * 
	 * */
	private Integer networkId;
	/** 
	 *  @Fields CompanyId : companyId
	 * 
	 * */
	private Integer companyId;
	/**
	 *  @Fields RealName : realName
	 *
	 * */
	private String realName;
	/**
	 *  @Fields Pw : pw
	 *
	 * */
	private String pw;

	public Integer getId() {
		return this.id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Integer getSex() {
		return this.sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}
	
	public Integer getNetworkId() {
		return this.networkId;
	}
	
	public void setNetworkId(Integer networkId) {
		this.networkId = networkId;
	}
	
	public Integer getCompanyId() {
		return this.companyId;
	}
	
	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public String getRealName() {
		return this.realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getPw() {
		return this.pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}
	
	
    public Expressperson() {
		
	}

	public Expressperson(Integer id ,String name ,String phone ,Integer sex ,Integer networkId ,Integer companyId ,String realName ,String pw ){
	super();
	this.id=id;
	this.name=name;
	this.phone=phone;
	this.sex=sex;
	this.networkId=networkId;
	this.companyId=companyId;
	this.realName=realName;
	this.pw=pw;
	}
	
	@Override
	public String toString() {
		return "Expressperson [id="+ id + ",name="+ name + ",phone="+ phone + ",sex="+ sex + ",networkId="+ networkId + ",companyId="+ companyId + ",realName="+ realName + ",pw="+ pw +  "]";
	}


}

