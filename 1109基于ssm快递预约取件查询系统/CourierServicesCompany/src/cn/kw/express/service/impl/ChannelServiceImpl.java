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
import cn.kw.express.service.ChannelService;

import cn.kw.express.mapper.*;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分44秒
 */

@Service
public class ChannelServiceImpl extends BaseServiceImpl<Channel> implements ChannelService{
	 
	
	@Autowired
	private ChannelMapper channelMapper;
	@Override
	public BaseDao<Channel> getBaseDao() {
		return channelMapper;
	}

}
