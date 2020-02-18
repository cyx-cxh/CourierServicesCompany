package cn.kw.express.utils;

import java.io.IOException;
import java.net.SocketTimeoutException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

  
/**
 * 封装了采用HttpClient发送HTTP请求的方法
 * @see 本工具所采用的是HttpComponents-Client-4.2.1
 * @see ===================================================================================================
 * @see 开发HTTPS应用时，时常会遇到两种情况
 * @see 1、测试服务器没有有效的SSL证书,客户端连接时就会抛异常
 * @see    javax.net.ssl.SSLPeerUnverifiedException: peer not authenticated
 * @see 2、测试服务器有SSL证书,但可能由于各种不知名的原因,它还是会抛一堆烂码七糟的异常,诸如下面这两种
 * @see    javax.net.ssl.SSLException: hostname in certificate didn't match: <123.125.97.66> != <123.125.97.241>
 * @see    javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
 * @see ===================================================================================================
 * @see 这里使用的是HttpComponents-Client-4.2.1创建的连接,所以就要告诉它使用一个不同的TrustManager
 * @see 由于SSL使用的模式是X.509,对于该模式,Java有一个特定的TrustManager,称为X509TrustManager
 * @see TrustManager是一个用于检查给定的证书是否有效的类,所以我们自己创建一个X509TrustManager实例
 * @see 而在X509TrustManager实例中,若证书无效,那么TrustManager在它的checkXXX()方法中将抛出CertificateException
 * @see 既然我们要接受所有的证书,那么X509TrustManager里面的方法体中不抛出异常就行了
 * @see 然后创建一个SSLContext并使用X509TrustManager实例来初始化之
 * @see 接着通过SSLContext创建SSLSocketFactory,最后将SSLSocketFactory注册给HttpClient就可以了
 * @see ===================================================================================================
 * @version v1.7
 * @history v1.0-->新建<code>sendGetRequest()</code>和<code>sendPostRequest()</code>方法
 * @history v1.1-->新增<code>sendPostSSLRequest()</code>方法,用于发送HTTPS的POST请求
 * @history v1.2-->新增<code>sendPostRequest()</code>方法,用于发送HTTP协议报文体为任意字符串的POST请求
 * @history v1.3-->新增<code>java.net.HttpURLConnection</code>实现的<code>sendPostRequestByJava()</code>
 * @history v1.4-->所有POST方法中增加连接超时限制和读取超时限制
 * @history v1.5-->重组各方法,并补充自动获取HTTP响应文本编码的方式,移除<code>sendPostRequestByJava()</code>
 * @history v1.6-->整理GET和POST请求方法,使之更为适用
 * @history v1.7-->修正<code>sendPostRequest()</code>请求的CONTENT_TYPE头信息,并优化各方法参数及内部处理细节
 */ 
public class HttpClientUtil { 
	private static Log logger = LogFactory.getLog(HttpClientUtil.class);// 日志记录器
    private HttpClientUtil(){} 
       
