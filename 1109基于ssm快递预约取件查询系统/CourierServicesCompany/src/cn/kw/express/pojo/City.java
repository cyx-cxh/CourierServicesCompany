package cn.kw.express.pojo;

import java.io.Serializable;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月20日 16时31分44秒
 */
public class City implements Serializable {
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
	 *  @Fields ProvinceId : provinceId
	 * 
	 * */
	private Integer provinceId;
	/** 
	 *  @Fields IsDelete : isDelete
	 * 
	 * */
	private Integer isDelete;

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
	
	public Integer getProvinceId() {
		return this.provinceId;
	}
	
	public void setProvinceId(Integer provinceId) {
		this.provinceId = provinceId;
	}
	
	public Integer getIsDelete() {
		return this.isDelete;
	}
	
	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}
	
	
    public City() {
		
	}

	public City(Integer id ,String name ,Integer provinceId ,Integer isDelete ){
	super();
	this.id=id;
	this.name=name;
	this.provinceId=provinceId;
	this.isDelete=isDelete;
	}
	
	@Override
	public String toString() {
		return "City [id="+ id + ",name="+ name + ",provinceId="+ provinceId + ",isDelete="+ isDelete +  "]";
	}


}

