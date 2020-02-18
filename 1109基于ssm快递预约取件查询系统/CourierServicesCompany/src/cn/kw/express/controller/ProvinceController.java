package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.Province;
import cn.kw.express.pojo.Users;
import cn.kw.express.service.ProvinceService;
import cn.kw.express.utils.Pager;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分45秒
 */


@Controller
@RequestMapping("/province")
public class ProvinceController extends BaseController {
	
	
	/**
	 * 依赖注入 start dao/service/===
	 */
	@Autowired
	private ProvinceService provinceService;

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
	public String listByEntity(Province bean, Model model){
		List<Province> listAll = provinceService.listAllByEntity(bean);
		model.addAttribute("list", listAll);
		return "province/list";
	}

	@RequestMapping(value = "/edit")
	public String edit(Integer id, Model model){
		Province obj = provinceService.load(id);
		model.addAttribute("bean",obj);
		return "province/edit";
	}

	/**
	 * 分页查询 返回list对象(通过对象)
	 * @return
	 */
	@RequestMapping(value = "/findByObj")
	public String findByObj(Province bean, Model model) {
		//分页查询
		Pager<Province> pagers = provinceService.findByEntity(bean);
		model.addAttribute("pagers", pagers);
		//存储查询条件
		model.addAttribute("bean", bean);
		return "province/list";
	}

	/**
	 * 跳至添加页面
	 * @return
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "province/add";
	}


	/**
	 * 添加执行"redirect:/users/findByObj"
	 * @return
	 */
	@RequestMapping(value = "/exAdd")
	@ResponseBody
	public String exAdd(Province bean) {
		JSONObject jsonObject = new JSONObject();
		if (notEmpty(bean)){
			Province province = new Province();
			province.setName(bean.getName());
			province = provinceService.getByEntity(bean);
			if (notEmpty(province)){
				jsonObject.put("message", "登录名重复");
				jsonObject.put("flag", false);
			} else {
				provinceService.insert(bean);
				jsonObject.put("message", "提交成功");
				jsonObject.put("flag", true);
			}
		}
		return jsonObject.toString();
	}

	/**
	 * 添加修改
	 * @return
	 */
	@RequestMapping(value = "/exUpdate")
	public String exUpdate(Province bean) {
		//2.通过主键id修改
		provinceService.updateById(bean);
		return "redirect:/province/findByObj";
	}

	/**
	 * 删除通过主键
	 * @return
	 */
	@RequestMapping(value = "/delete")
	public String delete(Integer id) {
		///1.通过主键删除
		provinceService.deleteById(id);
		return "redirect:/province/findByObj";
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
	public String listAllJson(Province bean){
		List<Province> listAll = provinceService.listAll();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("list", listAll);
		jsonObject.put("obj", bean);
		return jsonObject.toString();
	}


	/**
	 * ajax 修改
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/exUpdate.json", method = RequestMethod.POST)
	@ResponseBody
	public String exUpdateJson(Province bean) {
		provinceService.updateById(bean);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "修改成功");
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
		provinceService.deleteById(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "删除成功");
		return jsonObject.toString();
	}

	@RequestMapping(value = "getProvinceList.json", method = RequestMethod.GET)
	@ResponseBody
	public String getProvinceList(Integer id) {
		Province p = new Province();
		p.setId(id);
		List<Province> list = provinceService.listAllByEntity(p);
		JSONArray jsonArray = new JSONArray();
		for (Province bean : list) {
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
