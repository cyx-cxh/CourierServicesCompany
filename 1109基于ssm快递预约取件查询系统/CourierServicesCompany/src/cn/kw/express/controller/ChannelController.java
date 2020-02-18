package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.Channel;
import cn.kw.express.service.ChannelService;
import cn.kw.express.utils.Pager;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Date;
import java.util.List;

/**
 * @ClassName:  
 * @Description: 
 * @author  - - admin
 * @date - 2018年10月20日 16时31分44秒
 */


@Controller
@RequestMapping("/channel")
public class ChannelController extends BaseController {
	
	
	/**
	 * 依赖注入 start dao/service/===
	 */
	@Autowired
	private ChannelService channelService;
	
	// --------------------------------------- 华丽分割线 ------------------------------
	
	/*********************************查询列表【不分页】***********************************************/


	/**
	 * 【不分页 => 查询列表 => 无条件】
	 * @Title: listAll
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * @param @return 设定文件 
	 * @author
	 * @return String 返回类型 
	 * @throws
	 */
	@RequestMapping(value = "/listAll")
	public String listAll(Channel bean, Model model){
		List<Channel> listAll = channelService.listAll();
		model.addAttribute("list", listAll);
		return "users/list";
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
	@RequestMapping(value = "/listByEntity")
	public String listByEntity(Channel channel, Model model){
		List<Channel> listAll = channelService.listAllByEntity(channel);
		model.addAttribute("list", listAll);
		return "channel/list";
	}

	@RequestMapping(value = "/edit")
	@ResponseBody
	public String edit(Channel channel){
		Channel channel1 = channelService.getByEntity(channel);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("bean", channel);
		return jsonObject.toJSONString();
	}

	/**
	 * 分页查询 返回list对象(通过对象)
	 * @return
	 */
	@RequestMapping(value = "/findByObj")
	public String findByObj(Channel channel, Model model) {
		//分页查询
		Pager<Channel> pagers = channelService.findByEntity(channel);
		model.addAttribute("pagers", pagers);
		//存储查询条件
		model.addAttribute("bean", channel);
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
	 * 添加执行
	 * @return
	 */
	@RequestMapping(value = "/exAdd")
	public String exAdd(Channel channel) {
		channelService.insert(channel);
		return "redirect:/users/findByObj";
	}


	/**
	 * 跳至修改页面
	 * @return
	 */
	@RequestMapping(value = "/update")
	public String update(Integer id,Model model) {
		Channel obj = channelService.load(id);
		model.addAttribute("obj",obj);
		return "redirect:../users/listByEntity";
	}

	/**
	 * 添加修改
	 * @return
	 */
	@RequestMapping(value = "/exUpdate")
	public String exUpdate(Channel channel) {
		//2.通过主键id修改
		channelService.updateById(channel);
		return "redirect:/users/findByObj";
	}

	/**
	 * 删除通过主键
	 * @return
	 */
	@RequestMapping(value = "/delete")
	public String delete(Integer id) {
		///1.通过主键删除
		channelService.deleteById(id);
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
	public String listAllJson(Channel channel){
		List<Channel> listAll = channelService.listAll();
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("list", listAll);
		jsonObject.put("obj", channel);
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
	public String listByEntityJson(Channel channel){
		List<Channel> listAll = channelService.listAllByEntity(channel);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("list", listAll);
		jsonObject.put("obj", channel);
		return jsonObject.toString();
	}

	/**
	 * ajax 添加
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/exAddJson", method = RequestMethod.POST)
	@ResponseBody
	public String exAddJson(Channel channel) {
		channelService.insert(channel);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "添加成功");
		return jsonObject.toString();
	}


	/**
	 * ajax 修改
	 * @param
	 * @return
	 */
	@RequestMapping(value = "/exUpdate.json", method = RequestMethod.POST)
	@ResponseBody
	public String exUpdateJson(Channel channel) {
		//2.通过主键id修改
		channelService.updateById(channel);
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
		channelService.deleteById(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("message", "删除成功");
		return jsonObject.toString();
	}

	/**
	 * springMvc多文件上传
	 * @param files
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/saveFiles")
	public String saveFiles(@RequestParam("file") CommonsMultipartFile[] files,Integer id,HttpServletRequest request){
		for(int i = 0;i<files.length;i++){
			System.out.println("fileName---------->" + files[i].getOriginalFilename());
			if(!files[i].isEmpty()){
				int pre = (int) System.currentTimeMillis();
				try {
					//拿到输出流，同时重命名上传的文件
					String filePath = request.getRealPath("/upload");
					File f=new File(filePath);
					if(!f.exists()){
						f.mkdirs();
					}
					String fileNmae=new Date().getTime() + files[i].getOriginalFilename();
					File file=new File(filePath+"/"+pre + files[i].getOriginalFilename());
					if(!file.exists()){
						file.createNewFile();
					}
					files[i].transferTo(file);
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("上传出错");
				}
			}
		}
		return "";
	}
}
