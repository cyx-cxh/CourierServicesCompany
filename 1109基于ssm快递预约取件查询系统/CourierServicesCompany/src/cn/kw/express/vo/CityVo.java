package cn.kw.express.vo;

import cn.kw.express.pojo.City;
import cn.kw.express.pojo.County;
import cn.kw.express.pojo.Prescription;
import cn.kw.express.pojo.Province;

import java.io.Serializable;

/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月20日 16时31分44秒
 */
public class CityVo implements Serializable {

	private City city;
	private Province province;
	private County county;
	private Prescription prescription;
	private City ecity;
	private Province eprovince;

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}

	public County getCounty() {
		return county;
	}

	public void setCounty(County county) {
		this.county = county;
	}

	public Prescription getPrescription() {
		return prescription;
	}

	public void setPrescription(Prescription prescription) {
		this.prescription = prescription;
	}

	public City getEcity() {
		return ecity;
	}

	public void setEcity(City ecity) {
		this.ecity = ecity;
	}

	public Province getEprovince() {
		return eprovince;
	}

	public void setEprovince(Province eprovince) {
		this.eprovince = eprovince;
	}
}

