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
    <title>新增快递公司</title>
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
    <form id="myFormId" action="company/exUpdate.json" method="post" enctype="multipart/form-data">
        <input type="hidden" name="id" value="${bean.id}"/>
        <input type="hidden" name="prescriptionId" value="${prescription.id}"/>
        <table class="tableStyle" formMode="view">
            <tr>
                <td>公司名称：</td>
                <td colspan="2">
                    <input type="text" name="name" value="${bean.name}" disabled/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>联系方式：</td>
                <td colspan="2">
                    <input type="text" name="phone" value="${bean.phone}" class="validate[required,custom[onlyNumber]]"/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>资费：</td>
                <td colspan="2">
                    <input type="text" name="fy" class="validate[required,custom[onlyNumber]]" value="${bean.fy}"/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>公司图片：</td>
                <td colspan="2">
                    <input type="file" name="files" value="${bean.photo}"/>
                </td>
            </tr>
            <tr>
                <td>公司简介：</td>
                <td colspan="2">
                    <textarea name="bz" style="height: 200px">${bean.bz}</textarea>
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
