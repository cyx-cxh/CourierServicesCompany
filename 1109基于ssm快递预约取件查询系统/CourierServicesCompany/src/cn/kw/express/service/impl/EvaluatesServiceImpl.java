/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月25日 20时12分28秒
 */
package cn.kw.express.service.impl;

import cn.kw.express.base.BaseDao;
import cn.kw.express.base.BaseServiceImpl;
import cn.kw.express.mapper.EvaluatesMapper;
import cn.kw.express.pojo.Evaluates;
import cn.kw.express.service.EvaluatesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月25日 20时12分28秒
 */

@Service
public class EvaluatesServiceImpl extends BaseServiceImpl<Evaluates> implements EvaluatesService{
	 
	
	@Autowired
	private EvaluatesMapper evaluatesMapper;
	@Override
	public BaseDao<Evaluates> getBaseDao() {
		return evaluatesMapper;
	}

}
