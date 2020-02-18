package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.Company;
import cn.kw.express.pojo.Expressperson;
import cn.kw.express.pojo.Network;
import cn.kw.express.service.CompanyService;
import cn.kw.express.service.ExpresspersonService;
import cn.kw.express.service.NetworkService;
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

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分44秒
 */


@Controller
@RequestMapping("/expressperson")
public class ExpresspersonController extends BaseController {
	
	
	/**
	 * 依赖注入 start dao/service/===
	 */
	@Autowired
	private ExpresspersonService expresspersonService;
	@Autowired
	private CompanyService companyService;
	@Autowired
	private NetworkService networkService;

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
	public String listByEntity(Expressperson bean, Model model){
		List<Expressperson> listAll = expresspersonService.listAllByEntity(bean);
		model.addAttribute("list", listAll);
		return "expressperson/list";
	}

	@RequestMapping(value = "/edit")
	public String edit(Integer id, Model model){
		Expressperson obj = expresspersonService.load(id);
		model.addAttribute("bean",obj);
		return "expressperson/edit";
	}

	/**
	 * 分页查询 返回list对象(通过对象)
	 * @return
	 */
	@RequestMapping(value = "/findByObj")
	public String findByObj(Expressperson bean, Model model) {
		//分页查询
		Pager<Expressperson> pagers = expresspersonService.findByEntity(bean);
		model.addAttribute("pagers", pagers);
		List<Expressperson> list = pagers.getDatas();
		List<CompanyVo> list2 = new ArrayList<>();
		for	(Expressperson expressperson : list){
			Company company = companyService.getById(expressperson.getCompanyId());
			Network network = networkService.getById(expressperson.getNetworkId());
			CompanyVo companyVo = new CompanyVo();
			companyVo.setNetwork(network);
			companyVo.setCompany(company);
			companyVo.setExpressperson(expressperson);
			list2.add(companyVo);
		}
		//存储查询条件
		model.addAttribute("bean", bean);
		model.addAttribute("list", list2);
		return "expressperson/list";
	}

	/**
	 * 跳至添加页面
	 * @return
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "expressperson/add";
	}


	/**
	 * 添加执行"redirect:/users/findByObj"
	 * @return
	 */
	@RequestMapping(value = "/exAdd")
	@ResponseBody
	public String exAdd(Expressperson bean) {
		JSONObject jsonObject = new JSONObject();
		if (notEmpty(bean)){
			Expressperson expressperson = new Expressperson();
			expressperson.setName(bean.getName());
			expressperson = expresspersonService.getByEntity(expressperson);
			if (notEmpty(expressperson)){
				jsonObject.put("message", "登录名重复");
				jsonObject.put("flag", false);
			} else {
				expresspersonService.insert(bean);
				jsonObject.put("message", "提交成功");
				jsonObject.put("flag", true);
			}
		}
		return jsonObject.toString();
	}

	@RequestMapping(value = "/exUpdate.json")
	@ResponseBody
	public String exUpdate(Expressperson bean) {
		JSONObject jsonObject = new JSONObject();
		if (notEmpty(bean)){
			expresspersonService.updateById(bean);
			jsonObject.put("message", "修改成功");
			jsonObject.put("flag", true);
		}
		return jsonObject.toString();
	}

	/**
	 * 【不分页 => 查询列表 => 无条件】
	 * @Title: listAll
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * @param @return 设定文件
	 * @author
	 * @return String 返回类型
	 * @throws
	 */
	@RequestMapping(value = "/listAllJson", method = RequestMethod.POST)
	@ResponseBody
	public String listAllJson(Expressperson bean){
		List<Expressperson> listAll = expresspersonService.listAll();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("list", listAll);
		jsonObject.put("obj", bean);
		return jsonObject.toString();
	}

	/**
	 * ajax 删除
	 * @return
	 */
	@RequestMapping(value = "/delete.json", method = RequestMethod.POST)
	@ResponseBody
	public String exDeleteJson(Integer id) {
		///1.通过主键删除
		expresspersonService.deleteById(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "删除成功");
		return jsonObject.toString();
	}

	@RequestMapping(value = "getExpresspersonList.json", method = RequestMethod.GET)
	@ResponseBody
	public String getExpresspersonList(Integer parentId) {
		Expressperson expressperson = new Expressperson();
		expressperson.setId(parentId);
		List<Expressperson> list = expresspersonService.listAllByEntity(expressperson);
		JSONArray jsonArray = new JSONArray();
		for (Expressperson bean : list) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("key", bean.getRealName());
			jsonObject.put("value", bean.getRealName());
			jsonArray.add(jsonObject);
		}
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("list", jsonArray);
		return jsonObject.toJSONString();
	}
}
