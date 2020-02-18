<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<title>时效费用查询</title>
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

	<script src="${ctx}/resource/web/js/easydialog.min.js"></script>

</head>
<body>
<%@ include file="top.jsp"%>
<section class="inner-w3ls">
	<div class="container">
		<h2 class="text-center w3 w3l agileinfo wthree">About Courier Store</h2>
		<p class="text-center w3 w3l agileinfo wthree">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
	</div>
</section>
<section class="cust-agileits">
	<div class="container">
		<i class="fa fa-smile-o" aria-hidden="true"></i>
		<h3 class="text-center">运费查询</h3>
		<p class="text-center"></p>
		<div class="clearfix"></div>
	</div>
	<div class="col-lg-6 col-md-6 col-sm-6 contact-agile1">
		<div class="control-group form-group">
			<div class="controls">
				<label class="contact-p1">始发地省份:</label>
				<select class="form-control" name="letterCd" id="sf1" onchange="getCity('sf1','city1')"></select>
				<p class="help-block"></p>
			</div>
		</div>
		<div class="control-group form-group">
			<div class="controls">
				<label class="contact-p1">始发地城市:</label>
				<select class="form-control " name="letterCd" id="city1"></select>
				<p class="help-block"></p>
			</div>
		</div>
	</div>
	<div class="col-lg-6 col-md-6 col-sm-6 contact-agile1">
		<div class="control-group form-group">
			<div class="controls">
				<label class="contact-p1">目的地地省份:</label>
				<select class="form-control" name="letterCd" id="sf2" onchange="getCity('sf2','city2')"></select>
				<p class="help-block"></p>
			</div>
		</div>
		<div class="control-group form-group">
			<div class="controls">
				<label class="contact-p1">目的地城市:</label>
				<select class="form-control " name="letterCd" id="city2"></select>
				<p class="help-block"></p>
			</div>
		</div>
	</div>
			<div class="col-lg-12" style="text-align: center">
				<div class="control-group form-group">
					<div class="controls">
						<label class="contact-p1">选择快递公司:</label>
						<select class="form-control" id="Company" maxlength="999"></select>
						<p class="help-block"></p>
					</div>
				</div>
                <div class="control-group form-group">
                    <div class="controls">
                        <label class="contact-p1">请输入重量:</label>
                        <input type="number" class="form-control" id="zl" name="zl" value="" maxlength="999"/>
                        <p class="help-block"></p>
                    </div>
                </div>
                <div class="control-group form-group">
                    <div class="controls">
                        <label class="contact-p1">运费计算结果:</label>
                        <span class="contact-p1" id="yf"></span>
                        <p class="help-block"></p>
                    </div>
                </div>
				<div class="col-lg-6 col-md-6 col-sm-6 contact-agile1">
					<div class="control-group form-group">
						<div class="controls">
							<label class="contact-p1">收件人:</label>
							<input type="text" class="form-control" name="letterCd" id="sjrName" />
							<p class="help-block"></p>
						</div>
					</div>
					<div class="control-group form-group">
						<div class="controls">
							<label class="contact-p1">收件人电话:</label>
							<input type="text" class="form-control " name="letterCd" id="sjrPhone" />
							<p class="help-block"></p>
						</div>
					</div>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-6 contact-agile1">
					<div class="control-group form-group">
						<div class="controls">
							<label class="contact-p1">收件人地址:</label>
							<input type="text" class="form-control" name="letterCd" id="sjrAddress" />
							<p class="help-block"></p>
						</div>
					</div>
					<div class="control-group form-group">
						<div class="controls">
							<label class="contact-p1"></label>
							<input type="text" class="form-control" name="letterCd"/>
							<p class="help-block"></p>
						</div>
					</div>
				</div>
			<button type="button" class="btn btn-primary" onclick="getLngAndLat()">查询</button>
			<button type="button" class="btn btn-primary" onclick="getLngAndLat(1)">我要寄件</button>
		</div>
		<div class="clearfix"></div>
</section>
<%@ include file="bottom.jsp"%>
<script type="text/javascript">

    $(document).ready(function() {
        getCompany();
        getSmsModelName();
    });

    var btnFn = function(){
        easyDialog.close();
        return false;
    };

    //加载信函模板代码【因为其他页面也用了这个JS，所以需要点击时加载】
    function getCompany() {
        var html;
        $.ajax({
            url : "getCompany.json",
            type : 'post',
            dataType : 'json',
            success : function(data) {
                html += "<option value = ''> - - 请选择 - - </option>";
                for (var i = 0; i < data.length; i++) {
                    html += "<option value=" + data[i].id+ ">"
                        + data[i].name + "</option>";
                }
                $("#Company").html(html);
            }
        });
    }

    function getSmsModelName() {
        var html;
        $.ajax({
            url : "getProvince.json",
            type : 'post',
            dataType : 'json',
            success : function(data) {
                html += "<option value = ''> - - 请选择 - - </option>";
                for (var i = 0; i < data.length; i++) {
                    html += "<option value=" + data[i].id+ ">"
                        + data[i].name + "</option>";
                }
                $("#sf1").html(html);
                $("#sf2").html(html);
            }
        });
    }

    function getCity(s,x) {
        var id = $('#' + s + ' option:selected') .val();
        var html;
        $.ajax({
            url : "getCity.json",
            type : 'post',
			data:{provinceId: id},
            dataType : 'json',
            success : function(data) {
                html += "<option value = ''> - - 请选择 - - </option>";
                for (var i = 0; i < data.length; i++) {
                    html += "<option value=" + data[i].id+ ">"
                        + data[i].name + "</option>";
                }
                $("#" + x).html(html);
            }
        });
    }

    var lc, jg, prescriptionId;
    function getLngAndLat(type) {
        var sf1 = $('#sf1 option:selected').text();
        var sf2 = $('#sf2 option:selected').text();
        var city1 = $('#city1 option:selected').text();
        var cityId1 = $('#city1 option:selected').val();
        var city2 = $('#city2 option:selected').text();
        var cityId2 = $('#city2 option:selected').val();
        var zl = $('#zl').val();
        var sjrName = $('#sjrName').val();
        var sjrPhone = $('#sjrPhone').val();
        var sjrAddress = $('#sjrAddress').val();
        var Company = $('#Company option:selected').val();
        if (sf1 == '' || sf2 == '' || city1 == '' || city2 == '' || Company == '' || zl == '') {
            alert("请完善信息")
		} else {
            var address = sf1 + city1;
            var address2 = sf2 + city2;
            if (type != 1){
                $.ajax({
                    url : "getLngAndLat.json",
                    type : 'post',
                    data:{address: address, address2: address2, comId: Company, cityId1:cityId1, cityId2:cityId2, zl:zl },
                    dataType : 'json',
                    success : function(data) {
                        lc = data.lc;
                        jg = data.jg;
                        $("#yf").html("总里程：" + lc + "公里。运费：" + jg + "元。")
                    }
                });
			} else {
                if (type == 1) {
                    $.ajax({
                        url : "save.json",
                        type : 'post',
                        data:{jg: jg, weight: zl, companyId: Company, prescriptionId:prescriptionId, address:address, address2:address2,sjrName:sjrName,sjrPhone:sjrPhone,sjrAddress:sjrAddress },
                        dataType : 'json',
                        success : function(data) {
                            if (data.msg){
                                alert("提交成功")
                                window.location.href = "${ctx}/web/index.do"
							} else {
                                alert("请先登录")
							}

                        }
                    });
                }
			}
		}
    }
</script>

</body>
</html>
			