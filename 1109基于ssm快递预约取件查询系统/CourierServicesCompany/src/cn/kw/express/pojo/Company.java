package cn.kw.express.pojo;

import java.io.Serializable;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月20日 16时31分44秒
 */
public class Company implements Serializable {
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
	 *  @Fields Phone : phone
	 * 
	 * */
	private String phone;
	/** 
	 *  @Fields Photo : photo
	 * 
	 * */
	private String photo;
	/** 
	 *  @Fields Type : type
	 * 
	 * */
	private String type;
	private String bz;
	private Integer fy;

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
	
	public String getPhone() {
		return this.phone;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String getPhoto() {
		return this.photo;
	}
	
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
	public String getType() {
		return this.type;
	}
	
	public void setType(String type) {
		this.type = type;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}

	public Integer getFy() {
		return fy;
	}

	public void setFy(Integer fy) {
		this.fy = fy;
	}

	public Company() {
		
	}

	public Company(Integer id ,String code ,String name ,String phone ,String photo ,String type,String bz, Integer fy ){
	super();
	this.id=id;
	this.code=code;
	this.name=name;
	this.phone=phone;
	this.photo=photo;
	this.type=type;
	this.bz=bz;
	this.fy=fy;
	}
	
	@Override
	public String toString() {
		return "Company [id="+ id + ",code="+ code + ",name="+ name + ",phone="+ phone + ",photo="+ photo + ",type="+ type + ",bz="+ bz + ",fy="+ fy +"]";
	}


}

