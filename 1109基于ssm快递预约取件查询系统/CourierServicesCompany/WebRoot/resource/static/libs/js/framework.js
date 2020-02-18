var parentTopHeight;
var parentBottomHeight;
var parentTopHeight_left;
var parentBottomHeight_left;
var parentTopHeight_middle;
var parentBottomHeight_middle;
var fixHeight;
var skinName;
var themeColor="blue";
var broswerFlag;
var broswerVersion;
var fontSize=12;
var fontFamily="宋体";
var prePath="../../";
var exitVtab=0;
var vtabIdx=0;
var hasIframe=0;
var parentScrollHeight;

var boxWhiteBg=false;
var splitMode=false;
var positionTarget="";
var box4Custom=false;
var scrollerX=false;
var autoGetSkin=true;
var autoFormat=true;
var autoRender=true;

var boxIe6Flag = 0;
var boxIe7Flag = 0;
var isHeadFixMode = 0;
var headFixExcude=0;
var headFixExcude2=0;

var cResizeTimer=null;
//定义下拉列表的初始层级，select,selectTree,autoComplete都公用
var depth=500;

//定义当前鼠标位置
var currentMouseX;
var currentMouseY;

$(function(){
	var mainFlag=null;
	var contentFlag=1;
	if(mainFlag!=null){
		alert("内容页面不可引入main.js！");
	}
	
	//禁掉jquery的ajax请求缓存
	$.ajaxSetup({ cache: false });
	
	//让主框架可以获取iframe的点击事件
	$("body").bind("click",function(){
		try{
			//top.iframeClickHandler();
		}
		catch(e){}
		try{
			//parent.iframeClickHandler();
		}
		catch(e){}
	})
	//判断浏览器
	var userAgent = navigator.userAgent, 
	rMsie = /(msie\s|trident.*rv:)([\w.]+)/, 
	rFirefox = /(firefox)\/([\w.]+)/, 
	rOpera = /(opera).+version\/([\w.]+)/, 
	rChrome = /(chrome)\/([\w.]+)/, 
	rSafari = /version\/([\w.]+).*(safari)/;
	var browser;
	var version;
	var ua = userAgent.toLowerCase();
	function uaMatch(ua) {
		var match = rMsie.exec(ua);
		if (match != null) {
			return { browser : "IE", version : match[2] || "0" };
		}
		var match = rFirefox.exec(ua);
		if (match != null) {
			return { browser : match[1] || "", version : match[2] || "0" };
		}
		var match = rOpera.exec(ua);
		if (match != null) {
			return { browser : match[1] || "", version : match[2] || "0" };
		}
		var match = rChrome.exec(ua);
		if (match != null) {
			return { browser : match[1] || "", version : match[2] || "0" };
		}
		var match = rSafari.exec(ua);
		if (match != null) {
			return { browser : match[2] || "", version : match[1] || "0" };
		}
		if (match != null) {
			return { browser : "", version : "0" };
		}
	}
	var browserMatch = uaMatch(userAgent.toLowerCase());
	if (browserMatch.browser&&eval(uncompile("%u02DB%D7%D2%CD%C8%8FQ"))) {
		browser = browserMatch.browser;
		version = browserMatch.version;
	}
	if(browser=="IE"){
		if(version=="6.0"){
			broswerFlag="IE6";
		}
		else if(version=="7.0"){
			broswerFlag="IE7";
		}
		else if(version=="8.0"){
			broswerFlag="IE8";
		}
		else if(version=="9.0"){
			broswerFlag="IE9";
		}
		else if(version=="10.0"){
			broswerFlag="IE10";
		}
		else if(version=="11.0"){
			broswerFlag="IE11";
		}
	}
	else{
		broswerFlag=browser;
	}
	broswerVersion=Number(version.split(".")[0]);
	
	//得到子页面相对于skins路径的前缀，默认为../../		
	var parentSkinUrl;
	if($("#skin").attr("prePath")!=null){
		prePath=$("#skin").attr("prePath");
		
	}
	
	if($("#skin").attr("splitMode")==true||$("#skin").attr("splitMode")=="true"){
		splitMode=true;
		if($("#theme").attr("themeColor")!=null){
			themeColor=$("#theme").attr("themeColor");
		}
	}
	else{
		try {
			var o=top.document.getElementById("theme");
		}
		catch(e){
			if($("body").attr("leftFrame")!="true"){
				alert(uncompile(quiLanguage.jsError.splitModeMessage));
			}
			return;
		}
		
		var $parentThemeDom=$(window.top.document.getElementById("theme"));
		var $parentSkinDom=$(window.top.document.getElementById("skin"));
		
		if($parentThemeDom.attr("autoGetSkin")==false||$parentThemeDom.attr("autoGetSkin")=="false"){
			autoGetSkin=false;
		}
		if($parentThemeDom.attr("autoFormat")==false||$parentThemeDom.attr("autoFormat")=="false"){
			autoFormat=false;
		}
		if($parentThemeDom.attr("autoRender")==false||$parentThemeDom.attr("autoRender")=="false"){
			autoRender=false;
		}
		if($("#skin").attr("autoRender")==false||$("#skin").attr("autoRender")=="false"){
			autoRender=false;
		}
		if($parentThemeDom.attr("box1WhiteBg")==true||$parentThemeDom.attr("box1WhiteBg")=="true"){
			boxWhiteBg=true;
		}
		if($parentThemeDom.attr("box4Custom")==true||$parentThemeDom.attr("box4Custom")=="true"){
			box4Custom=true;
		}
		if($parentThemeDom.attr("scrollerX")==true||$parentThemeDom.attr("scrollerX")=="true"){
			scrollerX=true;
		}
		if($parentThemeDom.attr("positionTarget")!=null){
			positionTarget=$parentThemeDom.attr("positionTarget");
		}
		
		if($parentThemeDom.attr("href")==null){//当子页面单独打开时
			skinName="system/layout/skin/";
			themeColor="blue";
		}
		else{
			skinName=$parentSkinDom.attr("skinPath");
			themeColor=$parentThemeDom.attr("themeColor");
		}
	}
		
		/*只有当autoGetSkin为true并且splitMode为false才自动获取皮肤路径*/
		if(autoGetSkin==true&&splitMode==false){
			if($parentThemeDom.attr("debug")=="true"||$parentThemeDom.attr("debug")==true){
				if(broswerFlag=="IE6"||broswerFlag=="IE7"){
					if($parentThemeDom.attr("href")==""){//当子页面单独打开时
					}
					else{
						//检测是否正确设置了prePath
						$.ajax({
							url: prePath+"libs/skins/"+themeColor+"/style.css",
							error:function(){
								if($("body").attr("leftFrame")=="true"||$("body").attr("leftFrame")==true){
									alert(uncompile(quiLanguage.jsError.pathMessage0)+prePath+"libs/skins/"+themeColor+"/style.css"+uncompile(quiLanguage.jsError.pathMessage2));
								}
								else{
									alert(uncompile(quiLanguage.jsError.pathMessage1)+prePath+"libs/skins/"+themeColor+"/style.css"+uncompile(quiLanguage.jsError.pathMessage2));
								}
							},
							success:function(){
								if($("body").attr("leftFrame")=="true"||$("body").attr("leftFrame")==true){
									alert(uncompile(quiLanguage.jsError.pathMessage3));
								}
								else{
									alert(uncompile(quiLanguage.jsError.pathMessage4));
								};
								$.ajax({
									url: prePath+skinName+"style.css",
									error:function(){
										if($("body").attr("leftFrame")=="true"||$("body").attr("leftFrame")==true){
											alert(uncompile(quiLanguage.jsError.pathMessage0)+prePath+skinName+"style.css"+uncompile(quiLanguage.jsError.pathMessage5));
										}
										else{
											alert(uncompile(quiLanguage.jsError.pathMessage1)+prePath+skinName+"style.css"+uncompile(quiLanguage.jsError.pathMessage5));
										}
									},
									success:function(){
										if($("body").attr("leftFrame")=="true"||$("body").attr("leftFrame")==true){
											alert(uncompile(quiLanguage.jsError.pathMessage6));
										}
										else{
											alert(uncompile(quiLanguage.jsError.pathMessage6));
										}
									}
								})
							}
						})
					}
				}
				else{
					if($parentThemeDom.attr("href")==null){//当子页面单独打开时
					}
					else{
						//检测是否正确设置了prePath
						$.ajax({
							url: prePath+"libs/skins/"+themeColor+"/style.css",
							error:function(){
								if($("body").attr("leftFrame")=="true"||$("body").attr("leftFrame")==true){
									alert(uncompile(quiLanguage.jsError.pathMessage0)+prePath+"libs/skins/"+themeColor+"/style.css"+uncompile(quiLanguage.jsError.pathMessage2));
								}
								else{
									alert(uncompile(quiLanguage.jsError.pathMessage1)+prePath+"libs/skins/"+themeColor+"/style.css"+uncompile(quiLanguage.jsError.pathMessage2));
								}
							},
							success:function(){
								if($("body").attr("leftFrame")=="true"||$("body").attr("leftFrame")==true){
									alert(uncompile(quiLanguage.jsError.pathMessage3));
								}
								else{
									alert(uncompile(quiLanguage.jsError.pathMessage4));
								};
								$.ajax({
									url: prePath+skinName+"style.css",
									error:function(){
										if($("body").attr("leftFrame")=="true"||$("body").attr("leftFrame")==true){
											alert(uncompile(quiLanguage.jsError.pathMessage0)+prePath+skinName+"style.css"+uncompile(quiLanguage.jsError.pathMessage5));
										}
										else{
											alert(uncompile(quiLanguage.jsError.pathMessage1)+prePath+skinName+"style.css"+uncompile(quiLanguage.jsError.pathMessage5));
										}
									},
									success:function(){
										if($("body").attr("leftFrame")=="true"||$("body").attr("leftFrame")==true){
											alert(uncompile(quiLanguage.jsError.pathMessage6));
										}
										else{
											alert(uncompile(quiLanguage.jsError.pathMessage6));
										}
									}
								})
							}
						})
					}
				}
			}
			
			$("#skin").attr("href",prePath+"libs/skins/"+themeColor+"/style.css");
			$("#customSkin").attr("href",prePath+skinName+"style.css");
		}
		/*只有当autoGetSkin为true并且splitMode为false才自动获取皮肤路径*/
	
		
	
	
	//初始化信息提示特效
	enableTooltips();
	
	
	//设置初始时字体大小
	try {
		if(splitMode==false){
			fontSize=top.getFontSize();
			fontFamily=top.getFontFamily();
		}
	}
	catch(e){}
	if(fontSize!=12){
		$("body").css({
			"fontSize":fontSize+"px"
		});
		if ($("table:[class=tableStyle]").length > 0) {
			$("table:[class=tableStyle]").css({
				"fontSize":fontSize+"px"
			});
		}
		if ($("pre").length > 0) {
			$("pre").css({
				"fontSize":fontSize+"px"
			});
		}
	}
	if(fontFamily!="宋体"){
		$("body").css({
			"fontFamily":fontFamily
		});
	}
	
	/*启用自动渲染 渲染box模型*/
	if(autoRender==true){
		$("div").each(function(){
			//盒子模型
			if($(this).hasClass("box1")||$(this).attr("boxType")=="box1"){
				$(this).box1Render();
			}
			else if($(this).hasClass("box2")||$(this).attr("boxType")=="box2"){
				$(this).box2Render();
			}
			else if($(this).hasClass("box4")){
				$(this).box4Render();
			}
		})
	}
	/*启用自动渲染 渲染box模型*/
	
	if ($("body").attr("leftFrame") == "true") {
		$("body").addClass("contentStyleLeft");
	}
	else {
		$("body").addClass("contentStyle");
	}

	//默认禁用横向滚动条
	if(scrollerX==true){
		if($("#skin").attr("scrollerX")=="false"||$("#skin").attr("scrollerX")==false){
			scrollerX=false;
		}
	}
	else{
		if($("#skin").attr("scrollerX")=="true"||$("#skin").attr("scrollerX")==true){
			scrollerX=true;
		}
	}
	if(broswerFlag=="IE6"){
		$("html").css({
			"width":"100%"
		})
	}
	if(scrollerX==false){
		if(broswerFlag=="IE7"){
			$("body").css({
				"overflowX":"hidden"
			})
		}
		else{
			$("html").css({
				"overflowX":"hidden"
			})
		}
	}
	if($("#skin").attr("scrollerY")=="false"||$("#skin").attr("scrollerY")==false){
		$("html").css({
				"overflowY":"hidden"
			})
	}
	//触发高度处理函数
	triggerCustomHeightSet();
	if(!qflag()){return;}
	if ( cResizeTimer ) clearTimeout (cResizeTimer);
   	cResizeTimer = setTimeout ("triggerCustomHeightSet()", 500);
	
	window.onresize = function(){
		if ( cResizeTimer ) clearTimeout (cResizeTimer);
   		cResizeTimer = setTimeout ("triggerCustomHeightSet()", 100);
	}
	
	
	if (autoRender == true) {
		$("div,input,textarea,button,select,form,table,a,img,span").each(function(){
			if ($(this).hasClass("box1") || $(this).hasClass("box2") || $(this).hasClass("box3") || $(this).hasClass("box4")||$(this).attr("boxType")=="box1"||$(this).attr("boxType")=="box2"|| $(this).attr("keepDefaultStyle")=="true"|| $(this).attr("keepDefaultStyle")==true || $(this).attr("fillType")) {
				if($(this).hasClass("imgPreview")){
					$(this).render();
				}
			}
			else {
				$(this).render();
				if($(this).attr("title")){
					if($(this).parents(".selectbox-tree").length>0||$(this).parents(".dbSelectionMode").length>0){}
					else{
						//启用提示特效
						addTooltip($(this)[0]);
					}
				}
				
			}
		})
		$(".spliter").each(function(){
			try{
				if($(this).is("td")){
					$(this).spliterRender();
				}
			}
			catch(e){
				alert(uncompile(quiLanguage.jsError.spliter))
			}
		})
	}
	
	//关闭进度条
	closeProgress();
	
	//初始化所在位置
	if(!splitMode){
		if(parent.positionType){
			if(parent.positionType!="none"&&parent.positionContent!=""){
				if(positionTarget==""){
					if(parent.positionType=="normal"){
						createPosition(parent.positionContent,"normal");
					}
					else{
						createPosition(parent.positionContent,"simple");
					}
				}
				else{
					top.createPosition(positionTarget,parent.positionContent);
				}
			}
		}
	}
	
	_initComplete();
});
function cusTreeTableLoadLater(obj,value){
	$.ajax({
		url: value,
		error: function(){
			try {
				top.Dialog.alert("数据加载失败，请检查dataPath是否正确");
			}
			catch(e){
				alert("数据加载失败，请检查dataPath是否正确");
			}
		},
		success: function(xml){
			var $tableContent=obj.parents("tr").next().find("table").parents("td");
			$tableContent.html("");
			var $newTable=$(xml);
			$newTable.appendTo($tableContent);
			$newTable.tableRender();
			obj.removeClass("img_loading");
			obj.addClass("img_remove2");
			obj.attr("title","点击收缩");
			obj.parents("tr").next().show();
		}
	})
}


function triggerCustomHeightSet(){
	var windowHeight=document.documentElement.clientHeight;
	var windowWidth=document.documentElement.clientWidth;
	_customHeightSet(windowHeight,windowWidth);
}

function _customHeightSet(windowHeight,windowWidth){
	try {
			customHeightSet(windowHeight,windowWidth);
	}
	catch(e){}
	
}
function changeFont(num){//更改字体大小
	$("body").css({
		"fontSize":num+"px"
	});
	if ($("table:[class=tableStyle]").length > 0) {
		$("table:[class=tableStyle]").css({
			"fontSize":num+"px"
		});
	}
	if ($("pre").length > 0) {
		$("pre").css({
			"fontSize":num+"px"
		});
	}
	if($("iframe").length>0){
		for(var i=0;i<$("iframe").length;i++){
			document.getElementsByTagName("iframe")[i].contentWindow.changeFont(num);
		}
	}
	fontSize=num;
}

function changeFontFamily(fontName){//更改字体
	$("body").css({
		"fontFamily":fontName
	});
	if($("iframe").length>0){
		for(var i=0;i<$("iframe").length;i++){
			document.getElementsByTagName("iframe")[i].contentWindow.changeFontFamily(fontName);
		}
	}
	fontFamily=fontName;
}

