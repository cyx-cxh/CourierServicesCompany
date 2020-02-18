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
import cn.kw.express.service.WorkorderService;

import cn.kw.express.mapper.*;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分45秒
 */

@Service
public class WorkorderServiceImpl extends BaseServiceImpl<Workorder> implements WorkorderService{
	 
	
	@Autowired
	private WorkorderMapper workorderMapper;
	@Override
	public BaseDao<Workorder> getBaseDao() {
		return workorderMapper;
	}

}
