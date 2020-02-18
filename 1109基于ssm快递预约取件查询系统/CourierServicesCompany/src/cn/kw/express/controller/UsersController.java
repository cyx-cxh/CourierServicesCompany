package cn.kw.express.controller;
import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.registry.infomodel.User;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.Expressperson;
import cn.kw.express.pojo.Users;
import cn.kw.express.service.ExpresspersonService;
import cn.kw.express.service.UsersService;
import cn.kw.express.vo.SessionUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.alibaba.fastjson.JSONObject;
import cn.kw.express.utils.Pager;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月17日 14时41分30秒
 */


@Controller
@RequestMapping("/users")
public class UsersController extends BaseController {
	
	
	/**
	 * 依赖注入 start dao/service/===
	 */
	@Autowired
	private UsersService usersService;
	@Autowired
	private ExpresspersonService expresspersonService;
	

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
	public String listByEntity(Users users, Model model){
		List<Users> listAll = usersService.listAllByEntity(users);
		model.addAttribute("list", listAll);
		return "users/list";
	}

	@RequestMapping(value = "/edit")
	public String edit(Integer id, Model model, HttpServletRequest request){
		SessionUser users = (SessionUser) request.getSession().getAttribute("user");
		if (empty(users)){
			return "redirect:/login";
		}
		if (users.getRole() == 2){
			Expressperson expressperson = expresspersonService.load(id);
			model.addAttribute("bean",expressperson);
			return "users/edit2";
		} else {
			Users obj = usersService.load(id);
			model.addAttribute("bean",obj);
		}
		return "users/edit";
	}

	/**
	 * 分页查询 返回list对象(通过对象)
	 * @return
	 */
	@RequestMapping(value = "/findByObj")
	public String findByObj(Users users, Model model) {
		//分页查询
		Pager<Users> pagers = usersService.findByEntity(users);
		model.addAttribute("pagers", pagers);
		//存储查询条件
		model.addAttribute("bean", users);
		return "users/list";
	}
	
	/**
	 * 跳至添加页面
	 * @return
	 */
	@RequestMapping(value = "/add")
	public String add() {
		return "users/add";
	}

	
	/**
	 * 添加执行"redirect:/users/findByObj"
	 * @return
	 */
	@RequestMapping(value = "/exAdd")
	@ResponseBody
	public String exAdd(Users users) {
		JSONObject jsonObject = new JSONObject();
		if (notEmpty(users)){
			Users users1 = new Users();
			users1.setName(users.getName());
			users1 = usersService.getByEntity(users1);
			if (notEmpty(users1)){
				jsonObject.put("message", "登录名重复");
				jsonObject.put("flag", false);
			} else {
				usersService.insert(users);
				jsonObject.put("message", "提交成功");
				jsonObject.put("flag", true);
			}
		}
		return jsonObject.toString();
	}

	@RequestMapping(value = "/Verification")
	@ResponseBody
	public String Verification(Integer id, HttpServletRequest request) {
		JSONObject jsonObject = new JSONObject();
		SessionUser users = (SessionUser) request.getSession().getAttribute("user");
		if (empty(users)){
			return "redirect:/login";
		}
		Users bean = usersService.getById(id);
		if (users.getRole() == bean.getRole() && users.getId() != bean.getId()){
			jsonObject.put("message", "不可修改其他管理员信息");
			jsonObject.put("flag", false);
		} else {
			jsonObject.put("flag", true);
		}
		return jsonObject.toString();
	}

	/**
	 * 添加修改
	 * @return
	 */
	@RequestMapping(value = "/exUpdate")
	public String exUpdate(Users users) {
		//2.通过主键id修改
		usersService.updateById(users);
		return "redirect:/users/findByObj";
	}
	
	/**
	 * 删除通过主键
	 * @return
	 */
	@RequestMapping(value = "/delete")
	public String delete(Integer id) {
		///1.通过主键删除
		usersService.deleteById(id);
		return "redirect:/users/findByObj";
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
	public String listAllJson(Users users){
		List<Users> listAll = usersService.listAll();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("list", listAll);
		jsonObject.put("obj", users);
		return jsonObject.toString();
	}
	
	/**
	 *  【不分页=》查询列表=>有条件】
	* @Title: listByEntity 
	* @Description: TODO(这里用一句话描述这个方法的作用) 
	* @param @return 设定文件 
	* @author
	* @return String 返回类型 
	* @throws
	 */
	@RequestMapping(value = "/listByEntityJson", method = RequestMethod.POST)
	@ResponseBody
	public String listByEntityJson(Users users){
		List<Users> listAll = usersService.listAllByEntity(users);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("list", listAll);
		jsonObject.put("obj", users);
		return jsonObject.toString();
	}


	/**
	 * ajax 修改
	 * @param 
	 * @return
	 */
	@RequestMapping(value = "/exUpdate.json", method = RequestMethod.POST)
	@ResponseBody
	public String exUpdateJson(Users users, HttpServletRequest request) {
		SessionUser sessionUser = (SessionUser) request.getSession().getAttribute("user");
		if (empty(sessionUser)){
			return "redirect:/login";
		}
		if (sessionUser.getRole() == 2){
			Expressperson expressperson = new Expressperson();
			expressperson.setId(sessionUser.getId());
			expressperson.setRealName(users.getRealName());
			expressperson.setSex(users.getSex());
			expressperson.setPhone(users.getPhone());
			expressperson.setPw(users.getPw());
			expresspersonService.updateById(expressperson);
		} else {
			usersService.updateById(users);
		}
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
		usersService.deleteById(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "删除成功");
		return jsonObject.toString();
	}
}
