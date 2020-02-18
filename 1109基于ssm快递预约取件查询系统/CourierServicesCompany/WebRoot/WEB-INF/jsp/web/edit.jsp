<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<title>About</title>
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

<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700italic,700,800,800italic' rel='stylesheet' type='text/css'>
<link href="http://fonts.googleapis.com/css?family=Exo+2:100,200,300,400,500,600,700,800,900" rel="stylesheet">
<script src="${ctx}/resource/web/js/jquery.min.js"></script>
<script src="${ctx}/resource/web/js/bootstrap.min.js"></script>
<script src="${ctx}/resource/web/js/SmoothScroll.min.js"></script>
<script src="${ctx}/resource/web/js/index.js"></script>
<script src="${ctx}/resource/web/js/top.js"></script>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=deuzkrF5Zmv6dWpIROXkUfCeIeXQgu0I"></script>
	<script type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"></script>
	<link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css" />


</head>
<body>
<%@ include file="top.jsp"%>
<section class="inner-w3ls">
	<div class="container">
		<h2 class="text-center w3 w3l agileinfo wthree">About Courier Store</h2>
		<p class="text-center w3 w3l agileinfo wthree">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
	</div>
</section>
<section class="contact-w3ls">
	<div class="container">
		<i class="fa fa-compass" aria-hidden="true"></i>
		<h3 class="text-center">个人中心</h3>
		<p class="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

		<form action="update" method="post" name="sentMessage" id="contactForm" novalidate>
			<input type="hidden" name="role" value="${bean.role}"/>
			<input type="hidden" name="id" value="${bean.id}"/>
			<div class="col-lg-6 col-md-6 col-sm-6 contact-agile1">
				<div class="control-group form-group">
					<div class="controls">
						<label class="contact-p1">用户名:</label>
						<input type="text" class="form-control" value="${bean.name}" name="name" required data-validation-required-message="Please enter your name.">
						<p class="help-block"></p>
					</div>
				</div>
				<div class="control-group form-group">
					<div class="controls">
						<label class="contact-p1">真实姓名:</label>
						<input type="tel" class="form-control" value="${bean.realName}" name="realName" required data-validation-required-message="Please enter your phone number.">
						<p class="help-block"></p>
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 contact-agile2">
				<div class="control-group form-group">
					<div class="controls">
						<label class="contact-p1">性别:</label>
						<select name="sex" class="form-control" style="height: 34px">
							<option value="" selected>请选择</option>
							<option value="0" <c:if test="${bean.sex == 0}">selected</c:if> >男</option>
							<option value="1" <c:if test="${bean.sex == 1}">selected</c:if>>女</option>
						</select>
						<p class="help-block"></p>
					</div>
				</div>
				<div class="control-group form-group">
					<div class="controls">
						<label class="contact-p1">联系方式:</label>
						<input type="text" class="form-control" value="${bean.phone}" name="phone" required data-validation-required-message="Please enter Subject.">
						<p class="help-block"></p>
					</div>
				</div>
			</div>
			<div class="col-lg-12">
				<div class="control-group form-group">
					<div class="controls">
						<label class="contact-p1">密码:</label>
						<input type="text" class="form-control" value="${bean.pw}" name="pw" required data-validation-required-message="Please enter Subject.">
						<p class="help-block"></p>
					</div>
				</div>
				<div id="success"></div>
				<!-- For success/fail messages -->
				<button type="submit" class="btn btn-primary">提交</button>
			</div>
			<div class="clearfix"></div>
		</form>

	</div>
</section>
<%@ include file="bottom.jsp"%>
<script type="text/javascript">

</script>
</body>
</html>
			