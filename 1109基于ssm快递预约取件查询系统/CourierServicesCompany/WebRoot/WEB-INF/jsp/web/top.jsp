<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/common/taglibs.jsp"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
    <title>About</title>
    <!-- for-mobile-apps -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="" />
    <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
    function hideURLbar(){ window.scrollTo(0,1); } </script>
    <!-- css files -->
    <link href="${ctx}/resource/web/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="all" />
    <link href="${ctx}/resource/web/css/font-awesome.min.css" rel="stylesheet" type="text/css" media="all" />
    <link href="${ctx}/resource/web/css/style.css" rel="stylesheet" type="text/css" media="all" />
    <!-- /css files -->
    <!-- font files -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700italic,700,800,800italic' rel='stylesheet' type='text/css'>
    <link href="http://fonts.googleapis.com/css?family=Exo+2:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <!-- /font files -->
    <!-- js files --><script src="${ctx}/resource/web/js/jquery.min.js"></script>
    <script src="${ctx}/resource/web/js/bootstrap.min.js"></script>
    <script src="${ctx}/resource/web/js/SmoothScroll.min.js"></script>
    <script src="${ctx}/resource/web/js/index.js"></script>
    <script src="${ctx}/resource/web/js/top.js"></script>
    <script src="${ctx}/resource/web/js/jquery.min.js"></script>
    <script src="${ctx}/resource/web/AJAX.js"></script>

    <script type="text/javascript" src="${ctx}/resource/web/vue/vue.min.1.0.24.js"></script>
    <script type="text/javascript" src="${ctx}/resource/web/vue/vue-resource.js"></script>

</head>
<body>
<!-- navigation -->
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.do"><h1><img style="height:100px; margin-top: -25px;margin-left: -50px;" src="${ctx}/resource/web/images/header.png"></h1></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li <c:if test="${web == 'active'}">class="active"</c:if>><a href="index.do">首页</a></li>
                <li <c:if test="${web == 'findByObj'}">class="active"</c:if> ><a href="findByObj" id="findByObj" >物流业务</a></li>
                <li  <c:if test="${web == 'prescription'}">class="active"</c:if>><a href="prescription">时效费用查询</a></li>
                <li <c:if test="${web == 'work'}">class="active"</c:if>><a href="getList" >我的快递</a></li>
                <li <c:if test="${web == 'process'}">class="active"</c:if>><a href="edit?id=${webuser.id}&role=${webuser.role}" >个人中心</a></li>
                <li <c:if test="${web == 'typo'}">class="active"</c:if>><a href="typo.html" >关于我们</a></li>
                <li <c:if test="${web == 'contact'}">class="active"</c:if>><a href="contact.html" >常见问题</a></li>
                <c:if test="${webuser != null && webuser != ''}">
                    <li><a href="javascript:;">欢迎 ${webuser.realName}</a></li>
                </c:if>
                <c:if test="${webuser == null}">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-truck" aria-hidden="true"></i>注册<b class="caret"></b></a>
                        <div class="dropdown-menu">
                            <div class="track-w3ls">
                                <h3>新用户注册</h3>
                                <form action="${ctx}/web/exAdd" method="post" id="form-user-add">
                                    <input type="text" name="name" id="name" placeholder="用户名" required />
                                    <input type="text" name="realName" id="realName" placeholder="真实姓名" required >
                                    <input type="text" name="pw" id="pw" placeholder="密码" required >
                                    <input type="text" name="phone" id="phone" placeholder="手机号" required >
                                    <button type="button" class="btn btn-primary" onclick="sub()">注册</button>
                                </form>
                            </div>
                        </div>
                    </li>
                    <li class="dropdown">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-lock" aria-hidden="true"></i> 登录<b class="caret"></b></a>
                        <div class="dropdown-menu">
                            <div class="login-w3ls">
                                <h3>释放你的肥宅快乐</h3>
                                <form action="login.do" method="post" id="login">
                                    <input type="text" name="name" placeholder="Username or email" required />
                                    <input type="password" name='pw' placeholder="Password" required>
                                    <input type="submit" name="submit" value="提交">
                                </form>
                            </div>
                        </div>
                    </li>
                </c:if>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>
<script>
    function sub() {
        var name, realName, pw, phone;
        name = $("#name").val();
        realName = $("#realName").val();
        pw = $("#pw").val();
        phone = $("#phone").val();
        if ((name == null || name == '') || (realName == null || realName == '') || (pw == null || pw == '') || (phone == null || phone == '')){
            alert("请完善信息")
            return false;
        }
        $.ajax({
            cache: false,
            type: "post",
            url: "${ctx}/web/exAdd.json",
            data:$('#form-user-add').serialize(),// 你的formid
            async: false,
            success: function(data){
                window.location.href = '${ctx}/web/index.do'
            }
        });
    }
</script>
</body>
