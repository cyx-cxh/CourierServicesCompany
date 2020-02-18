<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/common/taglibs.jsp"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
    <title>Home</title>
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
    <link rel="stylesheet" href="${ctx}/resource/web/css/easydialog.css" />
    <!-- /css files -->
    <!-- font files -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700italic,700,800,800italic' rel='stylesheet' type='text/css'>
    <link href="http://fonts.googleapis.com/css?family=Exo+2:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <!-- /font files -->
    <!-- js files -->
    <script src="${ctx}/resource/web/js/jquery.min.js"></script>
    <script src="${ctx}/resource/web/layer/layer.js" type="text/javascript" ></script>
    <script src="${ctx}/resource/web/laydate/laydate.js" type="text/javascript"></script>
    <script src="${ctx}/resource/web/AJAX.js"></script>
    <script src="${ctx}/resource/web/js/easydialog.min.js"></script>
    <link href="${ctx}/resource/web/wl/css/style.css" rel="stylesheet" type="text/css"/>

    <!-- /js files -->
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
            <a class="navbar-brand" href="index.html"><h1><img style="height:100px; margin-top: -25px;margin-left: -50px;" src="${ctx}/resource/web/images/header.png"></h1></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="active"><a href="index.do">首页</a></li>
                <li><a href="findByObj">物流业务</a></li>
                <li><a href="prescription">时效费用查询</a></li>
                <li><a href="getList">我的快递</a></li>
                <li><a href="edit?id=${webuser.id}&role=${webuser.role}">个人中心</a></li>
                <li><a href="typo.html">关于我们</a></li>
                <li><a href="contact.html">常见问题</a></li>
                <c:if test="${webuser != null}">
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
<!-- navigation -->
<!-- banner section -->
<section class="banner-w3ls">
    <div class='header'>
        <div class="banner-w3layouts">
            <div class="container">
                <h2 class="text-center w3 w3l agileinfo">不停歇的只有速度</h2>
                <p class="text-center w3 w3l agileinfo">The speed is not stopped </p>
            </div>
        </div>
    </div>
</section>
<!-- /banner section -->
<!-- specialization section -->
<section class="special-w3layouts">
    <div class="container">
        <h3 class="text-center wthree w3-agileits">快捷服务</h3>
        <div class="col-lg-3 col-md-3 col-sm-6">
            <a href="#btn_search">
            <img src="${ctx}/resource/web/images/eye.png" alt="" class="img-responsive">
            <h4 class="text-center">查询快递</h4></a>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6">
            <a href="getList">
            <img src="${ctx}/resource/web/images/monitor.png" alt="" class="img-responsive">
            <h4 class="text-center">寄出快递</h4></a>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6">
            <a href="findByObj">
            <img src="${ctx}/resource/web/images/shop.png" alt="" class="img-responsive">
            <h4 class="text-center">网点查询</h4></a>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6">
            <a href="prescription">
            <img src="${ctx}/resource/web/images/truck.png" alt="" class="img-responsive">
            <h4 class="text-center">时效查询</h4></a>
        </div>
        <div class="clearfix"></div>
    </div>
</section>
<!-- /specialization section -->
<!-- 2nd banner section -->
<section class="banner-w3ls2">
    <div class="container">
        <h3 class="text-center agileits-w3layouts agile w3-agile">国内快递</h3>
        <p class="text-center w3 w3l agileinfo" style="color: white;">本公司在国内拥有庞大的物流网，寄件取件方便快捷，保证物件的安全可靠，并提供上门取件服务，为每一个人开启肥宅快乐。</p>
        </h3>
    </div>
</section>
<!-- /2nd banner section -->
<!-- 2nd info section -->
<section class="info-w3ls2" id="btn_search">
    <div class="container">
        <i class="fa fa-trophy" aria-hidden="true"></i>
        <h3 class="text-center agileits-w3layouts agile w3-agile" >查询快递</h3>
        <p class="text-center"><input type="text" name="search" placeholder="请输入快递单号" id="search">
            &emsp;&emsp;<input style="font-size:14px;background-color:#33accc;font-family: 'Exo 2', sans-serif;" type="button" name="btn_search"  onclick="searchs()" value="查询"></p>
    </div>
    <section class="aui-flexView" style="display:none" id="flexView">
        <header class="aui-navBar aui-navBar-fixed b-line"></header>
        <section class="aui-scrollView">
            <div class="aui-flex aui-flex-lag">
                <div class="aui-aircraft-img">
                    <img src="${ctx}/resource/web/wl/images/icon-fj.png" alt="">
                </div>
                <div class="aui-flex-box">
                    <h2>
                        物流公司：<em id="kdgs"></em>
                    </h2>
                    <h2>
                        物流单号：<em id="code"></em>
                    </h2>
                </div>
            </div>
            <div class="aui-flex aui-flex-lag">
                <div class="aui-flex-box">
                    <h2 style="color:#333">订单跟踪</h2>
                </div>
            </div>
            <div class="aui-timeLine b-line">
                <ul class="aui-timeLine-content" id="uls">
                </ul>
            </div>
        </section>
    </section>
</section>