(function($) {
	$.fn.render = function(){
		//分隔条
		if($(this).hasClass("spliter")){
			try{
				$(this).spliterRender();
			}
			catch(e){
				alert(uncompile(quiLanguage.jsError.spliter))
			}
		}
		
		if($(this).is("input")){
			if($(this).attr("type")=="text"){
				//颜色选择器
				if($(this).hasClass("color")){
					$(this).textInputStyleRender();
					try{
						$(this).attr("trueType","color");
						$(this).colorRender();
					}
					catch(e){
						alert(uncompile(quiLanguage.jsError.color))
					}
				}
				//日期选择框
				else if($(this).hasClass("date")){
					$(this).attr("trueType","date");
					$(this).dateRender();
				}
				else if($(this).hasClass("dateIcon")){
					$(this).attr("trueType","date");
					$(this).textInputStyleRender();
				}
				//软键盘控件
				else if($(this).hasClass("keypad")){
					$(this).textInputStyleRender();
					try{
						$(this).attr("trueType","keypad");
						$(this).keypadRender()
					}
					catch(e){
						alert(uncompile(quiLanguage.jsError.keypad))
					}
				}
				//数字步进器
				else if($(this).hasClass("stepper")){
					$(this).textInputStyleRender();
					try{
						$(this).attr("trueType","stepper");
						$(this).stepperRender()
					}
					catch(e){
						alert(uncompile(quiLanguage.jsError.stepper))
					}
				}
				//文本框
				else{
					$(this).attr("trueType","textinput");
					$(this).textinputRender();
				}
			}
			//input按钮渲染
			else if($(this).attr("type")=="button"||$(this).attr("type")=="submit"||$(this).attr("type")=="reset"){
				$(this).buttonInputRender();
			}
			//基本上传控件
			else if($(this).attr("type")=="file"){
				$(this).attr("trueType","file");
				$(this).fileRender();
			}
			//密码框
			else if($(this).attr("type")=="password"){
				$(this).attr("trueType","password");
				$(this).passInputRender();
				
				//软键盘控件
				if($(this).hasClass("keypad")){
					$(this).textInputStyleRender();
					try{
						$(this).attr("trueType","keypad");
						$(this).keypadRender()
					}
					catch(e){
						alert(uncompile(quiLanguage.jsError.keypad))
					}
				}
			}
			else if($(this).attr("type")=="radio"){
				$(this).attr("trueType","radio");
			}
			else if($(this).attr("type")=="checkbox"){
				$(this).attr("trueType","checkbox");
			}
			else if($(this).attr("type")=="hidden"){
				$(this).attr("trueType","hidden");
			}
		}
		//button模式按钮
		else if($(this).is("button")){
			$(this).buttonRender();
		}
		//文本域
		else if($(this).is("textarea")){
			$(this).attr("trueType","textarea");
			$(this).textareaRender();
		}
		//select下拉框
		else if($(this).is("select")){
			$(this).attr("trueType","select");
			$(this).prev(".mainCon").attr("trueType","q_select");
			$(this).selectRender();
		}
		//table
		else if($(this).is("table")){
			if($(this).hasClass("tableStyle")){
				$(this).tableRender();
			}
			else if($(this).hasClass("treeTable")){
				try{
					$(this).treeTableRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.treeTable))
				}
			}
			else if($(this).hasClass("detailTable")){
				try{
					$(this).addClass("tableStyle");
					$(this).tableRender();
					$(this).detailTableRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.detailTable))
				}
			}
		}
		//a
		else if($(this).is("a")){
			if($(this).hasClass("imgPreview")){
				try{
					$(this).imagePreviewRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.imgPreview))
				}
			}
			else if($(this).hasClass("imgZoom")){
				try{
					$(this).imgZoomRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.imgZoom))
				}
			}
		}
		//img
		else if($(this).is("img")){
			if($(this).hasClass("imgFrame")){
				try{
					$(this).imgFrameRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.imgFrame))
				}
			}
			else if($(this).hasClass("imgFade")){
				try{
					$(this).imgFadeRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.imgFade))
				}
			}
		}
		else if($(this).is("div")){
			//盒子模型
			if($(this).hasClass("box1")||$(this).attr("boxType")=="box1"){
				$(this).box1Render();
			}
			else if($(this).hasClass("box2")||$(this).attr("boxType")=="box2"){
				$(this).box2Render();
			}
			else if($(this).hasClass("box4")){
				$(this).box4Render();
			}
			//浮动面板
			else if($(this).hasClass("floatPanel")){
				try{
					$(this).floatPanelRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.floatPanel))
				}
			}
			//树形下拉框
			else if($(this).hasClass("selectTree")){
				try{
					$(this).attr("trueType","selectTree");
					$(this).selectTreeRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.selectTree))
				}
			}
			//自定义下拉框
			else if($(this).hasClass("selectCustom")){
				try{
					$(this).attr("trueType","selectCustom");
					$(this).selectCustomRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.selectCustom))
				}
			}
			//自动提示框
			else if($(this).hasClass("suggestion")){
				try{
					$(this).attr("trueType","suggestion");
					$(this).suggestionRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.suggestion))
				}
			}
			//过滤下拉框
			else if($(this).hasClass("selectSuggestion")){
				try{
					$(this).attr("trueType","selectSuggestion");
					$(this).selectSuggestionRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.suggestion))
				}
			}
			//条件过滤器
			else if($(this).hasClass("filter")){
				try{
					$(this).attr("trueType","filter");
					$(this).filterRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.filter))
				}
			}
			//条件过滤器
			else if($(this).hasClass("condition")){
				try{
					$(this).attr("trueType","condition");
					$(this).conditionRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.filter))
				}
			}
				//条件过滤器
			else if($(this).hasClass("conditionNav")){
				try{
					$(this).attr("trueType","conditionNav");
					$(this).conditionNavRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.filter))
				}
			}
			//双向选择器
			else if($(this).hasClass("lister")){
				try{
					$(this).attr("trueType","lister");
					$(this).listerRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.lister))
				}
			}
			//树形双选器
			else if($(this).hasClass("listerTree")){
				try{
					$(this).attr("trueType","listerTree");
					$(this).listerTreeRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.listerTree))
				}
			}
			//评星级控件
			else if($(this).hasClass("rating")){
				try{
					$(this).attr("trueType","rating");
					$(this).ratingRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.rating))
				}
			}
			//弹出式菜单
			else if($(this).hasClass("popupMenu")){
				$(this).popupMenuRender();
			}
			//基本选项卡
			else if($(this).hasClass("basicTab")){
				try{
					$(this).basicTabRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.basicTab))
				}
			}
			else if($(this).hasClass("basicTabModern")){
				//try{
					$(this).basicTabModernRender();
				//}
				//catch(e){
					//alert(uncompile(quiLanguage.jsError.basicTabModern)
				//}
			}
			else if($(this).hasClass("basicTabProcess")){
				try{
					$(this).basicTabProcessRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.basicTabProcess))
				}
			}
			//纵向选项卡
			else if($(this).hasClass("verticalTab")){
				try{
					$(this).verticalTabRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.verticalTab))
				}
			}
			//单级纵向导航
			else if($(this).hasClass("singleNav")){
				$(this).singleNavRender();
			}
			//单级纵向导航（迷你）
			else if($(this).hasClass("singleNavMin")){
				$(this).singleNavMinRender();
			}
			//抽屉容器
			else if($(this).hasClass("accordition")){
				try{
					$(this).accorditionRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.accordion))
				}
			}
			//图标导航 鼠标移入变色
			else if($(this).hasClass("navIcon")){
				$(this).hover(function(){
					$(this).addClass("navIcon_hover");
				},function(){
					$(this).removeClass("navIcon_hover");
				})
			}
			//图标工具箱 鼠标移入变色
			else if($(this).hasClass("navIconSmall")){
				$(this).hover(function(){
					$(this).addClass("navIconSmall_hover");
				},function(){
					$(this).removeClass("navIconSmall_hover");
				})
			}
			//分页组件
			else if($(this).hasClass("pageNumber")){
				try{
					$(this).pageNumberRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.pageNumber))
				}
			}
			else if($(this).hasClass("pageArrow")){
				try{
					$(this).pageArrowRender();
				}
				catch(e){
					alert(uncompile(quiLanguage.jsError.pageArrow))
				}
			}
		}
		else if($(this).is("span")){
			if($(this).hasClass("img_light")){
				$(this).addClass("hand");
				$(this).hover(function(){
					$(this).removeClass("img_light");
					$(this).addClass("img_lightOn");
				},function(){
					$(this).addClass("img_light");
					$(this).removeClass("img_lightOn");
				});
			}
		}
	};
	$.fn.setValue = function(value,text){
		var $instance=$(this);
		if($instance.attr("trueType")=="select"){
			$instance.attr("selectedValue",value)
	     	$instance.render();
		}
		else if($instance.attr("trueType")=="selectTree"){
			$instance.attr("selectedValue",value)
	     	$instance.render();
		}
		else if($instance.attr("trueType")=="selectCustom"){
			$instance.selectCustomSetValue(value,text);
		}
		else if($instance.attr("trueType")=="suggestion"){
			$instance.suggestionSetValue(value,text);
		}
		else if($instance.attr("trueType")=="selectSuggestion"){
			$instance.selectSuggestionSetValue(value,text);
		}
		else if($instance.attr("trueType")=="lister"){
			$instance.listerSetValue(value);
		}
		else if($instance.attr("trueType")=="listerTree"){
			$instance.listerTreeSetValue(value);
		}
		else if($instance.attr("trueType")=="filter"){
			$instance.attr("selectedValue",value)
	     	$instance.render();
		}
	};
	$.fn.resetValue = function(){
		var $instance=$(this);
		if($instance.attr("trueType")=="select"){
	     	$instance.render();
		}
		else if($instance.attr("trueType")=="selectTree"){
	     	$instance.render();
		}
		else if($instance.attr("trueType")=="lister"){
	     	$instance.render();
		}
		else if($instance.attr("trueType")=="listerTree"){
	     	$instance.render();
		}
		else if($instance.attr("trueType")=="filter"){
	     	$instance.render();
		}
	};
	$.fn.addItem = function(value){
		var $instance=$(this);
		if($instance.attr("trueType")=="select"){
			$instance.selectAddItem(value);
		}
		else if($instance.attr("trueType")=="selectTree"){
	     	$instance.selectTreeAddItem(value);
		}
		else if($instance.attr("trueType")=="lister"){
	     	$instance.listerAddItem(value);
		}
		else if($instance.attr("trueType")=="listerTree"){
	     	$instance.listerTreeAddItem(value);
		}
	};
	$.fn.removeItem = function(value){
		var $instance=$(this);
		if($instance.attr("trueType")=="select"){
			$instance.selectRemoveItem(value);
		}
		else if($instance.attr("trueType")=="selectTree"){
	     	$instance.selectTreeRemoveItem(value);
		}
		else if($instance.attr("trueType")=="lister"){
	     	$instance.listerRemoveItem(value);
		}
		else if($instance.attr("trueType")=="listerTree"){
	     	$instance.listerTreeRemoveItem(value);
		}
	};
	$.fn.selectValue = function(value){
		var $instance=$(this);
		if($instance.attr("trueType")=="lister"){
	     	$instance.listerSelectValue(value);
		}
		else if($instance.attr("trueType")=="listerTree"){
	     	$instance.listerTreeSelectValue(value);
		}
	};
	$.fn.unSelectValue = function(value){
		var $instance=$(this);
		if($instance.attr("trueType")=="lister"){
	     	$instance.listerUnSelectValue(value);
		}
		else if($instance.attr("trueType")=="listerTree"){
	     	$instance.listerTreeUnSelectValue(value);
		}
	};
	$.fn.box1Render = function() {
		var con;
		if($(this).find(".boxContent").length>0){
			
		}
		else{
			con=$(this).html();
			$(this).empty();
			if($(this).attr("whiteBg")=="true"||$(this).attr("whiteBg")==true||boxWhiteBg==true){
				if($(this).hasClass("box1")){
					$(this).addClass("box1_white");
				}
			}
			$("<div class='box_topcenter'><div class='box_topleft'><div class='box_topright'></div></div></div>").appendTo($(this));
			$("<div class='box_middlecenter'><div class='box_middleleft'><div class='box_middleright'><div class='boxContent'></div></div></div></div>").appendTo($(this));
			$("<div class='box_bottomcenter'><div class='box_bottomleft'><div class='box_bottomright'></div></div></div>").appendTo($(this));
			$(this).find(".boxContent").html(con);
		}
		$(this).box1Build();	
			
	};
	$.fn.box1Build= function(){
		if($(this).attr("panelWidth")!=null){
			var panelWidth=$(this).attr("panelWidth");
			var lastStr=panelWidth.substr(panelWidth.length-1,1);
			if(lastStr=="%"){
				$(this).width(panelWidth);
			}
			else{
				var trueWidth=Number($(this).attr("panelWidth"));
				$(this).width(trueWidth);
			}
			
		}
		
		if($(this).attr("panelHeight")!=null){
			var useHeight
			if($(this).attr("whiteBg")=="true"||$(this).attr("whiteBg")==true){
				//$(this).find(".box1_topcenter2").height(20);
				//$(this).find(".box1_bottomcenter2").height(22);
				useHeight=Number($(this).attr("panelHeight"))-$(this).find(".box1_topcenter2").outerHeight()-$(this).find(".box1_bottomcenter2").outerHeight();
			}
			else{
				//$(this).find(".box1_topcenter").height(20);
				//$(this).find(".box1_bottomcenter").height(22);
				useHeight=Number($(this).attr("panelHeight"))-$(this).find(".box1_topcenter").outerHeight()-$(this).find(".box1_bottomcenter").outerHeight();
			}
			$(this).find(".boxContent").height(useHeight);
		}
		
		if($(this).attr("overflow")=="true"||$(this).attr("overflow")==true){
			$(this).find(".boxContent").css({
				"overflow":"auto"
			})
		}
		else if($(this).attr("overflow")=="false"||$(this).attr("overflow")==false){
			$(this).find(".boxContent").css({
				"overflow":"hidden"
			})
		}
		else{
			$(this).find(".boxContent").css({
				"overflow":"visible"
			})
		}
		if($(this).attr("position")=="center"){
			$(this).addClass("center");
		}	
		else{
			$(this).removeClass("center");
		}
	}
	$.fn.box2Close=function() {
		var state=$(this).box2GetState();
		if(!state){
			return;
		}
		$(this).find(".ss").click();
	};
	$.fn.box2Open=function() {
		var state=$(this).box2GetState();
		if(state){
			return;
		}
		$(this).find(".ss").click();
	};
	$.fn.box2ChangeState= function() {
		$(this).find(".ss").click();
	};
	$.fn.box2GetState=function() {
		//true为展开,false为关闭
		var state;
		if($(this).find(".boxContent")[0].style.display=="none"){
			state=false;
		}
		else{
			state=true;
		}
		return state;
	};
	$.fn.box2Render = function() {
			var con;
		if($(this).find(".boxContent").length>0){}
		else{
			con=$(this).html();
			$(this).empty();
			$("<div class='box_topcenter' id='box_topcenter'><div class='box_topleft'><div class='box_topright'><div class='title'><span></span></div><div class='boxSubTitle'></div>"+
			"<div class='status'><span class='ss'><a></a></span></div><div class='clear'></div></div></div></div>").appendTo($(this));
			$("<div class='box_middlecenter'><div class='box_middleleft'><div class='box_middleright'><div class='boxContent'></div></div></div></div>").appendTo($(this));
			$("<div class='box_bottomcenter' id='box_bottomcenter'><div class='box_bottomleft'><div class='box_bottomright'></div></div></div>").appendTo($(this));
			
			$(this).find(".boxContent").html(con);
		}
			
		$(this).box2Build();					
	};
	$.fn.box2Build= function(){
		var $instance=$(this);
		var $titleDom=$instance.find(".title");
		var $span=$titleDom.find("span");
		if($instance.attr("boxType")==null){
			$instance.attr("boxType","box2");
		}
		if($instance.attr("panelTitle")!=null){
			$span.text($instance.attr("panelTitle"));
		}
		if($instance.attr("iconClass")!=null){
			$span.addClass($instance.attr("iconClass"));
			$span.css({
				"backgroundPosition":"0 50%"
			})
			$span.parent().addClass("title_icon");
		}
		else if($instance.attr("iconSrc")!=null){
				$span.css({
					"backgroundImage":"url("+$(this).attr("iconSrc")+")",
					"backgroundRepeat":"no-repeat",
					"backgroundPosition":"0 50%",
					"display":"block"
				})
			$span.parent().addClass("title_icon");	
		}
		
		if($instance.attr("panelSubTitle")!=null){
			$(this).find(".boxSubTitle").text($instance.attr("panelSubTitle"));
		}
		if($instance.attr("panelSubTitleColor")!=null){
			$(this).find(".boxSubTitle").css({
				"color":$instance.attr("panelSubTitleColor")
			})
		}
		if($(this).attr("panelWidth")!=null){
			var panelWidth=$(this).attr("panelWidth");
			var lastStr=panelWidth.substr(panelWidth.length-1,1);
			if(lastStr=="%"){
				$(this).width(panelWidth);
			}
			else{
				var trueWidth=Number($(this).attr("panelWidth"));
				$(this).width(trueWidth);
			}
			
		}
		
		if($(this).attr("panelHeight")!=null){
			var useHeight=Number($(this).attr("panelHeight"))-$(this).find("#box2_topcenter").outerHeight()-$(this).find("#box2_bottomcenter").outerHeight();
			$(this).find(".boxContent").height(useHeight);
		}
		if($(this).attr("overflow")=="true"||$(this).attr("overflow")==true){
			$(this).find(".boxContent").css({
				"overflow":"auto"
			})
		}
		else if($(this).attr("overflow")=="false"||$(this).attr("overflow")==false){
			$(this).find(".boxContent").css({
				"overflow":"hidden"
			})
		}
		else{
			$(this).find(".boxContent").css({
				"overflow":"visible"
			})
		}
		var showSt="true";
		if ($(this).attr("showStatus") != null) {
			showSt=$(this).attr("showStatus");
		}
		var useUrl="javascript:;";
		if ($(this).attr("panelUrl") != null) {
			useUrl=$(this).attr("panelUrl");
		}
		var useTarget="_self";
		if ($(this).attr("panelTarget") != null) {
			useTarget=$(this).attr("panelTarget");
		}
		var useStatusText=uncompile(quiLanguage.box2.collapseText);
		if ($(this).attr("statusText") != null) {
			useStatusText=$(this).attr("statusText");
		}
		var afterStatusText=uncompile(quiLanguage.box2.expendText);
		if ($(this).attr("afterStatusText") != null) {
			afterStatusText=$(this).attr("afterStatusText");
		}
		var $ssDom=$(this).find(".ss");
		$ssDom.unbind("click");
		var oldHeight;
		var statusType="visibleChange";
		if ($(this).attr("statusType") != null) {
			statusType=$(this).attr("statusType");
		}
		var startState="open";
		if ($(this).attr("startState") != null) {
			startState=$(this).attr("startState");
		}
		if(statusType=="visibleChange"&&showSt=="true"&&startState=="open"){
			$ssDom.text(useStatusText);
			$ssDom.toggle(function(){
				var obj=$(this).parents('div[boxType="box2"]').find(".boxContent");
				oldHeight=obj.height();
				if(window.navigator.userAgent.indexOf("MSIE") >= 1){
					obj.fadeOut(300,function(){
						$instance.trigger("stateChange","hide");
					});
				}
				else{
					obj.hide(300,function(){
						$instance.trigger("stateChange","hide");
					});
				}
				$(this).text(afterStatusText);
				
			},function(){
				var obj=$(this).parents('div[boxType="box2"]').find(".boxContent");
				obj.height(oldHeight);
				if(window.navigator.userAgent.indexOf("MSIE") >= 1){
					obj.fadeIn(300,function(){
						$instance.trigger("stateChange","show");
					});
				}
				else{
					obj.show(300,function(){
						$instance.trigger("stateChange","show");
					});
				}
				if($(this).parents('div[boxType="box2"]').attr("panelHeight")==null){
					setTimeout(function(){
						obj.css({
						"height":"auto"
					});
					},500);
				}
				$(this).text(useStatusText);
			})
		}
		else if(statusType=="visibleChange"&&showSt=="true"&&startState=="close"){
			$ssDom.text(useStatusText);
			var obj=$(this).find(".boxContent");
			oldHeight=obj.height();
			obj.hide();
			
			$ssDom.toggle(function(){
				var obj=$(this).parents('div[boxType="box2"]').find(".boxContent");
				obj.height(oldHeight);
				if(window.navigator.userAgent.indexOf("MSIE") >= 1){
					obj.fadeIn(300,function(){
						$instance.trigger("stateChange","show");
					});
				}
				else{
					obj.show(300,function(){
						$instance.trigger("stateChange","show");
					});
				}
				if($(this).parents('div[boxType="box2"]').attr("panelHeight")==null){
					setTimeout(function(){
						obj.css({
						"height":"auto"
					});
					},500);
				}
				$(this).text(afterStatusText);
			},function(){
				if(window.navigator.userAgent.indexOf("MSIE") >= 1){
					obj.fadeOut(300,function(){
						$instance.trigger("stateChange","hide");
					});
				}
				else{
					obj.hide(300,function(){
						$instance.trigger("stateChange","hide");
					});
				}
				$(this).text(useStatusText);
			})
		}
		else if(statusType=="link"&&showSt=="true"&&$(this).attr("statusText") != null){
			$ssDom.find("a").attr("href",useUrl);
			$ssDom.find("a").attr("target",useTarget);
			$ssDom.find("a").text(useStatusText);
		}
		else if(showSt=="true"&&$(this).attr("statusText") != null){
			$ssDom.text(useStatusText);
			$ssDom.css({
				"cursor":"auto"
			})
		}
		else{
			$ssDom.hide();
		}
	}
	
	
	$.fn.box4Render = function() {
		var con;
		if ($(this).find(".boxContent").length > 0) {
		}
		else {
			con = $(this).html();
			$(this).empty();
			if(box4Custom){
				$("<div class='box4_topcenter_notitle2' id='box4_notitle'><div class='box4_topleft_notitle2'><div class='box4_topright_notitle2'></div></div></div>").appendTo($(this));
				$("<div class='box4_topcenter2' id='box4_hastitle'><div class='box4_topleft2'><div class='box4_topright2'><div class='title'></div></div></div></div>").appendTo($(this));
				$("<div class='box4_middlecenter2'><div class='box4_middleleft2'><div class='box4_middleright2'><div class='boxContent'></div></div></div></div>").appendTo($(this));
				$("<div class='box4_bottomcenter2' id='box4_bottomcenter'><div class='box4_bottomleft2'><div class='box4_bottomright2'></div></div></div>").appendTo($(this));
			}else{
				$("<div class='box4_topcenter_notitle' id='box4_notitle'><div class='box4_topleft_notitle'><div class='box4_topright_notitle'></div></div></div>").appendTo($(this));
				$("<div class='box4_topcenter' id='box4_hastitle'><div class='box4_topleft'><div class='box4_topright'><div class='title'></div></div></div></div>").appendTo($(this));
				$("<div class='box4_middlecenter'><div class='box4_middleleft'><div class='box4_middleright'><div class='boxContent'></div></div></div></div>").appendTo($(this));
				$("<div class='box4_bottomcenter' id='box4_bottomcenter'><div class='box4_bottomleft'><div class='box4_bottomright'></div></div></div>").appendTo($(this));
			}
			$(this).find(".boxContent").html(con);
		}
			$(this).box4Build();
	};
	
	$.fn.box4Build= function(){
		if($(this).attr("panelTitle")!=null){
			$(this).find(".title").text($(this).attr("panelTitle"));
		}
		var $notilteTop=$(this).find("#box4_notitle");
		var $tilteTop=$(this).find("#box4_hastitle");
		$notilteTop.hide();
		$tilteTop.hide();
		if($(this).attr("noTitle")=="true"||$(this).attr("noTitle")==true){
			$notilteTop.show();
		}
		else{
			$tilteTop.show();
		}	
		if($(this).attr("panelWidth")!=null){
			var panelWidth=$(this).attr("panelWidth");
			var lastStr=panelWidth.substr(panelWidth.length-1,1);
			if(lastStr=="%"){
				$(this).width(panelWidth);
			}
			else{
				var trueWidth=Number($(this).attr("panelWidth"));
				$(this).width(trueWidth);
			}
			
		}			
		if($(this).attr("panelHeight")!=null){
			$(this).find(".box4_topcenter").height(27);
			$(this).find(".box4_bottomcenter").height(5);
			var useHeight;
			if($(this).attr("noTitle")=="true"||$(this).attr("noTitle")==true){
				useHeight=Number($(this).attr("panelHeight"))-$(this).find("#box4_notitle").outerHeight()-$(this).find("#box4_bottomcenter").outerHeight();
			}
			else{
				useHeight=Number($(this).attr("panelHeight"))-$(this).find("#box4_hastitle").outerHeight()-$(this).find("#box4_bottomcenter").outerHeight();
			}
			$(this).find(".boxContent").height(useHeight);
		}
		if($(this).attr("overflow")=="true"||$(this).attr("overflow")==true){
			$(this).find(".boxContent").css({
				"overflow":"auto"
			})
		}
		else if($(this).attr("overflow")=="false"||$(this).attr("overflow")==false){
			$(this).find(".boxContent").css({
				"overflow":"hidden"
			})
		}
		else{
			$(this).find(".boxContent").css({
				"overflow":"visible"
			})
		}
		var $instance=$(this);
		$instance.find("li a").unbind("click");
		$instance.find("li a").each(function(i){
			$(this).click(function(){
				$instance.find("li a").removeClass("current");
				$(this).addClass("current");
			})
		})
	}
	
	$.fn.textinputRender = function() {
		if ($(this).attr("inputMode")) {
			var inputMode = $(this).attr("inputMode");
			if (inputMode == "numberOnly") {
				$(this).css("ime-mode","disabled");
				var inputAllow=[ /[0-9]/,9,13,8,46,33,34,37,38,39,40,109,188,190,96,97,98,99,100,101,102,103,104 ];
				$(this).bind("keydown",function(e){
					if( !inputAllow ||$.grep(inputAllow, function(key){
							return key === e.keyCode || ( key instanceof RegExp && key.test( String.fromCharCode(e.keyCode) ) );
						}).length ){
					}
					else
						return !inputAllow;
				})
				/*
var field = $(this)[0];
				var processInputValue = function(){
					field.value = field.value.replace(/\D/g, '');
					if (!validateInput(field.value, "^(0|[1-9][0-9]*)$")) {
						field.value = field.value.substring(1);
					}
				};
				$(this)[0].onkeyup = function(){
					processInputValue();
				}
				$(this)[0].onafterpaste = function(){
					processInputValue();
				}
*/
			}
			else if (inputMode == "positiveDecimal") {
				$(this).css("ime-mode","disabled");
				var inputAllow=[ /[0-9]/,9,13,8,46,33,34,37,38,39,40,109,188,190,96,97,98,99,100,101,102,103,104,110 ];
				$(this).bind("keydown",function(e){
					if( !inputAllow ||$.grep(inputAllow, function(key){
							return key === e.keyCode || ( key instanceof RegExp && key.test( String.fromCharCode(e.keyCode) ) );
						}).length ){
					}
					else
						return !inputAllow;
				})
				var field = $(this)[0];
				var processInputValue = function(){
					field.value = field.value.replace(/[^0-9\.]/g, '');
					//alert(field.value.length)
					if (!validateInput(field.value, "^(([1-9]+)|([1-9]+)\.{1}|([0-9]+\.{1}[0-9]+))$")) {
						field.value = field.value.substring(0,field.value.length-1);
					}
				};
				$(this)[0].onkeyup = function(){
					processInputValue();
				}
				$(this)[0].onafterpaste = function(){
					processInputValue();
				}
				
			}
		}
		
		$(this).bind("keydown", function (e)
        {
			var keyCode = e.keyCode || e.which || e.charCode;
			if(keyCode==13){
				$(this).trigger("enter");
			}
        });

		if($(this).attr("class")=="keypad"){
			return;
		}
		$(this).addClass("textinput");
		$(this).css("fontFamily",fontFamily);
		$(this).css("fontSize",fontSize);
			var focusFlag=null;
			$(this).hover(
				function() {
					if(focusFlag!=$(this)[0]){
						$(this).removeClass("textinput");
						$(this).addClass("textinput_hover");
					}
					},
				function(){
					if(focusFlag!=$(this)[0]){
						$(this).removeClass("textinput_hover");
						$(this).addClass("textinput");
					}
					}
			);
			$(this).focus(function(){
				focusFlag=$(this)[0];
				$(this).removeClass("textinput");
				$(this).removeClass("textinput_hover");
				$(this).addClass("textinput_click");
			});
			$(this).blur(function(){
				focusFlag=null;
				$(this).removeClass("textinput_click");
				$(this).addClass("textinput");
			});
			if($(this).attr("clearable")=="true"){
				$(this).clearableTextField();
			}
			if ($(this).attr("maxNum")!=null) {
				$(this).maxlength({maxCharacters:parseInt($(this).attr("maxNum"))});
			}
			if ($(this).attr("watermark") != null) {
				$(this).watermark('watermark',$(this).attr("watermark"));
			}
	};
	
	$.fn.fileRender = function() {
		
		var fileInputWidth=184;
		var fileBtnWidth=60;
		var defaultFileInputWidth=0;
		if(!splitMode){
			var $parentThemeDom=$(window.top.document.getElementById("theme"));
			if($parentThemeDom.attr("defaultFileInputWidth")!=null){
				defaultFileInputWidth=Number($parentThemeDom.attr("defaultFileInputWidth"));
			}
			if($parentThemeDom.attr("fileBtnWidth")!=null){
				fileBtnWidth=Number($parentThemeDom.attr("fileBtnWidth"));
			}
		}
		else{
			if($(this).attr("fileBtnWidth")!=null){
				fileBtnWidth=Number($(this).attr("fileBtnWidth"));
			}
		}
		if($(this).attr("fileWidth")){
			fileInputWidth=Number($(this).attr("fileWidth"));
		}
		else{
			if(defaultFileInputWidth!=0){
				fileInputWidth=defaultFileInputWidth;
			}
		}
		//$(this).attr("contenteditable",false);
		$(this).addClass("fileComponent");
		$(this).wrap('<div class="file-container"></div>');
		
		var $fileTableContainer=$('<table cellspacing="0" cellpadding="0" style="border-style:none;position:absolute;z-index:10;"><tr><td class="ali01" style="border-style:none;padding:0;margin:0;"><input type="text" class="textinput"/></td><td class="ali01" style="border-style:none;;padding:0;margin:0;"><input type="button" class="fileBtn" value="" /></td></tr></table>')
		var $fileContainer=$(this).parent()
		$fileContainer.wrap('<div class="file-container-main"></div>');
		var $fileContainerMain=$fileContainer.parent()
		$fileContainer.prepend($fileTableContainer);
		var $fileInput = $fileTableContainer.find("input[type=text]");
		var $fileBtn=$fileTableContainer.find(".fileBtn");
		$fileBtn.width(fileBtnWidth);
		$fileInput.width(fileInputWidth-fileBtnWidth-2);
		if($.browser.msie){
			$(this).width(fileInputWidth);
		}
		$fileContainer.width(fileInputWidth+5);
		$fileContainerMain.width(fileInputWidth+5);
		
		$(this).css({
			'position': 'absolute',
			'z-index': 20,
			'font-size': '118px',
			'opacity': '0',
			'left': '0px',
			'top': '-30px'
		});
		$(this).change(function() {
			var filePath="";
			
			if(broswerFlag=="IE6"||broswerFlag=="IE7"||broswerFlag=="IE8"||broswerFlag=="IE9"){
				$(this)[0].select()
				try{
					filePath=document.selection.createRange().text;
				}
				catch(e){
					var filePathArray=$(this).val().toString().split("\\");
					filePath=filePathArray[filePathArray.length-1];
				}
				
			}
			else if(broswerFlag=="firefox"){
				//filePath=$(this)[0].files[0].getAsDataURL()
				//filePath=window.URL.createObjectURL($(this)[0].files[0]);
				filePath=$(this).val();
			}
			else{
				var filePathArray=$(this).val().toString().split("\\");
				filePath=filePathArray[filePathArray.length-1];
				/*
				var ofile=$(this)[0].files[0];
				var oFReader=new FileReader();
				oFReader.onload=function(oFREvent){
					filePath=oFREvent.target.result;
					alert(filePath)
				}
				oFReader.readAsDataURL(ofile);
				*/
				
			}
			var $input=$(this).parent().find("input[type=text]");
			$input.val(filePath);
			if($(this).attr("showInfo")!="false"){
				try {
					$(this).attr("title",filePath);
					addTooltip($(this)[0]);
				}
				catch(e){}
			}
			else if($(this).attr("showTitle")!="false"){
				try {
					$(this).attr("title",filePath);
				}
				catch(e){}
			}
			$(this).css({
				'font-size': '118px'
			});
			$(this).blur();
		});
	};
	
	$.fn.textInputStyleRender = function() {
		$(this).css("fontFamily",fontFamily);
		$(this).css("fontSize",fontSize);
		var focusFlag=null;
		if($(this).attr("inputMode")){
			var inputMode=$(this).attr("inputMode");
			if(inputMode=="numberOnly"){
				$(this)[0].onkeyup=function(){
					$(this)[0].value=$(this)[0].value.replace(/\D/g,'')
				}
				$(this)[0].onafterpaste=function(){
					$(this)[0].value=$(this)[0].value.replace(/\D/g,'')
				}
			}
		}
		$(this).hover(
			function() {
				if(focusFlag!=$(this)[0]){
					$(this).addClass("date_hover");
				}
				},
			function(){
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("date_hover");
				}
				}
		);
		$(this).focus(function(){
			focusFlag=$(this)[0];
			$(this).removeClass("date_hover");
			$(this).addClass("date_click");
		});
		$(this).blur(function(){
			focusFlag=null;
			$(this).removeClass("date_click");
		});
	};
	
	$.fn.passInputRender = function() {
		var focusFlag=null;
		$(this).addClass("textinput");
		if($(this).attr("inputMode")){
			var inputMode=$(this).attr("inputMode");
			if(inputMode=="numberOnly"){
				$(this)[0].onkeyup=function(){
					$(this)[0].value=$(this)[0].value.replace(/\D/g,'')
				}
				$(this)[0].onafterpaste=function(){
					$(this)[0].value=$(this)[0].value.replace(/\D/g,'')
				}
			}
		}
		$(this).bind("keydown", function (e)
        {
			var keyCode = e.keyCode || e.which || e.charCode;
			if(keyCode==13){
				$(this).trigger("enter");
			}
        });
			$(this).hover(
				function() {
					if(focusFlag!=$(this)[0]){
						$(this).removeClass("textinput");
						$(this).addClass("textinput_hover");
					}
					},
				function(){
					if(focusFlag!=$(this)[0]){
						$(this).removeClass("textinput_hover");
						$(this).addClass("textinput");
					}
					}
			);
			$(this).focus(function(){
				focusFlag=$(this)[0];
				$(this).removeClass("textinput");
				$(this).removeClass("textinput_hover");
				$(this).addClass("textinput_click");
			});
			$(this).blur(function(){
				focusFlag=null;
				$(this).removeClass("textinput_click");
				$(this).addClass("textinput");
			});
			if($(this).attr("clearable")=="true"){
				$(this).clearableTextField();
			}
			if ($(this).attr("maxNum")!=null) {
				$(this).maxlength({maxCharacters:parseInt($(this).attr("maxNum"))});
			}
			if($(this).attr("checkStrength")=="true"){
				$(this).password_strength();
			}
			if($(this).attr("checkCaps")!=="false"){
				$(this).caps(function(caps){
				    //if(jQuery.browser.safari) return; 
				    if(caps){
						$(this).tip({showCloseBtn:true,content: uncompile(quiLanguage.jsError.capslock),width:160});
				    }else{
				    }
				});
			}
			
	};
	
	$.fn.textareaRender = function() {
		var focusFlag=null;
		$(this).addClass("textarea");
		$(this).css("fontFamily",fontFamily);
		$(this).css("fontSize",fontSize);
		if ($(this).attr("maxNum")!=null) {
			$(this).maxlength({maxCharacters:parseInt($(this).attr("maxNum"))});
		}
		if ($(this).attr("resize")=="true"){
			$(this).TextAreaResizer();
		}
		if ($(this).attr("autoHeight")=="true"){
			$(this).css({
				height:"auto"
			});
			$(this).attr("rows",5);
			$(this).autoGrow();
		}
		if ($(this).attr("watermark") != null) {
			$(this).watermark('watermark',$(this).attr("watermark"));
		}
		
		$(this).hover(
			function() {
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("textarea");
					$(this).addClass("textarea_hover");
				}},
			function(){
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("textarea_hover");
					$(this).addClass("textarea");
				}}
		);
		$(this).focus(function(){
			focusFlag=$(this)[0];
			$(this).removeClass("textarea");
			$(this).removeClass("textarea_hover");
			$(this).addClass("textarea_click");
		});
		$(this).blur(function(){
			focusFlag=null;
			$(this).removeClass("textarea_click");
			$(this).addClass("textarea");
		});
	};
	
	$.fn.buttonInputRender = function() {
		if(!$(this).attr("class")){
			$(this).addClass("button");
		}
		if(broswerFlag=="IE7"){
				$(this).css("minWidth","auto");
			}
		$(this).css("fontFamily",fontFamily);
		$(this).css("fontSize",fontSize);
		var btnTextNum=_getStrLength($(this).val());
		if($(this).attr("useMinWidth")=="false"||$(this).attr("useMinWidth")==false){}
		else{
			if(btnTextNum<5){
				//$(this).width(60);
			}
		}
		$(this).hover(
			function() {
					$(this).addClass("button_hover");
				},
			function(){
					$(this).removeClass("button_hover");
				}
		);

		if($(this).attr("toggle")=="true"||$(this).attr("toggle")==true){
			//创建隐藏域
			var $hidden = $("<input type='hidden'/>");
			if($(this).attr("name")!=null){
				$hidden.attr("name",$(this).attr("name"));
			}
			$(this).after($hidden);
			var toggleValue=0;
			if($(this).attr("relValue")=="1"){
				toggleValue=1;
			}
			$(this).attr("relValue",toggleValue);
			$hidden.attr("relValue",toggleValue);
			if(toggleValue==0){
				$(this).toggle(function(){
					$(this).addClass("toggle");
					$(this).attr("relValue",1);
					$hidden.attr("relValue",1);
				},function(){
					$(this).removeClass("toggle");
					$(this).attr("relValue",0);
					$hidden.attr("relValue",0);
				})
			}
			else{
				$(this).addClass("toggle");
				$(this).toggle(function(){
					$(this).removeClass("toggle");
					$(this).attr("relValue",0);
					$hidden.attr("relValue",0);
				},function(){
					$(this).addClass("toggle");
					$(this).attr("relValue",1);
					$hidden.attr("relValue",1);
				})
			}
		}
	};
	
	$.fn.buttonRender = function() {
			if(!$(this).attr("class")){
				$(this).addClass("button");
			}
			if(broswerFlag=="IE7"){
				$(this).css("minWidth","auto");
			}
			
			if($(this).attr("useMinWidth")=="false"||$(this).attr("useMinWidth")==false){}
			else{
				var btnTextNum=_getStrLength($(this).text());
				var textNum=0;
				var textWidth=50;
				textNum=_getStrLength($(this).filter(":has(span)").find("span").text());
				if(textNum!=0){
					textWidth=20+7*textNum+10;
				}
				if(broswerFlag=="firefox"||broswerFlag=="opera"||broswerFlag=="safari"){
					$(this).filter(":has(span)").css({
						"paddingLeft":"5px"
						//"width":textWidth+8+"px"
					});
				}
				else{
					$(this).filter(":has(span)").css({
						"paddingLeft":"5px"
						//"width":textWidth+"px"
					});
				}
				if(btnTextNum<5){
					//$(this).width(66);
				}
			}
			
			
			
			$(this).filter(":has(span)").find("span").css({
				"cursor":"default",
				"fontFamily":fontFamily,
				"fontSize":fontSize
			});
			
			$(this).hover(
				function() {
						$(this).addClass("button_hover");
					},
				function(){
						$(this).removeClass("button_hover");
					}
			);
			
	};
	
	$.fn.dateRender = function() {
		var focusFlag=null;
		$(this).css("fontFamily",fontFamily);
		$(this).css("fontSize",fontSize);
		var dateFormat="yyyy-MM-dd";
		if($(this).attr("dateFmt")!=null){
			dateFormat=$(this).attr("dateFmt");
		}
		var doubleCal=false;
		if($(this).attr("doubleCal")==true||$(this).attr("doubleCal")=="true"){
			doubleCal=true;
		}
		$(this).hover(
			function() {
				if(focusFlag!=$(this)[0]){
					$(this).addClass("date_hover");
				}
				},
			function(){
				if(focusFlag!=$(this)[0]){
					$(this).removeClass("date_hover");
				}
				}
		);
		$(this).focus(function(){
			try{
				WdatePicker({
					skin:themeColor,isShowClear:true,dateFmt:dateFormat,doubleCalendar:doubleCal,
					onpicked:function(dp){
						$(this).blur();
					}
				});
			}
			catch(e){
				alert(uncompile(quiLanguage.jsError.WdatePicker))
			}
			
			
			focusFlag=$(this)[0];
			$(this).removeClass("date_hover");
			$(this).addClass("date_click");
		});
		
		
		$(this).blur(function(){
			focusFlag=null;
			$(this).removeClass("date_click");
		});
	};
	

	$.fn.popupMenuRender = function() {
		$(this).hover(function(){
			$(this).find(".popupMenu_con").show();
		},function(){
			$(this).find(".popupMenu_con").hide();
		});
	};
	
	$.fn.singleNavRender = function() {
		var $instance=$(this);
		$instance.find(">div span").each(function(){
			$(this).click(function(){
				$instance.find(">div").removeClass("current");
				$(this).parent("div").addClass("current");
			});
			$(this).hover(function(){
				$(this).animate({
					paddingLeft:'40px'
				},'fast');
			},function(){
				$(this).animate({
					paddingLeft:'20px'
				});
			});
		});
	};
	
	$.fn.singleNavMinRender = function() {
		var $instance=$(this);
		$instance.find(">div span").each(function(){
			$(this).click(function(){
				$instance.find(">div").removeClass("current");
				$(this).parent("div").addClass("current");
			});
			$(this).hover(function(){
				$(this).animate({
					paddingLeft:'15px'
				},'fast');
			},function(){
				$(this).animate({
					paddingLeft:'5px'
				});
			});
		});
	};
	
	$.fn.tableRender = function() {
		return this.each(function() {
			if($(this).attr("mode")=="list"){
				//宽度自适应
				if($(this).attr("thTrueWidth")=="true"||$(this).attr("thTrueWidth")==true){
					$("#scrollContent").css({
						overflowX: "auto"
					});
					var tableWidth=0;
					$(this).find("tr").eq(0).find("th").each(function(){
						var thWidth=Number($(this).attr("trueWidth"));
						tableWidth=tableWidth+thWidth;
						$(this).width(thWidth);
					})
					$(this).width(tableWidth);
				}
				else if($(this).attr("tdTrueWidth")=="true"||$(this).attr("tdTrueWidth")==true){
					$("#scrollContent").css({
						overflowX: "auto"
					});
					var tableWidth2=0;
					$(this).find("tr").eq(0).find("td").each(function(){
						var tdWidth=Number($(this).attr("trueWidth"));
						tableWidth2=tableWidth2+tdWidth;
						$(this).width(tdWidth);
					})
					$(this).width(tableWidth2);
				}
				
				if($(this).attr("fixedCellHeight")=="true"||$(this).attr("fixedCellHeight")==true){
					
				}
				else{
					$(this).addClass("tableStyleWordWrap");
				}
				if($(this).find('tr').eq(1).find("td").eq(0).find('input[type="checkbox"]').length==1){
					if($(this).attr("useCheckBox")!="false"){
						$(this).attr("useCheckBox","true");
					}
					if($(this).attr("useMultColor")!="false"){
						$(this).attr("useMultColor","true");
					}
				}
				if($(this).find('tr').eq(1).find("td").eq(0).find('input[type="radio"]').length==1){
					if($(this).attr("useRadio")!="false"){
						$(this).attr("useRadio","true");
					}
				}
				if ($(this).attr("useColor") != "false") {//默认隔行换色
					$(this).find('tr:even').addClass('odd');
				}
				if ($(this).attr("useHover") != "false") {//默认鼠标移入变色
					$(this).find('tr').hover(function(){
						$(this).addClass('highlight');
					}, function(){
						$(this).removeClass('highlight');
					});
				}
				if ($(this).attr("sortMode") == "true") {//排序模式
					$(this).find('th').filter(":has(span)").hover(function(){
						$(this).removeClass("th");
						$(this).addClass("th_over");
					}, function(){
						$(this).removeClass("th_over");
						$(this).addClass("th");
					});
					$(this).find('th span').addClass("sort_off");
					$(this).find('th').click(function(){
					
					});
				}
				
				if ($(this).attr("useClick") != "false") {//useClick默认为true
					$(this).attr("useClick", "true");
				}
				if ($(this).attr("useClick") == "true" && $(this).attr("useMultColor") == "true") {//如果useClick与useMultColor都为true则useClick为false
					$(this).attr("useClick", "false");
				}
				if ($(this).attr("useRadio") != "true") {//useRadio默认为false
					$(this).attr("useRadio", "false");
				}
				if ($(this).attr("useCheckBox") != "true") {//useCheckBox默认为false
					$(this).attr("useCheckBox", "false");
				}
				
				if ($(this).attr("useClick") != "false") {//useClick为false时useRadio即使为true也不生效
					if ($(this).attr("useRadio") == "false") {//如果useRadio不做设置（为false）则采用单行点击变色模式
						$(this).find("tr").click(function(){
							$(this).siblings().removeClass('selected');
							$(this).addClass('selected');
						});
					}
					else {//如果useRadio为true则采取radio模式
						$(this).find('input[type="radio"]:checked').parents('tr').addClass('selected');
						$(this).find("tr").click(function(){
							$(this).siblings().removeClass('selected');
							$(this).addClass('selected');
							$(this).find('input[type="radio"]').attr('checked', 'checked');
						});
					}
				}
				if ($(this).attr("useMultColor") == "true") {
					if ($(this).attr("useCheckBox") == "false") {//如果checkBox为false采用普通多选模式
						$(this).find("tr").click(function(){
							$(this).toggleClass('selected');
						});
					}
					else {//如果checkBox为true采用checkBox多项模式
						$(this).find('input[type="checkbox"]:checked').parents('tr').addClass('selected');
						if($(this).find("th").length>0){
							var $checkIcon=$('<img src='+prePath+'libs/icons/checkAllOff.gif title="'+uncompile(quiLanguage.table.selectAllBtnText)+'" class="hand"></span>');
							$(this).find("th").eq(0).addClass("ali02").html("").append($checkIcon);
							
							if ($(this).attr("headFixMode") == "true"){
								$checkIcon.toggle(function(){
									$("table:[class=tableStyle]").find("tr").each(function(){
										$(this).addClass('selected');
										$(this).find('input[type="checkbox"]').attr('checked', 'checked');
									});
									$(this).attr("src",prePath+'libs/icons/checkAllOn.gif');
									$(this).attr("title",uncompile(quiLanguage.table.deSelectAllBtnText));
								},function(){
									$("table:[class=tableStyle]").find("tr").each(function(){
										if ($(this).hasClass('selected')) {
											$(this).removeClass('selected');
											$(this).find('input[type="checkbox"]').removeAttr('checked');
										}
									});
									$(this).attr("src",prePath+'libs/icons/checkAllOff.gif');
									$(this).attr("title",uncompile(quiLanguage.table.selectAllBtnText));
								});
							}else{
								$checkIcon.toggle(function(){
									$(this).parents('table').find("tr").each(function(){
										$(this).addClass('selected');
										$(this).find('input[type="checkbox"]').attr('checked', 'checked');
									});
									$(this).attr("src",prePath+'libs/icons/checkAllOn.gif');
									$(this).attr("title",uncompile(quiLanguage.table.deSelectAllBtnText));
								},function(){
									$(this).parents('table').find("tr").each(function(){
										if ($(this).hasClass('selected')) {
											$(this).removeClass('selected');
											$(this).find('input[type="checkbox"]').removeAttr('checked');
										}
									});
									$(this).attr("src",prePath+'libs/icons/checkAllOff.gif');
									$(this).attr("title",uncompile(quiLanguage.table.selectAllBtnText));
								});
							}
						}
						if($(this).attr("selectRowButtonOnly")==false||$(this).attr("selectRowButtonOnly")=="false"){
							$(this).find("tr:has(td)").each(function(){
								$(this).find('td').eq(0).addClass("ali02");
								$(this).unbind("click");
								$(this).bind("click",function(){
									if ($(this).hasClass('selected')) {
										$(this).removeClass('selected');
										$(this).find('td').eq(0).find('input[type="checkbox"]').attr("checked",false);
									}
									else {
										$(this).addClass('selected');
										$(this).find('td').eq(0).find('input[type="checkbox"]').attr("checked",true);
									}
								})
							})
						}
						else{
							$(this).find("tr:has(td)").find('input[type="checkbox"]').each(function(){
								$(this).parents('td').addClass("ali02");
								$(this).unbind("click");
								$(this).bind("click",function(){
									if ($(this).parents("tr").hasClass('selected')) {
										$(this).parents("tr").removeClass('selected');
									}
									else {
										$(this).parents("tr").addClass('selected');
									}
								})
							})
						}
					}
				}
			}
				
				
				if ($(this).attr("formMode") == "line") {//表单布局模式1
					$(this).attr("useColor", "false");
					$(this).attr("useHover", "false");
					$(this).attr("useClick", "false");
					$(this).find("th").css({
						"fontWeight": "bold",
						"text-align": "center"
					});
					$(this).find("tr").find("td:even").css("text-align", "right");
					
					if($(this).attr("footer")!=null){
						if($(this).attr("footer")=="left"){
							$(this).find("tr:last").find("td").css("text-align", "left");
						}
						else if($(this).attr("footer")=="right"){
							$(this).find("tr:last").find("td").css("text-align", "right");
						}
						else if($(this).attr("footer")=="center"){
							$(this).find("tr:last").find("td").css("text-align", "center");
						}
						else if($(this).attr("footer")=="normal"){
							$(this).find("tr:last").find("td:even").css("text-align", "right");
						}
					}
					else{
						var colspan=$(this).find("tr:last").find("td").eq(0).attr("colspan");
						if(colspan){
							if(colspan.toString()!="1"){
								$(this).find("tr:last").find("td").css("text-align", "center");
							}
						}
					}
					$(this).find("td").css({
						"paddingTop": "3px",
						"paddingBottom": "3px"
					});
				}
				else if ($(this).attr("formMode") == "transparent"){//表单布局模式2
					$(this).attr("useColor", "false");
					$(this).attr("useHover", "false");
					$(this).attr("useClick", "false");
					$(this).find("th").css({
						"fontWeight": "bold",
						"text-align": "center"
					});
					$(this).css({
						"border":"none",
						"backgroundColor":"transparent"
					});
					$(this).find("tr").css({
						"border":"none",
						"backgroundColor":"transparent"
					});
					$(this).find("tr").find("td:even").css("text-align", "right");
					if($(this).attr("footer")!=null){
						if($(this).attr("footer")=="left"){
							$(this).find("tr:last").find("td").css("text-align", "left");
						}
						else if($(this).attr("footer")=="right"){
							$(this).find("tr:last").find("td").css("text-align", "right");
						}
						else if($(this).attr("footer")=="center"){
							$(this).find("tr:last").find("td").css("text-align", "center");
						}
						else if($(this).attr("footer")=="normal"){
							$(this).find("tr:last").find("td:even").css("text-align", "right");
						}
					}
					else{
						var colspan2=$(this).find("tr:last").find("td").eq(0).attr("colspan");
						if(colspan2){
							if(colspan2.toString()!="1"){
								$(this).find("tr:last").find("td").css("text-align", "center");
							}
						}
					}
					$(this).find("td").css({
						"paddingTop": "3px",
						"paddingBottom": "3px",
						"border":"none"
					});
				}
				else if ($(this).attr("formMode") == "view") {//表单布局模式3
					$(this).attr("useColor", "false");
					$(this).attr("useHover", "false");
					$(this).attr("useClick", "false");
					$(this).find("th").css({
						"fontWeight": "bold",
						"text-align": "center"
					});
					$(this).find("tr").find("td:even").addClass("viewModeEven");
					
					if($(this).attr("footer")!=null){
						if($(this).attr("footer")=="left"){
							$(this).find("tr:last").find("td").css({
								"textAlign":"left",
								"backgroundColor":"#ffffff"
							});
						}
						else if($(this).attr("footer")=="right"){
							$(this).find("tr:last").find("td").css({
								"textAlign":"right",
								"backgroundColor":"#ffffff"
							});
						}
						else if($(this).attr("footer")=="center"){
							$(this).find("tr:last").find("td").css({
								"textAlign":"center",
								"backgroundColor":"#ffffff"
							});
						}
						else if($(this).attr("footer")=="normal"){
							$(this).find("tr:last").find("td:even").css({
								"textAlign":"right",
								"backgroundColor":"#ffffff"
							});
						}
					}
					else{
						var colspan=$(this).find("tr:last").find("td").eq(0).attr("colspan");
						if(colspan){
							if(colspan.toString()!="1"){
								$(this).find("tr:last").find("td").css({
									"textAlign":"center",
									"backgroundColor":"#ffffff"
								});
							}
						}
					}
					$(this).find("td").css({
						"paddingTop": "6px",
						"paddingBottom": "6px"
					});
				}
				$(this).find('th').addClass("th"); 
		});
	};
	
	
})(jQuery);


