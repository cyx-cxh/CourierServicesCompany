package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.City;
import cn.kw.express.pojo.Company;
import cn.kw.express.pojo.Network;
import cn.kw.express.service.CompanyService;
import cn.kw.express.service.NetworkService;
import cn.kw.express.utils.LatUtil;
import cn.kw.express.utils.Pager;
import cn.kw.express.vo.CompanyVo;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分45秒
 */


@Controller
@RequestMapping("/network")
public class NetworkController extends BaseController {
	
	
	@Autowired
	private NetworkService networkService;
	@Autowired
	private CompanyService companyService;

	/**
	 *  【不分页=》查询列表=>有条件】
	 * @Title: listByEntity
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * @param @return 设定文件 
	 * @author
	 * @return String 返回类型 
	 * @throws
	 */
	@RequestMapping(value = "/listByEntity")
	public String listByEntity(Network bean, Model model){
		List<Network> listAll = networkService.listAllByEntity(bean);
		model.addAttribute("list", listAll);
		return "network/list";
	}

	@RequestMapping(value = "/edit")
	public String edit(Integer id, Model model){
		Network obj = networkService.load(id);
		Company company = companyService.getById(obj.getCompanyId());
		CompanyVo companyVo = new CompanyVo();
		companyVo.setNetwork(obj);
		companyVo.setCompany(company);
		model.addAttribute("bean",companyVo);
		return "network/edit";
	}

	/**
	 * 分页查询 返回list对象(通过对象)
	 * @return
	 */
	@RequestMapping(value = "/findByObj")
	public String findByObj(Network bean, Model model) {
		//分页查询
		Pager<Network> pagers = networkService.findByEntity(bean);
		model.addAttribute("pagers", pagers);
		List<Network> list = pagers.getDatas();
		List<CompanyVo> list2 = new ArrayList<>();
		for	(Network network : list){
			Company company = companyService.getById(network.getCompanyId());
			CompanyVo companyVo = new CompanyVo();
			companyVo.setNetwork(network);
			companyVo.setCompany(company);
			list2.add(companyVo);
		}
		//存储查询条件
		model.addAttribute("bean", bean);
		model.addAttribute("list", list2);
		return "network/list";
	}

	/**
	 * 跳至添加页面
	 * @return
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "network/add";
	}


	/**
	 * 添加执行"redirect:/users/findByObj"
	 * @return
	 */
	@RequestMapping(value = "/exAdd")
	@ResponseBody
	public String exAdd(Network bean) {
		JSONObject jsonObject = new JSONObject();
		networkService.insert(bean);
		jsonObject.put("message", "提交成功");
		return jsonObject.toJSONString();
	}

	/**
	 * 添加修改
	 * @return
	 */
	@RequestMapping(value = "/exUpdate")
	public String exUpdate(Network bean) {
		//2.通过主键id修改
		networkService.updateById(bean);
		return "redirect:/network/findByObj";
	}

	/**
	 * 删除通过主键
	 * @return
	 */
	@RequestMapping(value = "/delete")
	public String delete(Integer id) {
		///1.通过主键删除
		networkService.deleteById(id);
		return "redirect:/network/findByObj";
	}

	/**
	 * ajax 修改
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/exUpdate.json", method = RequestMethod.POST)
	@ResponseBody
	public String exUpdateJson(Network bean) {
		networkService.updateById(bean);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "修改成功");
		return jsonObject.toJSONString();
	}

	/**
	 * ajax 删除
	 * @return
	 */
	@RequestMapping(value = "/delete.json", method = RequestMethod.POST)
	@ResponseBody
	public String exDeleteJson(Integer id) {
		///1.通过主键删除
		networkService.deleteById(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "删除成功");
		return jsonObject.toString();
	}

	@RequestMapping(value = "/getLat.json")
	@ResponseBody
	public String getLat(String address) {
		return LatUtil.getLngAndLat(address).toJSONString();
	}

	@RequestMapping(value = "getNetWorkList.json", method = RequestMethod.GET)
	@ResponseBody
	public String getNetWorkList(Integer parentId) {
		Network network = new Network();
		network.setCompanyId(parentId);
		List<Network> list = networkService.listAllByEntity(network);
		JSONArray jsonArray = new JSONArray();
		for (Network bean : list) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("key", bean.getName());
			jsonObject.put("value", bean.getId());
			jsonArray.add(jsonObject);
		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("list", jsonArray);
		return jsonObject.toJSONString();
	}
}
