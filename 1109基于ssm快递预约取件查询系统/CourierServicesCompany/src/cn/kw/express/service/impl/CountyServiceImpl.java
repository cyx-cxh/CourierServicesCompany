/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月20日 16时31分44秒
 */
package cn.kw.express.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.kw.express.base.*;
import cn.kw.express.pojo.*;
import cn.kw.express.service.CountyService;

import cn.kw.express.mapper.*;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分44秒
 */

@Service
public class CountyServiceImpl extends BaseServiceImpl<County> implements CountyService{
	 
	
	@Autowired
	private CountyMapper countyMapper;
	@Override
	public BaseDao<County> getBaseDao() {
		return countyMapper;
	}

}
