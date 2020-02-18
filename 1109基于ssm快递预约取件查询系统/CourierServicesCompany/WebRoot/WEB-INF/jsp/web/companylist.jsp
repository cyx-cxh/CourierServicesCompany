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
	<script type="text/javascript" src="${ctx}/resource/web/vue/vue.min.1.0.24.js"></script>
	<script type="text/javascript" src="${ctx}/resource/web/vue/vue-resource.js"></script>


</head>
<body>
<%@ include file="top.jsp"%>
<section class="inner-w3ls">
	<div class="container">
		<h2 class="text-center w3 w3l agileinfo wthree">About Courier Store</h2>
		<p class="text-center w3 w3l agileinfo wthree">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
	</div>
</section>
<section class="team-w3ls">
	<div class="container">
		<i class="fa fa-trophy" aria-hidden="true"></i>
		<h3 class="text-center w3-agileits agileits-w3layouts agile w3-agile">我们的团队</h3>
		<p class="text-center w3-agileits agileits-w3layouts agile w3-agile"></p>
		<c:forEach items="${list}" var="row" varStatus="l">
		<div class="col-md-4 col-sm-4 col-xs-6 text-center">
                <div class="thumbnail">
					<div class="hover01 column">
						<div>
							<figure><img class="img-responsive" src="${ctx}${row.company.photo}" alt="w3ls"></figure>
						</div>
					</div>
                    <div class="caption">
                        <h4>所属公司：${row.company.name}</h4>
                        <h4>网点名称：${row.network.name}</h4>
                        <p class="team-p1">联系电话：${row.network.phone}</p>
						<ul class="social-icons1">
							<li>
								<a href="${ctx}/web/prescription"><span class="label label-primary">我要寄件</span></a>
							</li>

							<li>
								<a href="javascript:;" @click="getList('${row.company.id}')"><span class="label label-primary">查看评价</span></a>
								<input type="hidden" id="butss" data-toggle="modal" data-target="#myModal"/>
							</li>
						</ul>
                    </div>
                </div>
            </div>
		</c:forEach>

        <div class="clearfix"></div>
	</div>
</section>
<section class="cust-agileits">
	<div class="container">
		<i class="fa fa-smile-o" aria-hidden="true"></i>
		<h3 class="text-center">网点查询</h3>
		<p class="text-center"><input type="text" name="name" id="nameId" />
			<a href="javascript:;" onclick="cx()"><span class="label label-primary">网点查询</span></a>
		</p>
		<div id="container" style="width: 100%; height: 800px;"></div>
		<div class="clearfix"></div>
	</div>
</section>
<!-- 按钮触发模态框 -->

<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					快递公司评价
				</h4>
			</div>
			<table class="table">
				<thead>
				<tr>
					<th>时间</th>
					<th>评分</th>
					<th>评论</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="items in list">
					<td style="width: 120px">{{ items.addTime | time}}</td>
					<td style="width: 60px">{{ items.pf }} </td>
					<td>{{ items.bz }}</td>
				</tr>
				</tbody>
			</table>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<%@ include file="bottom.jsp"%>
