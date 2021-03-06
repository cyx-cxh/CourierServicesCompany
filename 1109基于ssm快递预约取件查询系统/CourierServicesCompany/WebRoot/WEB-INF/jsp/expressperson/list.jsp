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
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>快递员列表</title>
    <!--框架必需start-->
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/jquery.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/language/cn.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/framework.js"></script>
    <link href="${ctx}/resource/static/libs/css/import_basic.css" rel="stylesheet" type="text/css"/>
    <link href="${ctx}/resource/static/libs/css/framework/icon.css" rel="stylesheet" type="text/css"/>
    <link href="${ctx}/resource/static/libs/skins/blue2/but.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" id="skin" prePath="${ctx}/resource/static/" scrollerY="false"/>
    <link rel="stylesheet" type="text/css" id="customSkin"/>
    <!--框架必需end-->

    <!--数字分页start-->
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/nav/pageNumber.js"></script>
    <!--数字分页end-->
    <style type="text/css">

    </style>
    <script>
        var fixObjHeight = 230;
        function customHeightSet(contentHeight) {
            $("#scrollContent").height(contentHeight - fixObjHeight);
        }
    </script>
</head>
<body>
<div class="box2" panelTitle="查询" id="searchPanel">

    <form action="expressperson/findByObj" id="queryForm" method="post">
        <table class="if_search_table">
            <tr>
                <td class="if_w80">快递员：</td>
                <td class="if_w172">
                    <select selWidth="172" name="realName" url="${ctx}/expressperson/getExpresspersonList.json" prompt="选择快递员" colNum="1" colWidth="200" selectedValue="${bean.realName}">
                    </select>
                </td>
                <td class="if_w80">联系电话：</td>
                <td class="if_w172"><input type="text"  name="phone" value="${bean.phone}" class="validate[required,custom[onlyNumber]]"/></td>
                <td class="if_w80">公司名称：</td>
                <td class="if_w172">
                    <select selWidth="172" id="fjId" url="${ctx}/company/getCompanyList.json" prompt="请选择公司"
                            childId="pcsId" childDataPath="${ctx}/network/getNetWorkList.json?parentId="
                            selectedValue="${bean.companyId}" colNum="2" colWidth="200" name="companyId">
                    </select>
                </td>

                <td class="if_w80">所属网点：</td>
                <td class="if_w172">
                    <select selWidth="172" id="pcsId" name="networkId"  prompt="选择网点"
                            selectedValue="${bean.networkId}" ></select>
                </td>
                <td>
                    <button  type="submit" ><span class="icon_find">查询</span></button>
                </td>
                <td>
                    <button  type="button"  style="background-color: #3ba2c0;" onclick="onAdd()"><span class="icon_find">新增</span></button>
                </td>
        </table>
    </form>


</div>
<div id="scrollContent" style="overflow-x:hidden;">
    <form id="myFormId" action="expressperson/findByObj" method="post">
        <input type="hidden" value="${bean.name}" name="name" />
        <input type="hidden" value="${bean.companyId}" name="companyId" />
        <input type="hidden" value="${bean.networkId}" name="networkId" />
        <table class="tableStyle" mode="list">
            <tr>
                <th align="center" width="100">公司名称</th>
                <th align="center" width="100">网点名称</th>
                <th align="center" width="100">姓名</th>
                <th align="center" width="100">联系方式</th>
                <th align="center" width="200">操作</th>
            </tr>
            <c:forEach items="${list}" var="row" varStatus="l">
            <tr>
                <td align="center">${row.company.name}</td>
                <td align="center">${row.network.name}</td>
                <td align="center">${row.expressperson.realName}</td>
                <td align="center">${row.expressperson.phone}</td>
                <td align="center">
                    <a onclick="onEdit('${row.expressperson.id}')"><span style="color: gold;">修改</span></a>
                    <a onclick="onDelete('${row.expressperson.id}')"><span style="color: #00bd09">删除</span></a>
                </td>
            </tr>
            </c:forEach>
        </table>
    </form>
</div>
<!--这里是存放表单类型的隐藏域-->
<div style="height:35px;">
    <div class="float_left padding5">
        数据共${pagers.total}条
    </div>
    <div class="float_right padding5">
        <pg:pager url="${ctx}/expressperson/findByObj" maxIndexPages="5" items="${pagers.total}" maxPageItems="15"
                  export="curPage=pageNumber">
            <pg:param name="name" value="${bean.name}"/>
            <pg:param name="networkId" value="${bean.networkId}"/>
            <pg:param name="companyId" value="${bean.companyId}"/>
            <pg:first>
                <a href="${pageUrl}" class="bk page next">首页</a>
            </pg:first>
            <pg:prev>
                <a href="${pageUrl}" class="bk page next">上一页</a>
            </pg:prev>
            <pg:pages>
                <c:choose>
                    <c:when test="${curPage eq pageNumber}">
                        <font color="red"><span class="page curr">${pageNumber }</span></font>
                    </c:when>
                    <c:otherwise>
                        <a href="${pageUrl}" class="bk page next">${pageNumber}</a>
                    </c:otherwise>
                </c:choose>
            </pg:pages>
            <pg:next>
                <a href="${pageUrl}" class="bk page next">下一页</a>
            </pg:next>
            <pg:last>
                <c:choose>
                    <c:when test="${curPage eq pageNumber}">
                        <a href="javascript:;" class="bk page next">尾页</a>
                    </c:when>
                    <c:otherwise>
                        <a href="${pageUrl}" class="bk page next">尾页</a>
                    </c:otherwise>
                </c:choose>

            </pg:last>
        </pg:pager>

    </div>
    <div class="clear"></div>
</div>
</body>
<script>
    //跳转到添加页面
    function onAdd() {
        top.Dialog.open({
            URL: "expressperson/add",
            Title: "新增", Width: 1000, Height: 600

        });
    }

    // 修改
    function onEdit(id) {
        top.Dialog.open({
            URL: "expressperson/edit?id=" +  id,
            Title: "新增", Width: 1000, Height: 600

        });
    }

    //删除禁用
    function onDelete(rowid) {
        top.Dialog.confirm("确定要禁用该记录吗？", function () {
            //删除记录
            $.post("${ctx}/expressperson/delete.json",
                    { "id": rowid },
                    function (result) {
                        top.Dialog.alert(result.message);
                        refresh();
                    }, "json");
        });
    }

    //提交表单
    function postData() {
        var form = document.getElementById("myFormId");
        form.submit();
    }

    //重新提交数据
    function refresh() {
        postData();
    }
</script>
</html>