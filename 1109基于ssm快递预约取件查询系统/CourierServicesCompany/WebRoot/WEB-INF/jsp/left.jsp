<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/common/taglibs.jsp"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    <title>快递</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <!--框架必需start-->
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/jquery.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/language/cn.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/framework.js"></script>
    <link href="${ctx}/resource/static/libs/css/import_basic.css" rel="stylesheet" type="text/css"/>
    <!--框架必需end-->

    <link href="${ctx}/resource/static/skin/skin2016/ifleft.css" rel="stylesheet" type="text/css"/>
    <script>
        $(function () {
            var ifboxmenuIdx = 0;
            var ifboxmenuLiIdx = 0;
            $(".ifboxmenu").not(':eq(' + ifboxmenuIdx + ')').hide();
            $(".ifboxmenu li a").filter(':eq(' + ifboxmenuLiIdx + ')').addClass("current");
            $(".ifboxmenu li a").each(function (i) {
                $(this).click(function () {
                    $(".ifboxmenu li a").removeClass("current");
                    $(this).addClass("current");
                })
            });
            $('ul').hide();
            onInitialize('jcj');
            onInitialize('mydc');
            onInitialize('jmhd');
            onInitialize('grzx');
        });
        function showTab(num) {
            $(".ifboxmenu").hide(200);
            $(".ifboxmenu").filter(':eq(' + num + ')').show(200);
        }
        function onInitialize (title) {
            $("#" + title + "url").css("background-image", "url(${ctx}/resource/static/skin/skin2016/img/menupanelbg2.png)");
            $("#" + title).slideToggle(300);
        }

        function showMenupanel(title) {
            $("#" + title).slideToggle(300, function () {
                var flag = $("#" + title).is(":hidden");
                if (!flag){
                    $("#" + title + "url").css("background-image", "url(${ctx}/resource/static/skin/skin2016/img/menupanelbg2.png)");
                } else {
                    $("#" + title + "url").css("background-image", "url(${ctx}/resource/static/skin/skin2016/img/menupanelbg.png)");
                }
            });
        }
    </script>
    <style type="text/css">
        .ifboxmenu a{text-decoration:none}
    </style>
</head>
<body leftFrame="true">
<div id="scrollContent">
        <div class="ifboxmenu">
            <c:if test="${user.role == 0}">
                <a href="javascript:;">
                    <div class="menupanel" id="jcjurl" onclick="showMenupanel('jcj')">用户管理</div>
                </a>
                <ul id="jcj">
                    <li><a href="${ctx}/users/findByObj" target="frmright" onclick="showProgressBar();"><span class="text_slice">用户列表</span></a></li>
                    <li><a href="${ctx}/expressperson/findByObj" target="frmright" onclick="showProgressBar();"><span class="text_slice">快递员列表</span></a></li>
                </ul>
                <a href="javascript:;">
                    <div class="menupanel" id="provinceurl" onclick="showMenupanel('province')">地址管理</div>
                </a>
                <ul id="province">
                    <li><a href="${ctx}/province/findByObj" target="frmright" onclick="showProgressBar();"><span class="text_slice">省份列表</span></a></li>
                    <li><a href="${ctx}/city/findByObj" target="frmright" onclick="showProgressBar();"><span class="text_slice">城市列表</span></a></li>
                    <li><a href="${ctx}/county/findByObj" target="frmright" onclick="showProgressBar();"><span class="text_slice">区县列表</span></a></li>
                </ul>
                <a href="javascript:;">
                    <div class="menupanel" id="kdurl" onclick="showMenupanel('kd')">快递公司管理</div>
                </a>
                <ul id="kd">
                    <li><a href="${ctx}/company/findByObj" target="frmright" onclick="showProgressBar();"><span class="text_slice">快递公司列表</span></a></li>
                </ul>
                <a href="javascript:;">
                    <div class="menupanel" id="neturl" onclick="showMenupanel('net')">快递网点管理</div>
                </a>
                <ul id="net">
                    <li><a href="${ctx}/network/findByObj" target="frmright" onclick="showProgressBar();"><span class="text_slice">快递网点列表</span></a></li>
                </ul>
                <%--<a href="javascript:;">--%>
                    <%--<div class="menupanel" id="sxurl" onclick="showMenupanel('sx')">时效资费管理</div>--%>
                <%--</a>--%>
                <%--<ul id="sx">--%>
                    <%--<li><a href="${ctx}/prescription/findByObj" target="frmright" onclick="showProgressBar();"><span class="text_slice">时效资费列表</span></a></li>--%>
                <%--</ul>--%>
            </c:if>
            <a href="javascript:;">
                <div class="menupanel" id="yyurl" onclick="showMenupanel('yy')">预约取件管理</div>
            </a>
            <ul id="yy">
                <li><a href="${ctx}/workorder/findByObj" target="frmright" onclick="showProgressBar();"><span class="text_slice">预约取件列表</span></a></li>
            </ul>
    </div>
</div>
</body>
</html>