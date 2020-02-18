package cn.kw.express.pojo;

import java.io.Serializable;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月20日 16时31分44秒
 */
public class Channel implements Serializable {
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
	 *  @Fields StartAddress : startAddress
	 * 
	 * */
	private String startAddress;
	/** 
	 *  @Fields EndAddress : endAddress
	 * 
	 * */
	private String endAddress;

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
	
	public String getStartAddress() {
		return this.startAddress;
	}
	
	public void setStartAddress(String startAddress) {
		this.startAddress = startAddress;
	}
	
	public String getEndAddress() {
		return this.endAddress;
	}
	
	public void setEndAddress(String endAddress) {
		this.endAddress = endAddress;
	}
	
	
    public Channel() {
		
	}

	public Channel(Integer id ,String code ,String startAddress ,String endAddress ){
	super();
	this.id=id;
	this.code=code;
	this.startAddress=startAddress;
	this.endAddress=endAddress;
	}
	
	@Override
	public String toString() {
		return "Channel [id="+ id + ",code="+ code + ",startAddress="+ startAddress + ",endAddress="+ endAddress +  "]";
	}


}

