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
    <title>用户列表</title>
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

    <!-- 日期选择框start -->
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/form/datePicker/WdatePicker.js"></script>
    <!-- 日期选择框end -->

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
<div class="box2" panelTitle="用户查询" id="searchPanel">

    <form action="users/findByObj" id="queryForm" method="post">
        <table class="if_search_table">
            <tr>
                <td class="if_w80">用户名：</td>
                <td class="if_w172"><input type="text"  name="name" value="${bean.name}"/></td>
                <td class="if_w80">真实姓名：</td>
                <td class="if_w172"><input type="text"  name="realName" value="${bean.realName}"/></td>
                <td class="if_w80">联系方式：</td>
                <td class="if_w172"><input type="text"  name="phone" value="${bean.phone}" class="validate[required,custom[onlyNumber]]"/></td>
            </tr>
            <tr>
                <td class="if_w80">性别：</td>
                <td><select selwidth = 172 name="sex">
                    <option value="" selected>请选择</option>
                        <option value="0" <c:if test="${bean.sex == 0}">selected</c:if>>男</option>
                        <option value="1" <c:if test="${bean.sex == 1}">selected</c:if>>女</option>

                </select></td>
                <td class="if_w80">角色：</td>
                <td class="if_w172">
                    <select selwidth = 172 name="role">
                        <option value="" selected>请选择</option>
                        <option value="0" <c:if test="${bean.role == 0}">selected</c:if>>管理员</option>
                        <option value="1" <c:if test="${bean.role == 1}">selected</c:if>>普通用户</option>
                    </select>
                </td>
                <td>
                    <button  type="submit" ><span class="icon_find">查询</span></button>
                </td>
                <td>
                    <button  type="submit"  style="background-color: #3ba2c0;" onclick="onAdd()"><span class="icon_find">新增</span></button>
                </td>
            </tr>
        </table>
    </form>


</div>
<div id="scrollContent" style="overflow-x:hidden;">
    <form id="myFormId" action="users/findByObj" method="post">
        <input type="hidden" value="${bean.name}" name="name" />
        <input type="hidden" value="${bean.phone}" name="phone" />
        <input type="hidden" value="${bean.yx}" name="yx" />
        <input type="hidden" value="${bean.sex}" name="sex" />
        <input type="hidden" value="${bean.role}" name="role" />
        <table class="tableStyle" mode="list">
            <tr>
                <th align="center" width="100">用户名</th>
                <th align="center" width="100">真实姓名</th>
                <th align="center" width="100">性别</th>
                <th align="center" width="100">联系方式</th>
                <th align="center" width="100">角色</th>
                <th align="center" width="200">操作</th>
            </tr>
            <c:forEach items="${pagers.datas}" var="row" varStatus="l">
            <tr>
                <td align="center">${row.name}</td>
                <td align="center">${row.realName}</td>
                <td align="center">
                    <c:if test="${row.sex == 0}">男</c:if>
                    <c:if test="${row.sex == 1}">女</c:if>
                </td>
                <td align="center">${row.phone}</td>
                <td align="center">
                    <c:if test="${row.role == 0}">管理员</c:if>
                    <c:if test="${row.role == 1}">普通用户</c:if>
                </td>
                <td align="center">
                    <c:if test="${user.role == 0}">
                        <a onclick="onEdit('${row.id}')"><span style="color: gold;">修改</span></a>
                    </c:if>
                    <a onclick="onDelete('${row.id}')"><span style="color: #00bd09">删除</span></a>
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
        <pg:pager url="${ctx}/users/findByObj" maxIndexPages="5" items="${pagers.total}" maxPageItems="15"
                  export="curPage=pageNumber">
            <pg:param name="name" value="${bean.name}"/>
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
            URL: "users/add",
            Title: "新增", Width: 1000, Height: 600

        });
    }

    // 修改
    function onEdit(id) {
        $.post("${ctx}/users/Verification",
            {"id": id},
            function (result) {
                if (!result.flag) {
                    top.Dialog.alert(result.message);
                    return;
                } else {
                    top.Dialog.open({
                        URL: "users/edit?id=" + id,
                        Title: "修改", Width: 1000, Height: 600
                    });
                }
            }, "json");
    }

    //删除禁用
    function onDelete(rowid) {
        top.Dialog.confirm("确定要禁用该记录吗？", function () {
            //删除记录
            $.post("${ctx}/users/delete.json",
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