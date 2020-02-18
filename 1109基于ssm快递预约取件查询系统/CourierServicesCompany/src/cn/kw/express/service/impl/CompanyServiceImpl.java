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
import cn.kw.express.service.CompanyService;

import cn.kw.express.mapper.*;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分44秒
 */

@Service
public class CompanyServiceImpl extends BaseServiceImpl<Company> implements CompanyService{
	 
	
	@Autowired
	private CompanyMapper companyMapper;
	@Override
	public BaseDao<Company> getBaseDao() {
		return companyMapper;
	}

}