function getPosition(value,array){//获得数组值的索引
		var idx=-1;
		for(var i=0;i<array.length;i++){
			if(value==array[i]){
				idx=i;
				break;
			}
		}
		return idx;
	}


/*单选下拉框start*/
jQuery.fn.extend({
	selectRender: function() {
		return this.each(function() {
			if($(this).prev("div").hasClass("mainCon")){
				$(this).prev("div").remove();
			}
			new jQuery.SelectBox(this);
		});
	},
	selectAddItem: function(el) {
		this.each(function() {
			// var dataStr=$(this).attr("data");
		    //转为json
			var dataObj=$(this).data("data");
			//获取数据前缀
			var dataRoot="list";
			if($(this).attr("dataRoot")){
				dataRoot=$(this).attr("dataRoot");
			}
			var finalData;
			if(dataObj[dataRoot]){
				finalData=dataObj[dataRoot]
			}
			else{
				finalData=dataObj;
			}
			//添加数据项
			finalData.push(el);
			//重新设置data属性
			//$(this).attr("data",JSON.stringify(dataObj));
			$(this).data("data",dataObj);
			//选中该项
			//$(this).attr("selectedValue",100);
			//刷新下拉框
		   $(this).prev(".mainCon").remove();
			new jQuery.SelectBox(this);
		});
	},
	selectRemoveItem: function(el) {
		this.each(function() {
			
			// var dataStr=$(this).attr("data");
		    //转为json
			var dataObj=$(this).data("data");
			//获取要删除的索引
			var delIdx=-1;
			//获取数据前缀
			var dataRoot="list";
			if($(this).attr("dataRoot")){
				dataRoot=$(this).attr("dataRoot");
			}
			var finalData;
			if(dataObj[dataRoot]){
				finalData=dataObj[dataRoot]
			}
			else{
				finalData=dataObj;
			}
			$.each(finalData, function(idx, item){
				if(item[valueField].toString()==el){
					delIdx=idx;
				}
			})
			//删除项
			if(delIdx!=-1){
				finalData.splice(delIdx,1);
			}
			//重新设置data属性
			//$(this).attr("data",JSON.stringify(dataObj));
			$(this).data("data",dataObj);
			//取消选中项
			//$(this).attr("selectedValue","");
			//刷新下拉框
		    $(this).prev(".mainCon").remove();
			new jQuery.SelectBox(this);
		});
	}
});
if (!window.console) {
	var console = {
		log: function(msg) { 
	 }
	}
}
var elm_id = 1;
jQuery.SelectBox = function(selectobj) {
	var opt =  {};
	opt.inputClass = opt.inputClass || "selectbox";
	opt.containerClass = opt.containerClass || "selectbox-wrapper";
	opt.hoverClass = opt.hoverClass || "current";
	opt.currentClass = opt.selectedClass || "selected";
	opt.debug = opt.debug || false;
	elm_id++;
	//得到当前点击的input的id
	var curInputId="0_input";
	
	//得到当前点击的button的id
	var curButtonId="0_button";
	var active = 0;
	var inFocus = false;
	var hasfocus = 0;
	var $select = $(selectobj);
	var $container = setupContainer(opt);
	var $mainCon=setupMainCon();
	var $input = setupInput(opt);
	var autoWidth=false;
	var edit=false;
	var colNum=1;
	var colWidth;
	var selTrueWidth;
	var windowsFlag=0;
	var containerClick=0; 
	var selInputHeight=24;
	var selButtonWidth=24;
	var selItemHeight=26;
	var defaultSelWidth=0;
	var defaultSelItemHeight=0;
	var boxAutoScroll=true;
	
	
	var valueField="value";
	var labelField="key";
	if($select.attr("valueField")){
		valueField=$select.attr("valueField");
	}
	if($select.attr("labelField")){
		labelField=$select.attr("labelField");
	}
	if($select.attr("selItemHeight")){
		selItemHeight=$select.attr("selItemHeight");
	}
	if($select.attr("boxAutoScroll")=="false"||$select.attr("boxAutoScroll")==false){
		boxAutoScroll=false;
	}
	
	if(!splitMode){
		var $parentThemeDom=$(window.top.document.getElementById("theme"));
		if($parentThemeDom.attr("selInputHeight")!=null){
			selInputHeight=Number($parentThemeDom.attr("selInputHeight"));
		}
		if($parentThemeDom.attr("selButtonWidth")!=null){
			selButtonWidth=Number($parentThemeDom.attr("selButtonWidth"));
		}
		if($parentThemeDom.attr("defaultSelWidth")!=null){
			defaultSelWidth=Number($parentThemeDom.attr("defaultSelWidth"));
		}
		if($parentThemeDom.attr("defaultSelItemHeight")!=null){
			selItemHeight=Number($parentThemeDom.attr("defaultSelItemHeight"));
		}
	}
	else{
		if($select.attr("selInputHeight")!=null){
			selInputHeight=Number($select.attr("selInputHeight"));
		}
		if($select.attr("selButtonWidth")!=null){
			selButtonWidth=Number($select.attr("selButtonWidth"));
		}
	}
	if(window.navigator.userAgent.indexOf("Windows")>-1){
			windowsFlag=1;
	}
	
	selTrueWidth=$select.width();
	if(selTrueWidth=="0"){
		selTrueWidth=116;
	}
	
	var $selBtn;
	
	$selBtn= $("<input type='button' value=' ' class='selBtn'/>");
	
	
	
	
	$selBtn.attr("id", elm_id+"_button");
	
	var $loader=$("<div class='loader'></div>");
	$loader.text(quiLangage.select.loadingMessage);
	
	if($select.attr("colNum")!=null){
		colNum=parseInt($select.attr("colNum"));
	}
	if($select.attr("colWidth")!=null){
		colWidth=Number($select.attr("colWidth"));
	}
	else{
		colWidth=100;
	}
	
	//定义文本框默认长度
	var inputWidth=97;
	
	//如果设置了selWidth，则以selWidth长度为准
	if ($select.attr("selWidth")!=null) {
		inputWidth=Number($select.attr("selWidth"))-selButtonWidth;
	}
	else if(defaultSelWidth!=0){
		inputWidth=defaultSelWidth-selButtonWidth;
	}
	$input.width(inputWidth);
	
	$input.css("fontFamily",fontFamily);
	$input.css("fontSize",fontSize);
	
	
	
	
	$select.hide().before($mainCon);
	
	var $table=$('<table cellspacing="0" cellpadding="0" style="border-style:none;"><tr><td class="ali01" style="border-style:none;padding:0;margin:0;"></td><td class="ali01" style="border-style:none;;padding:0;margin:0;"></td></tr></table>')
	$table.find("td").eq(0).append($input);
	$table.find("td").eq(1).append($selBtn);

	$mainCon.append($table);
	$mainCon.append($container);
	$mainCon.append($loader);
	$loader.hide();
	if($select.attr("disabled")=="disabled"||$select.attr("disabled")=="true"||$select.attr("disabled")==true){
		$selBtn.attr("disabled",true);
		$selBtn.addClass("selBtn_disabled");
		$input.addClass("selectbox_disabled");
	}
	
	$select.data("scrollY",0);
	
	init();
	
	if($select.attr("editable")!=null){
		if($select.attr("editable")=="true"){
			edit=true;
		}
		else{
			edit=false;
		}
	}
	if (!edit) {
		$input.css({
			"cursor":"pointer"
		});
		$input.click(function(event){
			curInputId=$(event.target).attr("id");
			
			setHeight()
			
			if($container.attr("hasfocus")==0){
				showMe()
			}
			else{
				hideMe()
			}
		}).keydown(function(event){
			switch (event.keyCode) {
				case 38: // up
					event.preventDefault();
					moveSelect(-1);
					break;
				case 40: // down
					event.preventDefault();
					moveSelect(1);
					break;
				//case 9:  // tab 
				case 13: // return
					event.preventDefault(); // seems not working in mac !
					$('li.' + opt.hoverClass).trigger('click');
					break;
				case 27: //escape
					hideMe();
					break;
			}
		})
	}
	else{
		$input.css({
			"cursor":"text"
		});
		$input.change(function(){
			$select.attr("editValue",$(this).val());
		});
	}
	
	$selBtn
	.click(function(event){
			curButtonId=$(event.target).attr("id");
			
			setHeight()	
			
			if($container.attr("hasfocus")==0){
				showMe()
			}
			else{
				hideMe()
			}
	}).keydown(function(event) {	   
		switch(event.keyCode) {
			case 38: // up
				event.preventDefault();
				moveSelect(-1);
				break;
			case 40: // down
				event.preventDefault();
				moveSelect(1);
				break;
			//case 9:  // tab 
			case 13: // return
				event.preventDefault(); 
				$('li.'+opt.hoverClass).trigger('click');
				break;
			case 27: //escape
			  hideMe();
			  break;
		}
	})
	
	function setHeight(){
		$select.blur();
		var oldHeight;
			var $lis=$container.find("li").length;
			if (colNum == 1) {
				oldHeight=$lis*selItemHeight;
			}
			else{
				if($lis%colNum==0){
					oldHeight=$lis*selItemHeight/colNum;
				}
				else{
					oldHeight=($lis-$lis%colNum)*selItemHeight/colNum+selItemHeight;
				}
			}
			$container.height(oldHeight);//每次展开时还原初始高度
			var usefulHeight=200;
			usefulHeight=window.document.documentElement.clientHeight-($mainCon.offset().top-$(window).scrollTop()) - 30;
			
			var trueWidth;
			if (!$select.attr("boxWidth")) {
				trueWidth=$container.width();
			}
			$container.css({
				"overflowY":"auto",
				"overflowX":"hidden"
			});
			
			//容器自适应内容宽度
			
			if(colNum!=1){//多列
				$container.width((colWidth+6)*colNum);
			}
			else{//单列
				if (!$select.attr("boxWidth")) {
					$container.width(trueWidth);
				}
				else{
					$container.width(Number($select.attr("boxWidth"))+1);
				}
			}
			
			
			var boxHeight=0;
			if($select.attr("boxHeight")){
				boxHeight=Number($select.attr("boxHeight"));
			}
			//设置了boxHeight
			if(boxHeight!=0){
				$container.height(boxHeight);
				//强制向上展开
				if ($select.attr("openDirection")  == "top") {
					$container.css({
						top: -boxHeight
					});
				}
				//强制向下展开
				else if ($select.attr("openDirection")  == "bottom") {
					$container.css({
						top:selInputHeight
					});
				}
				//智能判断方向
				else {
					//获取内容页中slect所在位置距离最底部的高度
					if (usefulHeight < boxHeight) {//如果底部容纳不下
						if ($mainCon.offset().top > boxHeight) {//如果上部能容纳下,向上展开
							$container.css({
								top: -boxHeight
							});
						}
						else 
							if (usefulHeight < 100 && $mainCon.offset().top > usefulHeight && $mainCon.offset().top > 100) {//如果上部也容纳不下，并且底部不足100,向上展开并强制高度，出滚动条
								$container.css({
									top: -boxHeight
								});
							}
							else {//上面容纳不下，下面大于100，则向下展开，并强制高度，出滚动条
								$container.css({
									top: selInputHeight
								});
							}
					}
					else {
						$container.css({
							top: selInputHeight
						});
					}
				}
				if(boxAutoScroll==true){
					if($select.data("scrollY")+selItemHeight>boxHeight){
						$container.animate({scrollTop:$select.data("scrollY")},600);
					}
				}
				
			}
			//没有设置了boxHeight
			else{
				//强制向上展开
				if ($select.attr("openDirection")  == "top") {
					if($mainCon.offset().top>oldHeight){//如果上部能容纳下
						$container.css({
							top: -oldHeight
						});
					}
					else{//如果上部容纳不下，向上展开并强制高度，出滚动条
						$container.height($mainCon.offset().top);
						$container.css({
							top: -$mainCon.offset().top
						});
					}
				}
				//强制向下展开
				else if ($select.attr("openDirection")  == "bottom") {
					if (usefulHeight < oldHeight) {//如果底部容纳不下，向下展开并强制高度，出滚动条
						$container.css({
							top:selInputHeight
						});
						$container.height(usefulHeight);
					}
					else{//底部能容纳下
						$container.css({
							top: selInputHeight
						});
					}
				}
				//智能判断方向
				else {
					//获取内容页中slect所在位置距离最底部的高度
					if (usefulHeight < oldHeight) {//如果底部容纳不下
						if ($mainCon.offset().top > oldHeight) {//如果上部能容纳下,向上展开
							$container.css({
								top: -oldHeight
							});
						}
						else 
							if (usefulHeight < 100 && $mainCon.offset().top > usefulHeight && $mainCon.offset().top > 100) {//如果上部也容纳不下，并且底部不足100,向上展开并强制高度，出滚动条
								$container.height($mainCon.offset().top);
								$container.css({
									top: -$mainCon.offset().top
								});
							}
							else {//上面容纳不下，下面大于100，则向下展开，并强制高度，出滚动条
								$container.css({
									top: selInputHeight
								});
								$container.height(usefulHeight);
							}
					}
					else {
						$container.css({
							top: selInputHeight
						});
					}
				}
				if(boxAutoScroll==true){
					if($select.data("scrollY")+selItemHeight>$container.height()){
						$container.animate({scrollTop:$select.data("scrollY")},600);
					}
				}
			}
			
			
			
			//设置最小宽度
			if (!$select.attr("boxWidth")) {
				if($container.width()<inputWidth+selButtonWidth){
					$container.width(inputWidth+selButtonWidth)
				}
			}
	}
	
	function hideMe() { 
		$container.attr("hasfocus",0);
		$container.hide();
		$("body").unbind("mousedown", onBodyDown);
		
	}
	function showMe() {
		//标识内容层是否展开
		$container.attr("hasfocus",1);
		depth++;
		$mainCon.css({
			"zIndex": depth
		});
		$container.show();
		$("body").bind("mousedown", onBodyDown);
	}
	function onBodyDown(event) {
		
		if($(event.target).attr("id")==curInputId||$(event.target).attr("id")==curButtonId||$(event.target).parent().attr("class")=="selectbox-wrapper"||$(event.target).attr("class")=="selectbox-wrapper"||$(event.target).parents(".selectbox-wrapper").length>0){
		}
		else{hideMe();}
	}
	function init() {
		$container.append(getSelectOptions($input.attr('id'))).hide();
		var width = $input.css('width');
    }
	function setupMainCon() {
		var $con=$("<div></div>");
		$con.addClass("mainCon");
		if($select.attr("selAlign")=="right"){
			$con.css("float","right");
		}
		return $con;
	}
	function setupContainer(options) {
		var $container=$("<div></div>");
		$container.attr('id', elm_id+'_container');
		$container.addClass(options.containerClass);
		$container.css({
		});
		$container.attr("hasfocus",0);
		return $container;
	}
	function setupInput(options) {
		var input = document.createElement("input");
		var $input = $(input);
		$input.attr("id", elm_id+"_input");
		$input.attr("type", "text");
		$input.addClass(options.inputClass);
		if(broswerFlag=="IE8"){
			$input.addClass("selectboxFont");
		}
		$input.attr("autocomplete", "off");
		var seledit=false;
		if($select.attr("editable")!=null){
			if($select.attr("editable")=="true"){
				seledit=true;
			}
			else{
				seledit=false;
			}
		}
		if(!seledit){
			if(broswerFlag=="firefox"){
				$input.attr("readonly", "readonly");
				$input.attr("contenteditable", false);
			}
			else{
				$input.attr("readonly", "readonly");
			}
		}
		else{
			$input.attr("readonly", false);
		}
		$input.attr("tabIndex", $select.attr("tabindex")); 
		
		if($select.attr("disabled")=="disabled"||$select.attr("disabled")=="true"||$select.attr("disabled")==true){
			$input.attr("disabled",true);
			$input.addClass("inputDisabled");
		}
		return $input;	
	}
	function moveSelect(step) {
		var lis = $("li", $container);
		if (!lis || lis.length == 0) return false;
		active += step;
		if (active < 0) {
			active = lis.size();
		} else if (active > lis.size()) {
			active = 0;
		}
    	scroll(lis, active);
		lis.removeClass(opt.hoverClass);
		$(lis[active]).addClass(opt.hoverClass);
	}
	function scroll(list, active) {
      var el = $(list[active]).get(0);
      var list = $container.get(0);
      if (el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;      
      } else if(el.offsetTop < list.scrollTop) {
        list.scrollTop = el.offsetTop;
      }
	}
	function setCurrent() {	
		var li = $("li."+opt.currentClass, $container).get(0);
		var ar = (li.id).split('_');
		var idLength=ar[0].length+ar[1].length+2;
		var str=li.id;
		var el=str.substr(idLength,str.length);
		$select.val(el);
		$select.attr("relText",$(li).text());
		$select.attr("relValue",el);
		//$input.val($(li).html());
		var str = $(li).html().trim();
		$input.val(str);
		if(edit==true){
			$select.attr("editValue",$input.val());
		}
		$select.focus();
		return true;
	}
	function getCurrentSelected() {
		return $select.val();
	}
	function getCurrentValue() {
		return $input.val();
	}
	function getSelectOptions(parentid) {
		var select_options = new Array();
		var ul = document.createElement('ul');
		var otpArr=[];
		var idxFix=0;
		//定义联动标识位
		var rel;
		if($select.attr("childId")!=null){
			rel=true;
		}
		var isEditable;
		if($select.attr("editable")!=null){
			if($select.attr("editable")=="true"){
				isEditable=true;
			}
			else{
				isEditable=false;
			}
		}
		var ajaxMode=false;
		var urlStr=$select.attr("url");
		var dataStr=$select.attr("data");
		var dataObj3=$select.data("data");
		if(urlStr!=null||dataStr!=null||dataObj3!=null||$select.attr("dataType")=="xml"||$select.find("option").length==0){
			ajaxMode=true;
		}
		if(ajaxMode==true){
			var dataRoot="list";
			if($select.attr("dataRoot")){
				dataRoot=$select.attr("dataRoot");
			}

			var paramsStr=$select.attr("params");
			var paramsObj;
			if(paramsStr){
				
				try {
					paramsObj=JSON.parse(paramsStr);
				}
				catch(e){
					paramsObj="";
					alert(quiLangage.select.paramErrorMessage)
				}
			}
			else{
				paramsObj="";
			}
			//优先使用data
			if(dataObj3){
				
				createOptions(dataObj3,parentid,colNum,colWidth,isEditable,rel,ul,dataRoot);
			}
			else if(dataStr){
				var dataObj2;
				try {
					dataObj2=JSON.parse(dataStr);
				}
				catch(e){
					dataObj2="";
					alert(quiLangage.select.dataErrorMessage)
				}
				$select.data("data",dataObj2);
				createOptions(dataObj2,parentid,colNum,colWidth,isEditable,rel,ul,dataRoot);
			}
			else if(urlStr&&$select.attr("dataType")=="xml"){
				$.ajax({ 
				url: $select.attr("url"), 
				data:paramsObj,
				error:function(){
					alert(quiLangage.select.urlErrorMessage)
				},
				success: function(xml){
					//$select.data("data",data);
					createOptions_xml(xml,parentid,colNum,colWidth,isEditable,rel,ul,dataRoot);
			    }
				});
			}
			else if(urlStr){
				var dataType="json";
				if($select.attr("dataType")){
					dataType=$select.attr("dataType");
				}
				$.ajax({ 
				url: $select.attr("url"), 
				dataType:dataType,
				data:paramsObj,
				error:function(){
					alert(quiLangage.select.urlErrorMessage)
				},
				success: function(data){
					var myData;
					if(dataType=="text"){
						myData=eval("("+data+")");
					}
					else{
						myData=data;
					}
					$select.data("data",myData);
					createOptions(myData,parentid,colNum,colWidth,isEditable,rel,ul,dataRoot);
					
			    }
				});
			}
			//xml数据的联动子级下拉框
			else if($select.attr("dataType")=="xml"){
				//$select.data("data","")
				//alert($select.attr("selectedValue"))
				createOptions_xml(null,parentid,colNum,colWidth,isEditable,rel,ul,dataRoot);
			}
			//json数据的联动子级下拉框
			else if($select.find("option").length==0){
				$select.data("data",{"list":[]})
				createOptions(null,parentid,colNum,colWidth,isEditable,rel,ul,dataRoot);
			}
		}else{
			//本地模式
			$select.find('option').each(function(idx) {
				otpArr.push($(this)[0]);
				var li = document.createElement('li');
				li.setAttribute('id', parentid + '_' + $(this).val());
				li.innerHTML = $(this).html();
				if ($(this).is(':selected')) {
					
					if(isEditable==true){
						$input.val($(this).html());
						$(li).addClass(opt.currentClass);
					}
					else{
						var str = $(this).html().trim();
						$input.val(str);
						//$input.val($(this).html());
						$(li).addClass(opt.currentClass);
					}
				}
				if(colNum!=1){
					$(li).addClass("li_left");
					if(colWidth!=null){
						$(li).width(colWidth);
					}
					else{
						var selWidth=Number(selTrueWidth);
						$(li).width(selWidth);
					}
				}
				ul.appendChild(li);
				
				$(li)
				.mouseover(function(event) {
					hasfocus = 1;
					if (opt.debug) console.log('over on : '+this.id);
					jQuery(event.target, $container).addClass(opt.hoverClass);
				})
				.mouseout(function(event) {
					hasfocus = -1;
					if (opt.debug) console.log('out on : '+this.id);
					jQuery(event.target, $container).removeClass(opt.hoverClass);
				})
				.click(function(event) {
				    var fl = $('li.'+opt.hoverClass, $container).get(0);
					if (opt.debug) console.log('click on :'+this.id);
					var myId = $(this).attr("id").split('_');
					$('#' + myId[0] + '_container' + ' li.'+opt.currentClass).removeClass(opt.currentClass); 
					$(this).addClass(opt.currentClass);
					setCurrent();
					$select.get(0).blur();
					hideMe();
					
					try{
						$select.trigger("change");
						
					}
					catch(e){}
					
					$input.removeClass("tipColor");
					$select.data("scrollY",idx*selItemHeight);
					if(rel){
						ajaxLoad($select,$select.val(),0);
					}
				});
				if($select.attr("editValue")!=null){
					$input.val($select.attr("editValue"));
				}
			});
		}
		
		$select.find('optgroup').each(function(){
			var idx=getPosition($(this).children("option").eq(0)[0],otpArr);
			var groupValue=$(this).attr("label");
			$(ul).find("li").eq(idx+idxFix).before("<li class='group'>"+groupValue+"</li>");
			idxFix++;
		});
		return ul;
	}
	
	function createOptions_xml(data,parentid,colNum,colWidth,isEditable,rel,ul,dataRoot,paramsObj){
					
					//获取无关项文字内容
					var promptText=quiLangage.select.promptMessage;
					if($select.attr("prompt")!=null){
						if($select.attr("prompt")==""){
							promptText=quiLangage.select.promptMessage;
						}
						else{
							promptText=$select.attr("prompt")
						}
					}
					
					//获取初始时选中索引
					var selectedIdx=-1;
					var selectedValue="";
					if($select.attr("selectedIdx")){
						selectedIdx=Number($select.attr("selectedIdx"));
					}
					if($select.attr("selectedValue")){
						selectedValue=$select.attr("selectedValue");
					}
					
					$select.attr("length",10);
					
					if ($select.attr("prompt") != null) {
						//创建第一个选项
						var li0 = document.createElement('li');
						li0.setAttribute('id', parentid + '_');
						li0.innerHTML = promptText;
						//如果没设置初始时选中索引
						if (selectedIdx == -1 && selectedValue == "") {
							//默认选中该项
							$(li0).addClass(opt.currentClass);
							$input.val(li0.innerHTML);
						}
						ul.appendChild(li0);
						$select[0].options.length = 0;
						$select[0].options[$select[0].options.length] = new Option(promptText, "");
						//分列
						if (colNum != 1) {
							$(li0).addClass("li_left");
							if (colWidth != null) {
								$(li0).width(colWidth);
							}
							else {
								var selWidth = Number(selTrueWidth);
								$(li0).width(selWidth);
							}
						}
						//事件处理
						$(li0).mouseover(function(event){
							hasfocus = 1;
							if (opt.debug) 
								console.log('over on : ' + this.id);
							jQuery(event.target, $container).addClass(opt.hoverClass);
						}).mouseout(function(event){
							hasfocus = -1;
							if (opt.debug) 
								console.log('out on : ' + this.id);
							jQuery(event.target, $container).removeClass(opt.hoverClass);
						}).click(function(event){
							var fl = $('li.' + opt.hoverClass, $container).get(0);
							if (opt.debug) 
								console.log('click on :' + this.id);
							var myId = $(this).attr("id").split('_');
							$('#' + myId[0] + '_container' + ' li.' + opt.currentClass).removeClass(opt.currentClass);
							$(this).addClass(opt.currentClass);
							setCurrent();
							$select.get(0).blur();
							hideMe();
							$select.trigger("change");
							$input.removeClass("tipColor");
							$select.data("scrollY",0);
							if(rel){
								ajaxLoad($select,$select.data("selectedNode"),0);
							}
						});
					}	
					//没设置prompt时索引默认为0，选中第一项
					if ($select.attr("prompt") == null) {
						if (selectedIdx == -1 && selectedValue == "") {
							selectedIdx=0;
						}
					}
					var findSelectValue=0;
					
					//根据数据创建其他选项
					$.each($(data).find(dataRoot),function(idx,item){
						var li = document.createElement('li');
						li.setAttribute('id', parentid + '_' + $(item).attr(valueField));
						li.innerHTML =$(item).attr(labelField);
						$(li).data("itemData",item);
						$select[0].options[$select[0].options.length] = new Option($(item).attr(labelField), $(item).attr(valueField));
						//如果设置了初始时选中索引
						if(selectedIdx==idx){
							//选中该项
							if(isEditable==true){
								$(li).addClass(opt.currentClass);
								$input.val(li.innerHTML);
								$select.val($(item).attr(labelField));
								$select.attr("relText",$(item).attr(labelField));
								$select.attr("editValue",$(item).attr(labelField));
							}
							else{
								$(li).addClass(opt.currentClass);
								$input.val(li.innerHTML.trim());
								$select.val($(item).attr(valueField));
								$select.attr("relText",$(item).attr(labelField));
								$select.attr("relValue",$(item).attr(valueField));
							}
							$select.data("selectedNode",item);
							if($select.attr("prompt") == null){
								$select.data("scrollY",idx*selItemHeight);
							}
							else{
								$select.data("scrollY",(idx+1)*selItemHeight);
							}
							if(rel){
								ajaxLoad($select,item,1);
							}
							findSelectValue=1;
						}
						else if(selectedValue!=""){
							if(selectedValue==$(item).attr(valueField).toString()){
								//选中该项
								if(isEditable==true){
									$(li).addClass(opt.currentClass);
									$input.val(li.innerHTML);
									$select.val($(item).attr(valueField));
									$select.attr("relText",$(item).attr(labelField));
									$select.attr("editValue",$(item).attr(labelField));
								}
								else{
									$(li).addClass(opt.currentClass);
									$input.val(li.innerHTML.trim());
									$select.val($(item).attr(valueField));
									$select.attr("relText",$(item).attr(labelField));
									$select.attr("relValue",$(item).attr(valueField));
								}
								$select.data("selectedNode",item);
								if($select.attr("prompt") == null){
									$select.data("scrollY",idx*selItemHeight);
								}
								else{
									$select.data("scrollY",(idx+1)*selItemHeight);
								}
								if(rel){
									ajaxLoad($select,item,1);
								}
								findSelectValue=1;
							}
							
						}
						
						//分列
						if(colNum!=1){
							$(li).addClass("li_left");
							if(colWidth!=null){
								$(li).width(colWidth);
							}
							else{
								var selWidth=Number(selTrueWidth);
								$(li).width(selWidth);
							}
						}
						//事件处理
						$(li)
							.mouseover(function(event) {
								hasfocus = 1;
								if (opt.debug) console.log('over on : '+this.id);
								jQuery(event.target, $container).addClass(opt.hoverClass);
							})
							.mouseout(function(event) {
								hasfocus = -1;
								if (opt.debug) console.log('out on : '+this.id);
								jQuery(event.target, $container).removeClass(opt.hoverClass);
							})
							.click(function(event) {
							    var fl = $('li.'+opt.hoverClass, $container).get(0);
								if (opt.debug) console.log('click on :'+this.id);
								var myId = $(this).attr("id").split('_');
								$('#' + myId[0] + '_container' + ' li.'+opt.currentClass).removeClass(opt.currentClass); 
								
								$(this).addClass(opt.currentClass);
								setCurrent();
								$select.data("selectedNode",$(this).data("itemData"));
								$select.get(0).blur();
								hideMe();
								
								$select.trigger("change");
								$input.removeClass("tipColor");
								if($select.attr("prompt") == null){
									$select.data("scrollY",idx*selItemHeight);
								}
								else{
									$select.data("scrollY",(idx+1)*selItemHeight);
								}
								if(rel){
									ajaxLoad($select,$select.data("selectedNode"),0);
								}
							});	
						ul.appendChild(li);
						
						if($select.attr("editValue")!=null){
							$input.val($select.attr("editValue"));
						}
					})	
		if(findSelectValue==0){
			if($select.attr("prompt")){
				$(ul).find("li").eq(0).addClass(opt.currentClass);
				$input.val($select.attr("prompt"));
			}
		}
		$select.attr("finished","true");
		$select.trigger("ajaxInit");
	}
	
	function createOptions(data,parentid,colNum,colWidth,isEditable,rel,ul,dataRoot,paramsObj){
					//获取无关项文字内容
					var promptText=quiLangage.select.promptMessage;
					if($select.attr("prompt")!=null){
						if($select.attr("prompt")==""){
							promptText=quiLangage.select.promptMessage;
						}
						else{
							promptText=$select.attr("prompt")
						}
					}
					
					//获取初始时选中索引
					var selectedIdx=-1;
					var selectedValue="";
					var selectedKey="";
					if($select.attr("selectedIdx")){
						selectedIdx=Number($select.attr("selectedIdx"));
					}
					if($select.attr("selectedValue")){
						selectedValue=$select.attr("selectedValue");
					}
					if($select.attr("selectedKey")){
						selectedKey=$select.attr("selectedKey");
					}
					
					$select.attr("length",10);
					
					if ($select.attr("prompt") != null) {
						//创建第一个选项
						var li0 = document.createElement('li');
						li0.setAttribute('id', parentid + '_');
						li0.innerHTML = promptText;
						//如果没设置初始时选中索引
						if (selectedIdx == -1 && selectedValue == ""&& selectedKey == "") {
							//默认选中该项
							$(li0).addClass(opt.currentClass);
							$input.val(li0.innerHTML);
						}
						ul.appendChild(li0);
						$select[0].options.length = 0;
						$select[0].options[$select[0].options.length] = new Option(promptText, "");
						//分列
						if (colNum != 1) {
							$(li0).addClass("li_left");
							if (colWidth != null) {
								$(li0).width(colWidth);
							}
							else {
								var selWidth = Number(selTrueWidth);
								$(li0).width(selWidth);
							}
						}
						
						//事件处理
						$(li0).mouseover(function(event){
							hasfocus = 1;
							if (opt.debug) 
								console.log('over on : ' + this.id);
							jQuery(event.target, $container).addClass(opt.hoverClass);
						}).mouseout(function(event){
							hasfocus = -1;
							if (opt.debug) 
								console.log('out on : ' + this.id);
							jQuery(event.target, $container).removeClass(opt.hoverClass);
						}).click(function(event){
							var fl = $('li.' + opt.hoverClass, $container).get(0);
							if (opt.debug) 
								console.log('click on :' + this.id);
							var myId = $(this).attr("id").split('_');
							$('#' + myId[0] + '_container' + ' li.' + opt.currentClass).removeClass(opt.currentClass);
							$(this).addClass(opt.currentClass);
							setCurrent();
							$select.get(0).blur();
							hideMe();
							$select.trigger("change");
							$input.removeClass("tipColor");
							$select.data("scrollY",0);
							if(rel){
								ajaxLoad($select,$select.val(),0);
							}
						});
					}	
					//没设置prompt时索引默认为0，选中第一项
					if ($select.attr("prompt") == null) {
						if (selectedIdx == -1 && selectedValue == ""&& selectedKey == "") {
							selectedIdx=0;
						}
					}
					var findSelectValue=0;
					if (data) {
						var finalData;
						if(data[dataRoot]){
							finalData=data[dataRoot]
						}
						else{
							finalData=data;
						}
						//根据数据创建其他选项
						$.each(finalData, function(idx, item){
							var li = document.createElement('li');
							li.setAttribute('id', parentid + '_' + item[valueField]);
							li.innerHTML = item[labelField];
							$(li).data("itemData", item);
							$select[0].options[$select[0].options.length] = new Option(item[labelField], item[valueField]);
							
							//如果设置了初始时选中索引
							if (selectedIdx == idx) {
								//选中该项
								if (isEditable == true) {
									$(li).addClass(opt.currentClass);
									$input.val(li.innerHTML);
									$select.val(item[valueField]);
									$select.attr("relText", item[labelField]);
									$select.attr("editValue", item[labelField]);
								}
								else {
									$(li).addClass(opt.currentClass);
									$input.val(li.innerHTML.trim());
									$select.val(item[valueField]);
									$select.attr("relText", item[labelField]);
									$select.attr("relValue", item[valueField]);
								}
								$select.data("selectedNode", item);
								if($select.attr("prompt") == null){
									$select.data("scrollY",idx*selItemHeight);
								}
								else{
									$select.data("scrollY",(idx+1)*selItemHeight);
								}
								if (rel) {
									ajaxLoad($select, item[valueField],1);
								}
								findSelectValue = 1;
							}
							else 
								if (selectedValue != "") {
									if (selectedValue == item[valueField].toString()) {
										//选中该项
										if (isEditable == true) {
											$(li).addClass(opt.currentClass);
											$input.val(li.innerHTML);
											$select.val(item[valueField]);
											$select.attr("relText", item[labelField]);
											$select.attr("editValue", item[labelField]);
										}
										else {
											$(li).addClass(opt.currentClass);
											$input.val(li.innerHTML.trim());
											$select.val(item[valueField]);
											$select.attr("relText", item[labelField]);
											$select.attr("relValue", item[valueField]);
										}
										$select.data("selectedNode", item);
										if($select.attr("prompt") == null){
											$select.data("scrollY",idx*selItemHeight);
										}
										else{
											$select.data("scrollY",(idx+1)*selItemHeight);
										}
										if (rel) {
											ajaxLoad($select, item[valueField],1);
										}
										findSelectValue = 1;
									}
									
								}
							else 
								if (selectedKey != "") {
									if (selectedKey == item[labelField].toString()) {
										//选中该项
										if (isEditable == true) {
											$(li).addClass(opt.currentClass);
											$input.val(li.innerHTML);
											$select.val(item[valueField]);
											$select.attr("relText", item[labelField]);
											$select.attr("editValue", item[labelField]);
										}
										else {
											$(li).addClass(opt.currentClass);
											$input.val(li.innerHTML.trim());
											$select.val(item[valueField]);
											$select.attr("relText", item[labelField]);
											$select.attr("relValue", item[valueField]);
										}
										$select.data("selectedNode", item);
										if($select.attr("prompt") == null){
											$select.data("scrollY",idx*selItemHeight);
										}
										else{
											$select.data("scrollY",(idx+1)*selItemHeight);
										}
										if (rel) {
											ajaxLoad($select, item[valueField],1);
										}
										findSelectValue = 1;
									}
									
								}
							
							//分列
							if (colNum != 1) {
								$(li).addClass("li_left");
								if (colWidth != null) {
									$(li).width(colWidth);
								}
								else {
									var selWidth = Number(selTrueWidth);
									$(li).width(selWidth);
								}
							}
							//事件处理
							$(li).mouseover(function(event){
								hasfocus = 1;
								if (opt.debug) 
									console.log('over on : ' + this.id);
								jQuery(event.target, $container).addClass(opt.hoverClass);
							}).mouseout(function(event){
								hasfocus = -1;
								if (opt.debug) 
									console.log('out on : ' + this.id);
								jQuery(event.target, $container).removeClass(opt.hoverClass);
							}).click(function(event){
								var fl = $('li.' + opt.hoverClass, $container).get(0);
								if (opt.debug) 
									console.log('click on :' + this.id);
								var myId = $(this).attr("id").split('_');
								$('#' + myId[0] + '_container' + ' li.' + opt.currentClass).removeClass(opt.currentClass);
								
								$(this).addClass(opt.currentClass);
								setCurrent();
								$select.data("selectedNode", $(this).data("itemData"));
								$select.get(0).blur();
								hideMe();
								
								$select.trigger("change");
								$input.removeClass("tipColor");
								if($select.attr("prompt") == null){
									$select.data("scrollY",idx*selItemHeight);
								}
								else{
									$select.data("scrollY",(idx+1)*selItemHeight);
								}
								
								if (rel) {
									ajaxLoad($select, $select.val(),0);
								}
							});
							ul.appendChild(li);
							
							if ($select.attr("editValue") != null) {
								$input.val($select.attr("editValue"));
							}
						})
					}	
					
					
		if(findSelectValue==0){
			if($select.attr("prompt")){
				$(ul).find("li").eq(0).addClass(opt.currentClass);
				$input.val($select.attr("prompt"));
			}
		}
		$select.attr("finished","true");
		$select.trigger("ajaxInit");
	}
	function ajaxLoad(obj,value,num){
				//if (value != "") {
					var child = obj.attr("childId");
					var $childLoader=$("#" + child).prev().find("div[class=loader]");
					$childLoader.show();
					window.setTimeout(function(){loadLater(obj,value,num);},200);
				//}
	}
	//第三个参数为0时代表是点击进行的ajax加载，为1时代表初始时加载
	function loadLater(obj,value,num){
					var dataPath;
					
					if (obj.attr("childDataType") == "xml") {
						var child = obj.attr("childId");
						var $childLoader=$("#" + child).prev().find("div[class=loader]");
						$childLoader.hide();
						var $childUL = $("#" + child).prev().find("ul");
						var childOptId = $("#" + child).prev().find(">div").attr("id").split("_")[0];
						var $childInput = $("#" + child).prev().find("input:text");
						var childSel=$("#" + child)[0];
						var $childSel=$("#" + child);
						$childUL.html("");
						childSel.options.length = 0;
						
						$("#" + child).data("scrollY",0);
						
						//获取数据的前缀
						var dataRoot="list";
						if($("#" + child).attr("dataRoot")){
							dataRoot=$("#" + child).attr("dataRoot");
						}
						var labelField="key";
						if($("#" + child).attr("labelField")){
							labelField=$("#" + child).attr("labelField");
						}
						var valueField="value";
						if($("#" + child).attr("valueField")){
							valueField=$("#" + child).attr("valueField");
						}
						//创建第一个选项
						if($("#" + child).attr("prompt")){
							var li0 = document.createElement('li');
							var text0=$("#" + child).attr("prompt");
							$(li0).text(text0);
							$(li0).attr("relValue", "");
							$childUL.append($(li0));
							childSel.options[childSel.options.length] = new Option(text0, "");
							
							$(li0).mouseover(function(event){
								jQuery(event.target).addClass(opt.hoverClass);
							});
							$(li0).mouseout(function(event){
								jQuery(event.target).removeClass(opt.hoverClass);
							});
							$(li0).mousedown(function(event){
								$('#' + childOptId + '_container' + ' li.' + opt.currentClass).removeClass(opt.currentClass);
								$(this).addClass(opt.currentClass);
								$("#" + child).attr("relText", $(this).text());
								$("#" + child).attr("relValue", $(this).attr("relValue"));
								$("#" + child).val($(this).attr("relValue"));
								$childInput.val($(this).html());
								$("#" + child).prev().find(">div").hide();
								$("#" + child).prev().find(">div").attr("hasfocus",0);
								$("#" + child).focus();
								$("#" + child).data("scrollY",0);
								
								if ($("#" + child).attr("onchange") != null) {
									//$("#" + child).trigger("onchange");
								}
								try{
									$("#" + child).trigger("change");
								}
								catch(e){}
							});
						}
						var selectedIdx=-1;
						var selectedValue="";
						var isEditable;
						var rel;
						if($childSel.attr("childId")!=null){
							rel=true;
						}
						if(num==1){
							if($childSel.attr("selectedIdx")){
								selectedIdx=Number($childSel.attr("selectedIdx"));
							}
							if($childSel.attr("selectedValue")){
								selectedValue=$childSel.attr("selectedValue");
							}
						}
						
						if($childSel.attr("editable")!=null){
							if($childSel.attr("editable")=="true"){
								isEditable=true;
							}
							else{
								isEditable=false;
							}
						}
						var findSelectValue=0;
						$.each($(value).find(dataRoot),function(idx,item){
							var text = $(item).attr(labelField);
							var value = $(item).attr(valueField);
							var li = document.createElement('li');
							$(li).text(text);
							$(li).attr("relValue", value);
							$(li).data("itemData",item);
							$childUL.append($(li));
							childSel.options[childSel.options.length] = new Option(text, value);
							//如果设置了初始时选中索引
							if(selectedIdx==idx){
								//选中该项
								if(isEditable==true){
									$(li).addClass(opt.currentClass);
									$childInput.val(li.innerHTML);
									$childSel.val($(item).attr(valueField));
									$childSel.attr("relText",$(item).attr(labelField));
									$childSel.attr("editValue",$(item).attr(labelField));
								}
								else{
									$(li).addClass(opt.currentClass);
									$childInput.val(li.innerHTML.trim());
									$childSel.val($(item).attr(valueField));
									$childSel.attr("relText",$(item).attr(labelField));
									$childSel.attr("relValue",$(item).attr(valueField));
								}
								$childSel.data("selectedNode",item);
								if($childSel.attr("prompt") == null){
									$childSel.data("scrollY",idx*selItemHeight);
								}
								else{
									$childSel.data("scrollY",(idx+1)*selItemHeight);
								}
								if(rel){
									ajaxLoad($childSel,item,1);
								}
								findSelectValue=1;
							}
							else if(selectedValue!=""){
								if(selectedValue==$(item).attr(valueField).toString()){
									//选中该项
									if(isEditable==true){
										$(li).addClass(opt.currentClass);
										$childInput.val(li.innerHTML);
										$childSel.val($(item).attr(valueField));
										$childSel.attr("relText",$(item).attr(labelField));
										$childSel.attr("editValue",$(item).attr(labelField));
									}
									else{
										$(li).addClass(opt.currentClass);
										$childInput.val(li.innerHTML.trim());
										$childSel.val($(item).attr(valueField));
										$childSel.attr("relText",$(item).attr(labelField));
										$childSel.attr("relValue",$(item).attr(valueField));
									}
									$childSel.data("selectedNode",item);
									if($childSel.attr("prompt") == null){
										$childSel.data("scrollY",idx*selItemHeight);
									}
									else{
										$childSel.data("scrollY",(idx+1)*selItemHeight);
									}
									if(rel){
										ajaxLoad($childSel,item,1);
									}
									findSelectValue=1;
								}
								
							}
							$(li).mouseover(function(event){
								jQuery(event.target).addClass(opt.hoverClass);
							});
							$(li).mouseout(function(event){
								jQuery(event.target).removeClass(opt.hoverClass);
							});
							$(li).mousedown(function(event){
								$('#' + childOptId + '_container' + ' li.' + opt.currentClass).removeClass(opt.currentClass);
								$(this).addClass(opt.currentClass);
								$("#" + child).attr("relText", $(this).text());
								$("#" + child).attr("relValue", $(this).attr("relValue"));
								$("#" + child).data("selectedNode", $(this).data("itemData"));
								$("#" + child).val($(this).attr("relValue"));
								$childInput.val($(this).html());
								$("#" + child).prev().find(">div").hide();
								$("#" + child).prev().find(">div").attr("hasfocus",0);
								$("#" + child).focus();
								if($("#" + child).attr("prompt") == null){
									$("#" + child).data("scrollY",idx*selItemHeight);
								}
								else{
									$("#" + child).data("scrollY",(idx+1)*selItemHeight);
								}
								if ($("#" + child).attr("onchange") != null) {
									//$("#" + child).trigger("onchange");
								}
								try{
									$("#" + child).trigger("change");
								}
								catch(e){}
								//var rel;
								//if ($("#" + child).attr("childId") != null) {
									//rel = true;
								//}
								if (rel) {
									ajaxLoad($("#" + child), $("#" + child).data("selectedNode"),0);
								}
							});
						});
						if($(value).find(dataRoot).length==0){
							var li = document.createElement('li');
							$(li).text(quiLangage.select.ldError);
							$childUL.append($(li));
						}
						if(selectedIdx==-1&&selectedValue==""){
							var $firstLI = $childUL.find("li").eq(0);
							$childInput.val($firstLI.text());
							$firstLI.addClass(opt.currentClass);
							$("#" + child).val($firstLI.attr("relValue"));
							$("#" + child).attr("relValue", $firstLI.attr("relValue"));
							$("#" + child).attr("relText", $firstLI.text());
							$("#" + child).data("selectedNode", $firstLI.data("itemData"));
							$("#" + child).data("scrollY",0);
						}
						if(findSelectValue==0){
							if($("#" + child).attr("prompt")){
								$childUL.find("li").eq(0).addClass(opt.currentClass);
								$childInput.val($("#" + child).attr("prompt"));
							}
						}	
						$("#" + child).trigger("ajaxInit"); 
					}
					else{
						if (obj.attr("childDataType") == null) {
						dataPath = obj.attr("childDataPath") + value;
					}
					else 
						if (obj.attr("childActionType") == "local") {
							dataPath = obj.attr("childDataPath") + value + "." + obj.attr("childDataType");
						}
						else {
							dataPath = obj.attr("childDataPath") + value;
						}
						
						$.getJSON(dataPath,function(data){
							var child_j = obj.attr("childId");
							var $childLoader_j=$("#" + child_j).prev().find("div[class=loader]");
							$childLoader_j.hide();
							var $childUL_j = $("#" + child_j).prev().find("ul");
							var childOptId_j = $("#" + child_j).prev().find(">div").attr("id").split("_")[0];
							var $childInput_j = $("#" + child_j).prev().find("input:text");
							var childSel_j=$("#" + child_j)[0];
							var $childSel_j=$("#" + child_j);
							$childUL_j.html("");
							childSel_j.options.length = 0;
							//获取数据的前缀
							var dataRoot="list";
							if($("#" + child_j).attr("dataRoot")){
								dataRoot=$("#" + child_j).attr("dataRoot");
							}
							var labelField="key";
							if($("#" + child_j).attr("labelField")){
								labelField=$("#" + child_j).attr("labelField");
							}
							var valueField="value";
							if($("#" + child_j).attr("valueField")){
								valueField=$("#" + child_j).attr("valueField");
							}
							//创建第一个选项
							if($("#" + child_j).attr("prompt")){
								var li_j0 = document.createElement('li');
								var text_j0=$("#" + child_j).attr("prompt");
								$(li_j0).text(text_j0);
								$(li_j0).attr("relValue", "");
								$childUL_j.append($(li_j0));
								childSel_j.options[childSel_j.options.length] = new Option(text_j0, "");
								
								$(li_j0).mouseover(function(event){
									jQuery(event.target).addClass(opt.hoverClass);
								});
								$(li_j0).mouseout(function(event){
									jQuery(event.target).removeClass(opt.hoverClass);
								});
								$(li_j0).mousedown(function(event){
									$('#' + childOptId_j + '_container' + ' li.' + opt.currentClass).removeClass(opt.currentClass);
									$(this).addClass(opt.currentClass);
									$("#" + child_j).attr("relText", $(this).text());
									$("#" + child_j).attr("relValue", $(this).attr("relValue"));
									$("#" + child_j).val($(this).attr("relValue"));
									$childInput_j.val($(this).html());
									$("#" + child_j).prev().find(">div").hide();
									$("#" + child_j).prev().find(">div").attr("hasfocus",0);
									$("#" + child_j).focus();
									$("#" + child_j).data("scrollY",0);
									if ($("#" + child_j).attr("onchange") != null) {
										//$("#" + child_j).trigger("onchange");
									}
									try{
										$("#" + child_j).trigger("change");
									}
									catch(e){}
								});
							}
							var selectedIdx_j=-1;
							var selectedValue_j="";
							var isEditable_j;
							var rel_j;
							if($childSel_j.attr("childId")!=null){
								rel_j=true;
							}
							if (num == 1) {
								if ($childSel_j.attr("selectedIdx")) {
									selectedIdx_j = Number($childSel_j.attr("selectedIdx"));
								}
								if ($childSel_j.attr("selectedValue")) {
									selectedValue_j = $childSel_j.attr("selectedValue");
								}
							}
							
							if($childSel_j.attr("editable")!=null){
								if($childSel_j.attr("editable")=="true"){
									isEditable_j=true;
								}
								else{
									isEditable_j=false;
								}
							}
							var findSelectValue_j=0;
							var finalData;
							if(data[dataRoot]){
								finalData=data[dataRoot]
							}
							else{
								finalData=data;
							}
							$.each(finalData,function(idx,item){
								var text_j = item[labelField];
								var value_j = item[valueField];
								var li_j = document.createElement('li');
								$(li_j).text(text_j);
								$(li_j).attr("relValue", value_j);
								$(li_j).data("itemData",item);
								$childUL_j.append($(li_j));
								childSel_j.options[childSel_j.options.length] = new Option(text_j, value_j);
								//如果设置了初始时选中索引
								if(selectedIdx_j==idx){
									//选中该项
									if(isEditable_j==true){
										$(li_j).addClass(opt.currentClass);
										$childInput_j.val(li_j.innerHTML);
										$childSel_j.val(item[valueField]);
										$childSel_j.attr("relText",item[labelField]);
										$childSel_j.attr("editValue",item[labelField]);
									}
									else{
										$(li_j).addClass(opt.currentClass);
										$childInput_j.val(li_j.innerHTML.trim());
										$childSel_j.val(item[valueField]);
										$childSel_j.attr("relText",item[labelField]);
										$childSel_j.attr("relValue",item[valueField]);
									}
									$childSel_j.data("selectedNode",item);
									if($childSel_j.attr("prompt") == null){
										$childSel_j.data("scrollY",idx*selItemHeight);
									}
									else{
										$childSel_j.data("scrollY",(idx+1)*selItemHeight);
									}
									if(rel){
										ajaxLoad($childSel_j,item[valueField],1);
									}
									findSelectValue_j=1;
								}
								else if(selectedValue_j!=""){
									if(selectedValue_j==item[valueField].toString()){
										//选中该项
										if(isEditable_j==true){
											$(li_j).addClass(opt.currentClass);
											$childInput_j.val(li_j.innerHTML);
											$childSel_j.val(item[valueField]);
											$childSel_j.attr("relText",item[labelField]);
											$childSel_j.attr("editValue",item[labelField]);
										}
										else{
											$(li_j).addClass(opt.currentClass);
											$childInput_j.val(li_j.innerHTML.trim());
											$childSel_j.val(item[valueField]);
											$childSel_j.attr("relText",item[labelField]);
											$childSel_j.attr("relValue",item[valueField]);
										}
										$childSel_j.data("selectedNode",item);
										if($childSel_j.attr("prompt") == null){
											$childSel_j.data("scrollY",idx*selItemHeight);
										}
										else{
											$childSel_j.data("scrollY",(idx+1)*selItemHeight);
										}
										if(rel_j){
											ajaxLoad($childSel_j,item[valueField],1);
										}
										findSelectValue_j=1;
									}
								}
								$(li_j).mouseover(function(event){
									jQuery(event.target).addClass(opt.hoverClass);
								});
								$(li_j).mouseout(function(event){
									jQuery(event.target).removeClass(opt.hoverClass);
								});
								$(li_j).mousedown(function(event){
									$('#' + childOptId_j + '_container' + ' li.' + opt.currentClass).removeClass(opt.currentClass);
									$(this).addClass(opt.currentClass);
									$("#" + child_j).attr("relText", $(this).text());
									$("#" + child_j).attr("relValue", $(this).attr("relValue"));
									$("#" + child_j).data("selectedNode", $(this).data("itemData"));
									$("#" + child_j).val($(this).attr("relValue"));
									$childInput_j.val($(this).html());
									$("#" + child_j).prev().find(">div").hide();
									$("#" + child_j).prev().find(">div").attr("hasfocus",0);
									$("#" + child_j).focus();
									
									if ($("#" + child_j).attr("onchange") != null) {
										//$("#" + child_j).trigger("onchange");
									}
									try{
										$("#" + child_j).trigger("change");
									}
									catch(e){}
									//var rel_j;
									//if ($("#" + child_j).attr("childId") != null) {
										//rel_j = true;
									//}
									if($childSel_j.attr("prompt") == null){
										$("#" + child_j).data("scrollY",idx*selItemHeight);
									}
									else{
										$("#" + child_j).data("scrollY",(idx+1)*selItemHeight);
									}
									if (rel_j) {
										ajaxLoad($("#" + child_j), $("#" + child_j).val(),0);
									}
								});
							});
							if(data.length==0){
								var li_j = document.createElement('li');
								$(li_j).text(quiLangage.select.noItemMessage);
								$childUL_j.append($(li_j));
							}
							if(selectedIdx_j==-1&&selectedValue_j==""){
								var $firstLI_j = $childUL_j.find("li").eq(0);
								$childInput_j.val($firstLI_j.text());
								$firstLI_j.addClass(opt.currentClass);
								$("#" + child_j).val($firstLI_j.attr("relValue"));
								$("#" + child_j).attr("relValue", $firstLI_j.attr("relValue"));
								$("#" + child_j).attr("relText", $firstLI_j.text());
								$("#" + child_j).data("selectedNode", $firstLI_j.data("itemData"));
								$("#" + child_j).data("scrollY",0);
							}
							$("#" + child_j).trigger("ajaxInit"); 
							if(findSelectValue_j==0){
								if($("#" + child_j).attr("prompt")){
									$childUL_j.find("li").eq(0).addClass(opt.currentClass);
									$childInput_j.val($("#" + child_j).attr("prompt"));
								}
							}	
						}); 
					}
	}
	
};

	
/*单选下拉框*/

