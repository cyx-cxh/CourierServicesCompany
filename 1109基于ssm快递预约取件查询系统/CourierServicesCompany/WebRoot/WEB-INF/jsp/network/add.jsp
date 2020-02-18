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
    <title>新增网点</title>
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
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=deuzkrF5Zmv6dWpIROXkUfCeIeXQgu0I"></script>
    <!-- 表单异步提交start -->
    <script src="${ctx}/resource/static/libs/js/form/form.js" type="text/javascript"></script>
    <!-- 表单异步提交end -->
</head>
<body>
<div class="box1" whiteBg="true">
    <form id="myFormId" action="network/exAdd" method="post">
        <table class="tableStyle" formMode="view">
            <tr>
                <td>选择公司：</td>
                <td>
                <select selWidth="172" name="companyId" url="${ctx}/company/getCompanyList.json" prompt="选择公司"
                childId="provinceId" colNum="5" colWidth="110" class="validate[required]">
                </select>
            </tr>
            <tr>
                <td>网点名称：</td>
                <td colspan="2">
                    <input type="text" name="name" class="validate[required]"/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>网点地址：</td>
                <td colspan="2">
                    <input type="text" name="address" id="address"/>
                    <input type="button" onclick="getLat()" value="获取经纬度"/>
                    <span class="star">输入具体的网点地址可以获取经纬度</span>
                </td>
            </tr>
            <tr>
                <td>经度：</td>
                <td colspan="2">
                    <input type="text" name="lng" id="lng" class="validate[required]"/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td>纬度：</td>
                <td colspan="2">
                    <input type="text" name="lat" id="lat" class="validate[required]"/>
                    <span class="star">*</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <input type="submit" value=" 提 交 "/>
                    <input type="reset" value=" 重 置 "/><span class="star">可以通过点击地图获取网点地址获取经纬度</span>
                </td>
            </tr>
        </table>
    </form>

</div>
<div id="container" style="width: 98%; height: 1000px;">
    <input type="text" id="longitude" name="longitude">
    <input type="text" id="latitude" name="latitude"/>
    </div>
<!-- 异步提交start -->
<script type="text/javascript">
    var map = new BMap.Map("container");
    // 创建地图实例
    var point = new BMap.Point(117.187897, 34.277193, {minZoom:10,maxZoom:12});
    // 创建点坐标
    map.centerAndZoom(point, 12);
    map.enableScrollWheelZoom(true);
    map.enableDragging();
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true})

    map.addEventListener("click",function(e){
        $("#lng").val(e.point.lng);
        $("#lat").val(e.point.lat);
    });
</script>

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
                        top.Dialog.alert("提交成功", function () {
                            window.location.href = "${ctx}/network/findByObj";
                        })
                    }
                });
            }
            //阻止表单默认提交事件
            return false;
        });
    }

function getLat() {
    var address = $("#address").val();
    if (address != null && address != ''){
        $.ajax({
            cache: false,
            type: "post",
            url: "network/getLat.json",
            data: {address: address},// 你的formid
            async: false,
            success: function(data){
                $("#lng").val(data.lng);
                $("#lat").val(data.lat);
            }
        });
    } else {
        top.Dialog.alert("网点地址为空", function () {

        })
    }
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
