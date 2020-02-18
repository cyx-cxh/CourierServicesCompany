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
import cn.kw.express.service.NetworkService;

import cn.kw.express.mapper.*;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分45秒
 */

@Service
public class NetworkServiceImpl extends BaseServiceImpl<Network> implements NetworkService{
	 
	
	@Autowired
	private NetworkMapper networkMapper;
	@Override
	public BaseDao<Network> getBaseDao() {
		return networkMapper;
	}

}