    /**
     * 发送HTTP_GET请求
     * @see 1)该方法会自动关闭连接,释放资源
     * @see 2)方法内设置了连接和读取超时时间,单位为毫秒,超时或发生其它异常时方法会自动返回"通信失败"字符串
     * @see 3)请求参数含中文时,经测试可直接传入中文,HttpClient会自动编码发给Server,应用时应根据实际效果决定传入前是否转码
     * @see 4)该方法会自动获取到响应消息头中[Content-Type:text/html; charset=GBK]的charset值作为响应报文的解码字符集
     * @see   若响应消息头中无Content-Type属性,则会使用HttpClient内部默认的ISO-8859-1作为响应报文的解码字符集
     * @param requestURL 请求地址(含参数)
     * @return 远程主机响应正文
     */ 
    public static String sendGetRequest(String reqURL){ 
        String respContent = "通信失败"; //响应内容 
        HttpClient httpClient = new DefaultHttpClient(); //创建默认的httpClient实例 
        //设置代理服务器 
        //httpClient.getParams().setParameter(ConnRoutePNames.DEFAULT_PROXY, new HttpHost("10.0.0.4", 8080)); 
        httpClient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 10000); //连接超时10s 
        httpClient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, 20000);         //读取超时20s 
        HttpGet httpGet = new HttpGet(reqURL); //创建org.apache.http.client.methods.HttpGet 
        try{ 
            HttpResponse response = httpClient.execute(httpGet); //执行GET请求 
            HttpEntity entity = response.getEntity();            //获取响应实体 
            if(null != entity){ 
                //respCharset=EntityUtils.getContentCharSet(entity)也可以获取响应编码,但从4.1.3开始不建议使用这种方式 
                Charset respCharset = ContentType.getOrDefault(entity).getCharset(); 
                respContent = EntityUtils.toString(entity, "UTF-8"); 
                //Consume response content 
                EntityUtils.consume(entity); 
            } 
            System.out.println("-------------------------------------------------------------------------------------------"); 
            StringBuilder respHeaderDatas = new StringBuilder(); 
            for(Header header : response.getAllHeaders()){ 
                respHeaderDatas.append(header.toString()).append("\r\n"); 
            } 
            String respStatusLine = response.getStatusLine().toString(); //HTTP应答状态行信息 
            String respHeaderMsg = respHeaderDatas.toString().trim();    //HTTP应答报文头信息 
            String respBodyMsg = respContent;                            //HTTP应答报文体信息 
            System.out.println("HTTP应答完整报文=[" + respStatusLine + "\r\n" + respHeaderMsg + "\r\n\r\n" + respBodyMsg + "]"); 
            System.out.println("-------------------------------------------------------------------------------------------"); 
        } catch (ConnectTimeoutException cte){ 
            //Should catch ConnectTimeoutException, and don`t catch org.apache.http.conn.HttpHostConnectException 
            logger.error("请求通信[" + reqURL + "]时连接超时,堆栈轨迹如下", cte); 
        } catch (SocketTimeoutException ste){ 
        	logger.error("请求通信[" + reqURL + "]时读取超时,堆栈轨迹如下", ste); 
        }catch(ClientProtocolException cpe){ 
            //该异常通常是协议错误导致:比如构造HttpGet对象时传入协议不对(将'http'写成'htp')or响应内容不符合HTTP协议要求等 
            logger.error("请求通信[" + reqURL + "]时协议异常,堆栈轨迹如下", cpe); 
        }catch(ParseException pe){ 
            logger.error("请求通信[" + reqURL + "]时解析异常,堆栈轨迹如下", pe); 
        }catch(IOException ioe){ 
            //该异常通常是网络原因引起的,如HTTP服务器未启动等 
            logger.error("请求通信[" + reqURL + "]时网络异常,堆栈轨迹如下", ioe); 
        }catch (Exception e){ 
            logger.error("请求通信[" + reqURL + "]时偶遇异常,堆栈轨迹如下", e); 
        }finally{ 
            //关闭连接,释放资源 
            httpClient.getConnectionManager().shutdown(); 
        } 
        return respContent; 
    } 
       
       
    /**
     * 发送HTTP_POST请求
     * @see 1)该方法允许自定义任何格式和内容的HTTP请求报文体
     * @see 2)该方法会自动关闭连接,释放资源
     * @see 3)方法内设置了连接和读取超时时间,单位为毫秒,超时或发生其它异常时方法会自动返回"通信失败"字符串
     * @see 4)请求参数含中文等特殊字符时,可直接传入本方法,并指明其编码字符集encodeCharset参数,方法内部会自动对其转码
     * @see 5)该方法在解码响应报文时所采用的编码,取自响应消息头中的[Content-Type:text/html; charset=GBK]的charset值
     * @see   若响应消息头中未指定Content-Type属性,则会使用HttpClient内部默认的ISO-8859-1
     * @param reqURL        请求地址
     * @param reqData       请求参数,若有多个参数则应拼接为param11=value11&22=value22&33=value33的形式
     * @param encodeCharset 编码字符集,编码请求数据时用之,此参数为必填项(不能为""或null)
     * @return 远程主机响应正文
     */ 
    public static String sendPostRequest(String reqURL, String reqData, String encodeCharset){ 
        String reseContent = "通信失败"; 
        HttpClient httpClient = new DefaultHttpClient(); 
        httpClient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 10000); 
        httpClient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, 20000*100); 
        HttpPost httpPost = new HttpPost(reqURL); 
        //由于下面使用的是new StringEntity(....),所以默认发出去的请求报文头中CONTENT_TYPE值为text/plain; charset=ISO-8859-1 
        //这就有可能会导致服务端接收不到POST过去的参数,比如运行在Tomcat6.0.36中的Servlet,所以我们手工指定CONTENT_TYPE头消息 
        httpPost.setHeader(HTTP.CONTENT_TYPE, "application/x-www-form-urlencoded; charset=" + encodeCharset); 
        try{ 
            httpPost.setEntity(new StringEntity(reqData==null?"":reqData, encodeCharset)); 
            HttpResponse response = httpClient.execute(httpPost); 
            HttpEntity entity = response.getEntity(); 
            if (null != entity) { 
                reseContent = EntityUtils.toString(entity, ContentType.getOrDefault(entity).getCharset()); 
                EntityUtils.consume(entity); 
            } 
        } catch (ConnectTimeoutException cte){ 
            logger.error("请求通信[" + reqURL + "]时连接超时,堆栈轨迹如下", cte); 
        } catch (SocketTimeoutException ste){ 
            logger.error("请求通信[" + reqURL + "]时读取超时,堆栈轨迹如下", ste); 
        }catch(Exception e){ 
            logger.error("请求通信[" + reqURL + "]时偶遇异常,堆栈轨迹如下", e); 
        }finally{ 
            httpClient.getConnectionManager().shutdown(); 
        } 
        return reseContent; 
    } 
       
    public static String sendPost(String reqURL, String reqData){ 
        String reseContent = "通信失败"; 
        CloseableHttpClient httpClient =HttpClients.createDefault();
       // httpClient.getParams().setParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 10000); 
     //   httpClient.getParams().setParameter(CoreConnectionPNames.SO_TIMEOUT, 20000*100); 
        HttpPost httpPost = new HttpPost(reqURL); 
        //由于下面使用的是new StringEntity(....),所以默认发出去的请求报文头中CONTENT_TYPE值为text/plain; charset=ISO-8859-1 
        //这就有可能会导致服务端接收不到POST过去的参数,比如运行在Tomcat6.0.36中的Servlet,所以我们手工指定CONTENT_TYPE头消息 
        httpPost.addHeader("Content-Type", "application/json"); 
        try{ 
           // httpPost.setEntity(new StringEntity(reqData==null?"":reqData, encodeCharset)); 
            StringEntity entity=new StringEntity(reqData,ContentType.create("application/json","utf-8"));
            httpPost.setEntity(entity);
            CloseableHttpResponse response = httpClient.execute(httpPost); 
            int sc=response.getStatusLine().getStatusCode();
            if(sc>=200&&sc<300){
            	if (null != entity) { 
                    reseContent = EntityUtils.toString(response.getEntity()); 
                  //  EntityUtils.consume(entity); 
                } 
            }
            
        } catch (ConnectTimeoutException cte){ 
            logger.error("请求通信[" + reqURL + "]时连接超时,堆栈轨迹如下", cte); 
        } catch (SocketTimeoutException ste){ 
            logger.error("请求通信[" + reqURL + "]时读取超时,堆栈轨迹如下", ste); 
        }catch(Exception e){ 
            logger.error("请求通信[" + reqURL + "]时偶遇异常,堆栈轨迹如下", e); 
        }finally{ 
            httpClient.getConnectionManager().shutdown(); 
        } 
        return reseContent; 
    } 
       
    
    
    public static void main(String[] args) { 
        Map<String, String> params = new HashMap<String, String>(); 
        params.put("merNo", "301100100001630"); 
        params.put("signType", "MD5"); 
        params.put("merBindAgrNo", "00003018007000006450000013866742"); 
        params.put("interfaceVersion", "1.0.0.0"); 
        params.put("amount", "1000"); 
        params.put("orderDate", "20120823"); 
        params.put("orderNo", "UDP1208230917531231111"); 
        params.put("merReqTime", "20120823091802"); 
        params.put("goodsDesc", "为号码交费充值元"); 
        params.put("goodsName", "中国联通交费充值"); 
        params.put("userIdeMark", "3"); 
        params.put("bankAgrMode", "9"); 
        params.put("signMsg", "3ced24a118461043901d47815e6905a9"); 
        System.out.println(HttpClientUtil.sendGetRequest("https://123.125.97.66:8085/pay/servlet/CreditPayReqServlte2")); 
    }
}