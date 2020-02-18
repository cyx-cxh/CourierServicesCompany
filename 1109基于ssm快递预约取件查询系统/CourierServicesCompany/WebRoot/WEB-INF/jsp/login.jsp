<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/common/taglibs.jsp"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>快递</title>
    <link href="${ctx}/resource/static/login/skin/css/login.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript">
        //tab切换
        function setTab(m, n) {
            var tli = document.getElementById("menu" + m).getElementsByTagName("li");
            var mli = document.getElementById("login_dln").getElementsByTagName("span");
            for (i = 0; i < tli.length; i++) {
                tli[i].className = i == n ? "hover" : "";
                mli[i].style.display = i == n ? "block" : "none";
            }
        }
    </script>
</head>

<body>
<div class="fixed">
    <div class="login_main">
        <div class="login_top_nei">
            <div class="menubox">
                <ul id="menu1" class="main_menu">
                    <li class="hover" onMouseOver="setTab(1,0)">管理员</li>
                    <li onMouseOver="setTab(1,1)">快递员</li>
                </ul>
            </div>
        </div>
        <div class="login_dln" id="login_dln">
            <!--普通登录开始-->
            <span class="block">
          <div class="login_w" id="login_f0">
              <form action="login.do" method="post">
                  <input type="hidden" name="type" value="0"/>

                  <div class="login_left">
                      <div class="login_inp_c login_c_backone"><input name="name" type="text" class="input_username1" value="账号"
                                                                      onfocus="if(this.value=='账号'){this.value=''}"
                                                                      onblur="if(this.value==''){this.value='账号'}"/></div>
                      <div class="login_inp_c login_c_backtwo margin_top_7"><input type="password" name="pw" class="input_pass"/>
                      </div>
                  </div>
                  <div class="login_right">
                      <div class="login_btw">
                          <input type="submit" name="button" value=" " class="login_bt"/>
                      </div>
                  </div>
              </form>
          </div>
        </span>
            <!--普通登录开始结束，话务员登录开始-->
            <span>
        <div class="login_w" id="login_f1">
            <form action="login.do" method="post">
                <input type="hidden" name="type" value="3"/>

                <div class="login_left">
                    <div class="login_inp_c login_c_backone"><input name="name" type="text" class="input_username1" value="账号"
                                                                    onfocus="if(this.value=='账号'){this.value=''}"
                                                                    onblur="if(this.value==''){this.value='账号'}"/></div>
                      <div class="login_inp_c login_c_backtwo margin_top_7"><input type="password" name="pw" class="input_pass"/>
                      </div>
                </div>
                <div class="login_right">
                    <div class="login_btw">
                        <input type="submit" name="button" value=" " class="login_bt"/>
                    </div>
                </div>
            </form>
        </div>
          </span>
        </div>
        <div class="clearb"></div>
        <div class="cuowu"><c:if test="${message != null && message != ''}">错误提示：${message}</c:if></div>
</div>
<div class="login_banquan">肥仔快乐递</div>
</div>


</body>
</html>
