package cn.kw.express.pojo;

import java.io.Serializable;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月20日 16时31分45秒
 */
public class Network implements Serializable {
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
	 *  @Fields Address : address
	 * 
	 * */
	private String address;
	/** 
	 *  @Fields Lng : lng
	 * 
	 * */
	private Double lng;
	/** 
	 *  @Fields Lat : lat
	 * 
	 * */
	private Double lat;
	/** 
	 *  @Fields CompanyId : companyId
	 * 
	 * */
	private Integer companyId;

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
	
	public String getAddress() {
		return this.address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public Double getLng() {
		return this.lng;
	}
	
	public void setLng(Double lng) {
		this.lng = lng;
	}
	
	public Double getLat() {
		return this.lat;
	}
	
	public void setLat(Double lat) {
		this.lat = lat;
	}
	
	public Integer getCompanyId() {
		return this.companyId;
	}
	
	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}
	
	
    public Network() {
		
	}

	public Network(Integer id ,String name ,String phone ,String address ,Double lng ,Double lat ,Integer companyId ){
	super();
	this.id=id;
	this.name=name;
	this.phone=phone;
	this.address=address;
	this.lng=lng;
	this.lat=lat;
	this.companyId=companyId;
	}
	
	@Override
	public String toString() {
		return "Network [id="+ id + ",name="+ name + ",phone="+ phone + ",address="+ address + ",lng="+ lng + ",lat="+ lat + ",companyId="+ companyId +  "]";
	}


}

