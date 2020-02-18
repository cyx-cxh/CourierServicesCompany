package cn.kw.express.pojo;

import java.io.Serializable;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月20日 16时31分45秒
 */
public class Province implements Serializable {
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
	
	public Integer getIsDelete() {
		return this.isDelete;
	}
	
	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}
	
	
    public Province() {
		
	}

	public Province(Integer id ,String name ,Integer isDelete ){
	super();
	this.id=id;
	this.name=name;
	this.isDelete=isDelete;
	}
	
	@Override
	public String toString() {
		return "Province [id="+ id + ",name="+ name + ",isDelete="+ isDelete +  "]";
	}


}

