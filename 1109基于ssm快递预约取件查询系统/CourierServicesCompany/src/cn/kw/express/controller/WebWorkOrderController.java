package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.*;
import cn.kw.express.service.*;
import cn.kw.express.utils.LatUtil;
import cn.kw.express.utils.Pager;
import cn.kw.express.vo.CompanyVo;
import cn.kw.express.vo.SessionUser;
import cn.kw.express.vo.WorkOrderNVo;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * Created by Administrator on 2018/10/22.
 */
@Controller
@RequestMapping("/web")
public class WebWorkOrderController extends BaseController {

    @Autowired
    private UsersService usersService;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private NetworkService networkService;
    @Autowired
    private ProvinceService provinceService;
    @Autowired
    private CityService cityService;
    @Autowired
    private ChannelService channelService;
    @Autowired
    private WorkorderService workorderService;
    @Autowired
    private ExpresspersonService expresspersonService;
    @Autowired
    private EvaluatesService evaluatesService;

    @RequestMapping(value = "/index.do")
    public String index(Model model) {
        model.addAttribute("web", "active");
        return "web/index";
    }

    @RequestMapping(value = "/exAdd.json")
    @ResponseBody
    public String exAdd(Users users, HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        if (notEmpty(users)) {
            Users users1 = new Users();
            users1.setName(users.getName());
            users1 = usersService.getByEntity(users1);
            if (empty(users1)) {
                users.setRole(1);
                usersService.insert(users);
                request.getSession().setAttribute("webuser", users);
                jsonObject.put("msg", "注册成功");
            } else {
                jsonObject.put("msg", "登录名重复");
            }
        }
        return jsonObject.toJSONString();
    }

    @RequestMapping(value = "/login.do")
    public String login(Users users, HttpServletRequest request) {
        if (notEmpty(users)) {
            Users users1 = usersService.getByEntity(users);
            if (notEmpty(users1)) {
                SessionUser sessionUser = new SessionUser();
                sessionUser.setId(users1.getId());
                sessionUser.setRealName(users1.getRealName());
                sessionUser.setRole(users1.getRole());
                request.getSession().setAttribute("webuser", sessionUser);
            }
        }
        return "redirect:/web/index.do";
    }

    /**
     * 获取物流公司
     *
     * @param bean
     * @param model
     * @return
     */
    @RequestMapping(value = "/findByObj")
    public String findByObj(Company bean, Model model) {
        //分页查询
        List<Company> list1 = companyService.listAll();
        List<CompanyVo> list2 = new ArrayList<>();
        for (Company company : list1) {
            Network network = new Network();
            network.setCompanyId(company.getId());
            List<Network> list = networkService.listAllByEntity(network);
            for (Network network1 : list) {
                CompanyVo companyVo = new CompanyVo();
                companyVo.setNetwork(network1);
                companyVo.setCompany(company);
                list2.add(companyVo);
            }
        }
        //存储查询条件
        model.addAttribute("bean", bean);
        model.addAttribute("list", list2);
        model.addAttribute("web", "findByObj");
        return "web/companylist";
    }

    @RequestMapping(value = "/getList")
    public String getList(Workorder bean, Model model, HttpServletRequest request) {
        //分页查询
        List<Workorder> list1 = new ArrayList<>();
        SessionUser users = (SessionUser) request.getSession().getAttribute("webuser");
        if (notEmpty(users)) {
            bean = new Workorder();
            bean.setUsersId(users.getId());
            list1 = workorderService.listAllByEntity(bean);
        }
        List<WorkOrderNVo> workorderList = new ArrayList<>();
        for (Workorder workorder : list1) {
            WorkOrderNVo workOrderNVo = new WorkOrderNVo();
            workOrderNVo.setChannel(channelService.getById(workorder.getChannelId()));
            workOrderNVo.setWorkorder(workorder);
            workOrderNVo.setUsers(usersService.getById(workorder.getUsersId()));
            workOrderNVo.setNetwork(networkService.getById(workorder.getNetworkId()));
            workorderList.add(workOrderNVo);
        }
        //存储查询条件
        model.addAttribute("bean", bean);
        model.addAttribute("pagers", list1);
        model.addAttribute("list", workorderList);
        model.addAttribute("web", "work");
        return "web/list";
    }

    @RequestMapping(value = "/prescription")
    public String prescription(Model model) {
        model.addAttribute("web", "prescription");
        return "web/prescription";
    }

    @RequestMapping(value = "/getMapPoinits.json")
    @ResponseBody
    public String getMapPoinits(String name) {
        //分页查询
        Company company1 = new Company();
        company1.setName(name);
        List<Company> list = companyService.listAllByEntity(company1);
        JSONArray jsonArray = new JSONArray();
        for (Company company : list) {
            Network network = new Network();
            network.setCompanyId(company.getId());
            List<Network> networks = networkService.listAllByEntity(network);
            for (Network bean : networks) {
                JSONObject jsonObject = new JSONObject(new LinkedHashMap());
                jsonObject.put("title", "名称:" + bean.getName());
                jsonObject.put("point", bean.getLng() + "," + bean.getLat());
                jsonObject.put("address", bean.getAddress());
                jsonObject.put("tel", bean.getPhone());
                jsonArray.add(jsonObject);
            }
        }
        return jsonArray.toJSONString();
    }

    @RequestMapping(value = "/getCompany.json")
    @ResponseBody
    public String getCompany() {
        //分页查询
        List<Company> list = companyService.listAll();
        JSONArray jsonArray = new JSONArray();
        for (Company company : list) {
            JSONObject jsonObject = new JSONObject(new LinkedHashMap());
            jsonObject.put("name", company.getName());
            jsonObject.put("id", company.getId());
            jsonArray.add(jsonObject);
        }
        return jsonArray.toJSONString();
    }

