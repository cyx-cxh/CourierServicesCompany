package cn.kw.express.utils;

import cn.kw.express.AppConstants;
import cn.kw.express.base.Base;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

/**
 * 获取经纬度工具类
 */
public class LatUtil extends Base {

    /**
     * 根据地址转换为百度经纬度
     *
     * @param address
     * @return
     */
    public static JSONObject getLngAndLat(String address) {
        String url = AppConstants.JWDJKDZ.replace(":address", address);
        String json = loadJSON(url);
        JSONObject obj = (JSONObject) JSON.parse(json);
        JSONObject jsonObject = new JSONObject();
        if (obj.get("status").toString().equals("0")) {
            double lng = obj.getJSONObject("result").getJSONObject("location").getDouble("lng");
            double lat = obj.getJSONObject("result").getJSONObject("location").getDouble("lat");
            jsonObject.put("lng", lng);
            jsonObject.put("lat", lat);
            System.out.println("经度：" + lng + "---纬度：" + lat);
        } else {
            System.out.println("未找到相匹配的经纬度！");
        }
        return jsonObject;
    }

    public static Double getMileage(String address, String address2) {
        double gl = 0.0;
        String url = AppConstants.JWDJKDZ.replace(":address", address);
        String url2 = AppConstants.JWDJKDZ.replace(":address", address2);
        String json = loadJSON(url);
        String json2 = loadJSON(url2);
        String origins = getJson(json);
        String destinations = getJson(json2);
        String urls = AppConstants.LCJSJKDZ.replace(":origins", origins).replace(":destinations", destinations);
        String jsons = loadJSON(urls);
        JSONObject obj = (JSONObject) JSON.parse(jsons);
        if (obj.get("status").toString().equals("0")) {
            JSONArray jsonArray = JSONArray.parseArray(obj.get("result").toString());
            if (jsonArray.size() > 0){
                JSONObject jsonObject = (JSONObject) JSON.parse(jsonArray.get(0).toString());
                jsonObject = (JSONObject) jsonObject.get("distance");
                String val = jsonObject.get("text").toString();
                gl = Double.parseDouble(val.replace("公里", ""));
            }
        }
        return gl;
    }

    public static String getJson(String json) {
        JSONObject obj = (JSONObject) JSON.parse(json);
        String address = "";
        if (obj.get("status").toString().equals("0")) {
            double lng = obj.getJSONObject("result").getJSONObject("location").getDouble("lng");
            double lat = obj.getJSONObject("result").getJSONObject("location").getDouble("lat");
            address = String.valueOf(lat) + "," + String.valueOf(lng);
        } else {
            System.out.println("未找到相匹配的经纬度！");
        }
        return address;
    }

    /**
     * 通过经纬度获取里程
     *
     * @param startLng
     * @param startLat
     * @param endLng
     * @param endLat
     * @return
     */
    public static double getGls(double startLng, double startLat, double endLng, double endLat) {
        String url = AppConstants.LCJSJKDZ.replace(":origins", startLat + "," + startLng).replace(":destinations", endLat + "," + endLng);
        String json = loadJSON(url);
        JSONObject jsonObject = (JSONObject) JSON.parse(json);
        String content = jsonObject.getString("result");
        if (notEmpty(content)) {
            JSONArray jsonArray = JSON.parseArray(content);
            if (notEmpty(jsonArray) && jsonArray.size() > 0) {
                JSONObject jsonObject1 = (JSONObject) jsonArray.get(0);
                JSONObject jsonObject2 = (JSONObject) jsonObject1.get("distance");
                if (notEmpty(jsonObject2.get("value"))) {
                    return Double.parseDouble(String.format("%.1f", Double.parseDouble(jsonObject2.get("value").toString()) / 1000));
                }
            }
        }
        return 0;
    }