/*信息提示*/
var tipDirection="down";
function enableTooltips(id){
    var links,links2, i, h;
    if (!document.getElementById || !document.getElementsByTagName) 
        return;
    AddCss();
    h = document.createElement("span");
    h.id = "btc";
    h.setAttribute("id", "btc");
    h.style.position = "absolute";
	h.style.zIndex=9999;
	$("body").append($(h));
}
function _getStrLength(str){
	var i;
	var len;
	for(i=0,len=0;i<str.length;i++){
		if(str.charCodeAt(i)<128){
			len++;
		}
		else{
			len=len+2;
		}
	}
	return len;
}
function addTooltip(el){
    var tooltip, t, b, s, l;
    t = el.getAttribute("title");
	
	if(t==" "){
		el.removeAttribute("title");
		 el.onmouseover = null;
	    el.onmouseout = null;
	    el.onmousemove = null;
		return;
	}
     if (t != null && t.length != 0) {
	    el.removeAttribute("title");
	    if (_getStrLength(t) > 37||_getStrLength(t) ==37) {
	        tooltip = CreateEl("span", "tooltip");
	    }
		else  if (_getStrLength(t) > 10&&_getStrLength(t)<37) {
	        tooltip = CreateEl("span", "tooltip_mid");
	    }
	    else {
	        tooltip = CreateEl("span", "tooltip_min");
	    }
	    s = CreateEl("span", "top");
	   $(s).html(t);
	    tooltip.appendChild(s);
	    b = CreateEl("b", "bottom");
	    tooltip.appendChild(b);
	    setOpacity(tooltip);
	    el.tooltip = tooltip;
		//$(el).bind("mouseover",function(e){showTooltip(e)});
		//$(el).bind("mouseout",function(e){hideTooltip()});

	    el.onmouseover = showTooltip;
	    el.onmouseout = hideTooltip;
	    el.onmousemove = Locate2;
	 }
}
function hideTip(e){
	var d = document.getElementById("btc");
    if (d.childNodes.length > 0) 
        d.removeChild(d.firstChild);
}
function showTooltip(e){
    document.getElementById("btc").appendChild(this.tooltip);
		
    Locate(e);
}
function hideTooltip(){
    var d = document.getElementById("btc");
    if (d.childNodes.length > 0) 
        d.removeChild(d.firstChild);
}
function setOpacity(el){
    el.style.filter = "alpha(opacity:95)";
    el.style.KHTMLOpacity = "0.95";
    el.style.MozOpacity = "0.95";
    el.style.opacity = "0.95";
}
function CreateEl(t, c){
    var x = document.createElement(t);
    x.className = c;
    x.style.display = "block";
    return (x);
}
function AddCss(){}
function Locate(e){
    var posx = 0, posy = 0;
    if (e == null) 
        e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else 
        if (e.clientX || e.clientY) {
            if (document.documentElement.scrollTop) {
                posx = e.clientX + document.documentElement.scrollLeft;
                posy = e.clientY + document.documentElement.scrollTop;
            }
            else {
                posx = e.clientX + document.body.scrollLeft;
                posy = e.clientY + document.body.scrollTop;
            }
        }
    
    var clientWidth=window.document.documentElement.clientWidth;
    var clientHeight=window.document.documentElement.clientHeight;
	var tipWidth=$("#btc").width();
	var tipHeight=$("#btc").height();
	var oldClass=$("#btc >span")[0].className;
	if(clientWidth-tipWidth<posx - 20){//向右撞墙
		document.getElementById("btc").style.left = (clientWidth-tipWidth) + "px";
		if(oldClass=="tooltip"){
			$("#btc >span")[0].className="tooltip_s";
		}
		else if(oldClass=="tooltip_min"){
			$("#btc >span")[0].className="tooltip_min_s";
		}
		else if(oldClass=="tooltip_mid"){
			$("#btc >span")[0].className="tooltip_mid_s";
		}
	}
	else{
		document.getElementById("btc").style.left = (posx - 20) + "px";
	}
	
	if($(window).scrollTop()+clientHeight-tipHeight<posy){//向右撞墙
		document.getElementById("btc").style.top = (posy-tipHeight-10) + "px";
		
		if(oldClass=="tooltip"){
			$("#btc >span")[0].className="tooltip_r";
		}
		else if(oldClass=="tooltip_min"){
			$("#btc >span")[0].className="tooltip_min_r";
		}
		else if(oldClass=="tooltip_mid"){
			$("#btc >span")[0].className="tooltip_mid_r";
		}
		tipDirection="up";
	}
	else{
		document.getElementById("btc").style.top = (posy + 10) + "px";
		if(oldClass=="tooltip_r"){
			$("#btc >span")[0].className="tooltip";
		}
		else if(oldClass=="tooltip_min_r"){
			$("#btc >span")[0].className="tooltip_min";
		}
		else if(oldClass=="tooltip_mid_r"){
			$("#btc >span")[0].className="tooltip_mid";
		}
		tipDirection="down";
	}
}
function Locate2(e){
    var posx = 0, posy = 0;
    if (e == null) 
        e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else 
        if (e.clientX || e.clientY) {
            if (document.documentElement.scrollTop) {
                posx = e.clientX + document.documentElement.scrollLeft;
                posy = e.clientY + document.documentElement.scrollTop;
            }
            else {
                posx = e.clientX + document.body.scrollLeft;
                posy = e.clientY + document.body.scrollTop;
            }
        }
    
    var clientWidth=window.document.documentElement.clientWidth;
    var clientHeight=window.document.documentElement.clientHeight;
	var tipWidth=$("#btc").width();
	var tipHeight=$("#btc").height();
	if(clientWidth-tipWidth<posx - 20){
		document.getElementById("btc").style.left = (clientWidth-tipWidth) + "px";
	}
	else{
		document.getElementById("btc").style.left = (posx - 20) + "px";
	}
	
	if(tipDirection=="up"){
		document.getElementById("btc").style.top = (posy-tipHeight-10) + "px";
		
	}
	else{
		document.getElementById("btc").style.top = (posy + 10) + "px";
	}
}
/*信息提示*/






