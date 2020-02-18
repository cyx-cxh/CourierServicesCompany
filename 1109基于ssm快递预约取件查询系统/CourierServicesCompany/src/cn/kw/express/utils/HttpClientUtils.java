package cn.kw.express.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class HttpClientUtils {

	public static String getContentFromUrl(String url) {
		CloseableHttpClient httpClient = HttpClients.createDefault();
		try {
			HttpGet request = new HttpGet(url);

			request.setHeader(HttpHeaders.USER_AGENT,
					"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
			request.setHeader(HttpHeaders.ACCEPT, "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
			request.setHeader(HttpHeaders.ACCEPT_ENCODING, "gzip, deflate, sdch");
			request.setHeader(HttpHeaders.CONNECTION, "keep-alive");
			CloseableHttpResponse httpResponse = null;
			httpResponse = httpClient.execute(request);
			try {
				HttpEntity entity = httpResponse.getEntity();
				if (null != entity) {
					return EntityUtils.toString(entity);
				}
			} finally {
				httpResponse.close();
			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (httpClient != null) {
					httpClient.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static InputStream getStreamFromUrl(String url) {
		CloseableHttpClient httpClient = HttpClients.createDefault();
		HttpGet request = new HttpGet(url);

		request.setHeader(HttpHeaders.USER_AGENT,
				"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
		request.setHeader(HttpHeaders.ACCEPT,
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
		request.setHeader(HttpHeaders.ACCEPT_ENCODING, "gzip, deflate, sdch");
		request.setHeader(HttpHeaders.CONNECTION, "keep-alive");
		CloseableHttpResponse httpResponse = null;
		try {
			httpResponse = httpClient.execute(request);
			HttpEntity entity = httpResponse.getEntity();
			if (null != entity) {
				return entity.getContent();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
    public static String doPost(String url,Map<String,String> map,String charset){  
    	CloseableHttpClient httpClient = HttpClients.createDefault(); 
        HttpPost httpPost = new HttpPost(url);;  
        String result = null;  
        try{     
            //设置参数  
            List<NameValuePair> list = new ArrayList<NameValuePair>();   
            //遍历map集合
            for(Map.Entry<String, String> entry :map.entrySet()){
            	list.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }
            if(list.size() > 0){  
            	//charset=utf-8或者gbk2312
                UrlEncodedFormEntity entity = new UrlEncodedFormEntity(list,charset);  
                httpPost.setEntity(entity);  
            }  
            HttpResponse response = httpClient.execute(httpPost);  
            if(response != null){  
                HttpEntity resEntity = response.getEntity();  
                if(resEntity != null){  
                    result = EntityUtils.toString(resEntity,charset);  
                }  
            }  
        }catch(Exception ex){  
            ex.printStackTrace();  
        }finally {
			if (httpClient != null) {
				try {
					httpClient.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}  
        return result;  
    }  
}