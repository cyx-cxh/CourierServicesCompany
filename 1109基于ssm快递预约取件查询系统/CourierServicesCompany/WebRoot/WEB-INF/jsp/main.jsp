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
    <!--框架必需start-->
    <link href="${ctx}/resource/static/libs/css/import_basic.css" rel="stylesheet" type="text/css"/>
    <link href="${ctx}/resource/static/libs/skins/blue2/style.css" rel="stylesheet" type="text/css" id="theme" themeColor="blue2"
          positionTarget="positionContent" selInputHeight="28" selButtonWidth="29" defaultSelWidth="160"
          fileBtnWidth="60" defaultFileInputWidth="222" defaultGridHeaderHeight="32" defaultGridRowHeight="32"
          defaultFontSize="12" defaultPageSelWidth="55" defaultFilterItemHeight="28" defaultFontFamily="宋体"/>
    <link href="${ctx}/resource/static/skin/style.css" rel="stylesheet" type="text/css" id="skin" skinPath="skin/"/>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/jquery.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/language/cn.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/main.js"></script>
    <!--框架必需end-->

    <!--弹窗组件start-->
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/popup/drag.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/popup/dialog.js"></script>
    <!--弹窗组件end-->

    <!--分隔条start-->
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/nav/spliter.js"></script>
    <!--分隔条end-->
</head>
<script>
    // 退出
    function logout() {
        window.location.href = "loginOut";
    }
</script>
<style>
    a {
        behavior: url(${ctx}/resource/static/libs/js/method/focus.htc)
    }
</style>
<link href="${ctx}/resource/static/skin/skin2016/ifhead.css" rel="stylesheet" type="text/css"/>
<script>
    $(function () {
        // 实时刷新在线人数 1分钟（60000毫秒）刷新一次
        // 默认选中第一个
        var hiconIdx = 0;
        $(".nav_icon_h_item >a").filter(':eq(' + hiconIdx + ')').addClass("current");
        // 遍历全部按钮
        $(".nav_icon_h_item >a").each(function (i) {
            // 添加点击事件
            $(this).click(function () {
                // 移除其他按钮选中状态
                $(".nav_icon_h_item >a").removeClass("current");
                // 为当前按钮添加选中状态
                $(this).addClass("current");
                // 联动左侧菜单
                frmleft.showTab(i);
            });
        });
    });
    function backHome() {
        frmright.location.href = "${ctx}/users/edit?id=${user.id}";
    }
</script>
</head>
<body>
<div id="mainFrame">
    <!--头部与导航start-->
    <div id="hbox">
        <div class="if_head_main">
            <div class="if_head_logo"><img src="${ctx}/resource/static/skin/skin2016/img/logo.jpg"/></div>
            <div class="nav_icon_h">
                <div class="nav_icon_h_item ico_bg_1"><a href="javascript:;"><span>
                    <img src="${ctx}/resource/static/skin/skin2016/img/ico_1.png"/></span>系统设置</a></div>
                <div class="clear"></div>
            </div>
            <div class="if_head_right">
                <div class="if_head_rt">
                    <ul>
                        <li><span><img src="${ctx}/resource/static/skin/skin2016/img/ico_s_2.png"/></span><a href="javascript:;" onclick="backHome()">密码</a></li>
                        <li><span><img src="${ctx}/resource/static/skin/skin2016/img/ico_s_7.png"/></span><a href="javascript:;" onclick="logout();">退出</a></li>
                    </ul>
                </div>
                <div class="if_head_rb">
                    <span><img src="${ctx}/resource/static/skin/skin2016/img/ico_s_6.png"/></span>
                    <span class="w80" style="width: 100px">${user.realName}</span>
                    <span id="onlineUser"></span>
                </div>
            </div>
        </div>
    </div>
    <!--头部与导航end-->

    <table width="100%" cellpadding="0" cellspacing="0" class="table_border0">
        <tr>
            <!--左侧区域start-->
            <td id="hideCon" class="ver01 ali01">
                <div id="lbox">
                    <div id="lbox_topcenter">
                        <div id="lbox_topleft">
                            <div id="lbox_topright">
                            </div>
                        </div>
                    </div>
                    <div id="lbox_middlecenter">
                        <div id="lbox_middleleft">
                            <div id="lbox_middleright">
                                <div id="bs_left">
                                    <IFRAME height="100%" width="100%" frameBorder=0 id=frmleft name=frmleft
                                            src="left.do" allowTransparency="true"></IFRAME>
                                </div>
                                <!--更改左侧栏的宽度需要修改id="bs_left"的样式-->
                            </div>
                        </div>
                    </div>
                    <div id="lbox_bottomcenter">
                        <div id="lbox_bottomleft">
                            <div id="lbox_bottomright">
                                <div class="lbox_foot"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <!--左侧区域end-->

            <!--分隔栏区域start-->
            <td class="spliter main_shutiao" targetId="hideCon" beforeClickTip="收缩面板" afterClickTip="展开面板"
                beforeClickClass="bs_leftArr" afterClickClass="bs_rightArr">
            </td>
            <!--分隔栏区域end-->

            <!--右侧区域start-->
            <td class="ali01 ver01" width="100%">
                <div id="rbox">
                    <div id="rbox_topcenter">
                        <div id="rbox_topleft">
                            <div id="rbox_topright">
                            </div>
                        </div>
                    </div>
                    <div id="rbox_middlecenter">
                        <div id="rbox_middleleft">
                            <div id="rbox_middleright">
                                <div id="bs_right">
                                    <IFRAME height="100%" width="100%" frameBorder=0 id=frmright name=frmright
                                            src="open.do" allowTransparency="true"></IFRAME>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="rbox_bottomcenter">
                        <div id="rbox_bottomleft">
                            <div id="rbox_bottomright">

                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <!--右侧区域end-->
        </tr>
    </table>

    <!--尾部区域start-->
    <div id="fbox">
        <div id="bs_footcenter">
            <div id="bs_footleft">
                <div id="bs_footright">
                    版权所有：XXXXXXXXXXXXX
                </div>
            </div>
        </div>
    </div>
</div>
<!--尾部区域end-->

<!--浏览器resize事件修正start-->
<div id="resizeFix"></div>
<!--浏览器resize事件修正end-->

<!--窗口任务栏区域start-->
<div id="dialogTask" class="dialogTaskBg" style="display:none;"></div>
<!--窗口任务栏区域end-->

<!--载进度条start-->
<div class="progressBg" id="progress" style="display:none;">
    <div class="progressBar"></div>
</div>
<!--载进度条end-->
</body>
</html>
