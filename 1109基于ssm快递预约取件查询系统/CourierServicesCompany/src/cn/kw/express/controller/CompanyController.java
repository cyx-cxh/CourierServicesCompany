package cn.kw.express.controller;

import cn.kw.express.base.BaseController;
import cn.kw.express.pojo.City;
import cn.kw.express.pojo.Company;
import cn.kw.express.pojo.Prescription;
import cn.kw.express.pojo.Province;
import cn.kw.express.service.CityService;
import cn.kw.express.service.CompanyService;
import cn.kw.express.service.PrescriptionService;
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
import java.util.*;

/**
 * @author - - admin
 * @ClassName:
 * @Description:
 * @date - 2018年10月20日 16时31分44秒
 */


@Controller
@RequestMapping("/company")
public class CompanyController extends BaseController {

    @Autowired
    private CompanyService companyService;
    @Autowired
    private PrescriptionService prescriptionService;
    @Autowired
    private ProvinceService provinceService;
    @Autowired
    private CityService cityService;


    /**
     * 【不分页=》查询列表=>有条件】
     *
     * @param @return 设定文件
     * @return String 返回类型
     * @throws
     * @Title: listByEntity
     * @Description: TODO(这里用一句话描述这个方法的作用)
     * @author
     */
    @RequestMapping(value = "/listByEntity")
    public String listByEntity(Company bean, Model model) {
        List<Company> listAll = companyService.listAllByEntity(bean);
        model.addAttribute("list", listAll);
        return "company/list";
    }

    @RequestMapping(value = "/edit")
    public String edit(Integer id, Model model) {
        Company obj = companyService.load(id);
        model.addAttribute("bean", obj);
        return "company/edit";
    }

    /**
     * 分页查询 返回list对象(通过对象)
     *
     * @return
     */
    @RequestMapping(value = "/findByObj")
    public String findByObj(Company bean, Model model) {
        //分页查询
        Pager<Company> pagers = companyService.findByEntity(bean);

        model.addAttribute("pagers", pagers);
        //存储查询条件
        model.addAttribute("bean", bean);
        return "company/list";
    }

    /**
     * 跳至添加页面
     *
     * @return
     */
    @RequestMapping(value = "/add")
    public String add(Model model) {
        List<Prescription> list = prescriptionService.listAll();
        model.addAttribute("list", list);
        return "company/add";
    }


    /**
     * 添加执行"redirect:/users/findByObj"
     *
     * @return
     */
    @RequestMapping(value = "/exAdd")
    @ResponseBody
    public String exAdd(Company bean, Integer PrescriptionId, @RequestParam(value = "files", required = false) CommonsMultipartFile[] files, HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        if (notEmpty(bean)) {
            Company company = new Company();
            company.setName(bean.getName().replace(" ", ""));
            company = companyService.getByEntity(company);
            if (notEmpty(company)) {
                jsonObject.put("message", "公司名称重复");
                jsonObject.put("flag", false);
            } else {
                String filePath = "";
                String fileNmae = "";
                for (int i = 0; i < files.length; i++) {
                    System.out.println("fileName---------->" + files[i].getOriginalFilename());
                    if (!files[i].isEmpty()) {
                        int pre = (int) System.currentTimeMillis();
                        try {
                            //拿到输出流，同时重命名上传的文件
                            filePath = request.getRealPath("/resource/upload/");
                            File f = new File(filePath);
                            if (!f.exists()) {
                                f.mkdirs();
                            }
                            fileNmae = pre + files[i].getOriginalFilename();
                            File file = new File(filePath + fileNmae);
                            if (!file.exists()) {
                                file.createNewFile();
                            }
                            files[i].transferTo(file);
                            bean.setPhoto("/resource/upload/" + fileNmae);
                        } catch (Exception e) {
                            e.printStackTrace();
                            System.out.println("上传出错");
                        }
                    }
                }
                companyService.insert(bean);
                jsonObject.put("message", "提交成功");
                jsonObject.put("flag", true);
            }
        }
        return jsonObject.toString();
    }