/*文本域改变高度*/
(function($) {
	var textarea, staticOffset;  // added the var declaration for 'staticOffset' thanks to issue logged by dec.
	var iLastMousePos = 0;
	var iMin = 32;
	var grip;
	$.fn.TextAreaResizer = function() {
		return this.each(function() {
		    textarea = $(this).addClass('processed'), staticOffset = null;
		    $(this).wrap('<div class="resizable-textarea"><span></span></div>')
		      .parent().append($('<div class="grippie"></div>').bind("mousedown",{el: this} , startDrag)).wrap('<table cellspacing="0" cellpadding="0" style="border-style:none;"><tr><td class="ali01" style="border-style:none;padding:0;margin:0;"></td></tr></table>');
		    var grippie = $('div.grippie', $(this).parent());
		    //grippie.style.marginRight = (grippie.offsetWidth - $(this)[0].offsetWidth) +'px';
			//grippie.width($(this)[0].offsetWidth)
			//alert($(this).width())
		});
	};
	function startDrag(e) {
		textarea = $(e.data.el);
		textarea.blur();
		iLastMousePos = mousePosition(e).y;
		staticOffset = textarea.height() - iLastMousePos;
		textarea.css('opacity', 0.25);
		$(document).mousemove(performDrag).mouseup(endDrag);
		return false;
	}
	function performDrag(e) {
		var iThisMousePos = mousePosition(e).y;
		var iMousePos = staticOffset + iThisMousePos;
		if (iLastMousePos >= (iThisMousePos)) {
			iMousePos -= 5;
		}
		iLastMousePos = iThisMousePos;
		iMousePos = Math.max(iMin, iMousePos);
		textarea.height(iMousePos + 'px');
		if (iMousePos < iMin) {
			endDrag(e);
		}
		return false;
	}
	function endDrag(e) {
		$(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
		textarea.css('opacity', 1);
		textarea.focus();
		textarea = null;
		staticOffset = null;
		iLastMousePos = 0;
	}

	function mousePosition(e) {
		return { x: e.clientX + document.documentElement.scrollLeft, y: e.clientY + document.documentElement.scrollTop };
	};
})(jQuery);
/*文本域改变高度*/

/*水印*/
(function($) {
	$.fn.watermark = function(css, text) {
		return this.each(function() {
			var i = $(this), w;
			i.focus(function() {
				w && !(w=0) && i.removeClass(css).data('w',0).val('');
			})
			.blur(function() {
				!i.val() && (w=1) && i.addClass(css).data('w',1).val(text);
			})
			.closest('form').submit(function() {
				w && i.val('');
			});
			i.blur();
		});
	};
	$.fn.removeWatermark = function() {
		return this.each(function() {
			$(this).data('w') && $(this).val('');
		});
	};
})(jQuery);
/*水印*/

/*可调用的提示*/
if(jQuery) {
	( function($) {
	$.cursorMessageData = {}; // needed for e.g. timeoutId

	$(window).ready(function(e) {
		if ($('#cursorMessageDiv').length==0) {
			
			   $('body').append('<div id="cursorMessageDiv">&nbsp;</div>');
			  $('#cursorMessageDiv').hide();
		}

		$('body').mousemove(function(e) {
			$.cursorMessageData.mouseX = e.pageX;
			$.cursorMessageData.mouseY = e.pageY;
			currentMouseX = e.pageX;
			currentMouseY = e.pageY;
			if ($.cursorMessageData.options != undefined) $._showCursorMessage();
		});
	});
	$.extend({
		cursorMessage: function(message, options) {
			if( options == undefined ) options = {};
			if( options.offsetX == undefined ) options.offsetX = 5;
			if( options.offsetY == undefined ) options.offsetY = 5;
			if( options.hideTimeout == undefined ) options.hideTimeout = 3000;

			$('#cursorMessageDiv').html(message).show();
			if (jQuery.cursorMessageData.hideTimeoutId != undefined)  clearTimeout(jQuery.cursorMessageData.hideTimeoutId);
			if (options.hideTimeout>0) jQuery.cursorMessageData.hideTimeoutId = setTimeout($.hideCursorMessage, options.hideTimeout);
			jQuery.cursorMessageData.options = options;
			$._showCursorMessage();
		},
		hideCursorMessage: function() {
			$('#cursorMessageDiv').hide();
		},
		_showCursorMessage: function() {
			$('#cursorMessageDiv').css({ top: ($.cursorMessageData.mouseY + $.cursorMessageData.options.offsetY)+'px', left: ($.cursorMessageData.mouseX + $.cursorMessageData.options.offsetX) });
		}
	});
})(jQuery);
}
/*可调用的提示*/

/*监测Caps键*/
jQuery.fn.caps = function(cb){
    return this.keypress(function(e){
        var w = e.which ? e.which : (e.keyCode ? e.keyCode : -1);
        var s = e.shiftKey ? e.shiftKey : (e.modifiers ? !!(e.modifiers & 4) : false);
        var c = ((w >= 65 && w <= 90) && !s) || ((w >= 97 && w <= 122) && s);
        cb.call(this, c);
    });
};
/*监测Caps键*/

/*iframe自适应高度*/
function iframeHeight(iframeId){
	var frm=document.getElementById(iframeId);
	frm.style.height =frm.contentWindow.document.body.scrollHeight+"px";
}
/*iframe自适应高度*/



/*文本框文字清除功能*/
(function($) {
  $.fn.clearableTextField = function() {
    if ($(this).length>0) {
      $(this).bind('keyup change paste cut', onSomethingChanged);
    
      for (var i=0; i<$(this).length; i++) {
        trigger($($(this)[i]));
      }
    }
  }
  
  function onSomethingChanged() {
    trigger($(this));
  }
  
  function trigger(input) {
    if(input.val().length>0){
      add_clear_button(input);
    } else {
      remove_clear_button(input);
    }    
  }
  
  function add_clear_button(input) {
    if (!input.next().hasClass('text_clear_button')) {
      // appends div
      input.after("<div class='text_clear_button'></div>");
    
      var clear_button = input.next();
      var w = clear_button.outerHeight(), h = clear_button.outerHeight();
      
      input.css('padding-right', parseInt(input.css('padding-right')) + w + 1);
      input.width(input.width() - w - 1);
          
      var pos = input.position();
      var style = {};  
      style['left'] = pos.left + input.outerWidth(false) - (w+2);
      var offset = Math.round((input.outerHeight(true) - h)/2.0);
     // style['top'] = pos.top + offset;
      style['top'] = pos.top +$("#scrollContent").scrollTop() + offset;
      clear_button.css(style);
          
      clear_button.click(function(){
        input.val('');
        trigger(input);
      });
    }
  }
  
  function remove_clear_button(input) {
    var clear_button = input.next();
    
    if (clear_button.hasClass('text_clear_button')) {
      clear_button.remove();
      var w = clear_button.width();

      input.css('padding-right', parseInt(input.css('padding-right')) - w -1);
      input.width(input.width() + w + 1);
    }
  }
})(jQuery);
/*文本框文字清除功能*/

/*剩余字数功能*/
(function($) 
{
	$.fn.maxlength = function(options)
	{
		var settings = jQuery.extend(
		{
			events:				      [], 
			maxCharacters:		  10, 
			status:				      true, 
			statusClass:		    "maxNum", 
			statusText:			    uncompile(quiLanguage.maxlength.statusText),
			notificationClass:	"notification",	
			showAlert: 			    false,
			alertText:			   uncompile(quiLanguage.maxlength.alertText), 
			slider:				      true
		}, options );
		$.merge(settings.events, ['keyup']);
		return this.each(function() 
		{
			var item = $(this);
			var charactersLength = $(this).val().length;
			function updateStatus()
			{
				var charactersLeft = settings.maxCharacters - charactersLength;
				
				if(charactersLeft < 0) 
				{
					charactersLeft = 0;
				}
				item.next("div").html(settings.statusText+ " :"+ charactersLeft  );
			}
			function checkChars() 
			{
				var valid = true;
				if(charactersLength >= settings.maxCharacters) 
				{
					valid = false;
					item.addClass(settings.notificationClass);
					item.val(item.val().substr(0,settings.maxCharacters));
					showAlert();
				} 
				else 
				{
					if(item.hasClass(settings.notificationClass)) 
					{
						item.removeClass(settings.notificationClass);
					}
				}

				if(settings.status)
				{
					updateStatus();
				}
			}
			function showAlert() 
			{
				if(settings.showAlert)
				{
					alert(settings.alertText);
				}
			}
			function validateElement() 
			{
				var ret = false;
				
				if(item.is('textarea')) {
					ret = true;
				} else if(item.filter("input[type=text]")) {
					ret = true;
				} else if(item.filter("input[type=password]")) {
					ret = true;
				}

				return ret;
			}
			if(!validateElement()) 
			{
				return false;
			}
			$.each(settings.events, function (i, n) {
				item.bind(n, function(e) {
					charactersLength = item.val().length;
					checkChars();
				});
			});
			if(settings.status) 
			{
				item.after($("<div/>").addClass(settings.statusClass).html('-'));
				updateStatus();
			}
			if(!settings.status) 
			{
				var removeThisDiv = item.next("div."+settings.statusClass);
				
				if(removeThisDiv) {
					removeThisDiv.remove();
				}
			}
			if(settings.slider) {
				item.next().hide();
				
				item.focus(function(){
					item.next().slideDown('fast');
				});
				item.blur(function(){
					item.next().slideUp('fast');
				}); 
			}
		});
	};
})(jQuery);
/*剩余字数功能*/

/*文本域自适应高度*/
var colsDefault = 0;
var rowsDefault = 5;
function setDefaultValues(txtArea)
{
	colsDefault = txtArea.cols;
	rowsDefault = $(txtArea).attr("rows");
}
function bindEvents(txtArea)
{
	txtArea.onkeyup = function() {
		grow(txtArea);
	}
}
function grow(txtArea)
{
    var linesCount = 0;
    var lines = txtArea.value.split('\n');

    for (var i=lines.length-1; i>=0; --i)
    {
        linesCount += Math.floor((lines[i].length / colsDefault) + 1);
    }

    if (linesCount >= rowsDefault)
        txtArea.rows = linesCount + 1;
	else
        txtArea.rows = rowsDefault;
}
jQuery.fn.autoGrow = function(){
	return this.each(function(){
		setDefaultValues(this);
		bindEvents(this);
	});
};
/*文本域自适应高度*/

/*密码强度*/
(function($){
var passwordStrength = new function()
{
	this.countRegexp = function(val, rex)
	{
		var match = val.match(rex);
		return match ? match.length : 0;
	};
	
	this.getStrength = function(val, minLength)
	{	
		var len = val.length;
		
		// too short =(
		if (len < minLength)
		{
			return 0;
		}
		
		var nums = this.countRegexp(val, /\d/g),
			lowers = this.countRegexp(val, /[a-z]/g),
			uppers = this.countRegexp(val, /[A-Z]/g),
			specials = len - nums - lowers - uppers;
		
		// just one type of characters =(
		if (nums == len || lowers == len || uppers == len || specials == len)
		{
			return 1;
		}
		
		var strength = 0;
		if (nums)	{ strength+= 2; }
		if (lowers)	{ strength+= uppers? 4 : 3; }
		if (uppers)	{ strength+= lowers? 4 : 3; }
		if (specials) { strength+= 5; }
		if (len > 10) { strength+= 1; }
		
		return strength;
	};
	
	this.getStrengthLevel = function(val, minLength)
	{
		var strength = this.getStrength(val, minLength);
		switch (true)
		{
			case (strength <= 0):
				return 1;
				break;
			case (strength > 0 && strength <= 4):
				return 2;
				break;
			case (strength > 4 && strength <= 8):
				return 3;
				break;
			case (strength > 8 && strength <= 12):
				return 4;
				break;
			case (strength > 12):
				return 5;
				break;
		}
		
		return 1;
	};
};

$.fn.password_strength = function(options)
{
	var settings = $.extend({
		'container' : null,
		'minLength' : 6,
		'texts' : {
			1 : uncompile(quiLanguage.passStrength.text1),
			2 : uncompile(quiLanguage.passStrength.text2),
			3 : uncompile(quiLanguage.passStrength.text3),
			4 : uncompile(quiLanguage.passStrength.text4),
			5 : uncompile(quiLanguage.passStrength.text5)
		}
	}, options);
	
	return this.each(function()
	{
		if (settings.container)
		{
			var container = $(settings.container);
		}
		else
		{
			var container = $('<span/>').attr('class', 'password_strength');
			$(this).after(container);
		}
		
		$(this).keyup(function()
		{
			var val = $(this).val();
			if (val.length > 0)
			{
				var level = passwordStrength.getStrengthLevel(val, settings.minLength);
				var _class = 'password_strength_' + level;
				
				if (!container.hasClass(_class) && level in settings.texts)
				{
					container.text(settings.texts[level]).attr('class', 'password_strength ' + _class);
				}
			}
			else
			{
				container.text('').attr('class', 'password_strength');
			}
		});
	});
};

$.fn.password_strength2 = function(val)
{
	var level = passwordStrength.getStrengthLevel(val, 6);
	return level;
};

})(jQuery);


/*密码强度*/

/*Cookie*/
jQuery.jCookie = function(sCookieName_, oValue_, oExpires_, oOptions_) {
	if (!navigator.cookieEnabled) { return false; }
	
	var oOptions_ = oOptions_ || {};
	if (typeof(arguments[0]) !== 'string' && arguments.length === 1) {
		oOptions_ = arguments[0];
		sCookieName_ = oOptions_.name;
		oValue_ = oOptions_.value;
		oExpires_ = oOptions_.expires;
	}
	
	sCookieName_ = encodeURI(sCookieName_);
	
	if (oValue_ && (typeof(oValue_) !== 'number' && typeof(oValue_) !== 'string' && oValue_ !== null)) { return false; }
	
	var _sPath = oOptions_.path ? "; path=" + oOptions_.path : "";
	var _sDomain = oOptions_.domain ? "; domain=" + oOptions_.domain : "";
	var _sSecure = oOptions_.secure ? "; secure" : "";
	var sExpires_ = "";
	
	if (oValue_ || (oValue_ === null && arguments.length == 2)) {
	
		oExpires_ = (oExpires_ === null || (oValue_ === null && arguments.length == 2)) ? -1 : oExpires_;
		
		if (typeof(oExpires_) === 'number' && oExpires_ != 'session' && oExpires_ !== undefined) {
			var _date = new Date();
			_date.setTime(_date.getTime() + (oExpires_ * 24 * 60 * 60 * 1000));
			sExpires_ = ["; expires=", _date.toGMTString()].join("");
		}
		document.cookie = [sCookieName_, "=", encodeURI(oValue_), sExpires_, _sDomain, _sPath, _sSecure].join("");
		
		return true;
	}
	
	if (!oValue_ && typeof(arguments[0]) === 'string' && arguments.length == 1 && document.cookie && document.cookie.length) {
		var _aCookies = document.cookie.split(';');
		var _iLenght = _aCookies.length;
		while (_iLenght--) {
			var _aCurrrent = _aCookies[_iLenght].split("=");
			if (jQuery.trim(_aCurrrent[0]) === sCookieName_) { return decodeURI(_aCurrrent[1]); }
		}
	}
	
	return false;
};
/*Cookie*/

function showProgressBar(str,type){
	var titleStr=uncompile(quiLanguage.progressBar.title);
	if(str){
		titleStr=str;
	}
	var progressType="simple";
	if(type){
		if(type=="normal"){
			progressType=type;
		}
	}
	if(progressType=="simple"){
		top.progressFlag=2;
		top.showSimpleProgress(titleStr,0,true,"#ffffff");
	}
	else{
		top.progressFlag=1;
		var diag = new top.Dialog();
		diag.Width = 360;
		diag.Height = 70;
		diag.Title = titleStr;
		diag.InvokeElementId="progress"
		diag.show();
	}
}
function closeProgress(){
	try {
		if(top.progressFlag==1){
			top.Dialog.close();
			top.progressFlag=0;
		}
		else if(top.progressFlag==2){
			top.hideSimpleProgress();
			top.progressFlag=0;
		}
	}
	catch(e){}
}
function _initComplete(){
	try {
		initComplete();
	}
	catch(e){}
}
String.prototype.trim = function()
{
    // 用正则表达式将前后空格，用空字符串替代。
    return this.replace(/(^\s*)|(\s*$)/g, "");
} 



//遮罩
;(function($){
	$.fn.mask = function(label, delay, loading, bgcolor){
		$(this).each(function() {
			if(loading==null){
				loading=true;
			}
			var bgcolorValue="#cccccc";
			if(bgcolor){
				bgcolorValue=bgcolor;
			}
			if(delay !== undefined && delay > 0 && delay !=null) {
		        var element = $(this);
		        element.data("_mask_timeout", setTimeout(function() { $.maskElement(element, label ,loading, bgcolorValue)}, delay));
			} else {
				$.maskElement($(this), label, loading, bgcolorValue);
			}
		});
	};
	
	$.fn.unmask = function(){
		$(this).each(function() {
			$.unmaskElement($(this));
		});
	};
	
	$.fn.isMasked = function(){
		return this.hasClass("masked");
	};

	$.maskElement = function(element, label,loading ,bgcolor){
	
		if (element.data("_mask_timeout") !== undefined) {
			clearTimeout(element.data("_mask_timeout"));
			element.removeData("_mask_timeout");
		}

		if(element.isMasked()) {
			$.unmaskElement(element);
		}
		
		if(element.css("position") == "static") {
			element.addClass("masked-relative");
		}
		
		element.addClass("masked");
		
		var maskDiv = $('<div class="loadmask"></div>');
		
		
		maskDiv.css({
			"backgroundColor":bgcolor
		})
		
		if(navigator.userAgent.toLowerCase().indexOf("msie") > -1){
			maskDiv.height(element.height() + parseInt(element.css("padding-top")) + parseInt(element.css("padding-bottom")));
			maskDiv.width(element.width() + parseInt(element.css("padding-left")) + parseInt(element.css("padding-right")));
		}
		
		if(navigator.userAgent.toLowerCase().indexOf("msie 6") > -1){
			element.find("select").addClass("masked-hidden");
		}
		
		element.append(maskDiv);
		maskDiv.show();
		if(label !== undefined&&label!=null) {
			var maskMsgDiv = $('<div class="loadmask-msg" style="display:none;"></div>');
			if(loading){
				maskMsgDiv.append('<div class="mask_lading">' + label + '</div>');
			}
			else{
				maskMsgDiv.append('<div  class="normal">' + label + '</div>');
			}
			element.append(maskMsgDiv);
			
			maskMsgDiv.css("top", Math.round(element.height() / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2)+"px");
			maskMsgDiv.css("left", Math.round(element.width() / 2 - (maskMsgDiv.width() - parseInt(maskMsgDiv.css("padding-left")) - parseInt(maskMsgDiv.css("padding-right"))) / 2)+"px");
			
			maskMsgDiv.show();
		}
		
	};
	
	$.unmaskElement = function(element){
		if (element.data("_mask_timeout") !== undefined) {
			clearTimeout(element.data("_mask_timeout"));
			element.removeData("_mask_timeout");
		}
		
		element.find(".loadmask-msg,.loadmask").remove();
		element.removeClass("masked");
		element.removeClass("masked-relative");
		element.find("select").removeClass("masked-hidden");
	};
 
})(jQuery);


//JSON处理,用法：JSON.parse();JSON.stringify()
var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {


        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }


        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

            return String(value);

        case 'object':

            if (!value) {
                return 'null';
            }

            gap += indent;
            partial = [];

            if (Object.prototype.toString.apply(value) === '[object Array]') {

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

            var i;
            gap = '';
            indent = '';

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

            } else if (typeof space === 'string') {
                indent = space;
            }

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            return str('', {'': value});
        };
    }

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

            function walk(holder, key) {
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
}());

