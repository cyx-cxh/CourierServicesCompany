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
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>新增用户</title>
    <!--框架必需start-->
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/jquery.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/language/cn.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/framework.js"></script>
    <link href="${ctx}/resource/static/libs/css/import_basic.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" id="skin" prePath="${ctx}/resource/static/"/>
    <link rel="stylesheet" type="text/css" id="customSkin"/>
    <!--框架必需end-->

    <!-- 表单验证start -->
    <script src="${ctx}/resource/static/libs/js/form/validationRule.js" type="text/javascript"></script>
    <script src="${ctx}/resource/static/libs/js/form/validation.js" type="text/javascript"></script>
    <!-- 表单验证end -->

    <!-- 表单异步提交start -->
    <script src="${ctx}/resource/static/libs/js/form/form.js" type="text/javascript"></script>
    <!-- 表单异步提交end -->
</head>
<body>
<div class="box1" whiteBg="true">
    <form id="myFormId" action="users/exUpdate.json" method="post">
        <input type="hidden" name="id" value="${bean.id}"/>
        <table class="tableStyle" formMode="view">
            <tr>
                <td>用户名：</td>
                <td colspan="2">
                    <input type="text" name="name" class="validate[required]" value="${bean.name}" disabled/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>真实姓名：</td>
                <td colspan="2">
                    <input type="text" name="realName" class="validate[required]" value="${bean.realName}"/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>性别：</td>
                <td>
                    <select name="sex" selwidth = 172 colWidth="172">
                        <option value="" selected>请选择</option>
                        <option value="0" <c:if test="${bean.sex == 0}">selected</c:if> >男</option>
                        <option value="1" <c:if test="${bean.sex == 1}">selected</c:if>>女</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>联系方式：</td>
                <td colspan="2">
                    <input type="text" name="phone" value="${bean.phone}" class="validate[required,custom[onlyNumber]]"/>
                </td>
            </tr>
            <tr>
                <td>输入密码：</td>
                <td colspan="2"><input type="password" id="pass" name="pw" class="validate[required]" value="${bean.pw}"/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>重复密码：</td>
                <td colspan="2"><input type="password" name="repass" class="validate[required,confirm[pass]]" value="${bean.pw}"/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>邮箱：</td>
                <td colspan="2">
                    <input type="text" name="yx" value="${bean.yx}"/>
                </td>
            </tr>
            <tr>
                <td>选择角色：</td>
                <td>
                    <select name="role" id="role" selwidth = 172 colWidth="172">
                        <option value="" selected>请选择</option>
                        <option value="0" <c:if test="${bean.role == 0}">selected</c:if>>管理员</option>
                        <option value="1" <c:if test="${bean.role == 1}">selected</c:if>>普通用户</option>
                        <option value="2" <c:if test="${bean.role == 2}">selected</c:if>>快递员</option>
                    </select>
                </td>
            </tr>
            <%--<tr>--%>
            <%--<td>选择单位：</td>--%>
            <%--<td>--%>
            <%--<select selWidth="172" name="fjId" id="fjId" url="${ctx}/dw/getAllFjList.json" prompt="请选择一级单位"--%>
            <%--childId="pcsId" childDataPath="${ctx}/dw/getAllPcsList.json?parentId="--%>
            <%--selectedValue="${fjId}" colNum="4" colWidth="200" disabled ="disabled">--%>
            <%--</select>--%>
            <%--<select selWidth="172" id="pcsId" name="pcsId"  prompt="请选择二级单位"--%>
            <%--selectedValue="${pcsId}" disabled ="disabled"></select>--%>
            <%--</td>--%>
            <%--</tr>--%>
            <tr>
                <td colspan="2">
                    <input type="submit" value=" 提 交 "/>
                    <input type="reset" value=" 重 置 "/>
                </td>
            </tr>
        </table>
    </form>
</div>

<!-- 异步提交start -->
<script type="text/javascript">
    function initComplete() {
        //表单提交
        $('#myFormId').submit(function () {
            //判断表单的客户端验证是否通过
            var valid = $('#myFormId').validationEngine({ returnIsValid: true });
            if (valid) {
                $(this).ajaxSubmit({
                    //表单提交成功后的回调
                    success: function (responseText, statusText, xhr, $form) {
//                        responseText = JSON.parse(responseText)
                        top.Dialog.alert(responseText.message, function () {
                                closeWin();
                        })
                    }
                });
            }
            //阻止表单默认提交事件
            return false;
        });
    }

    //重置
    function closeWin() {
        //刷新数据
        top.frmright.refresh();
        //关闭窗口
        top.Dialog.close();
    }
</script>
<!-- 异步提交end -->
</body>
</html>
