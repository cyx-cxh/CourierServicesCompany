<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
   <%@include file="/common/taglibs.jsp"%>
 <!--头部-->
    <header>
  <div class="header-top min-width">
    <div class="container fn-clear"> <strong class="fn-left">咨询热线：xxx-xxx-xxxx<span class="s-time">服务时间：9:00 - 18:00</span></strong>
      <ul class="fn-right header-top-ul">
        
        <c:if test="${userId == null }">
         <li>
          <div class=""><a href="${ctx}/login/res.do" class="c-orange" title="免费注册">免费注册</a></div>
        </li>
        <li>
          <div class=""><a href="${ctx}/login/uLogin.do" class="c-orange" title="免费注册">登陆</a></div>
        </li>
        </c:if>
       <c:if test="${userId != null }">
        <li>
          <div class=""><a href="" class="js-login" title=""> 欢迎:${userName}</a></div>
        </li>
         <li>
          <div class=""><a href="${ctx}/login/uTui.do" class="c-orange" title="免费注册">退出登陆</a></div>
        </li>
         </c:if>
      </ul>
    </div>
  </div>
  <div class="header min-width">
    <div class="container">
      <div class="fn-left logo"> <a class="" href="index.html"> <img src="${ctx}/resource/html/images/logo_yfb.png"  title=""> </a> </div>
      <ul class="top-nav fn-clear">
        <li class="on"> <a href="${ctx}/login/uIndex.do">首页</a> </li>
         <c:if test="${userId != null }">
         <li class="top-nav-safe"> <a href="${ctx}/itemOrder/my.do">我的账户</a> </li>
         </c:if>
        
      </ul>
    </div>
  </div>
</header>
<!--头部-->