package cn.kw.express.vo;

import cn.kw.express.pojo.*;

import java.io.Serializable;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月20日 16时31分44秒
 */
public class CompanyVo implements Serializable {

	private Company company;

	private Network network;
	private Expressperson expressperson;

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Network getNetwork() {
		return network;
	}

	public void setNetwork(Network network) {
		this.network = network;
	}

	public Expressperson getExpressperson() {
		return expressperson;
	}

	public void setExpressperson(Expressperson expressperson) {
		this.expressperson = expressperson;
	}
}