<script type="text/javascript">
    var demo2 = new Vue({
        el: 'body',
        data () {
            return {
                list:[]
            }
        },
        ready: function () {

        },
        methods: {
            getList: function (id) {
                this.$http.get("${ctx}/web/getPj.json", {companyId: id}).then(function (response) {
                    this.list = response.data.list
                }).catch(function (response) {
                })
                $("#butss").click()
            }
        },
    })
    Vue.filter('time', function (value) {
        function add0(m) {
            return m < 10 ? '0' + m : m
        }
        var time = new Date(parseInt(value));
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var f = time.getMinutes();
        var mm = time.getSeconds();
        return y + '-' + add0(m) + '-' + add0(d);
    })
	function cx() {
	    var name = $("#nameId").val()
		console.log(name)
        map_init(name)
    }


    function getMapPoinits(name) {
        var mydata = [];
        $.ajax({
            url: 'getMapPoinits.json',
            data: {name: name},
            async: false,
            dataType: 'json',
            success: function (result) {
                mydata = result;
            }
        });
        return mydata;
    }

    function map_init(name) {
        var markerArr = getMapPoinits(name);
        // 百度地图API功能
        var map = new BMap.Map("container"); // 创建Map实例
        var point = new BMap.Point(117.18810662317686, 34.27155343109188);
        map.centerAndZoom(point, 13); // 初始化地图,设置中心点坐标和地图级别。
        map.enableScrollWheelZoom(true); //启用滚轮放大缩小
        //地图、卫星、混合模式切换
        map.addControl(new BMap.MapTypeControl());
        var size = new BMap.Size(10, 20);
        map.addControl(new BMap.CityListControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            offset: size,
        }));
        //向地图中添加缩略图控件
        var ctrlOve = new window.BMap.OverviewMapControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            isOpen: 1
        });
        map.addControl(ctrlOve);
        //向地图中添加比例尺控件
        var ctrlSca = new window.BMap.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT
        });
        map.addControl(ctrlSca);

        var point = new Array(); //存放标注点经纬信息的数组
        var marker = new Array(); //存放标注点对象的数组
        var info = new Array(); //存放提示信息窗口对象的数组
        var searchInfoWindow =new Array();//存放检索信息窗口对象的数组
        for (var i = 0; i < markerArr.length; i++) {
            var p0 = markerArr[i].point.split(",")[0]; //
            var p1 = markerArr[i].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来
            point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点
            marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记
            map.addOverlay(marker[i]);
            //显示marker的title，marker多的话可以注释掉
            // var label = new BMap.Label(markerArr[i].title,{offset:new BMap.Size(20,-10)});
            // label.setStyle({
            //     width: "120px",
            //     color: '#fff',
            //     background: '#ff8355',
            //     border: '1px solid "#ff8355"',
            //     borderRadius: "5px",
            //     textAlign: "center",
            //     height: "26px",
            //     lineHeight: "26px"
            // });
            // marker[i].setLabel(label);
            // 创建信息窗口对象
            info[i] = "<p style=’font-size:12px;lineheight:1.8em;’>" + "</br>地址：" + markerArr[i].address + "</br> 电话：" + markerArr[i].tel + "</br></p>";
            //创建百度样式检索信息窗口对象
            searchInfoWindow[i] = new BMapLib.SearchInfoWindow(map, info[i], {
                title  : markerArr[i].title,      //标题
                width  : 290,             //宽度
                height : 55,              //高度
                panel  : "panel",         //检索结果面板
                enableAutoPan : true,     //自动平移
                searchTypes   :[
                    BMAPLIB_TAB_SEARCH,   //周边检索
                    BMAPLIB_TAB_TO_HERE,  //到这里去
                    BMAPLIB_TAB_FROM_HERE //从这里出发
                ]
            });
            //添加点击事件
            marker[i].addEventListener("click",
                (function(k){
                    // js 闭包
                    return function(){
                        //将被点击marker置为中心
                        //map.centerAndZoom(point[k], 18);
                        //在marker上打开检索信息窗口
                        searchInfoWindow[k].open(marker[k]);
                    }
                })(i)
            );
        }
        // //轨迹线
        // var p1 = new BMap.Point(113.264531,23.157003);
        // var p2 = new BMap.Point(113.330934,23.113401);
        // var p3 = new BMap.Point(113.312213,23.147267);
        // var p4 = new BMap.Point(113.372867,23.134274);
        // var driving = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: false }});
        // driving.search(p1, p4);
    }
    //异步调用百度js
    function map_load() {
        var load = document.createElement("script");
        load.src = "http://api.map.baidu.com/api?v=2.0&ak=deuzkrF5Zmv6dWpIROXkUfCeIeXQgu0I&callback=map_init";
        document.body.appendChild(load);
    }
    window.onload = map_load;
</script>
</body>
</html>
			