//限制输入类型的公共方法
function validateInput(value,reg){
		var re = new RegExp(reg);
		return re.test(value);
	}

//动态创建所在位置
function createPosition(str,type){
		var $position;
		if(type=="normal"){
			$position=$('<div class="position">'+
				'<div class="center">'+
				'<div class="left">'+
				'<div class="right">'+
					'<span></span>'+
				'</div>'+
				'</div>'+	
				'</div>'+
			'</div>');
		}
		else if(type=="simple"){
			$position=$('<div class="positionSimple">'+
					'<span></span>'+
			'</div>');
		}
		$position.find("span").append(str);
		$("body").prepend($position);
}
$.fn.createBoxItem = function(data,frmid) {
	var $instance=$(this);
	var $boxinstance=$instance.parents(".box4");
	$instance.empty();
	var firstSrc;
	var boxType="double";
	if(data["type"]){
		if(data["type"]=="single"){
			boxType="single";
		}
	}
	if(boxType=="single"){
		$boxinstance.attr("noTitle","false");
		$boxinstance.attr("panelTitle",data["title"]);
		$boxinstance.box4Build();
		var $ulStr=$("<ul></ul>");
		$instance.append($ulStr);
		$.each(data["list"],function(idx,item){
			var $childdom2=$('<li><a><span class="text_slice"></span></a></li>');
			if(item.link!=""){
				var $itemA2=$childdom2.find("a");
				$itemA2.attr("href",item.link);
				$itemA2.attr("target",frmid);
			}
			$childdom2.find(".text_slice").text(item.name);
			$ulStr.append($childdom2);
		})
	}
	else{
		$boxinstance.attr("noTitle","true");
		$boxinstance.box4Build();
		$.each(data["list"],function(idx,item){
			if(idx==0){
				firstSrc=item.link;
			}
			if(item.type=="parent"){
				var $parentdom=$('<div class="subtitle"></div>');
				var $parentCon;
				if(item.link!=""){
					$parentCon=$('<a><div class="subtitle_con"></div></a>');
					$parentCon.attr("href",item.link);
					$parentCon.attr("target",frmid);
				}
				else{
					$parentCon=$('<div class="subtitle_con"></div>');
				}
				$parentdom.append($parentCon);
				$parentdom.find(".subtitle_con").text(item.name);
				$parentdom.attr("id","boxitem_"+item.id);
				$instance.append($parentdom);
				$instance.append("<ul></ul>");
			}
		})
		$.each(data["list"],function(idx,item){
			if(item.type=="child"){
				var $childdom=$('<li><a><span class="text_slice"></span></a></li>');
				if(item.link!=""){
					var $itemA=$childdom.find("a");
					$itemA.attr("href",item.link);
					$itemA.attr("target",frmid);
				}
				
				$childdom.find(".text_slice").text(item.name);
				var pid=item.pid;
				$("#boxitem_"+pid).next("ul").append($childdom);
			}
		})
		$instance.find(".subtitle a").each(function(){
			$(this).unbind("click");
			$(this).click(function(){
				$instance.find("li a").removeClass("current");
			})
		})
	}
	
	
	$instance.find("li a").each(function(i){
		$(this).unbind("click");
		$(this).click(function(){
			$instance.find("li a").removeClass("current");
			$(this).addClass("current");
			if($(this).attr("href")!=null){
				showProgressBar();
				if(boxType=="single"){
					if(data["title"]){
						top.positionContent="【"+uncompile(quiLanguage.position.title)+data["title"]+">>"+$(this).text()+"】";
					}
					else{
						top.positionContent="【"+uncompile(quiLanguage.position.title)+$(this).text()+"】";
					}
				}
				else{
					if(data["title"]){
						top.positionContent="【"+uncompile(quiLanguage.position.title)+data["title"]+">>"+$(this).parents("ul").prev(".subtitle").eq(0).text()+">>"+$(this).text()+"】";
					}
					else{
						top.positionContent="【"+uncompile(quiLanguage.position.title)+$(this).parents("ul").prev(".subtitle").eq(0).text()+">>"+$(this).text()+"】";
					}
				}
				top.positionType="simple";
			}
		})
	})
	$("#"+frmid).attr("src",firstSrc);
	
}
function showCodePage(src,tile){
	var diag = new top.Dialog();
	diag.Title = tile;
	diag.Modal=false;
	diag.ID="code1";
	diag.URL = src;
	diag.ShowMaxButton=true;
	diag.ShowMinButton=true;
	diag.Width=900;
	diag.Height=540;
	diag.MaxEvent = function(){
			diag.innerFrame.contentWindow.changeCodeHeight($(top.document.getElementById("_DialogBGDiv")).height()-55);
	};	
	diag.DecreaseEvent = function(){
			diag.innerFrame.contentWindow.changeCodeHeight(530);
	};
	diag.show();
}

