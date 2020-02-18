<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<title>我的快递</title>
<!-- for-mobile-apps -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="" />
	<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
    function hideURLbar(){ window.scrollTo(0,1); } </script>
<!-- css files -->
<script type="text/javascript" src="${ctx}/resource/web/tc/js/jquery-1.9.1.min.js"></script>
<link href="${ctx}/resource/web/css/bootstrap.min.css" rel="stylesheet" type="text/css" media="all" />
<link href="${ctx}/resource/web/css/font-awesome.min.css" rel="stylesheet" type="text/css" media="all" />
<link href="${ctx}/resource/web/css/style.css" rel="stylesheet" type="text/css" media="all" />
<link href="${ctx}/resource/web/css/star-rating.css" rel="stylesheet" type="text/css" media="all" />

<link href="${ctx}/resource/web/css/colorfulTab.min.css" rel="stylesheet" type="text/css" media="all" />
<!-- /css files -->
<!-- font files -->
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700italic,700,800,800italic' rel='stylesheet' type='text/css'>
<link href="http://fonts.googleapis.com/css?family=Exo+2:100,200,300,400,500,600,700,800,900" rel="stylesheet">
<script src="${ctx}/resource/web/js/bootstrap.min.js"></script>
<script src="${ctx}/resource/web/js/SmoothScroll.min.js"></script>
<script src="${ctx}/resource/web/js/index.js"></script>
<script src="${ctx}/resource/web/js/top.js"></script>
<script type="text/javascript" src="${ctx}/resource/web/js/colorfulTab.min.js"></script>
<link rel="stylesheet" type="text/css" media="all" href="${ctx}/resource/web/tc/style.css">
<script type="text/javascript" src="${ctx}/resource/web/tc/js/jquery.leanModal.min.js"></script>
	<script src="${ctx}/resource/web/js/star-rating.js" type="text/javascript"></script>
</head>
<body>
<%@ include file="top.jsp"%>
<section class="inner-w3ls">
	<div class="container">
		<h2 class="text-center w3layouts w3 w3l agileits agileinfo">Track Your Product</h2>
		<p class="text-center w3layouts w3 w3l agileits agileinfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
	</div>
</section>
<section class="transit-w3ls">
	<div class="container">
		<i class="fa fa-trophy" aria-hidden="true"></i>
		<h3 class="text-center">我的快递</h3>
		<p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
	</div>
<div class="container">
<div class="colorful-tab-wrapper flatline" id="colorful-flatline" style="background: rgb(68, 83, 112);">
	<ul class="colorful-tab-menu">
					</ul>
	<div class="colorful-tab-container">
		<div class="colorful-tab-content active" id="fl-0">
			<div class="skill-info">
				<div class="table-responsive">
					<table class="table">
						<thead>
						<tr>
							<th>订单号</th>
							<th>目的地</th>
							<th>重量</th>
							<th>快递费</th>
							<th>是否取件</th>
							<th>评论</th>
						</tr>
						</thead>
						<tbody>
						<c:forEach items="${list}" var="row" varStatus="l">
						<tr>
							<td>
								<h4>${row.workorder.code}</h4>
								<div class="clearfix"></div>
							</td>
							<td>${row.channel.endAddress}</td>
							<td>${row.workorder.weight}</td>
							<td>${row.workorder.jg}</td>
							<td><c:if test="${row.workorder.isQj == 0}">未取件</c:if>
								<c:if test="${row.workorder.isQj == 1}">已取件</c:if></td>
							<td> <a data-toggle="modal" href="#myModal" onclick="saId('${row.workorder.id}')"><span style="color: gold;">评论</span></a></td>
						</tr>
						</c:forEach>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		</div>
		<!-- Flatline -->
	</div>
</section>
<div class="modal fade" id="myModal" >
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">评论</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" role="form" action="exAdd" id="signupForm" method="post">
					<input type="hidden" name="id" id="id" value=""/>
					<div class="form-group">
						<label class="col-lg-2 control-label"></label>
						<div class="col-lg-10">
							<textarea name="pl" id="pl" style="width: 400px; height: 200px"></textarea>
						</div>
					</div>
					<input id="input-21e" value="0" type="text" name="pf"  class="rating" data-min=0 data-max=5 data-step=0.5 data-size="xs" title="">
					<button class="btn btn-success btn-lg btn-block" type="button" onclick="sub()">提交</button>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- /transit section -->
<%@ include file="bottom.jsp"%>
<script type="text/javascript">
	function sub() {
        $.ajax({
            url: '${ctx}/evaluates/exAdd',
            data: {workId: $("#id").val(), bz:$("#pl").val(), pf:$("#input-21e").val()},
            async: false,
            dataType: 'json',
            success: function (result) {
                alert(result.message);
                window.location.href = "${ctx}/web/getList"
            }
        });
    }

	function saId(id) {
		$("#id").val(id)
    }

</script>
</body>
</html>
