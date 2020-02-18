package cn.kw.express.pojo;

import java.io.Serializable;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月20日 16时31分45秒
 */
public class Users implements Serializable {
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
	 *  @Fields Name : name
	 *
	 * */
	private String name;
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
	/**
	 *  @Fields Yx : yx
	 *
	 * */
	private String yx;
	/**
	 *  @Fields Sex : sex
	 *
	 * */
	private Integer sex;
	/**
	 *  @Fields Phone : phone
	 *
	 * */
	private String phone;
	/** 
	 *  @Fields ProvinceId : provinceId
	 * 
	 * */
	private Integer provinceId;
	/** 
	 *  @Fields CityId : cityId
	 * 
	 * */
	private Integer cityId;
	/** 
	 *  @Fields CountyId : countyId
	 * 
	 * */
	private Integer countyId;
	/** 
	 *  @Fields Address : address
	 * 
	 * */
	private String address;
	/** 
	 *  @Fields Role : role
	 * 
	 * */
	private Integer role;

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
	
	public String getName() {
		return this.name;
	}
	
	public void setName(String name) {
		this.name = name;
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
	
	public String getYx() {
		return this.yx;
	}
	
	public void setYx(String yx) {
		this.yx = yx;
	}
	
	public Integer getSex() {
		return this.sex;
	}
	
	public void setSex(Integer sex) {
		this.sex = sex;
	}
	
	public String getPhone() {
		return this.phone;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public Integer getProvinceId() {
		return this.provinceId;
	}
	
	public void setProvinceId(Integer provinceId) {
		this.provinceId = provinceId;
	}
	
	public Integer getCityId() {
		return this.cityId;
	}
	
	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}
	
	public Integer getCountyId() {
		return this.countyId;
	}
	
	public void setCountyId(Integer countyId) {
		this.countyId = countyId;
	}
	
	public String getAddress() {
		return this.address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public Integer getRole() {
		return this.role;
	}
	
	public void setRole(Integer role) {
		this.role = role;
	}
	
	
    public Users() {
		
	}

	public Users(Integer id ,String code ,String name ,String realName ,String pw ,String yx ,Integer sex ,String phone ,Integer provinceId ,Integer cityId ,Integer countyId ,String address ,Integer role ){
	super();
	this.id=id;
	this.code=code;
	this.name=name;
	this.realName=realName;
	this.pw=pw;
	this.yx=yx;
	this.sex=sex;
	this.phone=phone;
	this.provinceId=provinceId;
	this.cityId=cityId;
	this.countyId=countyId;
	this.address=address;
	this.role=role;
	}
	
	@Override
	public String toString() {
		return "Users [id="+ id + ",code="+ code + ",name="+ name + ",realName="+ realName + ",pw="+ pw + ",yx="+ yx + ",sex="+ sex + ",phone="+ phone + ",provinceId="+ provinceId + ",cityId="+ cityId + ",countyId="+ countyId + ",address="+ address + ",role="+ role +  "]";
	}


}

