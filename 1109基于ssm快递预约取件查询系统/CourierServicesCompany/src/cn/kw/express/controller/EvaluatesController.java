package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.Evaluates;
import cn.kw.express.pojo.Users;
import cn.kw.express.service.EvaluatesService;
import cn.kw.express.utils.Pager;
import cn.kw.express.vo.SessionUser;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月25日 20时12分28秒
 */


@Controller
@RequestMapping("/evaluates")
public class EvaluatesController extends BaseController {
	
	@Autowired
	private EvaluatesService evaluatesService;

	@RequestMapping(value = "/edit")
	public String edit(Integer id, Model model, HttpServletRequest request){
		Evaluates evaluates = (Evaluates) request.getSession().getAttribute("user");
		Evaluates obj = evaluatesService.load(id);
		model.addAttribute("bean",obj);
		return "evaluates/edit";
	}

	/**
	 * 分页查询 返回list对象(通过对象)
	 * @return
	 */
	@RequestMapping(value = "/findByObj")
	public String findByObj(Evaluates evaluates, Model model) {
		//分页查询
		Pager<Evaluates> pagers = evaluatesService.findByEntity(evaluates);
		model.addAttribute("pagers", pagers);
		//存储查询条件
		model.addAttribute("bean", evaluates);
		return "evaluates/list";
	}

	/**
	 * 跳至添加页面
	 * @return
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "evaluates/add";
	}


	/**
	 * 添加修改
	 * @return
	 */
	@RequestMapping(value = "/exUpdate")
	public String exUpdate(Evaluates evaluates) {
		//2.通过主键id修改
		evaluatesService.updateById(evaluates);
		return "redirect:/evaluates/findByObj";
	}

	/**
	 * ajax 修改
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/exUpdate.json", method = RequestMethod.POST)
	@ResponseBody
	public String exUpdateJson(Evaluates evaluates) {
		evaluatesService.updateById(evaluates);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "修改成功");
		return jsonObject.toString();
	}

	@RequestMapping(value = "/exAdd")
	@ResponseBody
	public String exAdd(Evaluates bean, HttpServletRequest request) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "评论成功");
		bean.setAddTime(new Date());
		SessionUser users = (SessionUser) request.getSession().getAttribute("webuser");
		bean.setUsersId(users.getId());
		evaluatesService.insert(bean);
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
		evaluatesService.deleteById(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "删除成功");
		return jsonObject.toString();
	}
	
}