<!-- /3rd info section -->
<!-- footer section -->
<section class="footer-agileits">
    <div class="container">
        <div class="col-lg-3 col-md-3 col-sm-6">
            <h3>产品服务</h3>
            <ul class="info-links">
                <li><a href="about.html"><i class="fa fa-hand-o-right" aria-hidden="true"></i> 产品介绍</a></li>
                <li><a href="contact.html"><i class="fa fa-hand-o-right" aria-hidden="true"></i>快递说明</a></li>
                <li><a href="icons.html"><i class="fa fa-hand-o-right" aria-hidden="true"></i> 售后服务</a></li>
            </ul>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6">
            <h3>关于我们</h3>
            <ul class="footer-links">
                <li><a href="service.html"><i class="fa fa-hand-o-right" aria-hidden="true"></i> 公司简介</a></li>
                <li><a href="work.html"><i class="fa fa-hand-o-right" aria-hidden="true"></i> 企业文化</a></li>
                <li><a href="process.html"><i class="fa fa-hand-o-right" aria-hidden="true"></i> 服务宗旨</a></li>
                <li><a href="typo.html"><i class="fa fa-hand-o-right" aria-hidden="true"></i> 培训教程</a></li>
            </ul>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6">
            <h3>联系我们</h3>
            <div class="contact-info">
                <div class="address">
                    <i class="glyphicon glyphicon-globe"></i>
                    <p class="p3">中国江苏省南京市</p>
                    <p class="p4">雨花台区软件谷</p>
                </div>
                <div class="phone">
                    <i class="glyphicon glyphicon-phone-alt"></i>
                    <p class="p3">+0516-12345678</p>
                    <p class="p4">183-5786-9403</p>
                </div>
                <div class="email-info">
                    <i class="glyphicon glyphicon-envelope"></i>
                    <p class="p5"><a href="mailto:904797806@qq.com">904797806@qq.com</a></p>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-6">
            <h3>社交分享</h3>
            <ul class="social-icons2">
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
            </ul>
        </div>
        <div class="clearfix"></div>
        <hr>
        <p class="copyright">Copyright &copy; 2016.Company name All rights reserved.<a target="_blank" href="http://sc.chinaz.com/moban/"></a></p>
    </div>
</section>
<!-- /footer section -->
<a href="#0" class="cd-top">Top</a>
<!-- js files -->
<script src="${ctx}/resource/web/js/jquery.min.js"></script>
<script src="${ctx}/resource/web/js/bootstrap.min.js"></script>
<script src="${ctx}/resource/web/js/SmoothScroll.min.js"></script>
<script src="${ctx}/resource/web/js/index.js"></script>
<script src="${ctx}/resource/web/js/top.js"></script>
<script src="${ctx}/resource/web/js/bgfader.js"></script>
<script>
    var myBgFader = $('.header').bgfader([
        '${ctx}/resource/web/images/banner1-1.jpg',
        '${ctx}/resource/web/images/banner1-2.jpg',
        '${ctx}/resource/web/images/banner1-3.jpg',
        '${ctx}/resource/web/images/banner1-4.jpg',
    ], {
        'timeout': 2000,
        'speed': 3000,
        'opacity': 0.4
    })

    myBgFader.start()
</script>

<script type="text/javascript">

    function searchs(){
        var code = $("#search").val();
        var html = '<li class="aui-timeLine-content-item"><em class="aui-timeLine-content-icon"></em>';
        if (code != null && code != ''){
            $.ajax({
                cache: false,
                type: "post",
                url: "${ctx}/web/search.json",
                data:{code: code},
                async: false,
                success: function(data){
                    var list = data.list;
                    for (var i = 0; i < list.length; i++) {
                        console.log(list[list.length - 1 - i].AcceptStation)
                        console.log(list[list.length - 1 - i].AcceptTime)
                        html += '<p style="margin-left: 10px">' + list[list.length - 1 - i].AcceptTime + '</p><p style="margin-top: 2px;">' + list[list.length - 1 - i].AcceptStation + '</p>'
                        $("#uls").append(html);
                    }
                    $("#kdgs").html(data.ShipperCode);
                    $("#code").html(data.LogisticCode);
                    $("#flexView").css("display", "block");
                }
            });
        }
    };

    var btnFn = function(){
        easyDialog.close();
        window.location.href = "web/index.do"
        return false;
    };

    function sub() {
        var name, realName, pw, phone;
        name = $("#name").val();
        realName = $("#realName").val();
        pw = $("#pw").val();
        phone = $("#phone").val();
        if ((name == null || name == '') || (realName == null || realName == '') || (pw == null || pw == '') || (phone == null || phone == '')){
            easyDialog.open({
                container : {
                    header : '提示信息',
                    content : "请完善信息",
                    yesFn : btnFn,
                    noFn : true
                }
            });
            return false;
        }
        $.ajax({
            cache: false,
            type: "post",
            url: "${ctx}/web/exAdd.json",
            data:$('#form-user-add').serialize(),// 你的formid
            async: false,
            success: function(data){
                easyDialog.open({
                    container : {
                        header : '信息',
                        content : data.msg,
                        yesFn : btnFn,
                        noFn : true
                    }
                });
                window.location.href = '${ctx}/web/index.do'
            }
        });
    }
</script>
<!-- /js files -->
</body>
</html>
