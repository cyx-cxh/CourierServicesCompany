package cn.kw.express.controller;

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

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月17日 14时41分30秒
 */


@Controller
@RequestMapping("/")
public class LoginController extends BaseController {


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
	@RequestMapping(value = "index.do")
	public String index(HttpServletRequest request){
		if (empty(request.getSession().getAttribute("user"))){
			return "redirect:/login";
		}
		return "main";
	}

	@RequestMapping(value = "login.do")
	public String login(Users users, Integer type, Model model, HttpServletRequest request){
		if (type == 0){
			Users users1 = usersService.getByEntity(users);
			model.addAttribute("user", users1);
			if (notEmpty(users1)){
				SessionUser sessionUser = new SessionUser();
				sessionUser.setId(users1.getId());
				sessionUser.setRealName(users1.getRealName());
				sessionUser.setRole(users1.getRole());
				request.getSession().setAttribute("user", sessionUser);
				return "redirect:/index.do";
			}
		} else {
			Expressperson expressperson = new Expressperson();
			expressperson.setName(users.getName());
			expressperson.setPw(users.getPw());
			Expressperson users1 = expresspersonService.getByEntity(expressperson);
			if (notEmpty(users1)){
				SessionUser sessionUser = new SessionUser();
				sessionUser.setId(users1.getId());
				sessionUser.setRealName(users1.getRealName());
				sessionUser.setRole(2);
				sessionUser.setCompanyId(users1.getCompanyId());
				sessionUser.setNetworkId(users1.getNetworkId());
				request.getSession().setAttribute("user", sessionUser);
				return "redirect:/index.do";
			}
		}
		return "redirect:/login";
	}

	@RequestMapping(value = "login")
	public String login(HttpServletRequest request){
		if (notEmpty(request.getSession().getAttribute("user"))){
			return "redirect:/index.do";
		}
		return "login";
	}

	@RequestMapping(value = "loginOut")
	public String loginOut(HttpServletRequest request){
		request.getSession().removeAttribute("user");
		return "login";
	}

	@RequestMapping(value = "left.do", method = RequestMethod.GET)
	public String left() {
		return "left";
	}

	@RequestMapping(value = "open.do", method = RequestMethod.GET)
	public String open() {
		return "open";
	}
}
