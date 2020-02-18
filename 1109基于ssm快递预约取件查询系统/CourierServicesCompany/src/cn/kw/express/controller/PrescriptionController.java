package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.City;
import cn.kw.express.pojo.Prescription;
import cn.kw.express.pojo.Province;
import cn.kw.express.service.CityService;
import cn.kw.express.service.PrescriptionService;
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
 * @date - 2018年10月21日 20时02分14秒
 */


@Controller
@RequestMapping("/prescription")
public class PrescriptionController extends BaseController {
	
	@Autowired
	private PrescriptionService prescriptionService;
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
	public String listByEntity(Prescription bean, Model model){
		List<Prescription> listAll = prescriptionService.listAllByEntity(bean);
		model.addAttribute("list", listAll);
		return "prescription/list";
	}

	@RequestMapping(value = "/edit")
	public String edit(Integer id, Model model){
		Prescription obj = prescriptionService.load(id);
		model.addAttribute("bean",obj);
		return "prescription/edit";
	}

	/**
	 * 分页查询 返回list对象(通过对象)
	 * @return
	 */
	@RequestMapping(value = "/findByObj")
	public String findByObj(Prescription bean, Model model) {
		//分页查询
		Pager<Prescription> pagers = prescriptionService.findByEntity(bean);
		List<Prescription> list = pagers.getDatas();
		List<CityVo> list2 = new ArrayList<>();
		for	(Prescription prescription : list){
			Province province = provinceService.getById(prescription.getProvinceId());
			City city = cityService.getById(prescription.getCityId());
			Province eprovince = provinceService.getById(prescription.getEndProvinceId());
			City ecity = cityService.getById(prescription.getEndCityId());
			CityVo cityVo = new CityVo();
			cityVo.setCity(city);
			cityVo.setProvince(province);
			cityVo.setPrescription(prescription);
			cityVo.setEcity(ecity);
			cityVo.setEprovince(eprovince);
			list2.add(cityVo);
		}
		model.addAttribute("pagers", pagers);
		model.addAttribute("list", list2);
		//存储查询条件
		model.addAttribute("bean", bean);
		return "prescription/list";
	}

	/**
	 * 跳至添加页面
	 * @return
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "prescription/add";
	}


	/**
	 * 添加执行"redirect:/users/findByObj"
	 * @return
	 */
	@RequestMapping(value = "/exAdd")
	@ResponseBody
	public String exAdd(Prescription bean) {
		JSONObject jsonObject = new JSONObject();
		Prescription prescription = prescriptionService.getByEntity(bean);
		if (empty(prescription)){
			prescriptionService.insert(bean);
			jsonObject.put("message", "提交成功");
			jsonObject.put("flag", true);
		} else {
			jsonObject.put("message", "提交失败，数据重复");
			jsonObject.put("flag", false);
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
	public String listAllJson(Prescription bean){
		List<Prescription> listAll = prescriptionService.listAll();
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
	public String exUpdateJson(Prescription bean) {
		prescriptionService.updateById(bean);
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
		prescriptionService.deleteById(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "删除成功");
		return jsonObject.toString();
	}
}