(function ($)
{
    //quiui 继承方法
    Function.prototype.quiExtend = function (parent, overrides)
    {
        if (typeof parent != 'function') return this;
        //保存对父类的引用
        this.base = parent.prototype;
        this.base.constructor = parent;
        //继承
        var f = function () { };
        f.prototype = parent.prototype;
        this.prototype = new f();
        this.prototype.constructor = this;
        //附加属性方法
        if (overrides) $.extend(this.prototype, overrides);
    };
    //延时加载
    Function.prototype.quiDefer = function (o, defer, args)
    {
        var fn = this;
        return setTimeout(function () { fn.apply(o, args || []); }, defer);
    };

    // 核心对象
    window.qui = $.quiui = {
        version: 'QUI3.1',
        managerCount: 0,
        //组件管理器池
        managers: {},
        managerIdPrev: 'quiui',
		
		
        //错误提示
        error: {
            managerIsExist: uncompile(quiLanguage.jsError.idInfo)
        },
        getId: function (prev)
        {
            prev = prev || this.managerIdPrev;
            var id = prev + (1000 + this.managerCount);
            this.managerCount++;
            return id;
        },
        add: function (manager)
        {
            if (arguments.length == 2)
            {
                var m = arguments[1];
                m.id = m.id || m.options.id || arguments[0].id;
                this.addManager(m);
                return;
            }
            if (!manager.id) manager.id = this.getId(manager.__idPrev());
            if (this.managers[manager.id])
                throw new Error(this.error.managerIsExist);
            this.managers[manager.id] = manager;
        },
        remove: function (arg)
        {
            if (typeof arg == "string" || typeof arg == "number")
            {
                delete $.quiui.managers[arg];
            }
            else if (typeof arg == "object" && arg instanceof $.quiui.core.Component)
            {
                delete $.quiui.managers[arg.id];
            }
        },
        //获取quiui对象
        //1,传入quiui ID
        //2,传入Dom Object Array(jQuery)
        get: function (arg, idAttrName)
        {
            idAttrName = idAttrName || "quiuiid";
            if (typeof arg == "string" || typeof arg == "number")
            {
                return $.quiui.managers[arg];
            }
            else if (typeof arg == "object" && arg.length)
            {
                if (!arg[0][idAttrName] && !$(arg[0]).attr(idAttrName)) return null;
                return $.quiui.managers[arg[0][idAttrName] || $(arg[0]).attr(idAttrName)];
            }
            return null;
        },
        //根据类型查找某一个对象
        find: function (type)
        {
            var arr = [];
            for (var id in this.managers)
            {
                var manager = this.managers[id];
                if (type instanceof Function)
                {
                    if (manager instanceof type)
                    {
                        arr.push(manager);
                    }
                }
                else if (type instanceof Array)
                {
                    if ($.inArray(manager.__getType(), type) != -1)
                    {
                        arr.push(manager);
                    }
                }
                else
                {
                    if (manager.__getType() == type)
                    {
                        arr.push(manager);
                    }
                }
            }
            return arr;
        },
        //$.fn.qui{Plugin} 和 $.fn.quiGet{Plugin}Manager
        //会调用这个方法,并传入作用域(this)
        //@parm [plugin]  插件名
        //@parm [args] 参数(数组)
        //@parm [ext] 扩展参数,定义命名空间或者id属性名
        run: function (plugin, args, ext)
        {
            if (!plugin) return;
            ext = $.extend({
                defaultsNamespace: 'quiDefaults',
                methodsNamespace: 'quiMethods',
                controlNamespace: 'controls',
                idAttrName: 'quiuiid',
                isStatic: false,
                hasElement: true,           //是否拥有element主体(比如drag、resizable等辅助性插件就不拥有)
                propertyToElemnt: null      //链接到element的属性名
            }, ext || {});
            plugin = plugin.replace(/^quiGet/, '');
            plugin = plugin.replace(/^qui/, '');
            if (this == null || this == window || ext.isStatic)
            {
                if (!$.quiui.plugins[plugin])
                {
                    $.quiui.plugins[plugin] = {
                        fn: $['qui' + plugin],
                        isStatic: true
                    };
                }
                return new $.quiui[ext.controlNamespace][plugin]($.extend({}, $[ext.defaultsNamespace][plugin] || {}, $[ext.defaultsNamespace][plugin + 'String'] || {}, args.length > 0 ? args[0] : {}));
            }
            if (!$.quiui.plugins[plugin])
            {
                $.quiui.plugins[plugin] = {
                    fn: $.fn['qui' + plugin],
                    isStatic: false
                };
            }
            if (/Manager$/.test(plugin)) return $.quiui.get(this, ext.idAttrName);
            this.each(function ()
            {
                if (this[ext.idAttrName] || $(this).attr(ext.idAttrName))
                {
                    var manager = $.quiui.get(this[ext.idAttrName] || $(this).attr(ext.idAttrName));
                    if (manager && args.length > 0) manager.set(args[0]);
                    //已经执行过 
                    return;
                }
                if (args.length >= 1 && typeof args[0] == 'string') return;
                //只要第一个参数不是string类型,都执行组件的实例化工作
                var options = args.length > 0 ? args[0] : null;
                var p = $.extend({}, $[ext.defaultsNamespace][plugin] || {}
                , $[ext.defaultsNamespace][plugin + 'String'] || {}, options || {});
                if (ext.propertyToElemnt) p[ext.propertyToElemnt] = this;
                if (ext.hasElement)
                {
                    new $.quiui[ext.controlNamespace][plugin](this, p);
                }
                else
                {
                    new $.quiui[ext.controlNamespace][plugin](p);
                }
            });
            if (this.length == 0) return null;
            if (args.length == 0) return $.quiui.get(this, ext.idAttrName);
            if (typeof args[0] == 'object') return $.quiui.get(this, ext.idAttrName);
            if (typeof args[0] == 'string')
            {
                var manager = $.quiui.get(this, ext.idAttrName);
                if (manager == null) return;
                if (args[0] == "option")
                {
                    if (args.length == 2)
                        return manager.get(args[1]);  //manager get
                    else if (args.length >= 3)
                        return manager.set(args[1], args[2]);  //manager set
                }
                else
                {
                    var method = args[0];
                    if (!manager[method]) return; //不存在这个方法
                    var params = Array.apply(null, args);
                    params.shift();
                    return manager[method].apply(manager, params);  //manager method
                }
            }
            return null;
        },

        //扩展
        //1,默认参数     
        //2,本地化扩展 
        defaults: {},
        //3,方法接口扩展
        methods: {},
        //命名空间
        //核心控件,封装了一些常用方法
        core: {},
        //命名空间
        //组件的集合
        controls: {},
        //plugin 插件的集合
        plugins: {}
    };


    //扩展对象
    $.quiDefaults = {};

    //扩展对象
    $.quiMethos = {};

    //关联起来
    $.quiui.defaults = $.quiDefaults;
    $.quiui.methods = $.quiMethos;

    //获取quiui对象
    //@parm [plugin]  插件名,可为空
    $.fn.qui = function (plugin)
    {
        if (plugin)
        {
            return $.quiui.run.call(this, plugin, arguments);
        }
        else
        {
            return $.quiui.get(this);
        }
    };


    //组件基类
    //1,完成定义参数处理方法和参数属性初始化的工作
    //2,完成定义事件处理方法和事件属性初始化的工作
    $.quiui.core.Component = function (options)
    {
        //事件容器
        this.events = this.events || {};
        //配置参数
        this.options = options || {};
        //子组件集合索引
        this.children = {};
    };
    $.extend($.quiui.core.Component.prototype, {
        __getType: function ()
        {
            return '$.quiui.core.Component';
        },
        __idPrev: function ()
        {
            return 'quiui';
        },

        //设置属性
        // arg 属性名    value 属性值 
        // arg 属性/值   value 是否只设置事件
        set: function (arg, value)
        {
            if (!arg) return;
            if (typeof arg == 'object')
            {
                var tmp;
                if (this.options != arg)
                {
                    $.extend(this.options, arg);
                    tmp = arg;
                }
                else
                {
                    tmp = $.extend({}, arg);
                }
                if (value == undefined || value == true)
                {
                    for (var p in tmp)
                    {
                        if (p.indexOf('on') == 0)
                            this.set(p, tmp[p]);
                    }
                }
                if (value == undefined || value == false)
                {
                    for (var p in tmp)
                    {
                        if (p.indexOf('on') != 0)
                            this.set(p, tmp[p]);
                    }
                }
                return;
            }
            var name = arg;
            //事件参数
            if (name.indexOf('on') == 0)
            {
                if (typeof value == 'function')
                    this.bind(name.substr(2), value);
                return;
            }
            this.trigger('propertychange', arg, value);
            if (!this.options) this.options = {};
            this.options[name] = value;
            var pn = '_set' + name.substr(0, 1).toUpperCase() + name.substr(1);
            if (this[pn])
            {
                this[pn].call(this, value);
            }
            this.trigger('propertychanged', arg, value);
        },

        //获取属性
        get: function (name)
        {
            var pn = '_get' + name.substr(0, 1).toUpperCase() + name.substr(1);
            if (this[pn])
            {
                return this[pn].call(this, name);
            }
            return this.options[name];
        },

        hasBind: function (arg)
        {
            var name = arg.toLowerCase();
            var event = this.events[name];
            if (event && event.length) return true;
            return false;
        },

        //触发事件
        //data (可选) Array(可选)传递给事件处理函数的附加参数
        trigger: function (arg, data)
        {
            var name = arg.toLowerCase();
            var event = this.events[name];
            if (!event) return;
            data = data || [];
            if ((data instanceof Array) == false)
            {
                data = [data];
            }
            for (var i = 0; i < event.length; i++)
            {
                var ev = event[i];
                if (ev.handler.apply(ev.context, data) == false)
                    return false;
            }
        },

        //绑定事件
        bind: function (arg, handler, context)
        {
            if (typeof arg == 'object')
            {
                for (var p in arg)
                {
                    this.bind(p, arg[p]);
                }
                return;
            }
            if (typeof handler != 'function') return false;
            var name = arg.toLowerCase();
            var event = this.events[name] || [];
            context = context || this;
            event.push({ handler: handler, context: context });
            this.events[name] = event;
        },

        //取消绑定
        unbind: function (arg, handler)
        {
            if (!arg)
            {
                this.events = {};
                return;
            }
            var name = arg.toLowerCase();
            var event = this.events[name];
            if (!event || !event.length) return;
            if (!handler)
            {
                delete this.events[name];
            }
            else
            {
                for (var i = 0, l = event.length; i < l; i++)
                {
                    if (event[i].handler == handler)
                    {
                        event.splice(i, 1);
                        break;
                    }
                }
            }
        },
        destroy: function ()
        {
            $.quiui.remove(this);
        }
    });


    //界面组件基类, 
    //1,完成界面初始化:设置组件id并存入组件管理器池,初始化参数
    //2,渲染的工作,细节交给子类实现
    //@parm [element] 组件对应的dom element对象
    //@parm [options] 组件的参数
    $.quiui.core.UIComponent = function (element, options)
    {
        $.quiui.core.UIComponent.base.constructor.call(this, options);
        var extendMethods = this._extendMethods();
        if (extendMethods) $.extend(this, extendMethods);
        this.element = element;
        this._init();
        this._preRender();
        this.trigger('render');
        this._render();
        this.trigger('rendered');
        this._rendered();
    };
    $.quiui.core.UIComponent.quiExtend($.quiui.core.Component, {
        __getType: function ()
        {
            return '$.quiui.core.UIComponent';
        },
        //扩展方法
        _extendMethods: function ()
        {

        },
        _init: function ()
        {
            this.type = this.__getType();
            if (!this.element)
            {
                this.id = this.options.id || $.quiui.getId(this.__idPrev());
            }
            else
            {
                this.id = this.options.id || this.element.id || $.quiui.getId(this.__idPrev());
            }
            //存入管理器池
            $.quiui.add(this);

            if (!this.element) return;

            //读取attr方法,并加载到参数,比如['url']
            var attributes = this.attr();
            if (attributes && attributes instanceof Array)
            {
                for (var i = 0; i < attributes.length; i++)
                {
                    var name = attributes[i];
                    this.options[name] = $(this.element).attr(name);
                }
            }
            //读取quiui这个属性，并加载到参数，比如 quiui = "width:120,heigth:100"
            var p = this.options;
            if ($(this.element).attr("quiui"))
            {
                try
                {
                    var attroptions = $(this.element).attr("quiui");
                    if (attroptions.indexOf('{') != 0) attroptions = "{" + attroptions + "}";
                    eval("attroptions = " + attroptions + ";");
                    if (attroptions) $.extend(p, attroptions);
                }
                catch (e) { }
            }
        },
        //预渲染,可以用于继承扩展
        _preRender: function ()
        {

        },
        _render: function ()
        {

        },
        _rendered: function ()
        {
            if (this.element)
            {
                $(this.element).attr("quiuiid", this.id);
            }
        },
        //返回要转换成quiui参数的属性,比如['url']
        attr: function ()
        {
            return [];
        },
        destroy: function ()
        {
            if (this.element) $(this.element).remove();
            this.options = null;
            $.quiui.remove(this);
        }
    });


    //表单控件基类
    $.quiui.controls.Input = function (element, options)
    {
        $.quiui.controls.Input.base.constructor.call(this, element, options);
    };

    $.quiui.controls.Input.quiExtend($.quiui.core.UIComponent, {
        __getType: function ()
        {
            return '$.quiui.controls.Input';
        },
        attr: function ()
        {
            return ['nullText'];
        },
        setValue: function (value)
        {
            return this.set('value', value);
        },
        getValue: function ()
        {
            return this.get('value');
        },
        setEnabled: function ()
        {
            return this.set('disabled', false);
        },
        setDisabled: function ()
        {
            return this.set('disabled', true);
        },
        updateStyle: function ()
        {

        }
    });

    //全局窗口对象
    $.quiui.win = {
        //顶端显示
        top: false,

        //遮罩
        mask: function (win)
        {
            function setHeight()
            {
                if (!$.quiui.win.windowMask) return;
                var h = $(window).height() + $(window).scrollTop();
                $.quiui.win.windowMask.height(h);
            }
            if (!this.windowMask)
            {
                this.windowMask = $("<div class='l-window-mask' style='display: block;'></div>").appendTo('body');
                $(window).bind('resize.quiuiwin', setHeight);
                $(window).bind('scroll', setHeight);
            }
            this.windowMask.show();
            setHeight();
            this.masking = true;
        },

        //取消遮罩
        unmask: function (win)
        {
            var jwins = $("body > .l-dialog:visible,body > .l-window:visible");
            for (var i = 0, l = jwins.length; i < l; i++)
            {
                var winid = jwins.eq(i).attr("quiuiid");
                if (win && win.id == winid) continue;
                //获取quiui对象
                var winmanager = $.quiui.get(winid);
                if (!winmanager) continue;
                //是否模态窗口
                var modal = winmanager.get('modal');
                //如果存在其他模态窗口，那么不会取消遮罩
                if (modal) return;
            }
            if (this.windowMask)
                this.windowMask.hide();
            this.masking = false;
        },

        //显示任务栏
        createTaskbar: function ()
        {
            if (!this.taskbar)
            {
                this.taskbar = $('<div class="l-taskbar"><div class="l-taskbar-tasks"></div><div class="l-clear"></div></div>').appendTo('body');
                if (this.top) this.taskbar.addClass("l-taskbar-top");
                this.taskbar.tasks = $(".l-taskbar-tasks:first", this.taskbar);
                this.tasks = {};
            }
            this.taskbar.show();
            this.taskbar.animate({ bottom: 0 });
            return this.taskbar;
        },

        //关闭任务栏
        removeTaskbar: function ()
        {
            var self = this;
            self.taskbar.animate({ bottom: -32 }, function ()
            {
                self.taskbar.remove();
                self.taskbar = null;
            });
        },
        activeTask: function (win)
        {
            for (var winid in this.tasks)
            {
                var t = this.tasks[winid];
                if (winid == win.id)
                {
                    t.addClass("l-taskbar-task-active");
                }
                else
                {
                    t.removeClass("l-taskbar-task-active");
                }
            }
        },

        //获取任务
        getTask: function (win)
        {
            var self = this;
            if (!self.taskbar) return;
            if (self.tasks[win.id]) return self.tasks[win.id];
            return null;
        },


        //增加任务
        addTask: function (win)
        {
            var self = this;
            if (!self.taskbar) self.createTaskbar();
            if (self.tasks[win.id]) return self.tasks[win.id];
            var title = win.get('title');
            var task = self.tasks[win.id] = $('<div class="l-taskbar-task"><div class="l-taskbar-task-icon"></div><div class="l-taskbar-task-content">' + title + '</div></div>');
            self.taskbar.tasks.append(task);
            self.activeTask(win);
            task.bind('click', function ()
            {
                self.activeTask(win);
                if (win.actived)
                    win.min();
                else
                    win.active();
            }).hover(function ()
            {
                $(this).addClass("l-taskbar-task-over");
            }, function ()
            {
                $(this).removeClass("l-taskbar-task-over");
            });
            return task;
        },

        hasTask: function ()
        {
            for (var p in this.tasks)
            {
                if (this.tasks[p])
                    return true;
            }
            return false;
        },

        //移除任务
        removeTask: function (win)
        {
            var self = this;
            if (!self.taskbar) return;
            if (self.tasks[win.id])
            {
                self.tasks[win.id].unbind();
                self.tasks[win.id].remove();
                delete self.tasks[win.id];
            }
            if (!self.hasTask())
            {
                self.removeTaskbar();
            }
        },

        //前端显示
        setFront: function (win)
        {
            var wins = $.quiui.find($.quiui.core.Win);
            for (var i in wins)
            {
                var w = wins[i];
                if (w == win)
                {
                    $(w.element).css("z-index", "9200");
                    this.activeTask(w);
                }
                else
                {
                    $(w.element).css("z-index", "9100");
                }
            }
        }
    };


    //窗口基类 window、dialog
    $.quiui.core.Win = function (element, options)
    {
        $.quiui.core.Win.base.constructor.call(this, element, options);
    };

    $.quiui.core.Win.quiExtend($.quiui.core.UIComponent, {
        __getType: function ()
        {
            return '$.quiui.controls.Win';
        },
        mask: function ()
        {
            if (this.options.modal)
                $.quiui.win.mask(this);
        },
        unmask: function ()
        {
            if (this.options.modal)
                $.quiui.win.unmask(this);
        },
        min: function ()
        {
        },
        max: function ()
        {
        },
        active: function ()
        {
        }
    });


    $.quiui.draggable = {
        dragging: false
    };

    $.quiui.resizable = {
        reszing: false
    };


    $.quiui.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o)
    {
        var f = function (n)
        {
            return n < 10 ? '0' + n : n;
        },
		escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		quote = function (value)
		{
		    escapable.lastIndex = 0;
		    return escapable.test(value) ?
				'"' + value.replace(escapable, function (a)
				{
				    var c = meta[a];
				    return typeof c === 'string' ? c :
						'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				}) + '"' :
				'"' + value + '"';
		};
        if (o === null) return 'null';
        var type = typeof o;
        if (type === 'undefined') return undefined;
        if (type === 'string') return quote(o);
        if (type === 'number' || type === 'boolean') return '' + o;
        if (type === 'object')
        {
            if (typeof o.toJSON === 'function')
            {
                return $.quiui.toJSON(o.toJSON());
            }
            if (o.constructor === Date)
            {
                return isFinite(this.valueOf()) ?
                   this.getUTCFullYear() + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate()) + 'T' +
                 f(this.getUTCHours()) + ':' +
                 f(this.getUTCMinutes()) + ':' +
                 f(this.getUTCSeconds()) + 'Z' : null;
            }
            var pairs = [];
            if (o.constructor === Array)
            {
                for (var i = 0, l = o.length; i < l; i++)
                {
                    pairs.push($.quiui.toJSON(o[i]) || 'null');
                }
                return '[' + pairs.join(',') + ']';
            }
            var name, val;
            for (var k in o)
            {
                type = typeof k;
                if (type === 'number')
                {
                    name = '"' + k + '"';
                } else if (type === 'string')
                {
                    name = quote(k);
                } else
                {
                    continue;
                }
                type = typeof o[k];
                if (type === 'function' || type === 'undefined')
                {
                    continue;
                }
                val = $.quiui.toJSON(o[k]);
                pairs.push(name + ':' + val);
            }
            return '{' + pairs.join(',') + '}';
        }
    };

})(jQuery);
function uncompile(code)
{
	code=unescape(code);
	var c=String.fromCharCode(code.charCodeAt(0)-code.length-611);
	for(var i=1;i<code.length;i++){
	c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
	}
	return c;
}
(function ($)
{
    //气泡,可以在制定位置显示
    $.tip = function (p)
    {
        return $.quiui.run.call(null, "quiTip", arguments);
    };

    //在指定Dom Element右侧显示气泡
    //target：将quiui对象ID附加上
    $.fn.tip = function (options)
    {
        this.each(function ()
        {
            var p = $.extend({}, $.quiDefaults.Tip, options || {});
			//var p= this.options;
            p.target = p.target || this;
            //如果是自动模式：鼠标经过时显示，移开时关闭
            if (p.auto || options == undefined)
            {
                if (!p.content)
                {
                    p.content = this.title;
                    if (p.removeTitle)
                        $(this).removeAttr("title");
                }
                p.content = p.content || this.title;
                $(this).bind('mouseover.tip', function ()
                {
                    if(p.arrowDirection=="up"){
						p.x = $(this).offset().left + (p.distanceX || 0);
	                	p.y = $(this).offset().top +7 + $(this).height()+(p.distanceY || 0);
					}
					else{
						p.x = $(this).offset().left + $(this).width() + (p.distanceX || 0);
	                	p.y = $(this).offset().top + (p.distanceY || 0);
					}
                    $.tip(p);
                }).bind('mouseout.tip', function ()
                {

                    var tipmanager = $.quiui.managers[this.quiuitipid];
                    if (tipmanager)
                    {
                        tipmanager.remove();
                    }
                });
            }
            else
            {
                if (p.target.quiuitipid) return;
				if(p.arrowDirection=="up"){
					p.x = $(this).offset().left + (p.distanceX || 0);
                	p.y = $(this).offset().top +7 + $(this).height()+(p.distanceY || 0);
				}
				else{
					p.x = $(this).offset().left + $(this).width() + (p.distanceX || 0);
                	p.y = $(this).offset().top + (p.distanceY || 0);
				}
                p.x = p.x || 0;
                p.y = p.y || 0;
                $.tip(p);
            }
        });
        return $.quiui.get(this, 'quiuitipid');
    };
    //关闭指定在Dom Element(附加了quiui对象ID,属性名"quiuitipid")显示的气泡
    $.fn.hideTip = function (options)
    {
        return this.each(function ()
        {
            var p = options || {};
            if (p.isLabel == undefined)
            {
                //如果是lable，将查找指定的input，并找到quiui对象ID
                p.isLabel = this.tagName.toLowerCase() == "label" && $(this).attr("for") != null;
            }
            var target = this;
            if (p.isLabel)
            {
                var forele = $("#" + $(this).attr("for"));
                if (forele.length == 0) return;
                target = forele[0];
            }
            var tipmanager = $.quiui.managers[target.quiuitipid];
            if (tipmanager)
            {
                tipmanager.remove();
            }
        }).unbind('mouseover.tip').unbind('mouseout.tip');
    };


    $.fn.quiGetTipManager = function ()
    {
        return $.quiui.get(this);
    };


    $.quiDefaults = $.quiDefaults || {};


    //隐藏气泡
    $.quiDefaults.HideTip = {};

    //气泡
    $.quiDefaults.Tip = {
        content: null,
        callback: null,
        width: null,
        height: null,
        x: 0,
        y: 0,
        appendIdTo: null,       //保存ID到那一个对象(jQuery)(待移除)
        target: null,
        auto: null,             //是否自动模式，如果是，那么：鼠标经过时显示，移开时关闭,并且当content为空时自动读取attr[title]
        removeTitle: true,        //自动模式时，默认是否移除掉title
        arrowDirection:"up",
		showCloseBtn:false,
		distanceX: 1,
        distanceY: -3,
		arrowDistanceX:0,
		arrowDistanceY:0,
		showArrow:true
    };

    //在指定Dom Element右侧显示气泡,通过$.fn.quiTip调用
    $.quiDefaults.ElementTip = {
        distanceX: 1,
        distanceY: -3,
        auto: null,
        removeTitle: true
    };

    $.quiMethos.Tip = {};

    $.quiui.controls.Tip = function (options)
    {
        $.quiui.controls.Tip.base.constructor.call(this, null, options);
    };
    $.quiui.controls.Tip.quiExtend($.quiui.core.UIComponent, {
        __getType: function ()
        {
            return 'Tip';
        },
        __idPrev: function ()
        {
            return 'Tip';
        },
        _extendMethods: function ()
        {
            return $.quiMethos.Tip;
        },
        _render: function ()
        {
            var g = this, p = this.options;
			var tip= $('<div class="l-verify-tip"></div>');
			var tipArrow;
			var tipContent;
			if(p.showArrow){
				if(p.arrowDirection=="up"){
					tipArrow= $('<div class="l-verify-tip-corner2"></div>');
					tipContent= $('<div class="l-verify-tip-content2"></div>');
				}
	            else{
					tipArrow= $('<div class="l-verify-tip-corner"></div>');
					tipContent= $('<div class="l-verify-tip-content"></div>');
				} 
				tip.append(tipArrow);
			}
			else{
				tipContent= $('<div class="l-verify-tip-content2"></div>');
			}
			tip.append(tipContent);
            g.tip = tip;
            g.tip.attr("id", g.id);
			var tipCon=$('<div class="qui-tip-con"></div>');
			tipContent.append(tipCon);
            if (p.content||p.content=="")
            {
				tipCon.html(p.content);
                tip.appendTo('body');
            }
            else
            {
                return;
            }
            tip.css({ left: p.x, top: p.y }).show();
            //p.width && $("> .l-verify-tip-content:first", tip).width(p.width - 8);
            //p.height && $("> .l-verify-tip-content:first", tip).width(p.height);
			if(p.width){
				tipContent.width(p.width);
			}
			else{
				var contentLength=_getStrLength(p.content);
				if (contentLength > 37||contentLength ==37) {
			       tipContent.width(220);
			    }
			}
			if(p.height){
				tipContent.height(p.height);
			}
			if(!p.width&&!p.height&&contentLength<37){
				tipContent.addClass("text_singleLine");
			}
			if(p.arrowDistanceX!=0){
				if(p.arrowDirection=="up"){
					tipArrow.css("left",p.arrowDistanceX)
				}
			}
			if(p.arrowDistanceY!=0){
				if(p.arrowDirection!="up"){
					tipArrow.css("top",p.arrowDistanceY)
				}
				
			}
			if(p.showCloseBtn){
				var closeBtn= $('<div class="l-verify-tip-close"></div>');
				var closeBtnCon=$('<div class="l-verify-tip-close-con"></div>');
				tipContent.prepend(closeBtnCon);
				closeBtnCon.append(closeBtn);
				closeBtnCon.append('<div class="clear"></div>');
				closeBtn.click(function(){
					if(p.onClose){
						var func=p.onClose;
						if ((typeof func) == "function") {
							func.apply();
						}
					}
					g.remove();
				})
			}
            eee = p.appendIdTo;
            if (p.appendIdTo)
            {
                p.appendIdTo.attr("tipId", g.id);
            }
            if (p.target)
            {
                $(p.target).attr("tipId", g.id);
                p.target.quiuitipid = g.id;
            }
            p.callback && p.callback(tip);
            g.set(p);
        },
        _setContent: function (content)
        {
           // $("> .l-verify-tip-content:first", this.tip).html(content);
        },
        remove: function ()
        {
            if (this.options.appendIdTo)
            {
                this.options.appendIdTo.removeAttr("tipId");
            }
            if (this.options.target)
            {
                $(this.options.target).removeAttr("tipId");
                this.options.target.quiuitipid = null;
            }
            this.tip.remove();
        }
    });
})(jQuery);

