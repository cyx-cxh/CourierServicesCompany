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
import cn.kw.express.service.UsersService;

import cn.kw.express.mapper.*;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分45秒
 */

@Service
public class UsersServiceImpl extends BaseServiceImpl<Users> implements UsersService{
	 
	
	@Autowired
	private UsersMapper usersMapper;
	@Override
	public BaseDao<Users> getBaseDao() {
		return usersMapper;
	}

}