    /**
     * 调用百度api借口获取经纬度
     *
     * @param url
     * @return
     */
    public static String loadJSON(String url) {
        StringBuilder json = new StringBuilder();
        try {
            URL oracle = new URL(url);
            URLConnection urlConnection = oracle.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));
            String inputLine = null;
            while ((inputLine = in.readLine()) != null) {
                json.append(inputLine);
            }
            in.close();
        } catch (IOException e) {
        }
        return json.toString();
    }

    public static void main(String[] args) {
        try {
            String result = getOrderTracesByJson("ZTO", "75103377100294");
            System.out.println(result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //电商ID
    private static String EBusinessID="1395999";
    //电商加密私钥，快递鸟提供，注意保管，不要泄漏
    private static String AppKey="64d98304-36d0-485b-9274-a7fae16a0af9";
    //请求url
    private static String ReqURL="http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx";

    /**
     * Json方式 查询订单物流轨迹
     * @throws Exception
     */
    public static String getOrderTracesByJson(String expCode, String expNo) throws Exception{
        String requestData= "{'OrderCode':'','ShipperCode':'" + expCode + "','LogisticCode':'" + expNo + "'}";

        Map<String, String> params = new HashMap<String, String>();
        params.put("RequestData", urlEncoder(requestData, "UTF-8"));
        params.put("EBusinessID", EBusinessID);
        params.put("RequestType", "1002");
        String dataSign=encrypt(requestData, AppKey, "UTF-8");
        params.put("DataSign", urlEncoder(dataSign, "UTF-8"));
        params.put("DataType", "2");

        String result=sendPost(ReqURL, params);

        //根据公司业务处理返回的信息......

        return result;
    }

    /**
     * MD5加密
     * @param str 内容
     * @param charset 编码方式
     * @throws Exception
     */
    @SuppressWarnings("unused")
    private static String MD5(String str, String charset) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(str.getBytes(charset));
        byte[] result = md.digest();
        StringBuffer sb = new StringBuffer(32);
        for (int i = 0; i < result.length; i++) {
            int val = result[i] & 0xff;
            if (val <= 0xf) {
                sb.append("0");
            }
            sb.append(Integer.toHexString(val));
        }
        return sb.toString().toLowerCase();
    }

    /**
     * base64编码
     * @param str 内容
     * @param charset 编码方式
     * @throws UnsupportedEncodingException
     */
    private static String base64(String str, String charset) throws UnsupportedEncodingException{
        String encoded = base64Encode(str.getBytes(charset));
        return encoded;
    }

    @SuppressWarnings("unused")
    private static String urlEncoder(String str, String charset) throws UnsupportedEncodingException{
        String result = URLEncoder.encode(str, charset);
        return result;
    }

    /**
     * 电商Sign签名生成
     * @param content 内容
     * @param keyValue Appkey
     * @param charset 编码方式
     * @throws UnsupportedEncodingException ,Exception
     * @return DataSign签名
     */
    @SuppressWarnings("unused")
    private static String encrypt (String content, String keyValue, String charset) throws UnsupportedEncodingException, Exception
    {
        if (keyValue != null)
        {
            return base64(MD5(content + keyValue, charset), charset);
        }
        return base64(MD5(content, charset), charset);
    }

    /**
     * 向指定 URL 发送POST方法的请求
     * @param url 发送请求的 URL
     * @param params 请求的参数集合
     * @return 远程资源的响应结果
     */
    @SuppressWarnings("unused")
    private static String sendPost(String url, Map<String, String> params) {
        OutputStreamWriter out = null;
        BufferedReader in = null;
        StringBuilder result = new StringBuilder();
        try {
            URL realUrl = new URL(url);
            HttpURLConnection conn =(HttpURLConnection) realUrl.openConnection();
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // POST方法
            conn.setRequestMethod("POST");
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.connect();
            // 获取URLConnection对象对应的输出流
            out = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
            // 发送请求参数
            if (params != null) {
                StringBuilder param = new StringBuilder();
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    if(param.length()>0){
                        param.append("&");
                    }
                    param.append(entry.getKey());
                    param.append("=");
                    param.append(entry.getValue());
                    //System.out.println(entry.getKey()+":"+entry.getValue());
                }
                //System.out.println("param:"+param.toString());
                out.write(param.toString());
            }
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "UTF-8"));
            String line;
            while ((line = in.readLine()) != null) {
                result.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        //使用finally块来关闭输出流、输入流
        finally{
            try{
                if(out!=null){
                    out.close();
                }
                if(in!=null){
                    in.close();
                }
            }
            catch(IOException ex){
                ex.printStackTrace();
            }
        }
        return result.toString();
    }


    private static char[] base64EncodeChars = new char[] {
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9', '+', '/' };

    public static String base64Encode(byte[] data) {
        StringBuffer sb = new StringBuffer();
        int len = data.length;
        int i = 0;
        int b1, b2, b3;
        while (i < len) {
            b1 = data[i++] & 0xff;
            if (i == len)
            {
                sb.append(base64EncodeChars[b1 >>> 2]);
                sb.append(base64EncodeChars[(b1 & 0x3) << 4]);
                sb.append("==");
                break;
            }
            b2 = data[i++] & 0xff;
            if (i == len)
            {
                sb.append(base64EncodeChars[b1 >>> 2]);
                sb.append(base64EncodeChars[((b1 & 0x03) << 4) | ((b2 & 0xf0) >>> 4)]);
                sb.append(base64EncodeChars[(b2 & 0x0f) << 2]);
                sb.append("=");
                break;
            }
            b3 = data[i++] & 0xff;
            sb.append(base64EncodeChars[b1 >>> 2]);
            sb.append(base64EncodeChars[((b1 & 0x03) << 4) | ((b2 & 0xf0) >>> 4)]);
            sb.append(base64EncodeChars[((b2 & 0x0f) << 2) | ((b3 & 0xc0) >>> 6)]);
            sb.append(base64EncodeChars[b3 & 0x3f]);
        }
        return sb.toString();
    }
}
