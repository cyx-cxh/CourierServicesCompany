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
    <title>修改增快递员</title>
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
    <form id="myFormId" action="expressperson/exUpdate.json" method="post">
        <input type="hidden" name="id" value="${bean.id}"/>
        <table class="tableStyle" formMode="view">
            <tr>
                <td>登录账号：</td>
                <td colspan="2">
                    <input type="text" name="name" value="${bean.name}" class="validate[required]" disabled/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>登录密码：</td>
                <td colspan="2">
                    <input type="text" name="pw" class="validate[required]" value="${bean.pw}"/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>选择公司：</td>
                <td class="if_w172">
                    <select selWidth="172" id="fjId" url="${ctx}/company/getCompanyList.json" prompt="请选择公司"
                            childId="pcsId" childDataPath="${ctx}/network/getNetWorkList.json?parentId="
                            selectedValue="${bean.companyId}" colNum="2" colWidth="200" name="companyId">
                    </select>
                </td>
            </tr>
            <tr>
                <td class="if_w80">所属网点：</td>
                <td class="if_w172">
                    <select selWidth="172" id="pcsId" name="networkId"  prompt="选择网点"
                            selectedValue="${bean.networkId}" ></select>
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
                <td colspan="2">
                    <select name="sex" selWidth="172">
                        <option value="0" <c:if test="${bean.sex == 0}">selected</c:if> >男</option>
                        <option value="1" <c:if test="${bean.sex == 1}">selected</c:if> >女</option>
                    </select>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>联系电话：</td>
                <td colspan="2">
                    <input type="text" name="phone" class="validate[required,custom[onlyNumber]]" value="${bean.phone}"/>
                    <span class="star">*</span>
                </td>
            </tr>
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
                        top.Dialog.alert(responseText.message, function () {
                            closeWin()
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
