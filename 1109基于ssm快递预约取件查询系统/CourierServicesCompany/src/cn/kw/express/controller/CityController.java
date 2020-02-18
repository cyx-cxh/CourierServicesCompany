package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.City;
import cn.kw.express.pojo.Province;
import cn.kw.express.service.CityService;
import cn.kw.express.service.ProvinceService;
import cn.kw.express.utils.Pager;
import cn.kw.express.vo.CityVo;
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
@RequestMapping("/city")
public class CityController extends BaseController {
	
	

	@Autowired
	private CityService cityService;
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
	public String listByEntity(City bean, Model model){
		List<City> listAll = cityService.listAllByEntity(bean);
		model.addAttribute("list", listAll);
		return "city/list";
	}

	@RequestMapping(value = "/edit")
	public String edit(Integer id, Model model){
		City obj = cityService.load(id);
		model.addAttribute("bean",obj);
		return "city/edit";
	}

	/**
	 * 分页查询 返回list对象(通过对象)
	 * @return
	 */
	@RequestMapping(value = "/findByObj")
	public String findByObj(City bean, Model model) {
		//分页查询
		Pager<City> pagers = cityService.findByEntity(bean);
		List<City> list = pagers.getDatas();
		List<CityVo> list2 = new ArrayList<>();
		for	(City city : list){
			Province province = provinceService.getById(city.getProvinceId());
			CityVo cityVo = new CityVo();
			cityVo.setCity(city);
			cityVo.setProvince(province);
			list2.add(cityVo);
		}
		model.addAttribute("pagers", pagers);
		model.addAttribute("list", list2);
		//存储查询条件
		model.addAttribute("bean", bean);
		return "city/list";
	}

	/**
	 * 跳至添加页面
	 * @return
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "city/add";
	}


	/**
	 * 添加执行"redirect:/users/findByObj"
	 * @return
	 */
	@RequestMapping(value = "/exAdd")
	@ResponseBody
	public String exAdd(City bean) {
		JSONObject jsonObject = new JSONObject();
		if (notEmpty(bean)){
			City ctiy = new City();
			ctiy.setName(bean.getName());
			ctiy = cityService.getByEntity(bean);
			if (notEmpty(ctiy)){
				jsonObject.put("message", "登录名重复");
				jsonObject.put("flag", false);
			} else {
				cityService.insert(bean);
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
	public String exUpdate(City bean) {
		//2.通过主键id修改
		cityService.updateById(bean);
		return "redirect:/city/findByObj";
	}

	/**
	 * 删除通过主键
	 * @return
	 */
	@RequestMapping(value = "/delete")
	public String delete(Integer id) {
		///1.通过主键删除
		cityService.deleteById(id);
		return "redirect:/city/findByObj";
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
	public String listAllJson(City bean){
		List<City> listAll = cityService.listAll();
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
	public String exUpdateJson(City bean) {
		cityService.updateById(bean);
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
		cityService.deleteById(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "删除成功");
		return jsonObject.toString();
	}

	@RequestMapping(value = "getctiyList.json", method = RequestMethod.GET)
	@ResponseBody
	public String getctiyList(Integer parentId) {
		City city = new City();
		city.setProvinceId(parentId);
		List<City> list = cityService.listAllByEntity(city);
		JSONArray jsonArray = new JSONArray();
		for (City bean : list) {
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
