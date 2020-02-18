package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.City;
import cn.kw.express.pojo.County;
import cn.kw.express.pojo.Province;
import cn.kw.express.service.CityService;
import cn.kw.express.service.CountyService;
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
@RequestMapping("/county")
public class CountyController extends BaseController {
	
	
	@Autowired
	private ProvinceService provinceService;
	@Autowired
	private CityService cityService;
	@Autowired
	private CountyService countyService;

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
	public String listByEntity(County bean, Model model){
		List<County> listAll = countyService.listAllByEntity(bean);
		model.addAttribute("list", listAll);
		return "city/list";
	}

	@RequestMapping(value = "/edit")
	public String edit(Integer id, Model model){
		County obj = countyService.load(id);
		City city = cityService.getById(obj.getCityId());
		Province province = provinceService.getById(city.getProvinceId());
		model.addAttribute("bean",obj);
		model.addAttribute("province",province);
		model.addAttribute("city",city);
		return "county/edit";
	}

	/**
	 * 分页查询 返回list对象(通过对象)
	 * @return
	 */
	@RequestMapping(value = "/findByObj")
	public String findByObj(County bean, Model model) {
		//分页查询
		Pager<County> pagers = countyService.findByEntity(bean);
		List<County> list = pagers.getDatas();
		List<CityVo> list2 = new ArrayList<>();
		for	(County county : list){
			City city = cityService.getById(county.getCityId());
			Province province = provinceService.getById(city.getProvinceId());
			CityVo cityVo = new CityVo();
			cityVo.setCity(city);
			cityVo.setProvince(province);
			cityVo.setCounty(county);
			list2.add(cityVo);
		}
		model.addAttribute("pagers", pagers);
		model.addAttribute("list", list2);
		//存储查询条件
		model.addAttribute("bean", bean);
		return "county/list";
	}

	/**
	 * 跳至添加页面
	 * @return
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "county/add";
	}


	/**
	 * 添加执行"redirect:/users/findByObj"
	 * @return
	 */
	@RequestMapping(value = "/exAdd")
	@ResponseBody
	public String exAdd(County bean) {
		JSONObject jsonObject = new JSONObject();
		if (notEmpty(bean)){
			County county = new County();
			county.setName(bean.getName());
			county = countyService.getByEntity(bean);
			if (notEmpty(county)){
				jsonObject.put("message", "登录名重复");
				jsonObject.put("flag", false);
			} else {
				countyService.insert(bean);
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
	public String exUpdate(County bean) {
		//2.通过主键id修改
		countyService.updateById(bean);
		return "redirect:/county/findByObj";
	}

	/**
	 * 删除通过主键
	 * @return
	 */
	@RequestMapping(value = "/delete")
	public String delete(Integer id) {
		///1.通过主键删除
		countyService.deleteById(id);
		return "redirect:/county/findByObj";
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
	public String listAllJson(County bean){
		List<County> listAll = countyService.listAll();
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
	public String exUpdateJson(County bean) {
		countyService.updateById(bean);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "修改成功");
		jsonObject.put("flag", true);
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
		countyService.deleteById(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "删除成功");
		return jsonObject.toString();
	}

	@RequestMapping(value = "getctiyList.json", method = RequestMethod.GET)
	@ResponseBody
	public String getctiyList() {
		List<County> list = countyService.listAll();
		JSONArray jsonArray = new JSONArray();
		for (County bean : list) {
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
