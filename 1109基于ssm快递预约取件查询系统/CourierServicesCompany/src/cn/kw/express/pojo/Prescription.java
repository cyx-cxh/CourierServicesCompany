package cn.kw.express.pojo;

import java.io.Serializable;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月21日 20时48分38秒
 */
public class Prescription implements Serializable {
    private static final long serialVersionUID = 3148176768559230877L;
    

	/** 
	 *  @Fields Id : id
	 * 
	 * */
	private Integer id;
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
	 *  @Fields Time : time
	 * 
	 * */
	private Integer time;
	/** 
	 *  @Fields Jg : jg
	 * 
	 * */
	private Double jg;
	/** 
	 *  @Fields EndProvinceId : endProvinceId
	 * 
	 * */
	private Integer endProvinceId;
	/** 
	 *  @Fields EndCityId : endCityId
	 * 
	 * */
	private Integer endCityId;
	private String companyId;



	public Integer getId() {
		return this.id;
	}
	
	public void setId(Integer id) {
		this.id = id;
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
	
	public Integer getTime() {
		return this.time;
	}
	
	public void setTime(Integer time) {
		this.time = time;
	}
	
	public Double getJg() {
		return this.jg;
	}
	
	public void setJg(Double jg) {
		this.jg = jg;
	}
	
	public Integer getEndProvinceId() {
		return this.endProvinceId;
	}
	
	public void setEndProvinceId(Integer endProvinceId) {
		this.endProvinceId = endProvinceId;
	}
	
	public Integer getEndCityId() {
		return this.endCityId;
	}
	
	public void setEndCityId(Integer endCityId) {
		this.endCityId = endCityId;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public Prescription() {
		
	}

	public Prescription(Integer id ,Integer provinceId ,Integer cityId ,Integer time ,Double jg ,Integer endProvinceId ,Integer endCityId, String companyId ){
	super();
	this.id=id;
	this.provinceId=provinceId;
	this.cityId=cityId;
	this.time=time;
	this.jg=jg;
	this.endProvinceId=endProvinceId;
	this.endCityId=endCityId;
	this.companyId=companyId;
	}
	
	@Override
	public String toString() {
		return "Prescription [id="+ id + ",provinceId="+ provinceId + ",cityId="+ cityId + ",time="+ time + ",jg="+ jg + ",endProvinceId="+ endProvinceId + ",endCityId="+ endCityId +  ",endCityId="+ endCityId +"]";
	}


}

