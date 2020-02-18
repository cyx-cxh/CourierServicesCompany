/**
 * @ClassName:  
 * @Description: 
 * @author administrator
 * @date - 2018年10月21日 20时02分14秒
 */
package cn.kw.express.service.impl;

import cn.kw.express.base.BaseDao;
import cn.kw.express.base.BaseServiceImpl;
import cn.kw.express.mapper.PrescriptionMapper;
import cn.kw.express.pojo.Prescription;
import cn.kw.express.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月21日 20时02分14秒
 */

@Service
public class PrescriptionServiceImpl extends BaseServiceImpl<Prescription> implements PrescriptionService{
	 
	
	@Autowired
	private PrescriptionMapper prescriptionMapper;
	@Override
	public BaseDao<Prescription> getBaseDao() {
		return prescriptionMapper;
	}

}