    @RequestMapping(value = "/exUpdate.json")
    @ResponseBody
    public String exUpdate(Company bean, Integer prescriptionId, Integer pId, @RequestParam(value = "files", required = false) CommonsMultipartFile[] files, HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        if (notEmpty(bean)) {
            String filePath = "";
            String fileNmae = "";
            if (notEmpty(files)){
                for (int i = 0; i < files.length; i++) {
                    System.out.println("fileName---------->" + files[i].getOriginalFilename());
                    if (!files[i].isEmpty()) {
                        int pre = (int) System.currentTimeMillis();
                        try {
                            //拿到输出流，同时重命名上传的文件
                            filePath = request.getRealPath("/resource/upload/");
                            File f = new File(filePath);
                            if (!f.exists()) {
                                f.mkdirs();
                            }
                            fileNmae = pre + files[i].getOriginalFilename();
                            File file = new File(filePath + fileNmae);
                            if (!file.exists()) {
                                file.createNewFile();
                            }
                            files[i].transferTo(file);
                            bean.setPhoto("/resource/upload/" + fileNmae);
                        } catch (Exception e) {
                            e.printStackTrace();
                            System.out.println("上传出错");
                        }
                    }
                }
            }
            companyService.updateById(bean);
            jsonObject.put("message", "修改成功");
            jsonObject.put("flag", true);
        }
        return jsonObject.toString();
    }

    /**
     * 删除通过主键
     *
     * @return
     */
    @RequestMapping(value = "/delete")
    public String delete(Integer id) {
        ///1.通过主键删除
        companyService.deleteById(id);
        return "redirect:/company/findByObj";
    }

    /**
     * 【不分页 => 查询列表 => 无条件】
     *
     * @param @return 设定文件
     * @return String 返回类型
     * @throws
     * @Title: listAll
     * @Description: TODO(这里用一句话描述这个方法的作用)
     * @author
     */
    @RequestMapping(value = "/listAllJson", method = RequestMethod.POST)
    @ResponseBody
    public String listAllJson(Company bean) {
        List<Company> listAll = companyService.listAll();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("list", listAll);
        jsonObject.put("obj", bean);
        return jsonObject.toString();
    }

    /**
     * ajax 删除
     *
     * @return
     */
    @RequestMapping(value = "/delete.json", method = RequestMethod.POST)
    @ResponseBody
    public String exDeleteJson(Integer id) {
        ///1.通过主键删除
        companyService.deleteById(id);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", "删除成功");
        return jsonObject.toString();
    }

    @RequestMapping(value = "getCompanyList.json", method = RequestMethod.GET)
    @ResponseBody
    public String getCompanyList() {
        List<Company> list = companyService.listAll();
        JSONArray jsonArray = new JSONArray();
        for (Company bean : list) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("key", bean.getName());
            jsonObject.put("value", bean.getId());
            jsonArray.add(jsonObject);
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("list", jsonArray);
        return jsonObject.toJSONString();
    }

    /**
     * springMvc多文件上传
     *
     * @param files
     * @return
     */
    @RequestMapping(value = "/saveFiles")
    public String saveFiles(@RequestParam("file") CommonsMultipartFile[] files, HttpServletRequest request) {
        for (int i = 0; i < files.length; i++) {
            System.out.println("fileName---------->" + files[i].getOriginalFilename());
            if (!files[i].isEmpty()) {
                int pre = (int) System.currentTimeMillis();
                try {
                    //拿到输出流，同时重命名上传的文件
                    String filePath = request.getRealPath("/upload");
                    File f = new File(filePath);
                    if (!f.exists()) {
                        f.mkdirs();
                    }
                    String fileNmae = new Date().getTime() + files[i].getOriginalFilename();
                    File file = new File(filePath + "/" + pre + files[i].getOriginalFilename());
                    if (!file.exists()) {
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

    @RequestMapping(value = "getPrescriptionList.json", method = RequestMethod.GET)
    @ResponseBody
    public String getPrescriptionList() {
        List<Prescription> list = prescriptionService.listAll();
        JSONArray jsonArray = new JSONArray();
        for (Prescription bean : list) {
            Province province = provinceService.getById(bean.getProvinceId());
            City city = cityService.getById(bean.getCityId());
            Province province2 = provinceService.getById(bean.getEndProvinceId());
            City city2 = cityService.getById(bean.getEndCityId());
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("key", province.getName() + city.getName() + " 至 " + province2.getName() + city2.getName() + "（" + bean.getJg() + "）");
            jsonObject.put("value", bean.getId());
            jsonArray.add(jsonObject);
        }
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("list", jsonArray);
        return jsonObject.toJSONString();
    }
}
