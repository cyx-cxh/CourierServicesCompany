/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月20日 16时31分45秒
 */
package cn.kw.express.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.kw.express.base.*;
import cn.kw.express.pojo.*;
import cn.kw.express.service.ProvinceService;

import cn.kw.express.mapper.*;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分45秒
 */

@Service
public class ProvinceServiceImpl extends BaseServiceImpl<Province> implements ProvinceService{
	 
	
	@Autowired
	private ProvinceMapper provinceMapper;
	@Override
	public BaseDao<Province> getBaseDao() {
		return provinceMapper;
	}

}
