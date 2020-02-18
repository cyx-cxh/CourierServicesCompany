package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.*;
import cn.kw.express.service.*;
import cn.kw.express.utils.Pager;
import cn.kw.express.vo.SessionUser;
import cn.kw.express.vo.WorkOrderNVo;
import com.alibaba.fastjson.JSONObject;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.*;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分45秒
 */


@Controller
@RequestMapping("/workorder")
public class WorkorderController extends BaseController {
	
	
	@Autowired
	private WorkorderService workorderService;
	@Autowired
	private ExpresspersonService expresspersonService;
	@Autowired
	private ChannelService channelService;
	@Autowired
	private UsersService usersService;
	@Autowired
	private NetworkService networkService;
	
	/**
	 * 获取物流公司
	 * @param bean
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/findByObj")
	public String findByObj(Workorder bean, Model model, HttpServletRequest request) {
		//分页查询
		SessionUser users = (SessionUser) request.getSession().getAttribute("user");
		Pager<Workorder> list1 = new Pager<>();
		if (empty(users)){
			return "redirect:../login";
		} else if (users.getRole() == 0){
			list1 = workorderService.findByEntity(bean);
		} else {
			bean.getCompanyId();
			list1 = workorderService.findByEntity(bean);
		}
		List<WorkOrderNVo> workorderList = new ArrayList<>();
		for (Workorder workorder : list1.getDatas()){
			WorkOrderNVo workOrderNVo = new WorkOrderNVo();
			workOrderNVo.setChannel(channelService.getById(workorder.getChannelId()));
			workOrderNVo.setWorkorder(workorder);
			workOrderNVo.setUsers(usersService.getById(workorder.getUsersId()));
			workOrderNVo.setNetwork(networkService.getById(workorder.getNetworkId()));
			workorderList.add(workOrderNVo);
		}
		//存储查询条件
		model.addAttribute("bean", bean);
		model.addAttribute("pagers", list1);
		model.addAttribute("list", workorderList);
		return "workorder/list";
	}

	/**
	 * 跳至添加页面
	 * @return
	 */
	@RequestMapping(value = "/add")
	public String add(Integer id, Model model) {
		model.addAttribute("bean", workorderService.getById(id));
		return "workorder/add";
	}

	/**
	 * ajax 修改
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/exUpdate.json", method = RequestMethod.POST)
	@ResponseBody
	public String exUpdateJson(Workorder workorder, HttpServletRequest request) {
		workorder.setIsQj(1);
		SessionUser sessionUser = (SessionUser) request.getSession().getAttribute("user");
		workorder.setExpressPersonId(sessionUser.getId());
		workorder.setNetworkId(sessionUser.getNetworkId());
		workorderService.updateById(workorder);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "取件成功");
		return jsonObject.toJSONString();
	}

	/**
	 * ajax 删除
	 * @return
	 */
	@RequestMapping(value = "/delete.json", method = RequestMethod.POST)
	@ResponseBody
	public String exDeleteJson(Integer id, Model model) {
		///1.通过主键删除
		workorderService.deleteById(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "删除成功");
		return jsonObject.toString();
	}
}
