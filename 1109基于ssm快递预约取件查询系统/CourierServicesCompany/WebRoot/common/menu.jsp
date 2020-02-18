<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
   <%@include file="/common/taglibs.jsp"%>
   <ul>
        <li class="pleft-cur"><span><a href=""><i class="dot dot1"></i>账户总览</a></span></li>
        <li><span><a style="font-size:14px;text-align:center;width:115px;padding-right:35px;" href=" ${ctx}/itemOrder/my">订单记录</a></span></li>
        <li><span><a href="${ctx}/user/cz"><i class="dot dot03"></i>充值</a></span></li>
        <li><span><a href="${ctx}/user/info"><i class="dot dot09"></i>账户信息</a></span></li>
         <li><span><a href="${ctx}/login/upass"><i class="dot dot09"></i>修改密码</a></span></li>
        
      </ul>