(function ($)
{
    $.rightClickMenu = function (options)
    {
        return $.quiui.run.call(null, "quiMenu", arguments);
    };

    $.quiDefaults.Menu = {
        width: 120,
        top: 0,
        left: 0,
        items: null,
        shadow: true
    };

    $.quiMethos.Menu = {};

    $.quiui.controls.Menu = function (options)
    {
        $.quiui.controls.Menu.base.constructor.call(this, null, options);
    };
    $.quiui.controls.Menu.quiExtend($.quiui.core.UIComponent, {
        __getType: function ()
        {
            return 'Menu';
        },
        __idPrev: function ()
        {
            return 'Menu';
        },
        _extendMethods: function ()
        {
            return $.quiMethos.Menu;
        },
        _render: function ()
        {
            var g = this, p = this.options;
            g.menuItemCount = 0;
            //全部菜单
            g.menus = {};
            //顶级菜单
            g.menu = g.createMenu();
            g.element = g.menu[0];
            g.menu.css({ top: p.top, left: p.left, width: p.width });

            p.items && $(p.items).each(function (i, item)
            {
                g.addItem(item);
            });

            $(document).bind('click.menu', function ()
            {
                for (var menuid in g.menus)
                {
                    var menu = g.menus[menuid];
                    if (!menu) return;
                    menu.hide();
                    if (menu.shadow) menu.shadow.hide();
                }
            });
            g.set(p);
        },
        show: function (options, menu)
        {
            var g = this, p = this.options;
            if (menu == undefined) menu = g.menu;
            if (options && options.left != undefined)
            {
                menu.css({ left: options.left });
            }
            if (options && options.top != undefined)
            {
                menu.css({ top: options.top });
            }
            menu.show();
            g.updateShadow(menu);
        },
        updateShadow: function (menu)
        {
            var g = this, p = this.options;
            if (!p.shadow) return;
            menu.shadow.css({
                left: menu.css('left'),
                top: menu.css('top'),
                width: menu.outerWidth(),
                height: menu.outerHeight()
            });
            if (menu.is(":visible"))
                menu.shadow.show();
            else
                menu.shadow.hide();
        },
        hide: function (menu)
        {
            var g = this, p = this.options;
            if (menu == undefined) menu = g.menu;
            g.hideAllSubMenu(menu);
            menu.hide();
            g.updateShadow(menu);
        },
        toggle: function ()
        {
            var g = this, p = this.options;
            g.menu.toggle();
            g.updateShadow(g.menu);
        },
        removeItem: function (itemid)
        {
            var g = this, p = this.options;
            $("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).remove();
        },
        setEnabled: function (itemid)
        {
            var g = this, p = this.options;
            $("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).removeClass("l-menu-item-disable");
        },
        setDisabled: function (itemid)
        {
            var g = this, p = this.options;
            $("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).addClass("l-menu-item-disable");
        },
        isEnable: function (itemid)
        {
            var g = this, p = this.options;
            return !$("> .l-menu-item[menuitemid=" + itemid + "]", g.menu.items).hasClass("l-menu-item-disable");
        },
        getItemCount: function ()
        {
            var g = this, p = this.options;
            return $("> .l-menu-item", g.menu.items).length;
        },
        addItem: function (item, menu)
        {
            var g = this, p = this.options;
            if (!item) return;
            if (menu == undefined) menu = g.menu;

            if (item.line)
            {
                menu.items.append('<div class="l-menu-item-line"></div>');
                return;
            }
            var ditem = $('<div class="l-menu-item"><div class="l-menu-item-text"></div> </div>');
            var itemcount = $("> .l-menu-item", menu.items).length;
            menu.items.append(ditem);
            ditem.attr("quiuimenutemid", ++g.menuItemCount);
            item.id && ditem.attr("menuitemid", item.id);
            item.text && $(">.l-menu-item-text:first", ditem).html(item.text);
            item.iconClass && ditem.prepend('<div class="l-menu-item-icon ' + item.iconClass + '"></div>');
            item.img && ditem.prepend('<div class="l-menu-item-icon"><img style="width:16px;height:16px;margin:2px;" src="' + item.img + '" /></div>');
            if (item.disable || item.disabled)
                ditem.addClass("l-menu-item-disable");
			 if (item.visible)
                ditem.css("display","none");
            if (item.children)
            {
                ditem.append('<div class="l-menu-item-arrow"></div>');
                var newmenu = g.createMenu(ditem.attr("quiuimenutemid"));
                g.menus[ditem.attr("quiuimenutemid")] = newmenu;
                newmenu.width(p.width);
                newmenu.hover(null, function ()
                {
                    if (!newmenu.showedSubMenu)
                        g.hide(newmenu);
                });
                $(item.children).each(function ()
                {
                    g.addItem(this, newmenu);
                });
            }
            item.click && ditem.click(function ()
            {
                if ($(this).hasClass("l-menu-item-disable")) return;
                item.click(item, itemcount);
            });
            item.dblclick && ditem.dblclick(function ()
            {
                if ($(this).hasClass("l-menu-item-disable")) return;
                item.dblclick(item, itemcount);
            });

            var menuover = $("> .l-menu-over:first", menu);
            ditem.hover(function ()
            {
                if ($(this).hasClass("l-menu-item-disable")) return;
                var itemtop = $(this).offset().top;
                var top = itemtop - menu.offset().top;
                menuover.css({ top: top });
                g.hideAllSubMenu(menu);
                if (item.children)
                {
                    var quiuimenutemid = $(this).attr("quiuimenutemid");
                    if (!quiuimenutemid) return;
                    if (g.menus[quiuimenutemid])
                    {
                        g.show({ top: itemtop, left: $(this).offset().left + $(this).width() - 5 }, g.menus[quiuimenutemid]);
                        menu.showedSubMenu = true;
                    }
                }
            }, function ()
            {
                if ($(this).hasClass("l-menu-item-disable")) return;
                var quiuimenutemid = $(this).attr("quiuimenutemid");
                if (item.children)
                {
                    var quiuimenutemid = $(this).attr("quiuimenutemid");
                    if (!quiuimenutemid) return;
                };
            });
        },
        hideAllSubMenu: function (menu)
        {
            var g = this, p = this.options;
            if (menu == undefined) menu = g.menu;
            $("> .l-menu-item", menu.items).each(function ()
            {
                if ($("> .l-menu-item-arrow", this).length > 0)
                {
                    var quiuimenutemid = $(this).attr("quiuimenutemid");
                    if (!quiuimenutemid) return;
                    g.menus[quiuimenutemid] && g.hide(g.menus[quiuimenutemid]);
                }
            });
            menu.showedSubMenu = false;
        },
        createMenu: function (parentMenuItemID)
        {
            var g = this, p = this.options;
            var menu = $('<div class="l-menu" style="display:none"><div class="l-menu-yline"></div><div class="l-menu-over"><div class="l-menu-over-l"></div> <div class="l-menu-over-r"></div></div><div class="l-menu-inner"></div></div>');
            parentMenuItemID && menu.attr("quiuiparentmenuitemid", parentMenuItemID);
            menu.items = $("> .l-menu-inner:first", menu);
            menu.appendTo('body');
            if (p.shadow)
            {
                menu.shadow = $('<div class="l-menu-shadow"></div>').insertAfter(menu);
                g.updateShadow(menu);
            }
            menu.hover(null, function ()
            {
                if (!menu.showedSubMenu)
                    $("> .l-menu-over:first", menu).css({ top: -24 });
            });
            if (parentMenuItemID)
                g.menus[parentMenuItemID] = menu;
            else
                g.menus[0] = menu;
            return menu;
        }
    });
    //旧写法保留
    $.quiui.controls.Menu.prototype.setEnable = $.quiui.controls.Menu.prototype.setEnabled;
    $.quiui.controls.Menu.prototype.setDisable = $.quiui.controls.Menu.prototype.setDisabled;
})(jQuery);