    @RequestMapping(value = "/getCity.json")
    @ResponseBody
    public String getCity(Integer provinceId) {
        //分页查询
        City city = new City();
        city.setProvinceId(provinceId);
        List<City> list = cityService.listAllByEntity(city);
        JSONArray jsonArray = new JSONArray();
        for (City city1 : list) {
            JSONObject jsonObject = new JSONObject(new LinkedHashMap());
            jsonObject.put("name", city1.getName());
            jsonObject.put("id", city1.getId());
            jsonArray.add(jsonObject);
        }
        return jsonArray.toJSONString();
    }

    @RequestMapping(value = "/getProvince.json")
    @ResponseBody
    public String getProvince() {
        //分页查询
        List<Province> list = provinceService.listAll();
        JSONArray jsonArray = new JSONArray();
        for (Province province : list) {
            JSONObject jsonObject = new JSONObject(new LinkedHashMap());
            jsonObject.put("name", province.getName());
            jsonObject.put("id", province.getId());
            jsonArray.add(jsonObject);
        }
        return jsonArray.toJSONString();
    }

    @RequestMapping(value = "/getLngAndLat.json")
    @ResponseBody
    public String getLat(String address, String address2, Integer comId, Double zl, Integer cityId1, Integer cityId2) {
        JSONObject jsonObject = new JSONObject();
        double lc = LatUtil.getMileage(address, address2);
        Company company = companyService.getById(comId);
        BigDecimal b = new BigDecimal(zl * (empty(company.getFy()) ? 0 : company.getFy()));
        double f1 = b.setScale(2, RoundingMode.HALF_UP).doubleValue();
        jsonObject.put("lc", lc);
        jsonObject.put("jg", f1);
        return jsonObject.toJSONString();
    }

    /**
     * 生成订单
     *
     * @return
     */
    @RequestMapping(value = "/save.json")
    @ResponseBody
    public String save(Workorder workorder, String address, String address2, HttpServletRequest request) {
        SessionUser users = (SessionUser) request.getSession().getAttribute("webuser");
        JSONObject jsonObject = new JSONObject();
        if (empty(users)) {
            jsonObject.put("msg", false);
            return jsonObject.toJSONString();
        } else {
            Channel channel = new Channel();
            channel.setEndAddress(address2);
            channel.setStartAddress(address);
            channelService.insert(channel);
            workorder.setAddtime(new DateTime().toDate());
            workorder.setIsPj(0);
            workorder.setIsQj(0);
            workorder.setState(0);
            workorder.setChannelId(channel.getId());
            workorder.setUsersId(users.getId());
            workorderService.insert(workorder);
            jsonObject.put("msg", true);
        }
        return jsonObject.toJSONString();
    }

    @RequestMapping(value = "/search.json")
    @ResponseBody
    public String search(Workorder workorder) throws Exception {
        Workorder workorder1 = workorderService.getByEntity(workorder);
        Company company = companyService.getById(workorder1.getCompanyId());
        String body = "";
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject2 = new JSONObject();
        if (notEmpty(company)) {
            body = LatUtil.getOrderTracesByJson(company.getCode(), workorder1.getCode());
            JSONObject jsonObject = (JSONObject) JSON.parse(body);
            jsonObject2.put("ShipperCode", company.getName());
            jsonObject2.put("LogisticCode", workorder.getCode());
            jsonArray = JSONArray.parseArray(jsonObject.getString("Traces"));
            jsonObject2.put("list", jsonArray);
        }
        return jsonObject2.toJSONString();
    }

    @RequestMapping(value = "/edit")
    public String edit(Integer id, Integer role, Model model, HttpServletRequest request){
        if (empty(id)){
            return "redirect:../web/index.do";
        }
        if (role == 2){
            Expressperson expressperson = expresspersonService.load(id);
            model.addAttribute("bean",expressperson);
        } else {
            Users obj = usersService.load(id);
            model.addAttribute("bean",obj);
            model.addAttribute("web","process");
        }
        return "web/edit";
    }

    @RequestMapping(value = "/update")
    public String update(Users users, Integer role, HttpServletRequest request){
        if (role == 2){
            Expressperson expressperson = new Expressperson();
            expressperson.setPw(users.getPw());
            expressperson.setName(users.getName());
            expressperson.setId(users.getId());
            expressperson.setPhone(users.getPhone());
            expressperson.setRealName(users.getRealName());
            expressperson.setSex(users.getSex());
            expresspersonService.updateById(expressperson);
        } else {
            usersService.updateById(users);
        }
        request.getSession().removeAttribute("webuser");
        return "redirect:../web/index.do";
    }

    @RequestMapping(value = "/getPj.json")
    @ResponseBody
    public String getPj(Workorder workorder) {
        List<Workorder> list = workorderService.listAllByEntity(workorder);
        JSONObject jsonObject = new JSONObject();
        List<Evaluates> evaluates = new ArrayList<>();
        for (Workorder workorder1 : list){
            Evaluates evaluate = new Evaluates();
            evaluate.setWorkId(workorder1.getId());
            List<Evaluates> list1 = evaluatesService.listAllByEntity(evaluate);
            for (int i = 0; i < list1.size(); i++) {
                evaluates.add(list1.get(i));
            }
        }
        jsonObject.put("list", evaluates);
        return jsonObject.toJSONString();
    }
}
