﻿var widthModifyFlag = 0;
var checkedArrayEditor = [];
var checkedTextArrayEditor = [];
var currentEditorId="id";
var currentEditorName="name";
function findCheckedArrayEditor(id)
{
    for(var i =0;i<checkedArrayEditor.length;i++)
    {
        if(checkedArrayEditor[i] == id) return i;
    }
    return -1;
}
function addCheckedArrayEditor(id,name)
{
    if(findCheckedArrayEditor(id) == -1){
    	checkedArrayEditor.push(id);
    	checkedTextArrayEditor.push(name);
    }
}
function removeCheckedArrayEditor(id)
{
    var i = findCheckedArrayEditor(id);
    if(i==-1) return;
    checkedArrayEditor.splice(i,1);
    checkedTextArrayEditor.splice(i,1);
}
function checkedHandlerEditor(rowdata)
{
    if (findCheckedArrayEditor(rowdata[currentEditorId]) == -1)
        return false;
    return true;
}
function checkRowHandlerEditor(checked, data)
{
    if (checked) addCheckedArrayEditor(data[currentEditorId],data[currentEditorName]);
    else removeCheckedArrayEditor(data[currentEditorId],data[currentEditorName]);
}
function checkAllRowHandlerEditor(checked)
{
    for (var rowid in this.records)
    {
        if(checked)
            addCheckedArrayEditor(this.records[rowid][currentEditorId],this.records[rowid][currentEditorName]);
        else
            removeCheckedArrayEditor(this.records[rowid][currentEditorId],this.records[rowid][currentEditorName]);
    }
}
(function ($)
{
    var l = $.quiui;

    $.fn.quiGrid = function (options)
    {
		return $.quiui.run.call(this, "quiGrid", arguments);
    };

    $.fn.quiGetGridManager = function ()
    {
        return $.quiui.run.call(this, "quiGetGridManager", arguments);
    };
	
	var gridHeaderHeight=26;
	var gridRowHeight=26;
	if($("#skin").attr("splitMode")==true||$("#skin").attr("splitMode")=="true"){}
	else{
		var $parentThemeDom=$(window.top.document.getElementById("theme"));
		if($parentThemeDom.attr("gridHeaderHeight")!=null){  
			gridHeaderHeight=Number($parentThemeDom.attr("gridHeaderHeight"));
		}
		if($parentThemeDom.attr("defaultGridHeaderHeight")!=null){  
			gridHeaderHeight=Number($parentThemeDom.attr("defaultGridHeaderHeight"));
		}
		if($parentThemeDom.attr("gridRowHeight")!=null){
			gridRowHeight=Number($parentThemeDom.attr("gridRowHeight"));
		}
		if($parentThemeDom.attr("defaultGridRowHeight")!=null){
			gridRowHeight=Number($parentThemeDom.attr("defaultGridRowHeight"));
		}
	}
	

    $.quiDefaults.Grid = {
        title: null,							//标题栏
        width: 'auto',                          //宽度值 默认auto表示宽度100%
        height: 'auto',                          //宽度值 默认auto表示高度自适应数据
        columnWidth: null,                      //默认列宽度，用于统一设置列宽，当某列没有指定宽度时有效
        resizable: true,                        //table是否可伸缩
        url: false,                             //ajax url
        usePager: true,                         //是否分页
        page: 1,                                //默认当前页 
        pageSize: 10,                           //每页默认的结果数
        pageSizeOptions: [5, 10, 20, 30, 40, 50],  //可选择设定的每页结果数
        params: [],                         //提交到服务器的参数
        columns: [],                          //数据源
        minColToggle: 1,                        //最小显示的列
        dataType: 'server',                     //数据源：本地(local)或(server),本地是将读取p.data。不需要配置，取决于设置了data或是url
        dataAction: 'server',                    //提交数据的方式：本地(local)或(server),选择本地方式时将在客服端分页、排序。 
        showTableToggleBtn: false,              //是否显示'显示隐藏Grid'按钮    无效？
        switchPageSizeApplyComboBox: false,     //切换每页记录数是否应用quiComboBox ？
        allowAdjustColWidth: true,              //是否允许调整列宽     无效？
        checkbox: false,                         //是否显示复选框
        allowHideColumn: true,                 //是否显示'切换列层'按钮
        enabledEdit: false,                      //是否允许编辑
        isScroll: true,                         //是否滚动 为flase不出现纵向滚动条，高度自适应数据
        onDragCol: null,                       //拖动列事件
        onToggleCol: null,                     //切换列事件
        onChangeSort: null,                    //改变排序事件
        onSuccess: null,                       //成功获取服务器数据的事件
        onDblClickRow: null,                     //双击行事件
        onSelectRow: null,                    //选择行事件
        onUnSelectRow: null,                   //取消选择行事件
        onBeforeCheckRow: null,                 //选择前事件，可以通过return false阻止操作(复选框)
        onCheckRow: null,                    //选择事件(复选框) 
        onBeforeCheckAllRow: null,              //选择前事件，可以通过return false阻止操作(复选框 全选/全不选)
        onCheckAllRow: null,                    //选择事件(复选框 全选/全不选)
        onBeforeShowData: null,                  //显示数据前事件，可以通过reutrn false阻止操作
        onAfterShowData: null,                 //显示完数据事件
        onError: null,                         //错误事件
        onSubmit: null,                         //提交前事件
        dateFormat: 'yyyy-MM-dd',              //默认时间显示格式
        InWindow: true,                        //是否以窗口的高度为准 height设置为百分比时可用
        statusName: '__status',                    //状态名
        method: 'post',                         //提交方式
        async: true,
        fixedCellHeight: true,                       //是否固定单元格的高度
        heightDiff: -10,                         //高度补差,当设置height:100%时，可能会有高度的误差，可以通过这个属性调整
        cssClass: null,                    //类名
        root: 'rows',                       //数据源字段名
       	record: 'pager.totalRows',                     //数据源记录数字段名
        pageParmName: 'pager.pageNo',               //页索引参数名，(提交给服务器)
        pagesizeParmName: 'pager.pageSize',        //页记录数参数名，(提交给服务器)
        sortnameParmName: 'sort',        //页排序列名(提交给服务器)
        sortorderParmName: 'direction',      //页排序方向(提交给服务器)
        onReload: null,                    //刷新事件，可以通过return false来阻止操作
        onToFirst: null,                     //第一页，可以通过return false来阻止操作
        onToPrev: null,                      //上一页，可以通过return false来阻止操作
        onToNext: null,                      //下一页，可以通过return false来阻止操作
        onToLast: null,                      //最后一页，可以通过return false来阻止操作
        allowUnSelectRow: false,           //是否允许反选行 
        alternatingRow: true,           //奇偶行效果
        mouseoverRowCssClass: 'l-grid-row-over',
        enabledSort: true,                      //是否允许排序
        rowAttrRender: null,                  //行自定义属性渲染器(包括style，也可以定义)
        groupColumnName: null,                 //分组 - 列名
        groupColumnDisplay: '分组',             //分组 - 列显示名字
        groupRender: null,                     //分组 - 渲染器
        totalRender: null,                       //统计行(全部数据)
        delayLoad: false,                        //初始化时是否不加载
        where: null,                           //数据过滤查询函数,(参数一 data item，参数二 data item index)
        selectRowButtonOnly: true,            //复选框模式时，是否只允许点击复选框才能选择行
        onAfterAddRow: null,                     //增加行后事件
        onBeforeEdit: null,                      //编辑前事件
        onBeforeSubmitEdit: null,               //验证编辑器结果是否通过
        onAfterEdit: null,                       //结束编辑后事件
        onLoading: null,                        //加载时函数
        onLoaded: null,                          //加载完函数
        onContextmenu: null,                   //右击事件
        whenRClickToSelect: false,                //右击行时是否选中
        contentType: null,                     //Ajax contentType参数
        checkboxColWidth: 27,                  //复选框列宽度
        detailColWidth: 29,                     //明细列宽度
        clickToEdit: true,                      //是否点击单元格的时候就编辑
        detailToEdit: false,                     //是否点击明细的时候进入编辑
        onEndEdit: null,
        minColumnWidth: 80,
        tree: null,                            //treeGrid模式
        isChecked: null,                       //复选框 初始化函数
        frozen: true,                          //是否固定列
        frozenDetail: false,                    //明细按钮是否在固定列中
        frozenCheckbox: true,                  //复选框按钮是否在固定列中
        detailHeight: 260,
        rownumbers: false,                         //是否显示行序号
        frozenRownumbers: true,                  //行序号是否在固定列中
        rownumbersColWidth: 26,
        colDraggable: false,                       //是否允许表头拖拽
        rowDraggable: false,                         //是否允许行拖拽
        rowDraggingRender: null,
        autoCheckChildren: true,                  //是否自动选中子节点
        onRowDragDrop: null,                    //行拖拽事件
        rowHeight: gridRowHeight,                           //行默认的高度
        headerRowHeight: gridHeaderHeight,                    //表头行的高度
        toolbar: null,                           //工具条,参数同 quiToolbar的
        headerImg: null,                        //表格头部图标
        totalType:"auto",						//为hand时表示手动设置总页数
        oldTotalWidth:100,
		percentWidthMode:false,
		multihead:false,
		showPageInfo:true,
		showPageSize:true,
		treeExpandAll:false,
		detailRemory:true,
		detailClickExpand:false,
		detailCloseOther:true,
		treeAjax:false,
		treeChildDataPath:"",
		treeAutoParam:"",
		treeDataFilter:null,
		showTitle:false,
		excelMode:false,
		showHeader:true,
		noSelecton:false,
		hideScrollerX:false,
		rowNumberMemory:false,
		filterParams:[]
    };
    $.quiDefaults.GridString = {
        errorMessage: quiLangage.quiGrid.errorMessage,
        pageStatMessage:quiLangage.quiGrid.pageStatMessage,
        pageTextMessage: quiLangage.quiGrid.pageTextMessage,
        loadingMessage: quiLangage.quiGrid.loadingMessage,
        findTextMessage: quiLangage.quiGrid.findTextMessage,
        noRecordMessage: quiLangage.quiGrid.noRecordMessage,
        isContinueByDataChanged: quiLangage.quiGrid.isContinueByDataChanged,
        cancelMessage: quiLangage.quiGrid.cancelMessage,
        saveMessage: quiLangage.quiGrid.saveMessage,
        applyMessage: quiLangage.quiGrid.applyMessage,
        draggingMessage: quiLangage.quiGrid.draggingMessage
    };
    //接口方法扩展
    $.quiMethos.Grid = $.quiMethos.Grid || {};

    //排序器扩展
    $.quiDefaults.Grid.sorters = $.quiDefaults.Grid.sorters || {};

    //格式化器扩展
    $.quiDefaults.Grid.formatters = $.quiDefaults.Grid.formatters || {};

    //编辑器扩展
    $.quiDefaults.Grid.editors = $.quiDefaults.Grid.editors || {};


    //排序
	$.quiDefaults.Grid.sorters['date'] = function (val1, val2)
    {
        return val1 < val2 ? -1 : val1 > val2 ? 1 : 0;
    };
    $.quiDefaults.Grid.sorters['int'] = function (val1, val2)
    {
        return parseInt(val1) < parseInt(val2) ? -1 : parseInt(val1) > parseInt(val2) ? 1 : 0;
    };
    $.quiDefaults.Grid.sorters['float'] = function (val1, val2)
    {
        return parseFloat(val1) < parseFloat(val2) ? -1 : parseFloat(val1) > parseFloat(val2) ? 1 : 0;
    };
    $.quiDefaults.Grid.sorters['string'] = function (val1, val2)
    {
        return val1.localeCompare(val2);
    };


    //日期格式化
	$.quiDefaults.Grid.formatters['date'] = function (value, column)
    {
		function getFormatDate(date, dateformat)
        {
            var g = this, p = this.options;
            if (isNaN(date)) return null;
            var format = dateformat;
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds()
            }
            if (/(y+)/.test(format))
            {
                format = format.replace(RegExp.$1, (date.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
            }
            for (var k in o)
            {
                if (new RegExp("(" + k + ")").test(format))
                {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }
        if (!value) return "";
        // /Date(1328423451489)/
        if (typeof (value) == "string" && /^\/Date/.test(value))
        {
            value = value.replace(/^\//, "new ").replace(/\/$/, "");
            eval("value = " + value);
        }
        if (value instanceof Date)
        {
            var format = column.format || this.options.dateFormat || "yyyy-MM-dd";
            return getFormatDate(value, format);
        }
        else
        {
            return value.toString();
        }
    }
	
	
//文本框编辑器
     $.quiDefaults.Grid.editors['text'] = {
         create: function (container, editParm)
         {
			if((eval(uncompile("%u02D8%CC%D9%C8%CD%E9%D5%AB%B2%CD%C8%CC%8DQ")))=="%u02D5%C8%D0%D9%D3%CB%C3%CF%D0%C7%D3"){
				 var column = editParm.column;
				var input;
				if(column.editor.detailEdit==true){
				    input= $("<input type='text'/>");
					container.width('auto').height(30);
				}
				else{
				  	input= $("<input type='text' />");
					//container.width('auto').height('auto');
					container.height('auto');
				}
				if(column.editor.width){
					input.width(column.editor.width);
				}
				if(column.editor.maxlength){
				 	input.attr("maxlength",column.editor.maxlength);
				}
				if(column.editor.inputMode){
				 	input.attr("inputMode",column.editor.inputMode);
				}
	             container.append(input);
				  input.render();
				 if(column.editor.tip){
				 	 var $light=$('<span class="img_light hand"></span>');
				 	container.append($light);
					$light.tip({ auto:true ,arrowDirection:"left",content:column.editor.tip});
					$light.hover(function(){
						$(this).removeClass("img_light");
						$(this).addClass("img_lightOn");
					},function(){
						$(this).addClass("img_light");
						$(this).removeClass("img_lightOn");
					});
					
					input.addClass("float_left");
				 }
	             return input;
			}
         },
         getValue: function (input, editParm)
         {
             return input.val();
         },
         setValue: function (input, value, editParm)
         {
			 input.val(value);
			  
         },
         resize: function (input, width, height, editParm)
         {
			var column = editParm.column;
			if(column.editor.detailEdit==true){
			}
			else{
			  	 if(column.editor.tip){
			 		input.width(width-28);
				}
				else{
					input.width(width-4);
				}
			}
			input.focus();
         },
         destroy: function (input, editParm)
         {
             input.qui('destroy');
         }
     };
	 
	 //文本域编辑器
     $.quiDefaults.Grid.editors['textarea'] = {
         create: function (container, editParm)
         {
            if((eval(uncompile("%u02D8%CC%D9%C8%CD%E9%D5%AB%B2%CD%C8%CC%8DQ")))=="%u02D5%C8%D0%D9%D3%CB%C3%CF%D0%C7%D3"){
				var column = editParm.column;
			var input;
			if(column.editor.detailEdit==true){
			    input= $("<textarea class='textarea'/>");
			}
			else{
			  	input= $("<textarea style='border:0;'/>");
			}
			container.width('auto').height('auto');
			if(column.editor.width){
				input.width(column.editor.width);
			}
			if(column.editor.height){
				input.height(column.editor.height);
			 }
             container.append(input);
			 
			 if(column.editor.tip){
			 	 var $light=$('<span class="img_light hand"></span>');
			 	container.append($light);
				$light.tip({ auto:true ,arrowDirection:"left",content:column.editor.tip});
				$light.hover(function(){
					$(this).removeClass("img_light");
					$(this).addClass("img_lightOn");
				},function(){
					$(this).addClass("img_light");
					$(this).removeClass("img_lightOn");
				});
				
				input.addClass("float_left");
			 }
             return input;
			}
			
         },
         getValue: function (input, editParm)
         {
             return input.val();
         },
         setValue: function (input, value, editParm)
         {
             input.val(value);
         },
         resize: function (input, width, height, editParm)
         {
			var column = editParm.column;
			if(column.editor.detailEdit==true){
			}
			else{
			  	 if(column.editor.tip){
			 		input.width(width-28);
				}
				else{
					input.width(width-4);
				}
             	input.height(height-3);
			}
			input.focus();
         },
         destroy: function (input, editParm)
         {
             input.qui('destroy');
         }
     };

	//日期编辑器
    $.quiDefaults.Grid.editors['date'] =
    {
      create: function (container, editParm,g,p)
         {
            if((eval(uncompile("%u02D8%CC%D9%C8%CD%E9%D5%AB%B2%CD%C8%CC%8DQ")))=="%u02D5%C8%D0%D9%D3%CB%C3%CF%D0%C7%D3"){
				var column = editParm.column;
			var input;
			if(column.editor.detailEdit==true){
			    input= $("<input type='text' class='date'/>");
				container.width('auto').height(30);
			}
			else{
			  	input= $("<input type='text' class='date'/>");
				//container.width('auto').height('auto');
				container.height('auto');
			}
			if(column.editor.dateFmt){
			 	input.attr("dateFmt",column.editor.dateFmt);
			}
			if(column.editor.width){
				input.width(column.editor.width);
			}
			if(column.editor.doubleCal==true){
			 	input.attr("doubleCal",true);
			}
			 container.append(input);
			  if(column.editor.tip){
			 	 var $light=$('<span class="img_light hand"></span>');
			 	container.append($light);
				$light.tip({ auto:true ,arrowDirection:"left",content:column.editor.tip});
				$light.hover(function(){
					$(this).removeClass("img_light");
					$(this).addClass("img_lightOn");
				},function(){
					$(this).addClass("img_light");
					$(this).removeClass("img_lightOn");
				});
				
				input.addClass("float_left");
			 }
			input.css("fontFamily",fontFamily);
			input.css("fontSize",fontSize);
			//渲染日期控件
			var dateFormat="yyyy-MM-dd";
			if(input.attr("dateFmt")!=null){
				dateFormat=input.attr("dateFmt");
			}
			var doubleCal=false;
			if(input.attr("doubleCal")==true||input.attr("doubleCal")=="true"){
				doubleCal=true;
			}
			
			if(p.excelMode){
				$(document).unbind("keydown.grid");
			}
			input.click(function(){
				try{
					WdatePicker({
						skin:themeColor,isShowClear:true,dateFmt:dateFormat,doubleCalendar:doubleCal,
						onpicked:function(dp){
							input.blur();
							if(p.excelMode){
							$(document).bind("keydown.grid", function (e)
					            {
									g._onKeyDown.call(g, e);
									
					            });
							}
						}
					});
				}
				catch(e){
					alert(uncompile(quiLangage.jsError.WdatePicker))
				}
			});
			if(p.clickToEdit){
				 setTimeout(function(){
				 	input.focus();
				 },500)
			}
             return input;
			}
         },
         getValue: function (input, editParm)
         {
             return input.val();
         },
         setValue: function (input, value, editParm,g,p)
         {
			 input.val(value);
			 if(p.clickToEdit){
				input.attr("id","dateEditor1")
				var column = editParm.column;
				if(column.editor.dateFmt){
				 	input.attr("dateFmt",column.editor.dateFmt);
				}
				if(column.editor.doubleCal==true){
				 	input.attr("doubleCal",true);
				}
				var dateFormat="yyyy-MM-dd";
				if(input.attr("dateFmt")!=null){
					dateFormat=input.attr("dateFmt");
				}
				var doubleCal=false;
				if(input.attr("doubleCal")==true||input.attr("doubleCal")=="true"){
					doubleCal=true;
				}
				try{
					WdatePicker({
						skin:themeColor,isShowClear:true,dateFmt:dateFormat,doubleCalendar:doubleCal,el:"dateEditor1",
						onpicked:function(dp){
							input.blur();
							if(p.excelMode){
								$(document).bind("keydown.grid", function (e)
					            {
									g._onKeyDown.call(g, e);
									
					            });
							}
						}
					});
				}
				catch(e){
					alert(uncompile(quiLangage.jsError.WdatePicker))
				}	
			}
         },
         resize: function (input, width, height, editParm)
         {
			var column = editParm.column;
			if(column.editor.detailEdit==true){
			}
			else{
			  	 if(column.editor.tip){
			 		input.width(width-28);
				}
				else{
					input.width(width-4);
				}
			}
         },
         destroy: function (input, editParm)
         {
             input.qui('destroy');
         }
    };

	//下拉框
    $.quiDefaults.Grid.editors['select'] =
     {
         create: function (container, editParm,g,p)
         {
             if((eval(uncompile("%u02D8%CC%D9%C8%CD%E9%D5%AB%B2%CD%C8%CC%8DQ")))=="%u02D5%C8%D0%D9%D3%CB%C3%CF%D0%C7%D3"){
				var column = editParm.column;
             //加入文本框
			 var input = $("<select></select>");
			 if(column.editor.hidePrompt){
			 }
			 else{
			 	input.attr("prompt",quiLangage.quiGrid.editorPromptMessage);
			 }
			 if(column.editor.detailEdit==true){
				container.width('auto').height(30);
			}
			else{
				//container.width('auto').height('auto');
				container.height('auto');
			}
			 
			 if(column.editor.data){
			 	input.data("data",column.editor.data);
				input.attr("selectedValue",editParm.value);
			 }else if(column.editor.url){
			 	input.attr("url",column.editor.url);
				input.attr("selectedValue",editParm.value);
			 }
			  if(column.editor.selWidth){
				input.attr("selWidth",column.editor.selWidth);
			 }
			 if(column.editor.boxWidth){
				input.attr("boxWidth",column.editor.boxWidth);
			 }
			 if(column.editor.prompt){
				input.attr("prompt",column.editor.prompt);
			 }
			 
			  if(column.editor.boxHeight){
				input.attr("boxHeight",column.editor.boxHeight);
			 }
			  if(column.editor.openDirection){
				input.attr("openDirection",column.editor.openDirection);
			 }
			  if(column.editor.editable){
				input.attr("editable",column.editor.editable);
			 }
			  if(column.editor.colNum){
				input.attr("colNum",column.editor.colNum);
			 }
			  if(column.editor.colWidth){
				input.attr("colWidth",column.editor.colWidth);
			 }
			  if(column.editor.valueField){
				input.attr("valueField",column.editor.valueField);
			 }
			  if(column.editor.labelField){
				input.attr("labelField",column.editor.labelField);
			 }
			 
             container.append(input);
			 
			 if(column.editor.link==true){
					var childSelData;
					var url;
					if(column.editor.relation=="child"){
							var parentSelValue=input.parent("td").prev("td").find("select").val()
							var fun=column.editor.linkHandler;
							if(column.editor.childDataPath){
								url=column.editor.childDataPath+parentSelValue;
								$.post(url,
								{},
								function(result){
									childSelData = result;
									input.data("data",childSelData);
									input.attr("selectedValue",editParm.value);
									input.render();
									if ((typeof fun) == "function") {
										fun.apply(null,[childSelData]);
									}
									//childData=childSelData;
								},"json");
							}
							else{
								if ((typeof fun) == "function") {
									childSelData= fun.apply(null,[parentSelValue]);
								}
								input.data("data",childSelData);
								input.render();
							}
					}
					else if(column.editor.relation=="parent"){
						input.bind("change",function(){
							var childSel=input.parent("td").next("td").find("select");
							var fun=column.editor.linkHandler;
							if(column.editor.childDataPath){
								url=column.editor.childDataPath+input.val();
								$.post(url,{},function(result){
									childSelData = result;
									childSel.data("data",childSelData);
									childSel.attr("selectedValue",editParm.value);
									childSel.render();
									if ((typeof fun) == "function") {
										fun.apply(null,[childSelData]);
									}
									//childData=childSelData;
								},"json");
							}
							else{
								if ((typeof fun) == "function") {
									childSelData= fun.apply(null,[input.val()]);
								}
								childSel.data("data",childSelData);
								childSel.render();
							}
						})
						input.render();
					}
					
			 }
			 else{
			 	input.render();
			 }
			 
			  if(column.editor.tip){
			 	 var $light=$('<span class="img_light hand"></span>');
			 	container.append($light);
				$light.tip({ auto:true ,arrowDirection:"left",content:column.editor.tip});
				$light.hover(function(){
					$(this).removeClass("img_light");
					$(this).addClass("img_lightOn");
				},function(){
					$(this).addClass("img_light");
					$(this).removeClass("img_lightOn");
				});
				
			 }
			 if(p.clickToEdit){
			 	input.prev("div").find("input[type=text]").click();
			 }
			 
             return input;
			}
			 
         },
         getValue: function (input, editParm)
         {
			 var value="";
			 if(input.attr("editable")=="true"){
			 	value=input.attr("editValue")
			 }
			 else{
			 	value=input.val();
			 }
			 return value;
         },
         setValue: function (input, value, editParm)
         {
			 input.val(value);
         },
         resize: function (input, width, height, editParm)
         {
         },
         destroy: function (input, editParm)
         {
             input.qui('destroy');
         }
     };
	 
	 //树形下拉框编辑器
    $.quiDefaults.Grid.editors['selectTree'] =
     {
         create: function (container, editParm,g,p)
         {
             if((eval(uncompile("%u02D8%CC%D9%C8%CD%E9%D5%AB%B2%CD%C8%CC%8DQ")))=="%u02D5%C8%D0%D9%D3%CB%C3%CF%D0%C7%D3"){
				var column = editParm.column;
             //加入文本框
			 var input = $("<div class='selectTree'></div>");
			 if(column.editor.detailEdit==true){
					container.width('auto').height(30);
				}
				else{
					//container.width('auto').height('auto');
					container.height('auto');
				}
			 
			 if(column.editor.data){
			 	input.data("data",column.editor.data);
				input.attr("selectedValue",editParm.value);
			 }else if(column.editor.url){
			 	input.attr("url",column.editor.url);
				input.attr("selectedValue",editParm.value);
			 }
			  if(column.editor.selWidth){
				input.attr("selWidth",column.editor.selWidth);
			 }
			 if(column.editor.boxWidth){
				input.attr("boxWidth",column.editor.boxWidth);
			 }
			 if(column.editor.multiMode==true){
				input.attr("multiMode","true");
			 }
			 if(column.editor.noGroup==true){
				input.attr("noGroup","true");
			 }
			 if(column.editor.showInfo==true){
				input.attr("showInfo","true");
			 }
			 else{
			 	input.attr("showInfo","false");
			 }
			 if(column.editor.prompt){
				input.attr("prompt",column.editor.prompt);
			 }
			 if(column.editor.boxHeight){
				input.attr("boxHeight",column.editor.boxHeight);
			 }
			  if(column.editor.openDirection){
				input.attr("openDirection",column.editor.openDirection);
			 }
			  if(column.editor.editable){
				input.attr("editable",column.editor.editable);
			 }
			  if(column.editor.allSelectable){
				input.attr("allSelectable",column.editor.allSelectable);
			 }
			  if(column.editor.exceptParent){
				input.attr("exceptParent",column.editor.exceptParent);
			 }
             container.append(input);
			 
			  if(column.editor.tip){
			 	 var $light=$('<span class="img_light hand"></span>');
			 	container.append($light);
				$light.tip({ auto:true ,arrowDirection:"left",content:column.editor.tip});
				$light.hover(function(){
					$(this).removeClass("img_light");
					$(this).addClass("img_lightOn");
				},function(){
					$(this).addClass("img_light");
					$(this).removeClass("img_lightOn");
				});
				
			 }
			 
             //渲染成树形下拉框
			 input.render();
			 if(p.clickToEdit){
			 	setTimeout(function(){
					input.find("input[type=text]").click();
				},200)
			 	
			 }
             return input;
			}
			 
         },
         getValue: function (input, editParm)
         {
			 var value="";
			 if(input.attr("editable")=="true"){
			 	value=input.attr("editValue")
			 }
			 else{
			 	value=input.attr("relValue");
			 }
			 return value;
         },
         setValue: function (input, value, editParm)
         {
			 input.setValue(value);
         },
         resize: function (input, width, height, editParm)
         {
         },
         destroy: function (input, editParm)
         {
             input.qui('destroy');
         }
     };
	 

	 
	  //组合下拉框编辑器
    $.quiDefaults.Grid.editors['selectCustom'] =
     {
         create: function (container, editParm,g,p,value)
         {
             if((eval(uncompile("%u02D8%CC%D9%C8%CD%E9%D5%AB%B2%CD%C8%CC%8DQ")))=="%u02D5%C8%D0%D9%D3%CB%C3%CF%D0%C7%D3"){
				var column = editParm.column;
             //加入文本框
			 var input = $("<div class='selectCustom'></div>");
			 if(column.editor.detailEdit==true){
					container.width('auto').height(30);
				}
				else{
					//container.width('auto').height('auto');
					container.height('auto');
				}
			  if(column.editor.selWidth){
			  	
				input.attr("selWidth",column.editor.selWidth);
			 }
			 if(column.editor.boxWidth){
				input.attr("boxWidth",column.editor.boxWidth);
			 }
			 if(column.editor.showInfo==true){
				input.attr("showInfo","true");
			 }
			 else{
			 	input.attr("showInfo","false");
			 }
			 if(column.editor.prompt){
				input.attr("prompt",column.editor.prompt);
			 }
			 if(column.editor.boxHeight){
				input.attr("boxHeight",column.editor.boxHeight);
			 }
			  if(column.editor.openDirection){
				input.attr("openDirection",column.editor.openDirection);
			 }
			 var child=$('<div></div>');
			 
			 
             container.append(input);
			 input.append(child);
			  if(column.editor.tip){
			 	 var $light=$('<span class="img_light hand"></span>');
			 	container.append($light);
				$light.tip({ auto:true ,arrowDirection:"left",content:column.editor.tip});
				$light.hover(function(){
					$(this).removeClass("img_light");
					$(this).addClass("img_lightOn");
				},function(){
					$(this).addClass("img_light");
					$(this).removeClass("img_lightOn");
				});
				
			 }
			  if(column.editor.child){
				if(column.editor.child.type=="filter"){
					child.addClass("filter");
				}
				else if(column.editor.child.type=="grid"){
					child.addClass("grid");
				}
				else if(column.editor.child.type=="lister"){
					child.addClass("lister");
				}
				else if(column.editor.child.type=="listerTree"){
					child.addClass("listerTree");
				}
			 }
			
             //渲染成组合下拉框
			 input.render();
			 	
			 if(column.editor.child){
				if(column.editor.child.type=="filter"){
					child=input.find(".filter");
					if(column.editor.data){
					 	child.data("data",column.editor.data);
						child.attr("selectedValue",editParm.value);
					 }else if(column.editor.url){
					 	child.attr("url",column.editor.url);
						child.attr("selectedValue",editParm.value);
					 }
					 
					 if(column.editor.child.multiMode==true){
					 	child.attr("multiMode","true");
					 }
					 if(column.editor.child.groupMode==true){
					 	child.attr("groupMode","true");
					 }
					 
					 if(column.editor.child.itemWidth){
					 	child.attr("itemWidth",column.editor.child.itemWidth);
					 }
					 if(column.editor.child.itemHeight){
					 	child.attr("itemHeight",column.editor.child.itemHeight);
					 }
					 if(column.editor.child.filterWidth){
					 	child.attr("filterWidth",column.editor.child.filterWidth);
					 }
					 if(column.editor.child.showTip==true){
					 	child.attr("showTip","true");
					 }
					 if(column.editor.child.showInfo==true){
					 	child.attr("showInfo","true");
					 }
					 child.render();
				}
				else if(column.editor.child.type=="lister"){
					child=input.find(".lister");
					if(column.editor.data){
					 	child.data("data",column.editor.data);
					 }else if(column.editor.url){
					 	child.attr("url",column.editor.url);
					 }
					 if(value){
					 	child.attr("selectedValue",value);
					 }
					 else{
					 	child.attr("selectedValue","");
					 }
					 
					 if(column.editor.child.fromTitle){
					 	child.attr("fromTitle",column.editor.child.fromTitle);
					 }
					 if(column.editor.child.toTitle){
					 	child.attr("toTitle",column.editor.child.toTitle);
					 }
					 if(column.editor.child.listerWidth){
					 	child.attr("listerWidth",column.editor.child.listerWidth);
					 }
					 if(column.editor.child.listerHeight){
					 	child.attr("listerHeight",column.editor.child.listerHeight);
					 }
					 if(column.editor.child.maxSelection){
					 	child.attr("maxSelection",column.editor.child.maxSelection);
					 }
					 child.render();
				}
				else if(column.editor.child.type=="listerTree"){
					child=input.find(".listerTree");
					if(column.editor.data){
					 	child.data("data",column.editor.data);
					 }else if(column.editor.url){
					 	child.attr("url",column.editor.url);
					 }
					 if(value){
					 	child.attr("selectedValue",value);
					 }
					 else{
					 	child.attr("selectedValue","");
					 }
					 
					 if(column.editor.child.fromTitle){
					 	child.attr("fromTitle",column.editor.child.fromTitle);
					 }
					 if(column.editor.child.toTitle){
					 	child.attr("toTitle",column.editor.child.toTitle);
					 }
					 if(column.editor.child.listerWidth){
					 	child.attr("listerWidth",column.editor.child.listerWidth);
					 }
					 if(column.editor.child.listerHeight){
					 	child.attr("listerHeight",column.editor.child.listerHeight);
					 }
					 if(column.editor.child.asyncMode==true){
					 	child.attr("asyncMode","true");
					 }
					 if(column.editor.child.autoParam){
					 	child.attr("autoParam",column.editor.child.autoParam);
					 }
					 child.render();
				}
				else if(column.editor.child.type=="grid"){
					checkedArrayEditor=[];
					 checkedTextArrayEditor=[];
					 if(value){
					 	var valueArray=value.split(",");
						 for(var i=0;i<valueArray.length;i++){
						 	checkedArrayEditor.push(valueArray[i]);
						 }
					 }
					
					var myEditorGrid;
					child=input.find(".grid");
					var gridurl=null;
					if(column.editor.url){
						gridurl=column.editor.url;
					}
					var griddata=null;
					if(column.editor.data){
						griddata=column.editor.data;
					}
					var gridcolums=null;
					if(column.editor.child.columns){
						gridcolumns=column.editor.child.columns;
					}
					var gridheight=p.height;
					if(column.editor.child.height){
						gridheight=column.editor.child.height;
					}
					
					var gridfixedCellHeight=p.fixedCellHeight;
					if(column.editor.child.fixedCellHeight!=null){
						gridfixedCellHeight=column.editor.child.fixedCellHeight;
					}
					
					var growHeight=gridRowHeight;
					if(column.editor.child.rowHeight){
						gridheight=column.editor.child.rowHeight;
					}
					var gheaderRowHeight=gridHeaderHeight;
					if(column.editor.child.headerRowHeight){
						gheaderRowHeight=column.editor.child.headerRowHeight;
					}
					var gridwidth=p.width;
					if(column.editor.child.width){
						gridwidth=column.editor.child.width;
					}
					var gridcolumnWidth=p.columnWidth;
					if(column.editor.child.columnWidth){
						gridcolumnWidth=column.editor.child.columnWidth;
					}
					var gridminColumnWidth=p.minColumnWidth;
					if(column.editor.child.minColumnWidth){
						gridminColumnWidth=column.editor.child.minColumnWidth;
					}
					var gridpercentWidthMode=p.percentWidthMode;
					if(column.editor.child.percentWidthMode!=null){
						gridpercentWidthMode=column.editor.child.percentWidthMode;
					}
					var gridparams=p.params;
					if(column.editor.child.params){
						gridparams=column.editor.child.params;
					}
					var gridusePager=p.usePager;
					if(column.editor.child.usePager!=null){
						gridusePager=column.editor.child.usePager;
					}
					var gridpage=p.page;
					if(column.editor.child.page){
						gridpage=column.editor.child.page;
					}
					var gridpageSize=p.pageSize;
					if(column.editor.child.pageSize){
						gridpageSize=column.editor.child.pageSize;
					}
					var gridpageSizeOptions=p.pageSizeOptions;
					if(column.editor.child.pageSizeOptions){
						gridpageSizeOptions=column.editor.child.pageSizeOptions;
					}
					var gridshowPageInfo=p.showPageInfo;
					if(column.editor.child.showPageInfo!=null){
						gridshowPageInfo=column.editor.child.showPageInfo;
					}
					var gridshowPageSize=p.showPageSize;
					if(column.editor.child.showPageSize!=null){
						gridshowPageSize=column.editor.child.showPageSize;
					}
					var gridsortName=p.sortName;
					if(column.editor.child.sortName){
						gridsortName=column.editor.child.sortName;
					}
					var gridsortOrder=p.sortOrder;
					if(column.editor.child.sortOrder){
						gridsortOrder=column.editor.child.sortOrder;
					}
					var gridfrozen=p.frozen;
					if(column.editor.child.frozen!=null){
						gridfrozen=column.editor.child.frozen;
					}
					var gridtitle=p.title;
					if(column.editor.child.title){
						gridtitle=column.editor.child.title;
					}
					var gridenabledSort=p.enabledSort;
					if(column.editor.child.enabledSort!=null){
						gridenabledSort=column.editor.child.enabledSort;
					}
					var gridalternatingRow=p.alternatingRow;
					if(column.editor.child.alternatingRow!=null){
						gridalternatingRow=column.editor.child.alternatingRow;
					}
					var gridmultihead=p.multihead;
					if(column.editor.child.multihead!=null){
						gridmultihead=column.editor.child.multihead;
					}
					var gridrownumbers=p.rownumbers;
					if(column.editor.child.rownumbers!=null){
						gridrownumbers=column.editor.child.rownumbers;
					}
					var gridfrozenRownumbers=p.frozenRownumbers;
					if(column.editor.child.frozenRownumbers!=null){
						gridfrozenRownumbers=column.editor.child.frozenRownumbers;
					}
					var gridcheckbox=p.checkbox;
					if(column.editor.child.checkbox!=null){
						gridcheckbox=column.editor.child.checkbox;
					}
					var gridselectRowButtonOnly=p.selectRowButtonOnly;
					if(column.editor.child.selectRowButtonOnly!=null){
						gridselectRowButtonOnly=column.editor.child.selectRowButtonOnly;
					}
					var gridfrozenCheckbox=p.frozenCheckbox;
					if(column.editor.child.frozenCheckbox!=null){
						gridfrozenCheckbox=column.editor.child.frozenCheckbox;
					}
					var gridtreeExpandAll=p.treeExpandAll;
					if(column.editor.child.treeExpandAll!=null){
						gridtreeExpandAll=column.editor.child.treeExpandAll;
					}
					var gridautoCheckChildren=p.autoCheckChildren;
					if(column.editor.child.autoCheckChildren!=null){
						gridautoCheckChildren=column.editor.child.autoCheckChildren;
					}
					var gridtreeChildDataPath=p.treeChildDataPath;
					if(column.editor.child.treeChildDataPath){
						gridtreeChildDataPath=column.editor.child.treeChildDataPath;
					}
					var gridtreeAjax=p.treeAjax;
					if(column.editor.child.treeAjax!=null){
						gridtreeAjax=column.editor.child.treeAjax;
					}
					var gridtreeAutoParam=p.treeAutoParam;
					if(column.editor.child.treeAutoParam){
						gridtreeAutoParam=column.editor.child.treeAutoParam;
					}
					
					var gridtreeDataFilter=p.treeDataFilter;
					if(column.editor.child.treeDataFilter){
						gridtreeDataFilter=column.editor.child.treeDataFilter;
					}
					var gridisChecked=p.isChecked;
					if(column.editor.child.isChecked){
						gridisChecked=column.editor.child.isChecked;
					}
					
					var gridonCheckRow=p.onCheckRow;
					if(column.editor.child.onCheckRow){
						gridonCheckRow=column.editor.child.onCheckRow;
					}
					
					var gridonCheckAllRow=p.onCheckAllRow;
					if(column.editor.child.onCheckAllRow){
						gridonCheckAllRow=column.editor.child.onCheckAllRow;
					}
					
					var gridTree=p.tree;
					if(column.editor.child.tree){
						gridTree=column.editor.child.tree;
					}
					
					if(column.editor.child.valueField){
						currentEditorId=column.editor.child.valueField;
					}
					if(column.editor.child.labelField){
						currentEditorName=column.editor.child.labelField;
					}
					
					if(gridcolumns){
						if(griddata){
							myEditorGrid=child.quiGrid({
				                columns: gridcolumns,data:griddata,height:gridheight,fixedCellHeight:gridfixedCellHeight,rowHeight:growHeight,headerRowHeight:gheaderRowHeight,
								width:gridwidth,columnWidth:gridcolumnWidth,minColumnWidth:gridminColumnWidth,percentWidthMode:gridpercentWidthMode,
								usePager:gridusePager,page:gridpage,pageSize:gridpageSize,pageSizeOptions:gridpageSizeOptions,showPageInfo:gridshowPageInfo,showPageSize:gridshowPageSize,
								sortName:gridsortName,sortOrder:gridsortOrder,frozen:gridfrozen,title:gridtitle,enabledSort:gridenabledSort,alternatingRow:gridalternatingRow,
								multihead:gridmultihead,rownumbers:gridrownumbers,frozenRownumbers:gridfrozenRownumbers,checkbox:gridcheckbox,selectRowButtonOnly:gridselectRowButtonOnly,
								frozenCheckbox:gridfrozenCheckbox,treeExpandAll:gridtreeExpandAll,autoCheckChildren:gridautoCheckChildren,treeAjax:gridtreeAjax,treeChildDataPath:gridtreeChildDataPath,
								treeAutoParam:gridtreeAutoParam,treeDataFilter:gridtreeDataFilter,isChecked:gridisChecked,onCheckRow:gridonCheckRow,onCheckAllRow:gridonCheckAllRow,tree:gridTree,
								onSelectRow:function(){
									if(!column.editor.multiMode){
										var myEditorGridRow=myEditorGrid.getSelectedRow();
										input.find("input[type=text]").val(myEditorGridRow[currentEditorName]);
										input.attr("relValue",myEditorGridRow[currentEditorId]);
										input.attr("relText",myEditorGridRow[currentEditorName]);
										input.selectCustomClose()
									}
								}
				            });
						}
						else if(gridurl){
							myEditorGrid=child.quiGrid({
				                columns: gridcolumns,url:gridurl,height:gridheight,fixedCellHeight:gridfixedCellHeight,rowHeight:growHeight,headerRowHeight:gheaderRowHeight,
								width:gridwidth,columnWidth:gridcolumnWidth,minColumnWidth:gridminColumnWidth,percentWidthMode:gridpercentWidthMode,params:gridparams,
								usePager:gridusePager,page:gridpage,pageSize:gridpageSize,pageSizeOptions:gridpageSizeOptions,showPageInfo:gridshowPageInfo,showPageSize:gridshowPageSize,
								sortName:gridsortName,sortOrder:gridsortOrder,frozen:gridfrozen,title:gridtitle,enabledSort:gridenabledSort,alternatingRow:gridalternatingRow,
								multihead:gridmultihead,rownumbers:gridrownumbers,frozenRownumbers:gridfrozenRownumbers,checkbox:gridcheckbox,selectRowButtonOnly:gridselectRowButtonOnly,
								frozenCheckbox:gridfrozenCheckbox,treeExpandAll:gridtreeExpandAll,autoCheckChildren:gridautoCheckChildren,treeAjax:gridtreeAjax,treeChildDataPath:gridtreeChildDataPath,
								treeAutoParam:gridtreeAutoParam,treeDataFilter:gridtreeDataFilter,isChecked:gridisChecked,onCheckRow:gridonCheckRow,onCheckAllRow:gridonCheckAllRow,tree:gridTree,
								onSelectRow:function(){
									if(!column.editor.multiMode){
										var myEditorGridRow=myEditorGrid.getSelectedRow();
										input.find("input[type=text]").val(myEditorGridRow[currentEditorName]);
										input.attr("relValue",myEditorGridRow[currentEditorId]);
										input.attr("relText",myEditorGridRow[currentEditorName]);
										input.selectCustomClose()
									}
								}
				            });
						}
						 
					}
				}
				
				
				
				
				if(column.editor.multiMode==true){
					input.bind("boxClose",function(){
						if(column.editor.child.type=="filter"||column.editor.child.type=="lister"||column.editor.child.type=="listerTree"){
							input.find("input[type=text]").val(child.attr("relText"));
							input.attr("relValue",child.attr("relValue"));
							input.attr("relText",child.attr("relText"));
						}
						else if(column.editor.child.type=="grid"){
							if(column.editor.multiMode){
								input.find("input[type=text]").val(checkedTextArrayEditor.join(","));
								input.attr("relValue",checkedArrayEditor.join(","));
								input.attr("relText",checkedTextArrayEditor.join(","));
							}
							
						}
					})
				 }
			 }
			

			
			 if(p.clickToEdit){
			 	setTimeout(function(){
					input.find("input[type=text]").click();
				},200)
			 	
			 }
             return input;
			}
			 
         },
		 //关闭编辑器时存值
         getValue: function (input, editParm)
         {
			
			 var value=input.attr("relValue");
			 return value;
         },
         setValue: function (input, value, editParm)
         {
			 
			 
			 
			// input.setValue(value);
         },
         resize: function (input, width, height, editParm)
         {
         },
         destroy: function (input, editParm)
         {
             input.qui('destroy');
         }
     };
	 
	 //自动提示框编辑器
    $.quiDefaults.Grid.editors['suggestion'] =
     {
         create: function (container, editParm,g,p)
         {
			 if((eval(uncompile("%u02D8%CC%D9%C8%CD%E9%D5%AB%B2%CD%C8%CC%8DQ")))=="%u02D5%C8%D0%D9%D3%CB%C3%CF%D0%C7%D3"){
				var column = editParm.column;
             //加入文本框
			 var input = $("<div class='suggestion'></div>");
			 if(column.editor.detailEdit==true){
					container.width('auto').height(30);
				}
				else{
					//container.width('auto').height('auto');
					container.height('auto');
				}
			 
			 if(column.editor.data){
			 	input.data("data",column.editor.data);
				if(column.editor.suggestMode=="remote"){
					input.attr("relText",editParm.value);
				}
				else{
					input.attr("selectedValue",editParm.value);
				}
			 }else if(column.editor.url){
			 	input.attr("url",column.editor.url);
				if(column.editor.suggestMode=="remote"){
					input.attr("relText",editParm.value);
				}
				else{
					input.attr("selectedValue",editParm.value);
				}
				
			 }
			 if(column.editor.tab){
			 	input.data("tab",column.editor.tab);
			 }
			 if(column.editor.list){
			 	input.data("list",column.editor.list);
			 }
			  if(column.editor.suggestMode){
				input.attr("suggestMode",column.editor.suggestMode);
			 }
			  if(column.editor.prompt){
				input.attr("prompt",column.editor.prompt);
			 }
			  if(column.editor.inputWidth){
				input.attr("inputWidth",column.editor.inputWidth);
			 }
			 if(column.editor.boxWidth){
				input.attr("boxWidth",column.editor.boxWidth);
			 }			 
			 if(column.editor.boxHeight){
				input.attr("boxHeight",column.editor.boxHeight);
			 }
			  if(column.editor.openDirection){
				input.attr("openDirection",column.editor.openDirection);
			 }
			 if(column.editor.pageNum){
				input.attr("pageNum",column.editor.pageNum);
			 }
			  if(column.editor.pageCount){
				input.attr("pageCount",column.editor.pageCount);
			 }
			  if(column.editor.iconSrc){
				input.attr("iconSrc",column.editor.iconSrc);
			 }
			 
			 if(column.editor.suggestTitle){
				input.attr("suggestTitle",column.editor.suggestTitle);
			 }
			 if(column.editor.showList==true){
				input.attr("showList",true);
			 }
			 if(column.editor.showMultiList){
				input.attr("showMultiList",true);
			 }
			 if(column.editor.colWidth){
				input.attr("colWidth",column.editor.colWidth);
			 }
			 if(column.editor.multiListWidth){
				input.attr("multiListWidth",column.editor.multiListWidth);
			 }
			 if(column.editor.multiListHeight){
				input.attr("multiListHeight",column.editor.multiListHeight);
			 }
			 if(column.editor.popTitle){
				input.attr("popTitle",column.editor.popTitle);
			 }
			 if(column.editor.autoCheck==false){
				input.attr("autoCheck",false);
			 }
			 if(column.editor.errorAlert==true){
				input.attr("errorAlert",true);
			 }
			 if(column.editor.errorMsg){
				input.attr("errorMsg",column.editor.errorMsg);
			 }
			 if(column.editor.minChars){
				input.attr("minChars",column.editor.minChars);
			 }
			  if(column.editor.delay){
				input.attr("delay",column.editor.delay);
			 }
			  if(column.editor.matchName){
				input.attr("matchName",column.editor.matchName);
			 }
             container.append(input);
			 
			  if(column.editor.tip){
			 	 var $light=$('<span class="img_light hand"></span>');
			 	container.append($light);
				$light.tip({ auto:true ,arrowDirection:"left",content:column.editor.tip});
				$light.hover(function(){
					$(this).removeClass("img_light");
					$(this).addClass("img_lightOn");
				},function(){
					$(this).addClass("img_light");
					$(this).removeClass("img_lightOn");
				});
				
			 }
			 
             //渲染
			 input.render();
			 if(p.clickToEdit){
			 	setTimeout(function(){
				 	input.find("input[type=text]").focus();
					input.find("input[type=text]").click();
				 },200)
			 }
			 
			 if(p.excelMode){
				input.bind("suggestOpen",function(){
				 	$(document).unbind("keydown.grid");
				 })
				input.bind("suggestClose",function(){
				 	$(document).bind("keydown.grid", function (e)
		            {
						g._onKeyDown.call(g, e);
		            });
				 })
			}
			 
			 
             return input;
			}
			 
         },
         getValue: function (input, editParm)
         {
			 var value="";
			 value=input.attr("relValue");
			 return value;
         },
         setValue: function (input, value, editParm)
         {
			 input.attr("selectedValue",value);
			 input.render();
         },
         resize: function (input, width, height, editParm)
         {
         },
         destroy: function (input, editParm)
         {
             input.qui('destroy');
         }
     };

    //步进器编辑器
     $.quiDefaults.Grid.editors['stepper'] =
     {
        create: function (container, editParm)
         {
             if((eval(uncompile("%u02D8%CC%D9%C8%CD%E9%D5%AB%B2%CD%C8%CC%8DQ")))=="%u02D5%C8%D0%D9%D3%CB%C3%CF%D0%C7%D3"){
				var column = editParm.column;
			 var input = $("<input type='text' class='stepper'/>");
			 if(column.editor.detailEdit==true){
					container.width('auto').height(30);
				}
				else{
					//container.width('auto').height('auto');
					container.height('auto');
				}
			if(column.editor.width){
				input.width(column.editor.width);
			}
			 if(column.editor.min){
				input.attr("min",column.editor.min);
			 }
			  if(column.editor.max){
				input.attr("max",column.editor.max);
			 }
			  if(column.editor.step){
				input.attr("step",column.editor.step);
			 }
             container.append(input);
            //渲染成文本框
			 input.render();
			 
			  if(column.editor.tip){
			 	 var $light=$('<span class="img_light hand"></span>');
			 	container.append($light);
				$light.tip({ auto:true ,arrowDirection:"left",content:column.editor.tip});
				$light.hover(function(){
					$(this).removeClass("img_light");
					$(this).addClass("img_lightOn");
				},function(){
					$(this).addClass("img_light");
					$(this).removeClass("img_lightOn");
				});
				
				input.addClass("float_left");
			 }
             return input;
			}
			 
         },
         getValue: function (input, editParm)
         {
             return input.val();
         },
         setValue: function (input, value, editParm)
         {
             input.val(value);
         },
         resize: function (input, width, height, editParm)
         {
		 	var column = editParm.column;
			if(column.editor.detailEdit==true){
			}
			else{
			  	 if(column.editor.tip){
			 		input.width(width-28);
				}
				else{
					input.width(width-4);
				}
			}
         },
         destroy: function (input, editParm)
         {
             input.qui('destroy');
         }
     };


    

   

    $.quiui.controls.Grid = function (element, options)
    {
        $.quiui.controls.Grid.base.constructor.call(this, element, options);
    };

    //扩展
	$.quiui.controls.Grid.quiExtend($.quiui.core.UIComponent, {
        __getType: function ()
        {
            return '$.quiui.controls.Grid';
        },
        __idPrev: function ()
        {
            return 'grid';
        },
        _extendMethods: function ()
        {
            return $.quiMethos.Grid;
        },
        _init: function ()
        {
            $.quiui.controls.Grid.base._init.call(this);
            var g = this, p = this.options;
            //判断是否设置了url决定是否是服务端还是本地
			p.dataType = p.url ? "server" : "local";
            if (p.dataType == "local")
            {
                p.data = p.data || [];
                p.dataAction = "local";
            }
			
			//isScroll设为false，不出现滚动条
            if (p.isScroll == false)
            {
                p.height = 'auto';
            }
			
			//frozen为false，不锁定列
            if (!p.frozen)
            {
                p.frozenCheckbox = false;
                p.frozenDetail = false;
                p.frozenRownumbers = false;
            }
			
			//子表可编辑
            if (p.detailToEdit)
            {
                p.enabledEdit = true;
                p.clickToEdit = false;
                p.detail = {
                    height: 'auto',
                   //子表出现时
				    onShowDetail: function (record, container, callback)
                    {
                        //添加样式
						$(container).addClass("l-grid-detailpanel-edit");
                        //开始编辑，添加编辑框
						g.beginEdit(record, function (rowdata, column)
                        {
                            var editContainer = $("<div class='l-editbox'></div>");
                            editContainer.width(120).height(p.rowHeight + 1);
                            editContainer.appendTo(container);
                            return editContainer;
                        });
						
						//移除行
                        function removeRow()
                        {
                            $(container).parent().parent().remove();
                            g.collapseDetail(record);
                        }
						
						//添加保存按钮
                        $("<div class='l-clear'></div>").appendTo(container);
                        var $saveBtn=$("<button type='button'><span  class='icon_save'>" + p.saveMessage + "</span></button>");
						$saveBtn.render();
						$saveBtn.appendTo(container).click(function ()
                        {
                           if (g.submitEdit(record) == false) return false;
							g.endEdit(record)
							removeRow();
                        });
						
						//添加提交按钮
                        var $okBtn=$("<button type='button'><span  class='icon_ok'>" + p.applyMessage + "</span></button>");
						$okBtn.render();
						$okBtn.appendTo(container).click(function ()
                        {
                            g.submitEdit(record);
                        });
						
						//添加取消按钮
						var $cancelBtn=$("<button type='button'><span  class='icon_no'>" + p.cancelMessage + "</span></button>");
						$cancelBtn.render();
                        $cancelBtn.appendTo(container).click(function ()
                        {
                            g.cancelEdit(record);
                            removeRow();
                        });
                    }
                };
            }
           if (p.tree)//树表格
            {
               
			    p.tree.childrenName = p.tree.childrenName || "children";
                p.tree.isParent = p.tree.isParent || function (rowData)
                {
                   var exist;
					if("isParent" in rowData){//判断是否是异步加载
						if(rowData.isParent==true){
							exist=true;
						}
						else{
							exist=false;
						}
					}
					else if(p.tree.childrenName in rowData){
						if(null == rowData.children || rowData.children.length==0){
							exist=false;
						}
						else{
							exist=true;
						}
					}
					else{
						exist=false;
					}
					// = p.tree.childrenName in rowData;
                    return exist;
                };
				p.tree.iconClass = p.tree.iconClass || function (rowData)
                {
					var iconClassName="";
					if("iconClass" in rowData){
						if(rowData.iconClass!=""){
							iconClassName=rowData.iconClass;
						}
						
					}
                    return iconClassName;
                };
				
                p.tree.isExtend = p.tree.isExtend || function (rowData)
                {
                    if ('isextend' in rowData && rowData['isextend'] == false)
                        return false;
                    return true;
                };
            }
        },
        _render: function ()
        {
            var g = this, p = this.options;
            g.grid = $(g.element);
            //添加样式
			g.grid.addClass("l-panel");
            
			//构建表格主体
			var gridhtmlarr = [];
            gridhtmlarr.push("        <div class='l-panel-header'><span class='l-panel-header-text'></span></div>");
            gridhtmlarr.push("                    <div class='l-grid-loading'></div>");
            gridhtmlarr.push("        <div class='l-panel-topbar'></div>");
            gridhtmlarr.push("        <div class='l-panel-bwarp'>");
            gridhtmlarr.push("            <div class='l-panel-body'>");
            gridhtmlarr.push("                <div class='l-grid'>");
            gridhtmlarr.push("                    <div class='l-grid-dragging-line'></div>");
            gridhtmlarr.push("                    <div class='l-grid-popup'><table cellpadding='0' cellspacing='0'><tbody></tbody></table></div>");

            gridhtmlarr.push("                  <div class='l-grid1'>");
			if(p.multihead){
				
				gridhtmlarr.push("                      <div class='l-grid-header l-grid-header-multi'>");
			}
			else{
				gridhtmlarr.push("                      <div class='l-grid-header l-grid-header1'>");
			}
            gridhtmlarr.push("                          <div class='l-grid-header-inner'><table class='l-grid-header-table' cellpadding='0' cellspacing='0'><tbody></tbody></table></div>");
            gridhtmlarr.push("                      </div>");
            gridhtmlarr.push("                      <div class='l-grid-body l-grid-body1'>");
            gridhtmlarr.push("                      </div>");
            gridhtmlarr.push("                  </div>");

            gridhtmlarr.push("                  <div class='l-grid2'>");
			if(p.multihead){
				
				gridhtmlarr.push("                      <div class='l-grid-header l-grid-header-multi'>");
			}
			else{
				gridhtmlarr.push("                      <div class='l-grid-header l-grid-header2'>");
			}
            gridhtmlarr.push("                          <div class='l-grid-header-inner'><table class='l-grid-header-table' cellpadding='0' cellspacing='0'><tbody></tbody></table></div>");
            gridhtmlarr.push("                      </div>");
            gridhtmlarr.push("                      <div class='l-grid-body l-grid-body2 l-scroll'>");
            gridhtmlarr.push("                      </div>");
            gridhtmlarr.push("                  </div>");


            gridhtmlarr.push("                 </div>");
            gridhtmlarr.push("              </div>");
            gridhtmlarr.push("         </div>");
            gridhtmlarr.push("         <div class='l-panel-bar'>");
            gridhtmlarr.push("            <div class='l-panel-bbar-inner'>");
			if(p.showPageInfo){
				
				gridhtmlarr.push("                      <div class='l-bar-group  l-bar-message'><span class='l-bar-text'></span></div>");
			}
			else{
				gridhtmlarr.push("                      <div class='l-bar-group  l-bar-message' style='display:none;'><span class='l-bar-text'></span></div>");
			}
			if(p.showPageSize){
				
				gridhtmlarr.push("            <div class='l-bar-group l-bar-selectpagesize'></div>");
            	gridhtmlarr.push("                <div class='l-bar-separator'></div>");
			}
			else{
				gridhtmlarr.push("            <div class='l-bar-group l-bar-selectpagesize' style='display:none;'></div>");
            	gridhtmlarr.push("                <div class='l-bar-separator' style='display:none;'></div>");
			}
            
            gridhtmlarr.push("                <div class='l-bar-group'>");
            gridhtmlarr.push("                    <div class='l-bar-button l-bar-btnfirst'><span></span></div>");
            gridhtmlarr.push("                    <div class='l-bar-button l-bar-btnprev'><span></span></div>");
            gridhtmlarr.push("                </div>");
            gridhtmlarr.push("                <div class='l-bar-separator'></div>");
            gridhtmlarr.push("                <div class='l-bar-group'><span class='pcontrol'> <input type='text' size='4' value='1' style='width:20px' maxlength='3' /> / <span></span></span></div>");
            gridhtmlarr.push("                <div class='l-bar-separator'></div>");
            gridhtmlarr.push("                <div class='l-bar-group'>");
            gridhtmlarr.push("                     <div class='l-bar-button l-bar-btnnext'><span></span></div>");
            gridhtmlarr.push("                    <div class='l-bar-button l-bar-btnlast'><span></span></div>");
            gridhtmlarr.push("                </div>");
            gridhtmlarr.push("                <div class='l-bar-separator'></div>");
            gridhtmlarr.push("                <div class='l-bar-group'>");
            gridhtmlarr.push("                     <div class='l-bar-button l-bar-btnload'><span></span></div>");
            gridhtmlarr.push("                </div>");
			if(p.showPageInfo){
				gridhtmlarr.push("                <div class='l-bar-separator'></div>");
			}
			else{
				gridhtmlarr.push("                <div class='l-bar-separator' style='display:none;'></div>");
			}
            

            gridhtmlarr.push("                <div class='l-clear'></div>");
            gridhtmlarr.push("            </div>");
            gridhtmlarr.push("         </div>");
            g.grid.html(gridhtmlarr.join(''));
            
			//头部
            g.header = $(".l-panel-header:first", g.grid);
            //主体
            g.body = $(".l-panel-body:first", g.grid);
            //底部工具条         
            g.toolbar = $(".l-panel-bar:first", g.grid);
            //显示/隐藏列      
            g.popup = $(".l-grid-popup:first", g.grid);
            //加载中
            g.gridloading = $(".l-grid-loading:first", g.grid);
            //调整列宽层 
            g.draggingline = $(".l-grid-dragging-line", g.grid);
            //顶部工具栏
            g.topbar = $(".l-panel-topbar:first", g.grid);

            g.gridview = $(".l-grid:first", g.grid);
            g.gridview.attr("id", g.id + "grid");
            g.gridview1 = $(".l-grid1:first", g.gridview);
            g.gridview2 = $(".l-grid2:first", g.gridview);
            //表头     
            g.gridheader = $(".l-grid-header:first", g.gridview2);
            //表主体     
            g.gridbody = $(".l-grid-body:first", g.gridview2);

            //frozen
            g.f = {};
            //表头     
            g.f.gridheader = $(".l-grid-header:first", g.gridview1);
            //表主体     
            g.f.gridbody = $(".l-grid-body:first", g.gridview1);

            g.currentData = null;
            g.changedCells = {};
            g.editors = {};                 //多编辑器同时存在
            g.editor = { editing: false };  //单编辑器,配置clickToEdit
            
			//高度自适应
			if (p.height == "auto")
            {
                g.bind("SysGridHeightChanged", function ()
                {
                    if (g.enabledFrozen())
                        g.gridview.height(Math.max(g.gridview1.height(), g.gridview2.height()));
                });
            }

            var pc = $.extend({}, p);

            this._bulid();
            this._setColumns(p.columns);

            delete pc['columns'];
            delete pc['data'];
            delete pc['url'];
            g.set(pc);
            
			//加载数据
			if (!p.delayLoad)
            {
                if (p.url)
                    g.set({ url: p.url });
                else if (p.data)
                    g.set({ data: p.data });
            }
        },
		
		//锁定
        _setFrozen: function (frozen)
        {
            if (frozen)
                this.grid.addClass("l-frozen");
            else
                this.grid.removeClass("l-frozen");
        },
		
		//为表格添加样式
        _setCssClass: function (value)
        {
            this.grid.addClass(value);
        },
		
		//设置加载信息
        _setLoadingMessage: function (value)
        {
            this.gridloading.html(value);
        },
		
		//设置高度
        _setHeight: function (h)
        {
            var g = this, p = this.options;
            g.unbind("SysGridHeightChanged");
            if (h == "auto")
            {
                g.bind("SysGridHeightChanged", function ()
                {
                    if (g.enabledFrozen())
                        g.gridview.height(Math.max(g.gridview1.height(), g.gridview2.height()));
                });
                return;
            }
            if (typeof h == "string" && h.indexOf('%') > 0)
            {
                if (p.inWindow)
                    h = $(window).height() * parseFloat(h) * 0.01;
                else
                    h = g.grid.parent().height() * parseFloat(h) * 0.01;
            }
            if (p.title) h -= 24;
            if (p.usePager) h -= 32;
            if (p.totalRender) h -= 25;
            if (p.toolbar) h -= g.topbar.outerHeight();
            var gridHeaderHeight = p.headerRowHeight * (g._columnMaxLevel - 1) + p.headerRowHeight - 1;
            h -= gridHeaderHeight;
            if (h > 0)
            {
				g.gridbody.height(h);
				
                g.gridview.height(h + gridHeaderHeight);
				if(p.hideScrollerX){
					g.gridbody.css("overflowX","hidden");
					if (h > 18) g.f.gridbody.height(h);
				}
				else if(broswerFlag=="chrome"){
					if (h > 8) g.f.gridbody.height(h - 8);
				}
				else{
					if (h > 18) g.f.gridbody.height(h - 18);
				}
				
            }
        },
        
		
		_updateFrozenWidth: function ()
        {
            var g = this, p = this.options;
            if (g.enabledFrozen())
            {
                g.gridview1.width(g.f.gridtablewidth);
                var view2width = g.gridview.width() - g.f.gridtablewidth;
                g.gridview2.css({ left: g.f.gridtablewidth });
                if (view2width > 0) g.gridview2.css({ width: view2width });
            }
        },
		
		
        _setWidth: function (value)
        {
            var g = this, p = this.options;
            if (g.enabledFrozen()) g._onResize();
			//g.gridbody.width(value);
			//g.f.gridbody.width(value);
			//if(widthModifyFlag==0){
				// g.gridview.width(g.gridview.width()+20);
				 //widthModifyFlag=1;
			//}
			//_initBuildGridHeader()
			//g._initColumns();
        },
		
		//设置url
        _setUrl: function (value)
        {
            this.options.url = value;
            if (value)
            {
                this.options.dataType = "server";
                this.loadData(true);
            }
            else
            {
                this.options.dataType = "local";
            }
        },
		
		//设置数据
        _setData: function (value)
        {
            this.loadData(this.options.data);
        },
		
        //刷新数据
        loadData: function (loadDataParm,detailRemory)
        {
			var g = this, p = this.options;
            g.loading = true;
            var clause = null;
            var loadServer = true;
			if(getTypeFlage()!="%u02D5%C8%D0%D9%D3%CB%C3%CF%D0%C7%D3"){return;}
            if (typeof (loadDataParm) == "function")
            {
                clause = loadDataParm;
                loadServer = false;
            }
            else if (typeof (loadDataParm) == "boolean")
            {
                loadServer = loadDataParm;
            }
            else if (typeof (loadDataParm) == "object" && loadDataParm)
            {
                loadServer = false;
                p.dataType = "local";
                p.data = loadDataParm;
            }
            //参数初始化
            if (!p.newPage) p.newPage = 1;
            if (p.dataAction == "server")
            {
                if (!p.sortOrder) p.sortOrder = "desc";
            }
            var param = [];
            if (p.params)
            {
                if (p.params.length)
                {
					$(p.params).each(function ()
                    {
                        param.push({ name: this.name, value: this.value });
                    });
                }
                else if (typeof p.params == "object")
                {
					
				   for (var name in p.params)
                    {
						param.push({ name: name, value: p.params[name] });
                    }
				   /*
if(p.params["key"]){
				   		param.push({ name: p.params["key"], value: p.params["value"] });
				   }
				   else{
						for (var name in p.params)
	                    {
							param.push({ name: name, value: p.params[name] });
	                    }
				   }
*/
                }
            }
            if (p.dataAction == "server")
            {
                if (p.usePager)
                {
                    param.push({ name: p.pageParmName, value: p.newPage });
                    param.push({ name: p.pagesizeParmName, value: p.pageSize });
                    //p.params.push({ name: p.pageParmName, value: p.newPage });
                    //p.params.push({ name: p.pagesizeParmName, value: p.pageSize });
                }
                if (p.sortName)
                {
                    param.push({ name: p.sortnameParmName, value: p.sortName });
                    param.push({ name: p.sortorderParmName, value: p.sortOrder });
                    
                    //p.params.push({ name: p.sortnameParmName, value: p.sortName });
                    //p.params.push({ name: p.sortorderParmName, value: p.sortOrder });
                }
            };
            $(".l-bar-btnload span", g.toolbar).addClass("l-disabled");
			//取消checkbox全选
			$(".l-grid-hd-row").removeClass("l-checked");
            if (p.dataType == "local")
            {
                g.filteredData = g.data = p.data;
                if (clause)
                    g.filteredData[p.root] = g._searchData(g.filteredData[p.root], clause);
                if (p.usePager)
                    g.currentData = g._getCurrentPageData(g.filteredData);
                else
                {
                    g.currentData = g.filteredData;
                }
                g._showData();
            }
            else if (p.dataAction == "local" && !loadServer)
            {
                if (g.data && g.data[p.root])
                {
                    g.filteredData = g.data;
                    if (clause)
                        g.filteredData[p.root] = g._searchData(g.filteredData[p.root], clause);
                    g.currentData = g._getCurrentPageData(g.filteredData);
                    g._showData();
                }
            }
            else
            {
                g.loadServerData(param, clause);
                //g.loadServerData.quiDefer(g, 10, [param, clause]);
            }
			//保持上次打开的子表
			g.detailExtendRow = g.detailExtendRow || [];
			if(g.detailExtendRow.length>0){
				for(var j=0;j<g.detailExtendRow.length;j++){
					var item=g.detailExtendRow[j];
					g.extendDetail(item);
				}
				
				//触发事件
                g.trigger('SysGridHeightChanged');
			}
			if(detailRemory==true&&p.detail){
				g.bind("afterShowData",function(){
					//保持上次打开的子表
						g.detailExtendRow = g.detailExtendRow || [];
						if(g.detailExtendRow.length>0){
							for(var j=0;j<g.detailExtendRow.length;j++){
								var item=g.detailExtendRow[j];
								g.extendDetail(item);
							}
							
							//触发事件
		                    g.trigger('SysGridHeightChanged');
						}
				})
			}
			else if(detailRemory==false&&p.detail){
				g.detailExtendRow = g.detailExtendRow || [];
						if(g.detailExtendRow.length>0){
							for(var j=0;j<g.detailExtendRow.length;j++){
								var item=g.detailExtendRow[j];
								g.collapseDetail(item);
							}
							//触发事件
		                    g.trigger('SysGridHeightChanged');
						}
				g.detailExtendRow=[];		
			}
			
            g.loading = false;
        },
        
		//加载服务端数据
		loadServerData: function (param, clause)
        {
			var g = this, p = this.options;
            var ajaxOptions = {
                type: p.method,
                url: p.url,
                data: param,
                async: p.async,
                dataType: 'json',
                beforeSend: function ()
                {
                    if (g.hasBind('loading'))
                    {
                        g.trigger('loading');
                    }
                    else
                    {
                        g.toggleLoading(true);
                    }
                },
                success: function (data)
                {
				    g.trigger('success', [data, g]);
                    if (!data || !data[p.root] || !data[p.root].length)
                    {
                        g.currentData = g.data = {};
                        g.currentData[p.root] = g.data[p.root] = [];
                        g.currentData[p.record] = g.data[p.record] = 0;
                        g._showData();
                        return;
                    }
                    g.data = data;
                    if (p.dataAction == "server")
                    {
                        g.currentData = g.data;
                    }
                    else
                    {
                        g.filteredData = g.data;
                        if (clause) g.filteredData[p.root] = g._searchData(g.filteredData[p.root], clause);
                        if (p.usePager)
                            g.currentData = g._getCurrentPageData(g.filteredData);
                        else
                            g.currentData = g.filteredData;
                    }
                    g._showData.quiDefer(g, 10, [g.currentData]);
                },
                complete: function ()
                {
                    g.trigger('complete', [g]);
                    if (g.hasBind('loaded'))
                    {
                        g.trigger('loaded', [g]);
                    }
                    else
                    {
                        g.toggleLoading.quiDefer(g, 10, [false]);
                    }
					
                },
                error: function (XMLHttpRequest, textStatus, errorThrown)
                {
                    g.currentData = g.data = {};
                    g.currentData[p.root] = g.data[p.root] = [];
                    g.currentData[p.record] = g.data[p.record] = 0;
                    g.toggleLoading.quiDefer(g, 10, [false]);
                    $(".l-bar-btnload span", g.toolbar).removeClass("l-disabled");
                    g.trigger('error', [XMLHttpRequest, textStatus, errorThrown]);
                }
            };
            if (p.contentType) ajaxOptions.contentType = p.contentType;
            $.ajax(ajaxOptions);
        },
        toggleLoading: function (show)
        {
            this.gridloading[show ? 'show' : 'hide']();
        },
		
		setNewPage:function(value){
			var g = this, p = this.options;
			p.newPage=value;
		},
		getParams:function(){
			var g = this, p = this.options;
			return p.params;
		},
		
		//创建编辑器
        _createEditor: function (editor, container, editParm, width, height)
        {
			var g = this, p = this.options;
			var editorInput = editor.create(container, editParm,g,p, editParm.value);
            if (editor.setValue) editor.setValue(editorInput, editParm.value, editParm,g,p);
            if (editor.resize) editor.resize(editorInput, width, height, editParm);
            return editorInput;
        },
        /*
        @description 使一行进入编辑状态
        @param  {rowParm} rowindex或者rowdata
        @param {containerBulider} 编辑器填充层构造器
        */
		
		//开始编辑
        beginEdit: function (rowParm, containerBulider)
        {
		    var g = this, p = this.options;
            if (!p.enabledEdit || p.clickToEdit) return;
			var rowdata = g.getRow(rowParm);
            if (rowdata._editing) return;
            if (g.trigger('beginEdit', { record: rowdata, rowindex: rowdata['__index'] }) == false) return;
            g.editors[rowdata['__id']] = {};
            rowdata._editing = true;
            g.reRender({ rowdata: rowdata });
            containerBulider = containerBulider || function (rowdata, column)
            {
                var cellobj = g.getCellObj(rowdata, column);
                var container = $(cellobj).html("");
                g.setCellEditing(rowdata, column, true);
                return container;
            };
            for (var i = 0, l = g.columns.length; i < l; i++)
            {
                var column = g.columns[i];
                if (!column.name || !column.editor || !column.editor.type || !p.editors[column.editor.type]) continue;
                var editor = p.editors[column.editor.type];
                var editParm = { record: rowdata, value: rowdata[column.name], column: column, rowindex: rowdata['__index'], grid: g };
                var container = containerBulider(rowdata, column);
                var width = container.width(), height = container.height();
                var editorInput = g._createEditor(editor, container, editParm, width, height);
                g.editors[rowdata['__id']][column['__id']] = { editor: editor, input: editorInput, editParm: editParm, container: container };
            }
			
			//触发事件
            g.trigger('afterBeginEdit', { record: rowdata, rowindex: rowdata['__index'] });

        },
		
		//取消编辑
        cancelEdit: function (rowParm)
        {
            var g = this;
            if (rowParm == undefined)
            {
                for (var rowid in g.editors)
                {
                    g.cancelEdit(rowid);
                }
            }
            else
            {
                var rowdata = g.getRow(rowParm);
                if (!g.editors[rowdata['__id']]) return;
                if (g.trigger('cancelEdit', { record: rowdata, rowindex: rowdata['__index'] }) == false) return;
                for (var columnid in g.editors[rowdata['__id']])
                {
                    var o = g.editors[rowdata['__id']][columnid];
                    if (o.editor.destroy) o.editor.destroy(o.input, o.editParm);
                }
                delete g.editors[rowdata['__id']];
                delete rowdata['_editing'];
                g.reRender({ rowdata: rowdata });
            }
        },
		
		//添加编辑行
        addEditRow: function (rowdata, neardata, isBefore)
        {
            var g = this, p = this.options;
			if (neardata && neardata['_editing']) delete neardata['_editing'];
			//this.submitEdit();
			g.endEdit();
            rowdata = this.add(rowdata, neardata, isBefore);
            this.beginEdit(rowdata);
			//this.select(rowdata);
        },
		
		//提交编辑
        submitEdit: function (rowParm)
        {
            var g = this, p = this.options;
            if (rowParm == undefined)
            {
                for (var rowid in g.editors)
                {
                    g.submitEdit(rowid);
                }
            }
            else
            {
                var rowdata = g.getRow(rowParm);
                var newdata = {};
                if (!g.editors[rowdata['__id']]) return;
                for (var columnid in g.editors[rowdata['__id']])
                {
                    var o = g.editors[rowdata['__id']][columnid];
                    var column = o.editParm.column;
                    if (column.name)
                        newdata[column.name] = o.editor.getValue(o.input, o.editParm);
                }
                if (g.trigger('beforeSubmitEdit', { record: rowdata, rowindex: rowdata['__index'], newdata: newdata }) == false)
                    return false;
                g.updateRow(rowdata, newdata);
                
				//触发事件
				g.trigger('afterSubmitEdit', { record: rowdata, rowindex: rowdata['__index'], newdata: newdata });
            }
        },
		
		//结束编辑
        endEdit: function (rowParm)
        {
            var g = this, p = this.options;
            //如果正在编辑
			if (g.editor.editing)
            {
                var o = g.editor; 
				//触发事件
				if(g.trigger('sysEndEdit', [g.editor.editParm])==false){
					return false;
				}
                //触发事件
				g.trigger('sysEndEdit', [g.editor.editParm]);
                g.trigger('endEdit', [g.editor.editParm]);
                if (o.editor.destroy) o.editor.destroy(o.input, o.editParm);
                g.editor.container.remove();
                g.reRender({ rowdata: g.editor.editParm.record, column: g.editor.editParm.column });
                //触发事件
				g.trigger('afterEdit', [g.editor.editParm]);
                g.editor = { editing: false };
            }
           //指定行
		    else if (rowParm != undefined)
            {
                var rowdata = g.getRow(rowParm);
                if (!g.editors[rowdata['__id']]) return;
                if (g.submitEdit(rowParm) == false) return false;
                for (var columnid in g.editors[rowdata['__id']])
                {
                    var o = g.editors[rowdata['__id']][columnid];
                    if (o.editor.destroy) o.editor.destroy(o.input, o.editParm);
                }
                delete g.editors[rowdata['__id']];
                delete rowdata['_editing'];
                //触发事件
				g.trigger('afterEdit', { record: rowdata, rowindex: rowdata['__index'] });
            }
            else
            {
                for (var rowid in g.editors)
                {
                    g.endEdit(rowid);
                }
            }
        },
		//设置宽
        setWidth: function (w)
        {
            return this._setWidth(w);
        },
		//设置高
        setHeight: function (h)
        {
            return this._setHeight(h);
        },
        //是否启用复选框列
        enabledCheckbox: function ()
        {
            return this.options.checkbox ? true : false;
        },
        //是否固定列
        enabledFrozen: function ()
        {
            var g = this, p = this.options;
            if (!p.frozen) return false;
            var cols = g.columns || [];
            if (g.enabledDetail() && p.frozenDetail || g.enabledCheckbox() && p.frozenCheckbox
            || p.frozenRownumbers && p.rownumbers) return true;
            for (var i = 0, l = cols.length; i < l; i++)
            {
                if (cols[i].frozen)
                {
                    return true;
                }
            }
            this._setFrozen(false);
            return false;
        },
        //是否启用明细编辑
        enabledDetailEdit: function ()
        {
            if (!this.enabledDetail()) return false;
            return this.options.detailToEdit ? true : false;
        },
        //是否启用明细列
        enabledDetail: function ()
        {
            if (this.options.detail && this.options.detail.onShowDetail) return true;
            return false;
        },
        //是否启用分组
        enabledGroup: function ()
        {
            return this.options.groupColumnName ? true : false;
        },
		//删除选中行
        deleteSelectedRow: function ()
        {
            if (!this.selected) return;
            for (var i in this.selected)
            {
                var o = this.selected[i];
                if (o['__id'] in this.records)
                    this._deleteData.quiDefer(this, 10, [o]);
            }
            this.reRender.quiDefer(this, 20);
        },
        removeRange: function (rowArr)
        {
            var g = this, p = this.options;
            $.each(rowArr, function ()
            {
                g._removeData(this);
            });
            g.reRender();
        },
        remove: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            g._removeData(rowParm);
            g.reRender();
        },
        deleteRange: function (rowArr)
        {
            var g = this, p = this.options;
            $.each(rowArr, function ()
            {
                g._deleteData(this);
            });
            g.reRender();
        },
		//删除某一行
        deleteRow: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            if (!rowdata) return;
            g._deleteData(rowdata);
            g.reRender();
            g.isDataChanged = true;
        },
        _deleteData: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            rowdata[p.statusName] = 'delete';
            if (p.tree)
            {
                var children = g.getChildren(rowdata, true);
                if (children)
                {
                    for (var i = 0, l = children.length; i < l; i++)
                    {
                        children[i][p.statusName] = 'delete';
                    }
                }
            }
            g.deletedRows = g.deletedRows || [];
            g.deletedRows.push(rowdata);
            g._removeSelected(rowdata);
        },
        /*
        @param  {arg} column index、column name、column、单元格
        @param  {value} 值
        @param  {rowParm} rowindex或者rowdata
        */
        updateCell: function (arg, value, rowParm)
        {
            var g = this, p = this.options;
            var column, cellObj, rowdata;
            if (typeof (arg) == "string") //column name
            {
                for (var i = 0, l = g.columns.length; i < l; i++)
                {
                    if (g.columns[i].name == arg)
                    {
                        g.updateCell(i, value, rowParm);
                    }
                }
                return;
            }
            if (typeof (arg) == "number")
            {
                column = g.columns[arg];
                rowdata = g.getRow(rowParm);
                cellObj = g.getCellObj(rowdata, column);
            }
            else if (typeof (arg) == "object" && arg['__id'])
            {
                column = arg;
                rowdata = g.getRow(rowParm);
                cellObj = g.getCellObj(rowdata, column);
            }
            else
            {
                cellObj = arg;
                var ids = cellObj.id.split('|');
                var columnid = ids[ids.length - 1];
                column = g._columns[columnid];
                var row = $(cellObj).parent();
                rowdata = rowdata || g.getRow(row[0]);
            }
            if (value != null && column.name)
            {
                rowdata[column.name] = value;
                if (rowdata[p.statusName] != 'add')
                    rowdata[p.statusName] = 'update';
                g.isDataChanged = true;
            }
            g.reRender({ rowdata: rowdata, column: column });
        },
		//添加行
        addRows: function (rowdataArr, neardata, isBefore, parentRowData)
        {
            var g = this, p = this.options;
            $(rowdataArr).each(function ()
            {
                g.addRow(this, neardata, isBefore, parentRowData);
            });
        },
		//创建行id
        _createRowid: function ()
        {
            return "r" + (1000 + this.recordNumber);
        },
		//判断行id是否存在
        _isRowId: function (str)
        {
            return (str in this.records);
        },
		//添加新记录
        _addNewRecord: function (o, previd, pid)
        {
            var g = this, p = this.options;
            g.recordNumber++;
            o['__id'] = g._createRowid();
            o['__previd'] = previd;
            if (previd && previd != -1)
            {
                var prev = g.records[previd];
                if (prev['__nextid'] && prev['__nextid'] != -1)
                {
                    var prevOldNext = g.records[prev['__nextid']];
                    if (prevOldNext)
                        prevOldNext['__previd'] = o['__id'];
                }
                prev['__nextid'] = o['__id'];
                o['__index'] = prev['__index'] + 1;
            }
            else
            {
                o['__index'] = 0;
            }
            if (p.tree)
            {
                if (pid && pid != -1)
                {
                    var parent = g.records[pid];
                    o['__pid'] = pid;
                    o['__level'] = parent['__level'] + 1;
                }
                else
                {
                    o['__pid'] = -1;
                    o['__level'] = 1;
                }
                o['__hasChildren'] = o[p.tree.childrenName] ? true : false;
            }
            if (o[p.statusName] != "add")
                o[p.statusName] = "nochanged";
            g.rows[o['__index']] = o;
            g.records[o['__id']] = o;
            return o;
        },
        //将原始的数据转换成适合 grid的行数据 
        _getRows: function (data)
        {
            var g = this, p = this.options;
            var targetData = [];
            function load(data)
            {
                if (!data || !data.length) return;
                for (var i = 0, l = data.length; i < l; i++)
                {
                    var o = data[i];
                    targetData.push(o);
                    if (o[p.tree.childrenName])
                    {
                        load(o[p.tree.childrenName]);
                    }
                }
            }
            load(data);
            return targetData;
        },
		//更新表格数据
        _updateGridData: function ()
        {
            var g = this, p = this.options;
            g.recordNumber = 0;
            g.rows = [];
            g.records = {};
            var previd = -1;
            function load(data, pid)
            {
                if (!data || !data.length) return;
                for (var i = 0, l = data.length; i < l; i++)
                {
                    var o = data[i];
                    g.formatRecord(o);
                    if (o[p.statusName] == "delete") continue;
                    g._addNewRecord(o, previd, pid);
                    previd = o['__id'];
                    if (o['__hasChildren'])
                    {
                        load(o[p.tree.childrenName], o['__id']);
                    }
                }
            }
            load(g.currentData[p.root], -1);
            return g.rows;
        },
		//移动数据
        _moveData: function (from, to, isAfter)
        {
            var g = this, p = this.options;
            var fromRow = g.getRow(from);
            var toRow = g.getRow(to);
            var fromIndex, toIndex;
            var listdata = g._getParentChildren(fromRow);
            fromIndex = $.inArray(fromRow, listdata);
            listdata.splice(fromIndex, 1);
            listdata = g._getParentChildren(toRow);
            toIndex = $.inArray(toRow, listdata);
            listdata.splice(toIndex + (isAfter ? 1 : 0), 0, fromRow);
        },
        //移动某行数据
		move: function (from, to, isAfter)
        {
            this._moveData(from, to, isAfter);
            this.reRender();
        },
        //移动多行数据
		moveRange: function (rows, to, isAfter)
        {
            for (var i in rows)
            {
                this._moveData(rows[i], to, isAfter);
            }
            this.reRender();
        },
        //上移
		up: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            var listdata = g._getParentChildren(rowdata);
            var index = $.inArray(rowdata, listdata);
            if (index == -1 || index == 0) return;
            var selected = g.getSelected();
            g.move(rowdata, listdata[index - 1], false);
            if(selected){
				g.select(selected);
			}
        },
		//下移
        down: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            var listdata = g._getParentChildren(rowdata);
            var index = $.inArray(rowdata, listdata);
            if (index == -1 || index == listdata.length - 1) return;
            var selected = g.getSelected();
            g.move(rowdata, listdata[index + 1], true);
            if(selected){
				g.select(selected);
			}
        },
        //添加行
		addRow: function (rowdata, neardata, isBefore, parentRowData)
        {
			var g = this, p = this.options;
            rowdata = rowdata || {};
            g._addData(rowdata, parentRowData, neardata, isBefore);
            g.reRender();
            //标识状态
            rowdata[p.statusName] = 'add';
            if (p.tree)
            {
                var children = g.getChildren(rowdata, true);
                if (children)
                {
                    for (var i = 0, l = children.length; i < l; i++)
                    {
                        children[i][p.statusName] = 'add';
                    }
                }
            }
            g.isDataChanged = true;
            p.total = p.total ? (p.total + 1) : 1;
            p.pageCount = Math.ceil(p.total / p.pageSize);
            g._buildPager();
            //触发事件
			g.trigger('SysGridHeightChanged');
            g.trigger('afterAddRow', [rowdata]);
            return rowdata;
        },
        //更新行
		updateRow: function (rowDom, newRowData)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowDom);
            //标识状态
            g.isDataChanged = true;
            $.extend(rowdata, newRowData || {});
            if (rowdata[p.statusName] != 'add')
                rowdata[p.statusName] = 'update';
            g.reRender.quiDefer(g, 10, [{ rowdata: rowdata}]);
            return rowdata;
        },
        //编辑单元格
		setCellEditing: function (rowdata, column, editing)
        {
            var g = this, p = this.options;
            var cell = g.getCellObj(rowdata, column);
            var methodName = editing ? 'addClass' : 'removeClass';
            $(cell)[methodName]("l-grid-row-cell-editing");
            if (rowdata['__id'] != 0)
            {
                var prevrowobj = $(g.getRowObj(rowdata['__id'])).prev();
                if (!prevrowobj.length) return;
                var prevrow = g.getRow(prevrowobj[0]);
                var cellprev = g.getCellObj(prevrow, column);
                if (!cellprev) return;
                $(cellprev)[methodName]("l-grid-row-cell-editing-topcell");
            }
            if (column['__previd'] != -1 && column['__previd'] != null)
            {
                var cellprev = $(g.getCellObj(rowdata, column)).prev();
                $(cellprev)[methodName]("l-grid-row-cell-editing-leftcell");
            }
        },
        //重新渲染
		reRender: function (e)
        {
			var g = this, p = this.options;
            e = e || {};
            var rowdata = e.rowdata, column = e.column;
            if (column && (column.isdetail || column.ischeckbox)) return;
            if (rowdata && rowdata[p.statusName] == "delete") return;
			//if (rowdata && rowdata['_editing']) delete rowdata['_editing'];
            if (rowdata && column)
            {
				var cell = g.getCellObj(rowdata, column);
                $(cell).html(g._getCellHtml(rowdata, column));
                if (!column.issystem)
                    g.setCellEditing(rowdata, column, false);
            }
            else if (rowdata)
            {
                $(g.columns).each(function () { g.reRender({ rowdata: rowdata, column: this }); });
            }
            else if (column)
            {
                for (var rowid in g.records) { g.reRender({ rowdata: g.records[rowid], column: column }); }
                for (var i = 0; i < g.totalNumber; i++)
                {
                    var tobj = document.getElementById(g.id + "|total" + i + "|" + column['__id']);
                    $("div:first", tobj).html(g._getTotalCellContent(column, g.groups && g.groups[i] ? g.groups[i] : g.currentData[p.root]));
                }
            }
            else
            {
                g._showData();
            }
        },
        //获取数据
		getData: function (status, removeStatus)
        {
            var g = this, p = this.options;
            var data = [];
            for (var rowid in g.records)
            {
                var o = $.extend(true, {}, g.records[rowid]);
                if (o[p.statusName] == status || status == undefined)
                {
                    data.push(g.formatRecord(o, removeStatus));
                }
            }
            return data;
        },
        //格式化数据
        formatRecord: function (o, removeStatus)
        {
            delete o['__id'];
            delete o['__previd'];
            delete o['__nextid'];
            delete o['__index'];
            if (this.options.tree)
            {
                delete o['__pid'];
                delete o['__level'];
                delete o['__hasChildren'];
            }
            if (removeStatus) delete o[this.options.statusName];
            return o;
        },
        getUpdated: function ()
        {
            return this.getData('update', true);
        },
        getDeleted: function ()
        {
            return this.deletedRows;
        },
        getAdded: function ()
        {
            return this.getData('add', true);
        },
        //获取列
		getColumn: function (columnParm)
        {
            var g = this, p = this.options;
            if (typeof columnParm == "string") // column id
            {
                if (g._isColumnId(columnParm))
                    return g._columns[columnParm];
                else
                    return g.columns[parseInt(columnParm)];
            }
            else if (typeof (columnParm) == "number") //column index
            {
                return g.columns[columnParm];
            }
            else if (typeof columnParm == "object" && columnParm.nodeType == 1) //column header cell
            {
                var ids = columnParm.id.split('|');
                var columnid = ids[ids.length - 1];
                return g._columns[columnid];
            }
            return columnParm;
        },
		//获取列类型
        getColumnType: function (columnname)
        {
            var g = this, p = this.options;
            for (i = 0; i < g.columns.length; i++)
            {
                if (g.columns[i].name == columnname)
                {
                    if (g.columns[i].type) return g.columns[i].type;
                    return "string";
                }
            }
            return null;
        },
        //是否包含汇总
        isTotalSummary: function ()
        {
            var g = this, p = this.options;
            for (var i = 0; i < g.columns.length; i++)
            {
                if (g.columns[i].totalSummary) return true;
            }
            return false;
        },
        //根据层次获取列集合
        //如果columnLevel为空，获取叶节点集合
        getColumns: function (columnLevel)
        {
            var g = this, p = this.options;
            var columns = [];
            for (var id in g._columns)
            {
                var col = g._columns[id];
                if (columnLevel != undefined)
                {
                    if (col['__level'] == columnLevel) columns.push(col);
                }
                else
                {
                    if (col['__leaf']) columns.push(col);
                }
            }
            return columns;
        },
        //改变排序
        changeSort: function (columnName, sortOrder)
        {
            var g = this, p = this.options;
            if (g.loading) return true;
            if (p.dataAction == "local")
            {
                var columnType = g.getColumnType(columnName);
                if (!g.sortedData)
                    g.sortedData = g.filteredData;
                //如果排序名与列名一致则反向排序
				if (p.sortName == columnName)
                {
                    g.sortedData[p.root].reverse();
                } else
                {
                    g.sortedData[p.root].sort(function (data1, data2)
                    {
                        return g._compareData(data1, data2, columnName, columnType);
                    });
                }
				//是否使用分页，排序的处理也不同
                if (p.usePager)
                    g.currentData = g._getCurrentPageData(g.sortedData);
                else
                    g.currentData = g.sortedData;
                g._showData();
            }
            p.sortName = columnName;
            p.sortOrder = sortOrder;
            //如果是服务端数据，则重新加载数据
			if (p.dataAction == "server")
            {
                g.loadData(p.where);
            }
			g.trigger('changeSort');
        },
        //改变分页
        changePage: function (ctype)
        {
		    var g = this, p = this.options;
            if (g.loading) return true;
            //if (p.dataAction != "local" && g.isDataChanged)
               // return false;
            p.pageCount = parseInt($(".pcontrol span", g.toolbar).html());
			
            switch (ctype)
            {
                case 'first': if (p.page == 1) return; p.newPage = 1; break;
                case 'prev': if (p.page == 1) return; if (p.page > 1) p.newPage = parseInt(p.page) - 1; break;
                case 'next': if (p.page >= p.pageCount) return; p.newPage = parseInt(p.page) + 1; break;
                case 'last': if (p.page >= p.pageCount) return; p.newPage = p.pageCount; break;
                case 'input':
					var nv = parseInt($('.pcontrol input', g.toolbar).val());
                    if (isNaN(nv)) nv = 1;
                    if (nv < 1) nv = 1;
                    else if (nv > p.pageCount) nv = p.pageCount;
                    $('.pcontrol input', g.toolbar).val(nv);
                    p.newPage = nv;
                    break;
            }
            if (p.newPage == p.page) return false;
            if (p.newPage == 1)
            {
                $(".l-bar-btnfirst span", g.toolbar).addClass("l-disabled");
                $(".l-bar-btnprev span", g.toolbar).addClass("l-disabled");
            }
            else
            {
                $(".l-bar-btnfirst span", g.toolbar).removeClass("l-disabled");
                $(".l-bar-btnprev span", g.toolbar).removeClass("l-disabled");
            }
            if (p.newPage == p.pageCount)
            {
                $(".l-bar-btnlast span", g.toolbar).addClass("l-disabled");
                $(".l-bar-btnnext span", g.toolbar).addClass("l-disabled");
            }
            else
            {
                $(".l-bar-btnlast span", g.toolbar).removeClass("l-disabled");
                $(".l-bar-btnnext span", g.toolbar).removeClass("l-disabled");
            }
			//触发分页事件
            g.trigger('changePage', [p.newPage]);
           //远程数据则加载新的
		    if (p.dataAction == "server")
            {
                g.loadData(p.where);
            }
			//非远程则显示根据分页新的数据
            else
            {
                g.currentData = g._getCurrentPageData(g.filteredData);
                g._showData();
            }
        },
		//获得选中行
        getSelectedRow: function ()
        {
            for (var i in this.selected)
            {
                var o = this.selected[i];
                if (o['__id'] in this.records)
                    return o;
            }
            return null;
        },
		//获得多个选中行
        getSelectedRows: function ()
        {
            var arr = [];
            for (var i in this.selected)
            {
                var o = this.selected[i];
                if (o['__id'] in this.records)
                    arr.push(o);
            }
            return arr;
        },
		
        getSelectedRowObj: function ()
        {
            for (var i in this.selected)
            {
                var o = this.selected[i];
                if (o['__id'] in this.records)
                    return this.getRowObj(o);
            }
            return null;
        },
        getSelectedRowObjs: function ()
        {
            var arr = [];
            for (var i in this.selected)
            {
                var o = this.selected[i];
                if (o['__id'] in this.records)
                    arr.push(this.getRowObj(o));
            }
            return arr;
        },
		//得到某一列的dom对象
        getCellObj: function (rowParm, column)
        {
            var rowdata = this.getRow(rowParm);
            column = this.getColumn(column);
            return document.getElementById(this._getCellDomId(rowdata, column));
        },
		//得到某一行的dom对象
        getRowObj: function (rowParm, frozen)
        {
            var g = this, p = this.options;
            if (rowParm == null) return null;
            if (typeof (rowParm) == "string")
            {
                if (g._isRowId(rowParm))
                    return document.getElementById(g.id + (frozen ? "|1|" : "|2|") + rowParm);
                else
                    return document.getElementById(g.id + (frozen ? "|1|" : "|2|") + g.rows[parseInt(rowParm)]['__id']);
            }
            else if (typeof (rowParm) == "number")
            {
                return document.getElementById(g.id + (frozen ? "|1|" : "|2|") + g.rows[rowParm]['__id']);
            }
            else if (typeof (rowParm) == "object" && rowParm['__id']) //rowdata
            {
                return g.getRowObj(rowParm['__id'], frozen);
            }
            return rowParm;
        },
        getRow: function (rowParm)
        {
            var g = this, p = this.options;
            if (rowParm == null) return null;
            if (typeof (rowParm) == "string")
            {
                if (g._isRowId(rowParm))
                    return g.records[rowParm];
                else
                    return g.rows[parseInt(rowParm)];
            }
            else if (typeof (rowParm) == "number")
            {
                return g.rows[parseInt(rowParm)];
            }
            else if (typeof (rowParm) == "object" && rowParm.nodeType == 1 && !rowParm['__id']) //dom对象
            {
                return g._getRowByDomId(rowParm.id);
            }
            return rowParm;
        },
       //显示、隐藏列
	    _setColumnVisible: function (column, hide)
        {
            var g = this, p = this.options;
            if (!hide)  //显示
            {
                column._hide = false;
                document.getElementById(column['__domid']).style.display = "";
                //判断分组列是否隐藏,如果隐藏了则显示出来
                if (column['__pid'] != -1)
                {
                    var pcol = g._columns[column['__pid']];
                    if (pcol._hide)
                    {
                        document.getElementById(pcol['__domid']).style.display = "";
                        this._setColumnVisible(pcol, hide);
                    }
                }
            }
            else //隐藏
            {
                column._hide = true;
                document.getElementById(column['__domid']).style.display = "none";
                //判断同分组的列是否都隐藏,如果是则隐藏分组列
                if (column['__pid'] != -1)
                {
                    var hideall = true;
                    var pcol = this._columns[column['__pid']];
                    for (var i = 0; pcol && i < pcol.columns.length; i++)
                    {
                        if (!pcol.columns[i]._hide)
                        {
                            hideall = false;
                            break;
                        }
                    }
                    if (hideall)
                    {
                        pcol._hide = true;
                        document.getElementById(pcol['__domid']).style.display = "none";
                        this._setColumnVisible(pcol, hide);
                    }
                }
            }
        },
        //显示隐藏列
        toggleCol: function (columnparm, visible, toggleByPopup)
        {
            var g = this, p = this.options;
            var column;
            if (typeof (columnparm) == "number")
            {
                column = g.columns[columnparm];
            }
            else if (typeof (columnparm) == "object" && columnparm['__id'])
            {
                column = columnparm;
            }
            else if (typeof (columnparm) == "string")
            {
                if (g._isColumnId(columnparm)) // column id
                {
                    column = g._columns[columnparm];
                }
                else  // column name
                {
                    $(g.columns).each(function ()
                    {
                        if (this.name == columnparm)
                            g.toggleCol(this, visible, toggleByPopup);
                    });
                    return;
                }
            }
            if (!column) return;
            var columnindex = column['__leafindex'];
            var headercell = document.getElementById(column['__domid']);
            if (!headercell) return;
            headercell = $(headercell);
            var cells = [];
            for (var i in g.rows)
            {
                var obj = g.getCellObj(g.rows[i], column);
                if (obj) cells.push(obj);
            }
            for (var i = 0; i < g.totalNumber; i++)
            {
                var tobj = document.getElementById(g.id + "|total" + i + "|" + column['__id']);
                if (tobj) cells.push(tobj);
            }
            var colwidth = column._width;
            //显示列
            if (visible && column._hide)
            {
                if (column.frozen)
                    g.f.gridtablewidth += (parseInt(colwidth) + 1);
                else
                    g.gridtablewidth += (parseInt(colwidth) + 1);
                g._setColumnVisible(column, false);
                $(cells).show();
            }
            //隐藏列
            else if (!visible && !column._hide)
            {
                if (column.frozen)
                    g.f.gridtablewidth -= (parseInt(colwidth) + 1);
                else
                    g.gridtablewidth -= (parseInt(colwidth) + 1);
                g._setColumnVisible(column, true);
                $(cells).hide();
            }
            if (column.frozen)
            {
                $("div:first", g.f.gridheader).width(g.f.gridtablewidth);
                $("div:first", g.f.gridbody).width(g.f.gridtablewidth);
            }
            else
            {
                $("div:first", g.gridheader).width(g.gridtablewidth + 40);
                $("div:first", g.gridbody).width(g.gridtablewidth);
            }
            g._updateFrozenWidth();
            if (!toggleByPopup)
            {
                $(':checkbox[columnindex=' + columnindex + "]", g.popup).each(function ()
                {
                    this.checked = visible;
                    if ($.fn.quiCheckBox)
                    {
                        var checkboxmanager = $(this).quiGetCheckBoxManager();
                        if (checkboxmanager) checkboxmanager.updateStyle();
                    }
                });
            }
        },
        //设置列宽
        setColumnWidth: function (columnparm, newwidth)
        {
		    var g = this, p = this.options;
            if (!newwidth) return;
            newwidth = parseInt(newwidth, 10);
            var column;
            if (typeof (columnparm) == "number")
            {
                column = g.columns[columnparm];
            }
            else if (typeof (columnparm) == "object" && columnparm['__id'])
            {
                column = columnparm;
            }
            else if (typeof (columnparm) == "string")
            {
                if (g._isColumnId(columnparm)) // column id
                {
                    column = g._columns[columnparm];
                }
                else  // column name
                {
                    $(g.columns).each(function ()
                    {
                        if (this.name == columnparm)
                            g.setColumnWidth(this, newwidth);
                    });
                    return;
                }
            }
            if (!column) return;
            var mincolumnwidth = p.minColumnWidth;
            if (column.minWidth) mincolumnwidth = column.minWidth;
            newwidth = newwidth < mincolumnwidth ? mincolumnwidth : newwidth;
            var diff = newwidth - column._width;
            if (g.trigger('beforeChangeColumnWidth', [column, newwidth]) == false) return;
            column._width = newwidth;
            if (column.frozen)
            {
                g.f.gridtablewidth += diff;
                $("div:first", g.f.gridheader).width(g.f.gridtablewidth);
                $("div:first", g.f.gridbody).width(g.f.gridtablewidth);
            }
            else
            {
                g.gridtablewidth += diff;
                $("div:first", g.gridheader).width(g.gridtablewidth + 40);
                $("div:first", g.gridbody).width(g.gridtablewidth);
            }
            $(document.getElementById(column['__domid'])).css('width', newwidth);
            var cells = [];
            for (var rowid in g.records)
            {
                var obj = g.getCellObj(g.records[rowid], column);
                if (obj) cells.push(obj);

                if (!g.enabledDetailEdit() && g.editors[rowid] && g.editors[rowid][column['__id']])
                {
                    var o = g.editors[rowid][column['__id']];
                    if (o.editor.resize) o.editor.resize(o.input, newwidth, o.container.height(), o.editParm);
                }
            }
            for (var i = 0; i < g.totalNumber; i++)
            {
                var tobj = document.getElementById(g.id + "|total" + i + "|" + column['__id']);
                if (tobj) cells.push(tobj);
            }
            $(cells).css('width', newwidth).find("> div.l-grid-row-cell-inner:first").css('width', newwidth - 8);

            g._updateFrozenWidth();

			//触发事件
            g.trigger('afterChangeColumnWidth', [column, newwidth]);
        },
        //改变列表头内容
        changeHeaderText: function (columnparm, headerText)
        {
            var g = this, p = this.options;
            var column;
            if (typeof (columnparm) == "number")
            {
                column = g.columns[columnparm];
            }
            else if (typeof (columnparm) == "object" && columnparm['__id'])
            {
                column = columnparm;
            }
            else if (typeof (columnparm) == "string")
            {
                if (g._isColumnId(columnparm)) // column id
                {
                    column = g._columns[columnparm];
                }
                else  // column name
                {
                    $(g.columns).each(function ()
                    {
                        if (this.name == columnparm)
                            g.changeHeaderText(this, headerText);
                    });
                    return;
                }
            }
            if (!column) return;
            var columnindex = column['__leafindex'];
            var headercell = document.getElementById(column['__domid']);
            $(".l-grid-hd-cell-text", headercell).html(headerText);
            if (p.allowHideColumn)
            {
                $(':checkbox[columnindex=' + columnindex + "]", g.popup).parent().next().html(headerText);
            }
        },
        //改变列的位置
        changeCol: function (from, to, isAfter)
        {
            var g = this, p = this.options;
            if (!from || !to) return;
            var fromCol = g.getColumn(from);
            var toCol = g.getColumn(to);
            fromCol.frozen = toCol.frozen;
            var fromColIndex, toColIndex;
            var fromColumns = fromCol['__pid'] == -1 ? p.columns : g._columns[fromCol['__pid']].columns;
            var toColumns = toCol['__pid'] == -1 ? p.columns : g._columns[toCol['__pid']].columns;
            fromColIndex = $.inArray(fromCol, fromColumns);
            toColIndex = $.inArray(toCol, toColumns);
            var sameParent = fromColumns == toColumns;
            var sameLevel = fromCol['__level'] == toCol['__level'];
            toColumns.splice(toColIndex + (isAfter ? 1 : 0), 0, fromCol);
            if (!sameParent)
            {
                fromColumns.splice(fromColIndex, 1);
            }
            else
            {
                if (isAfter) fromColumns.splice(fromColIndex, 1);
                else fromColumns.splice(fromColIndex + 1, 1);
            }
            g._setColumns(p.columns);
            //重新渲染
			g.reRender();
        },
		//重设高度
		 resetHeight: function ()
        {
            var g = this, p = this.options;
			
             if (p.height && p.height != 'auto')
            {
                var windowHeight = $(window).height();
				//$("#info").text(windowHeight)
                //if(g.windowHeight != undefined && g.windowHeight == windowHeight) return;

                var h = 0;
                var parentHeight = null;
                if (typeof (p.height) == "string" && p.height.indexOf('%') > 0)
                {
                    var gridparent = g.grid.parent();
                    if (p.InWindow)
                    {
						parentHeight = windowHeight;
                        parentHeight -= parseInt($('body').css('paddingTop'));
                        parentHeight -= parseInt($('body').css('paddingBottom'));
                    }
                    else
                    {
						parentHeight = gridparent.height();
                    }
                    h = parentHeight * parseFloat(p.height) * 0.01;
                    if (p.InWindow || gridparent[0].tagName.toLowerCase() == "body")
                        h -= (g.grid.offset().top - parseInt($('body').css('paddingTop')));
                }
                else
                {
                    h = parseInt(p.height);
                }

                h += p.heightDiff;
                g.windowHeight = windowHeight;
                g._setHeight(h);
            }
        },
		//重设宽度
		resetWidth: function ()
        {
            var g = this, p = this.options;
             if (g.enabledFrozen())
            {
                var gridView1Width = g.gridview1.width();
                var gridViewWidth = g.gridview.width()
                g.gridview2.css({
                    width: gridViewWidth - gridView1Width
                });
            }
			
			if(p.percentWidthMode==true){
				if(p.detail){}
				else{
					if(p.oldTotalWidth!=g.grid.width()){
						var rownumbersColFix = 0;
						var checkboxColFix = 0;
						if (p.rownumbers) {
							rownumbersColFix = p.rownumbersColWidth+2 ;
						}
						if (p.checkbox) {
							checkboxColFix = p.checkboxColWidth+3;
						}
						g.gridtablewidth=g.grid.width() - rownumbersColFix - checkboxColFix;
						if(g.columns){
							g.gridtablewidth=g.gridtablewidth;
						}
						var remainWidth;
						if($(g.columns).length>0){
							remainWidth=g.grid.width() - g.columns.length - rownumbersColFix - checkboxColFix;
						}
						$(g.columns).each(function (i, column)
			            {
							if (column.isrownumber){}
							else if (column.ischeckbox){}
							else if (column.isdetail){}
							else{
					            if (column.width) {
									if (typeof(column.width) == "number") {
										remainWidth=remainWidth-column.width;
									}
								}
							}
			            });
						$(g.columns).each(function (i, column)
			            {
							
							if (column.isrownumber){}
							else if (column.ischeckbox){}
							else if (column.isdetail){}
							else{
								var colwidth;
					            if (column.width) {
									colwidth = column.width;
									if (typeof(colwidth) == "string" && colwidth.indexOf('%') > 0) {
										
										column._width = colwidth = parseInt(parseInt(colwidth) * 0.01 * remainWidth);
										g.setColumnWidth(column, column._width);
									}
								}
							}
							
			            });
						p.oldTotalWidth=g.grid.width();
						
					}
				}
				
			}
		
        },
		//滚动到任意位置
		setScroller: function (scrollY,scrollX,animate)
        {
            var g = this, p = this.options;
			var scrollYNum;
			var scrollXNum;
			//var animate=false;
			if(scrollY&&typeof (scrollY) == "string"){
				if(scrollY=="bottom"){
					scrollYNum=g.gridbody.find(".l-grid-body-inner").height();
				}
				else if(scrollY=="top"){
					scrollYNum=0;
				}
			}
			else if(scrollY&&typeof (scrollY) == "number"){
				scrollYNum=scrollY;
			}
			
			if(scrollX&&typeof (scrollX) == "string"){
				if(scrollX=="right"){
					scrollXNum=g.gridbody.find(".l-grid-body-inner").width();
				}
				else if(scrollX=="left"){
					scrollXNum=0;
				}
			}
			else if(scrollX&&typeof (scrollX) == "number"){
				scrollXNum=scrollX;
			}
			if(scrollX!=null&&scrollY!=null){
				if(animate==true){
					g.gridbody.animate({scrollTop:scrollYNum,scrollLeft:scrollXNum},1000);
				}
				else{
					g.gridbody[0].scrollTop=scrollYNum;
					g.gridbody[0].scrollLeft=scrollXNum;
				}
			}
			else if(scrollX==null){
				if(animate==true){
					g.gridbody.animate({scrollTop:scrollYNum},1000);
				}
				else{
					g.gridbody[0].scrollTop=scrollYNum;
				}
			}
			else if(scrollY==null){
				if(animate==true){
					g.gridbody.animate({scrollLeft:scrollXNum},1000);
				}
				else{
					g.gridbody[0].scrollLeft=scrollXNum;
				}
			}
        },
		
		
		

		//收缩子表
        collapseDetail: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            if (!rowdata) return;
            for (var i = 0, l = g.columns.length; i < l; i++)
            {
                if (g.columns[i].isdetail)
                {
                    var row = g.getRowObj(rowdata);
                    var cell = g.getCellObj(rowdata, g.columns[i]);
                    //隐藏子表
					$(row).next("tr.l-grid-detailpanel").hide();
                    $(".l-grid-row-cell-detailbtn:first", cell).removeClass("l-open");
					g.detailExtendRow = g.detailExtendRow || [];
					var indexInDetailExtendRow;
					//得到该行数据在g.collapsedRows中的索引
	                indexInDetailExtendRow = $.inArray(rowdata, g.detailExtendRow);
					if (indexInDetailExtendRow != -1){
						 g.detailExtendRow.splice(indexInDetailExtendRow, 1);
					}
					

                    //触发事件
					g.trigger('SysGridHeightChanged');
                    return;
                }
            }
        },
		//展开子表
        extendDetail: function (rowParm)
        {
			var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            if (!rowdata) return;
						for (var i = 0, l = g.columns.length; i < l; i++)
			            {
							if (g.columns[i].isdetail)
			                {
								var row = $([g.getRowObj(rowdata, false)]);
								var cell = g.getCellObj(rowdata, g.columns[i]);
								$(".l-grid-row-cell-detailbtn:first", cell).addClass("l-open");
								g.detailExtendRow = g.detailExtendRow || [];
								var indexInDetailExtendRow;
								//得到该行数据在g.collapsedRows中的索引
				                indexInDetailExtendRow = $.inArray(rowdata, g.detailExtendRow);
								if (indexInDetailExtendRow == -1) g.detailExtendRow.push(rowdata);
								var nextrow = row.next("tr.l-grid-detailpanel");
			                    //已经打开过但隐藏了，则重新显示
								if (nextrow.length > 0)
			                    {
			                        nextrow.show();
			                        if (p.detail.onExtend)
			                            p.detail.onExtend(rowdata, $(".l-grid-detailpanel-inner:first", nextrow)[0]);
			                        
			                        if (indexInDetailExtendRow == -1) g.detailExtendRow.push(rowdata);
									//触发事件
									g.trigger('SysGridHeightChanged');
			                        return;
			                    }
								//如果没打开过则创建
								if (g.enabledFrozen()) row = row.add(g.getRowObj(rowdata, true));
	                			var rowid = rowdata['__id'];
			                    var frozenColNum = 0;
			                    for (var i = 0; i < g.columns.length; i++)
			                        if (g.columns[i].frozen) frozenColNum++;
								var detailRow = $("<tr class='l-grid-detailpanel'><td><div class='l-grid-detailpanel-inner' style='display:none'></div></td></tr>");
			                    var detailFrozenRow = $("<tr class='l-grid-detailpanel'><td><div class='l-grid-detailpanel-inner' style='display:none'></div></td></tr>");
			                    detailRow.attr("id", g.id + "|detail|" + rowid);
			                    //detailrows存储已经打开的
								g.detailrows = g.detailrows || [];
			                    g.detailrows.push(detailRow[0]);
			                    g.detailrows.push(detailFrozenRow[0]);
			                    var detailRowInner = $("div:first", detailRow);
			                    detailRowInner.parent().attr("colSpan", g.columns.length - frozenColNum);
			                    row.eq(0).after(detailRow);
			                    if (frozenColNum > 0)
			                    {
			                        detailFrozenRow.find("td:first").attr("colSpan", frozenColNum);
			                        row.eq(1).after(detailFrozenRow);
			                    }
								//触发onShowDetail事件
			                    if (p.detail.onShowDetail)
			                    {
			                        p.detail.onShowDetail(rowdata, detailRowInner[0], function ()
			                        {
			                            g.trigger('SysGridHeightChanged');
			                        });
			                        $("div:first", detailFrozenRow).add(detailRowInner).show().height(p.detail.height || p.detailHeight);
			                    }
								//也可以用render返回个性化dom元素
			                    else if (p.detail.render)
			                    {
			                        detailRowInner.append(p.detail.render());
			                        detailRowInner.show();
			                    }
								
			                }
			            }
				g.unbind("afterShowData");		

        },
        getParent: function (rowParm)
        {
            var g = this, p = this.options;
            if (!p.tree) return null;
            var rowdata = g.getRow(rowParm);
            if (!rowdata) return null;
            if (rowdata['__pid'] in g.records) return g.records[rowdata['__pid']];
            else return null;
        },
       //得到子表
	    getChildren: function (rowParm, deep)
        {
            var g = this, p = this.options;
            if (!p.tree) return null;
            var rowData = g.getRow(rowParm);
            if (!rowData) return null;
            var arr = [];
            function loadChildren(data)
            {
                if (data[p.tree.childrenName])
                {
                    for (var i = 0, l = data[p.tree.childrenName].length; i < l; i++)
                    {
                        var o = data[p.tree.childrenName][i];
                        if (o['__status'] == 'delete') continue;
                        arr.push(o);
                        if (deep)
                            loadChildren(o);
                    }
                }
            }
            loadChildren(rowData);
            return arr;
        },
		//判断是否为叶子节点
        isLeaf: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            if (!rowdata) return;
            return rowdata['__hasChildren'] ? false : true;
        },
		//判断是否含有子
        hasChildren: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = this.getRow(rowParm);
            if (!rowdata) return;
            return (rowdata[p.tree.childrenName] && rowdata[p.tree.childrenName].length) ? true : false;
        },
		//判断记录是否存在
        existRecord: function (record)
        {
            for (var rowid in this.records)
            {
                if (this.records[rowid] == record) return true;
            }
            return false;
        },
		//移除选中行
        _removeSelected: function (rowdata)
        {
            var g = this, p = this.options;
            if (p.tree)
            {
                var children = g.getChildren(rowdata, true);
                if (children)
                {
                    for (var i = 0, l = children.length; i < l; i++)
                    {
                        var index2 = $.inArray(children[i], g.selected);
                        if (index2 != -1) g.selected.splice(index2, 1);
                    }
                }
            }
            var index = $.inArray(rowdata, g.selected);
            if (index != -1) g.selected.splice(index, 1);
        },
        _getParentChildren: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            var listdata;
            if (p.tree && g.existRecord(rowdata) && rowdata['__pid'] in g.records)
            {
                listdata = g.records[rowdata['__pid']][p.tree.childrenName];
            }
            else
            {
                listdata = g.currentData[p.root];
            }
            return listdata;
        },
		//移除某行数据
        _removeData: function (rowdata)
        {
            var g = this, p = this.options;
            var listdata = g._getParentChildren(rowdata);
            var index = $.inArray(rowdata, listdata);
            if (index != -1)
            {
                listdata.splice(index, 1);
            }
            g._removeSelected(rowdata);
        },
		//添加数据
        _addData: function (rowdata, parentdata, neardata, isBefore)
        {
            var g = this, p = this.options;
            var listdata = g.currentData[p.root];
            if (neardata)
            {
                if (p.tree)
                {
                    if (parentdata)
                        listdata = parentdata[p.tree.childrenName];
                    else if (neardata['__pid'] in g.records)
                        listdata = g.records[neardata['__pid']][p.tree.childrenName];
                }
                var index = $.inArray(neardata, listdata);
                listdata.splice(index == -1 ? -1 : index + (isBefore ? 0 : 1), 0, rowdata);
            }
            else
            {
                if (p.tree && parentdata)
                {
                    listdata = parentdata[p.tree.childrenName];
                }
                listdata.push(rowdata);
            }
        },
        //移动数据(树)
        //@parm [parentdata] 附加到哪一个节点下级
        //@parm [neardata] 附加到哪一个节点的上方/下方
        //@parm [isBefore] 是否附加到上方
        _appendData: function (rowdata, parentdata, neardata, isBefore)
        {
            var g = this, p = this.options;
            rowdata[p.statusName] = "update";
            g._removeData(rowdata);
            g._addData(rowdata, parentdata, neardata, isBefore);
        },
		//批量添加数据
        appendRange: function (rows, parentdata, neardata, isBefore)
        {
            var g = this, p = this.options;
            var toRender = false;
            $.each(rows, function (i, item)
            {
                if (item['__id'] && g.existRecord(item))
                {
                    if (g.isLeaf(parentdata)) g.upgrade(parentdata);
                    g._appendData(item, parentdata, neardata, isBefore);
                    toRender = true;
                }
                else
                {
                    g.appendRow(item, parentdata, neardata, isBefore);
                }
            });
            if (toRender) g.reRender();

        },
		//添加行
        appendRow: function (rowdata, parentdata, neardata, isBefore)
        {
            var g = this, p = this.options;
            if ($.isArray(rowdata))
            {
                g.appendRange(rowdata, parentdata, neardata, isBefore);
                return;
            }
            if (rowdata['__id'] && g.existRecord(rowdata))
            {
                g._appendData(rowdata, parentdata, neardata, isBefore);
                g.reRender();
                return;
            }
            if (parentdata && g.isLeaf(parentdata)) g.upgrade(parentdata);
            g.addRow(rowdata, neardata, isBefore ? true : false, parentdata);
        },
		//树节点提升等级
        upgrade: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            if (!rowdata || !p.tree) return;
            rowdata[p.tree.childrenName] = rowdata[p.tree.childrenName] || [];
            rowdata['__hasChildren'] = true;
            var rowobjs = [g.getRowObj(rowdata)];
            if (g.enabledFrozen()) rowobjs.push(g.getRowObj(rowdata, true));
            $("> td > div > .l-grid-tree-space:last", rowobjs).addClass("l-grid-tree-link l-grid-tree-link-open");
        },
		//树节点降低等级
        demotion: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            if (!rowdata || !p.tree) return;
            var rowobjs = [g.getRowObj(rowdata)];
            if (g.enabledFrozen()) rowobjs.push(g.getRowObj(rowdata, true));
            $("> td > div > .l-grid-tree-space:last", rowobjs).removeClass("l-grid-tree-link l-grid-tree-link-open l-grid-tree-link-close");
            if (g.hasChildren(rowdata))
            {
                var children = g.getChildren(rowdata);
                for (var i = 0, l = children.length; i < l; i++)
                {
                    g.deleteRow(children[i]);
                }
            }
            rowdata['__hasChildren'] = false;
        },
		//折叠
        collapse: function (rowParm)
        {
            var g = this, p = this.options;
			//rowParm传递行索引或rowdata，得到DOM节点
            var targetRowObj = g.getRowObj(rowParm);
			//得到改行的加减号小图标DOM
            var linkbtn = $(".l-grid-tree-link", targetRowObj);
			//如果是加号图标，直接返回
            if (linkbtn.hasClass("l-grid-tree-link-close")) return;
            g.toggle(rowParm);
        },
		//展开
        expand: function (rowParm)
        {
            var g = this, p = this.options;
			//rowParm传递行索引或rowdata，得到DOM节点
            var targetRowObj = g.getRowObj(rowParm);
			//得到改行的加减号小图标DOM
            var linkbtn = $(".l-grid-tree-link", targetRowObj);
			//如果是减号图标，直接返回
            if (linkbtn.hasClass("l-grid-tree-link-open")) return;
            g.toggle(rowParm);
        },
		//折叠与展开
        toggle: function (rowParm)
        {
            if (!rowParm) return;
            var g = this, p = this.options;
			//得到该行json数据
            var rowdata = g.getRow(rowParm);
			//得到该行DOM节点，存入targetRowObj数组
            var targetRowObj = [g.getRowObj(rowdata)];
			//如果允许锁定列，targetRowObj数组添加元素？
            if (g.enabledFrozen()) targetRowObj.push(g.getRowObj(rowdata, true));
            //定义level和indexInCollapsedRows
			var level = rowdata['__level'], indexInCollapsedRows;
            //获得加减号图标
			var linkbtn = $(".l-grid-tree-link:first", targetRowObj);
            //定义标志位
			var opening = true;
			//定义已折叠的行数组g.collapsedRows
            g.collapsedRows = g.collapsedRows || [];
            if (linkbtn.hasClass("l-grid-tree-link-close")) //展开
            {
                //更改小图标，加号变减号
				linkbtn.removeClass("l-grid-tree-link-close").addClass("l-grid-tree-link-open");
				//得到该行数据在g.collapsedRows中的索引
                indexInCollapsedRows = $.inArray(rowdata, g.collapsedRows);
				//从g.collapsedRows移除该数据
                if (indexInCollapsedRows != -1) g.collapsedRows.splice(indexInCollapsedRows, 1);
            	g.trigger("extend");
			}
            else //折叠
            {
                //更改标志位
				opening = false;
				//更改小图标，减号变加号
                linkbtn.addClass("l-grid-tree-link-close").removeClass("l-grid-tree-link-open");
                //将折叠的行添加到g.collapsedRows
				indexInCollapsedRows = $.inArray(rowdata, g.collapsedRows);
                if (indexInCollapsedRows == -1) g.collapsedRows.push(rowdata);
				g.trigger("collapse");
            }
			//得到子节点数据
            var children = g.getChildren(rowdata, true);
			//遍历所有子集
            for (var i = 0, l = children.length; i < l; i++)
            {
                var o = children[i];
				var clevel = o['__level'];
				//得到行节点
                //var currentRow;
                //展开
				if (opening)
                {
                    var currentRow;
					if(p.treeExpandAll==false){
						if(clevel==level+1){//一级一级展开
							currentRow= $([g.getRowObj(o['__id'])]);
							//如果允许锁定列，currentRow添加元素
			                if (g.enabledFrozen()) currentRow = currentRow.add(g.getRowObj(o['__id'], true));
							currentRow.show();
						}
					}
					else{
						currentRow= $([g.getRowObj(o['__id'])]);
						//如果允许锁定列，currentRow添加元素
		                if (g.enabledFrozen()) currentRow = currentRow.add(g.getRowObj(o['__id'], true));
						$(".l-grid-tree-link", currentRow).removeClass("l-grid-tree-link-close").addClass("l-grid-tree-link-open");
						currentRow.show();
					}
                }
				//折叠
                else
                {
					//如果允许锁定列，currentRow添加元素
					var currentRow2= $([g.getRowObj(o['__id'])]);
					 if (g.enabledFrozen()) currentRow2 = currentRow2.add(g.getRowObj(o['__id'], true));
					$(".l-grid-tree-link", currentRow2).removeClass("l-grid-tree-link-open").addClass("l-grid-tree-link-close");
                    currentRow2.hide();
                }
				
            }
        },
        _bulid: function ()
        {
            var g = this;
            g._clearGrid();
            //创建头部
            g._initBuildHeader();
            //宽度高度初始化
            g._initHeight();
            //创建底部工具条
            g._initFootbar();
            //创建分页
            g._buildPager();
            //创建事件
            g._setEvent();
        },
        _setColumns: function (columns)
        {
            var g = this;
            //初始化列
            g._initColumns();
            //创建表头
            g._initBuildGridHeader();
            //创建 显示/隐藏 列 列表
            g._initBuildPopup();
        },
		//创建头部
        _initBuildHeader: function ()
        {
            var g = this, p = this.options;
            if (p.title)
            {
                $(".l-panel-header-text", g.header).html(p.title);
                if (p.headerImg)
                    g.header.append("<img src='" + p.headerImg + "' />").addClass("l-panel-header-hasicon");
            }
            else
            {
                g.header.hide();
            }
            if (p.toolbar)
            {
                if ($.fn.quiToolBar)
                    g.toolbarManager = g.topbar.quiToolBar(p.toolbar);
            }
            else
            {
                g.topbar.remove();
            }
        },
		//创建列的id
        _createColumnId: function (column)
        {
            if (column.id != null) return column.id.toString();
            return "c" + (100 + this._columnCount);
        },
        _isColumnId: function (str)
        {
            return (str in this._columns);
        },
		//初始化列
        _initColumns: function ()
        {
            var g = this, p = this.options;
            g._columns = {};             //全部列的信息  
            g._columnCount = 0;
            g._columnLeafCount = 0;
            g._columnMaxLevel = 1;
            if (!p.columns) return;
            function removeProp(column, props)
            {
                for (var i in props)
                {
                    if (props[i] in column)
                        delete column[props[i]];
                }
            }
            //设置id、pid、level、leaf，返回叶节点数,如果是叶节点，返回1
            function setColumn(column, level, pid, previd)
            {
                removeProp(column, ['__id', '__pid', '__previd', '__nextid', '__domid', '__leaf', '__leafindex', '__level', '__colSpan', '__rowSpan']);
                if (level > g._columnMaxLevel) g._columnMaxLevel = level;
                g._columnCount++;
                column['__id'] = g._createColumnId(column);
                column['__domid'] = g.id + "|hcell|" + column['__id'];
                g._columns[column['__id']] = column;
                if (!column.columns || !column.columns.length)
                    column['__leafindex'] = g._columnLeafCount++;
                column['__level'] = level;
                column['__pid'] = pid;
                column['__previd'] = previd;
                if (!column.columns || !column.columns.length)
                {
                    column['__leaf'] = true;
                    return 1;
                }
                var leafcount = 0;
                var newid = -1;
                for (var i = 0, l = column.columns.length; i < l; i++)
                {
                    var col = column.columns[i];
                    leafcount += setColumn(col, level + 1, column['__id'], newid);
                    newid = col['__id'];
                }
                column['__leafcount'] = leafcount;
                return leafcount;
            }
            var lastid = -1;
            //行序号
            if (p.rownumbers)
            {
                var frozenRownumbers = g.enabledGroup() ? false : p.frozen && p.frozenRownumbers;
                var col = { isrownumber: true, issystem: true, width: p.rownumbersColWidth, frozen: frozenRownumbers };
                setColumn(col, 1, -1, lastid);
                lastid = col['__id'];
            }
            //明细列
            if (g.enabledDetail())
            {
                var frozenDetail = g.enabledGroup() ? false : p.frozen && p.frozenDetail;
                var col = { isdetail: true, issystem: true, width: p.detailColWidth, frozen: frozenDetail };
                setColumn(col, 1, -1, lastid);
                lastid = col['__id'];
            }
            //复选框列
            if (g.enabledCheckbox())
            {
                var frozenCheckbox = g.enabledGroup() ? false : p.frozen && p.frozenCheckbox;
                var col = { ischeckbox: true, issystem: true, width: p.detailColWidth, frozen: frozenCheckbox };
                setColumn(col, 1, -1, lastid);
                lastid = col['__id'];
            }
            for (var i = 0, l = p.columns.length; i < l; i++)
            {
                var col = p.columns[i];
                setColumn(col, 1, -1, lastid);
                lastid = col['__id'];
            }
            //设置colSpan和rowSpan
            for (var id in g._columns)
            {
                var col = g._columns[id];
                if (col['__leafcount'] > 1)
                {
                    col['__colSpan'] = col['__leafcount'];
                }
                if (col['__leaf'] && col['__level'] != g._columnMaxLevel)
                {
                    col['__rowSpan'] = g._columnMaxLevel - col['__level'] + 1;
                }
            }
            //叶级别列的信息  
            g.columns = g.getColumns();
            $(g.columns).each(function (i, column)
            {
                column.columnname = column.name;
                column.columnindex = i;
                column.type = column.type || "string";
                column.islast = i == g.columns.length - 1;
                column.isSort = column.isSort == false ? false : true;
                column.frozen = column.frozen ? true : false;
                //设置表格主体每一类宽度
				//if(i==0){
					//column._width = g._getColumnWidth(column)-20;
				//}
				//else{
					column._width = g._getColumnWidth(column);
				//}
                column._hide = column.hide ? true : false;
            });
			if(p.oldTotalWidth!=g.grid.width()){
				p.oldTotalWidth=g.grid.width()
			}
        },
		//取得列宽度
        _getColumnWidth: function (column)
        {
            var g = this, p = this.options;
            //if (column._width) return column._width;
			if (column.isrownumber&&column._width)  return column._width;
			if (column.ischeckbox&&column._width)  return column._width;
            var colwidth;
            if (column.width)
            {
                colwidth = column.width;
            }
            else if (p.columnWidth)
            {
                colwidth = p.columnWidth;
            }
            if (!colwidth)
            {
                var lwidth = 4;
                if (g.enabledCheckbox()) lwidth += p.checkboxColWidth;
                if (g.enabledDetail()) lwidth += p.detailColWidth;
                colwidth = parseInt((g.grid.width() - lwidth) / g.columns.length);
            }
            if (typeof (colwidth) == "string" && colwidth.indexOf('%') > 0)
            {
                var rownumbersColFix=0;
                var checkboxColFix=0;
				if(p.rownumbers){
					rownumbersColFix=p.rownumbersColWidth+2;
				}
				if(p.checkbox){
					checkboxColFix=p.checkboxColWidth+3;
				}
				column._width = colwidth = parseInt(parseInt(colwidth) * 0.01 * (g.grid.width() - g.columns.length-rownumbersColFix -checkboxColFix));
				
            }
            if (column.minWidth && colwidth < column.minWidth) colwidth = column.minWidth;
            if (column.maxWidth && colwidth > column.maxWidth) colwidth = column.maxWidth;
            column._width = colwidth;
            return colwidth;
        },
		//创建表头
        _createHeaderCell: function (column)
        {
            var g = this, p = this.options;
            var jcell = $("<td class='l-grid-hd-cell'><div class='l-grid-hd-cell-inner'><span class='l-grid-hd-cell-text'></span></div></td>");
            jcell.attr("id", column['__domid']);
            if (!column['__leaf'])
                jcell.addClass("l-grid-hd-cell-mul");
            if (column.columnindex == g.columns.length - 1)
            {
                jcell.addClass("l-grid-hd-cell-last");
            }
            if (column.isrownumber)
            {
				jcell.addClass("l-grid-hd-cell-rownumbers");
                jcell.html("<div class='l-grid-hd-cell-inner' style='width:"+(column['_width']-6)+"px'></div>");
            }
            if (column.ischeckbox)
            {
                jcell.addClass("l-grid-hd-cell-checkbox");
                jcell.html("<div class='l-grid-hd-cell-inner' style='width:"+(column['_width'])+"px'><div class='l-grid-hd-cell-con-checkbox'><span class='l-grid-hd-cell-text l-grid-hd-cell-btn-checkbox'></span></div></div>");
            }
            if (column.isdetail)
            {
                jcell.addClass("l-grid-hd-cell-detail");
                jcell.html("<div class='l-grid-hd-cell-inner'><div class='l-grid-hd-cell-text l-grid-hd-cell-btn-detail'></div></div>");
            }
           if (column.headerAlign)
            {
                $(".l-grid-hd-cell-inner:first", jcell).css({"textAlign":column.headerAlign,"paddingLeft":"4px","paddingRight":"4px"} );
            }
            if (column['__colSpan']) jcell.attr("colSpan", column['__colSpan']);
            if (column['__rowSpan'])
            {
                jcell.attr("rowSpan", column['__rowSpan']);
                jcell.height(p.headerRowHeight * column['__rowSpan']);
            } else
            {
                jcell.height(p.headerRowHeight);
            }
            if (column['__leaf'])
            {
                //为表头每个单元格设置宽度
				jcell.width(column['_width']);
                jcell.attr("columnindex", column['__leafindex']);
            }
            if (column._hide) jcell.hide();
            if (column.name) jcell.attr({ columnname: column.name });
            var headerText = "";
            if (column.display && column.display != "")
                headerText = column.display;
            else if (column.headerRender)
                headerText = column.headerRender(column);
            else
                headerText = "&nbsp;";
			function setFilterParams(obj,tip){
				var filterParamsExsit=0;
				for(var i=0;i<p.filterParams.length;i++){
					if(p.filterParams[i].name==obj.name){
						p.filterParams[i].value=obj.value;
						filterParamsExsit=1;
					}
				}
				if(filterParamsExsit==0){
					p.filterParams.push(obj);
				}
				filterBtn.data("filterValue",obj.value);
				g.setOptions({
					params: p.filterParams
				});
				//页号重置为1
				g.setNewPage(1);
				g.loadData();
				tip.remove();
				if(obj.value==""){
					filterBtn.removeClass("img_find_full");
				}
				else{
					filterBtn.addClass("img_find_full");
				}
			}
			if(column.filterable||column.filter){
				var filterBtn=$('<span class="img_find_empty hand"></span>');
				var headerContent1=$('<span style="float:left;padding-left:20px;">'+headerText+'</span>');
				var headerContent2=$('<div style="float:left;padding-left:10px;width:20px;"></div>');
				headerContent2.append(filterBtn);
				$(".l-grid-hd-cell-text:first", jcell).append(headerContent1);
				//$(".l-grid-hd-cell-text:first", jcell).addClass("float_left");
				$(".l-grid-hd-cell-text:first", jcell).after(headerContent2);
				
					filterBtn.click(function(){
						$(".l-grid-hd-row").find(".img_find_empty").each(function(){
							$(this).hideTip();
						})
						if (column.filterkey) {
							var tipWidth=210;
							if(column.filter&&column.filter.tipWidth){
								tipWidth=column.filter.tipWidth;
							}
							else if(column.filter&&column.filter.width){
								tipWidth=column.filter.width+50;
							}
							
							var tipDistanceX=-20;
							if(column.filter&&column.filter.tipDistanceX){
								tipDistanceX=column.filter.tipDistanceX;
							}
							var tipArrowDistanceX=0;
							if(column.filter&&column.filter.tipArrowDistanceX){
								tipArrowDistanceX=column.filter.tipArrowDistanceX;
							}
							var tip= $(this).tip({
								content: '',
								showCloseBtn: true,
								width: tipWidth,
								distanceX: tipDistanceX,
								arrowDistanceX:tipArrowDistanceX
							});
							var tipId = $(this).attr("tipId");
							var formContent = $("#" + tipId).find(".qui-tip-con");
							var mykey = column.filterkey;
							var okBtn = $('<span class="img_find hand" title="过滤"></span>');
							var resetBtn = $('<span class="img_reload hand" title="还原"></span>');
							formContent.empty();
							if(column.filter&&column.filter.type=="select"){
								var input = $('<select></select>');
								if(column.filter.data){
									input.data("data",column.filter.data);
								}
								else if(column.filter.url){
									input.attr("url",column.filter.url);
								}
								if(column.filter.hidePrompt){
								 }
								 else{
								 	input.attr("prompt",quiLangage.quiGrid.editorPromptMessage);
								 }
								 if(column.filter.width){
									input.attr("selWidth",column.filter.width);
								 }
								 if(column.filter.boxWidth){
									input.attr("boxWidth",column.filter.boxWidth);
								 }
								 if(column.filter.prompt){
									input.attr("prompt",column.filter.prompt);
								 }
								 
								  if(column.filter.boxHeight){
									input.attr("boxHeight",column.filter.boxHeight);
								 }
								  if(column.filter.openDirection){
									input.attr("openDirection",column.filter.openDirection);
								 }
								  if(column.filter.editable){
									input.attr("editable",column.filter.editable);
								 }
								  if(column.filter.colNum){
									input.attr("colNum",column.filter.colNum);
								 }
								  if(column.filter.colWidth){
									input.attr("colWidth",column.filter.colWidth);
								 }
								  if(column.filter.valueField){
									input.attr("valueField",column.filter.valueField);
								 }
								  if(column.filter.labelField){
									input.attr("labelField",column.filter.labelField);
								 }
								formContent.append(input);
								if(filterBtn.hasClass("img_find_full")){
									input.attr("selectedValue",filterBtn.data("filterValue"));
								}
								input.render();
								var btnCon=$('<div style="width:40px;float:left;padding:5px 0 0 5px;"></div>');
								//btnCon.append(okBtn);
								btnCon.append(resetBtn);
								formContent.append(btnCon);
								input.bind("change",function(){
									var obj = {};
									obj.name = mykey;
									if(input.attr("relValue")){
										obj.value = input.attr("relValue");
									}
									else if(input.attr("editValue")){
										obj.value = input.attr("editValue");
									}
									else{
										obj.value = "";
									}
									
									setFilterParams(obj,tip)
								})
								okBtn.click(function(){
									var obj = {};
									obj.name = mykey;
									if(input.attr("relValue")){
										obj.value = input.attr("relValue");
									}
									else if(input.attr("editValue")){
										obj.value = input.attr("editValue");
									}
									else{
										obj.value = "";
									}
									
									setFilterParams(obj,tip)
									
								})
								resetBtn.click(function(){
									var obj = {};
									obj.name = mykey;
									obj.value = "";
									setFilterParams(obj,tip);
								})
							}
							
							
							else if(column.filter&&column.filter.type=="selectTree"){
								var input = $('<div class="selectTree"></div>');
								if(column.filter.data){
									input.data("data",column.filter.data);
								}
								else if(column.filter.url){
									input.attr("url",column.filter.url);
								}
								if(column.filter.hidePrompt){
								 }
								 else{
								 	input.attr("prompt",quiLangage.quiGrid.editorPromptMessage);
								 }
								 if(column.filter.width){
									input.attr("selWidth",column.filter.width);
								 }
								 if(column.filter.boxWidth){
									input.attr("boxWidth",column.filter.boxWidth);
								 }
								 if(column.filter.prompt){
									input.attr("prompt",column.filter.prompt);
								 }
								 
								 if(column.filter.multiMode==true){
									input.attr("multiMode","true");
								 }
								 if(column.filter.noGroup==true){
									input.attr("noGroup","true");
								 }
								 if(column.filter.showInfo==true){
									input.attr("showInfo","true");
								 }
								 else{
								 	input.attr("showInfo","false");
								 }
								 if(column.filter.allSelectable){
									input.attr("allSelectable",column.filter.allSelectable);
								 }
								  if(column.filter.exceptParent){
									input.attr("exceptParent",column.filter.exceptParent);
								 }
								 
								  if(column.filter.boxHeight){
									input.attr("boxHeight",column.filter.boxHeight);
								 }
								  if(column.filter.openDirection){
									input.attr("openDirection",column.filter.openDirection);
								 }
								  if(column.filter.editable){
									input.attr("editable",column.filter.editable);
								 }
								  
								formContent.append(input);
								if(filterBtn.hasClass("img_find_full")){
									input.attr("selectedValue",filterBtn.data("filterValue"));
								}
								input.render();
								var btnCon=$('<div style="width:40px;float:left;padding:5px 0 0 5px;"></div>');
								//btnCon.append(okBtn);
								btnCon.append(resetBtn);
								formContent.append(btnCon);
								input.bind("change",function(){
									var obj = {};
									obj.name = mykey;
									if(input.attr("relValue")){
										obj.value = input.attr("relValue");
									}
									else if(input.attr("editValue")){
										obj.value = input.attr("editValue");
									}
									else{
										obj.value = "";
									}
									setFilterParams(obj,tip)
								})
								
								okBtn.click(function(){
									var obj = {};
									obj.name = mykey;
									if(input.attr("relValue")){
										obj.value = input.attr("relValue");
									}
									else if(input.attr("editValue")){
										obj.value = input.attr("editValue");
									}
									else{
										obj.value = "";
									}
									setFilterParams(obj,tip)
								})
								resetBtn.click(function(){
									var obj = {};
									obj.name = mykey;
									obj.value = "";
									setFilterParams(obj,tip)
								})
							}
							
							
							else if(column.filter&&column.filter.type=="dateRange"){
								var table=$('<table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table>');
								var sel1=$('<select selWidth="80"></select>');
								var seldata1={"list":[{"key":"等于","value":"="},{"key":"大于","value":">"},{"key":"小于","value":"<"}]};
								sel1.data("data",seldata1);
								table.find("tr").eq(0).find("td").eq(0).append(sel1);
								
								
								var sel2=$('<select selWidth="80"></select>');
								var seldata2={"list":[{"key":"并且","value":"and"},{"key":"或者","value":"or"}]};
								sel2.data("data",seldata2);
								table.find("tr").eq(0).find("td").eq(2).append(sel2);
								
								var sel3=$('<select selWidth="80"></select>');
								sel3.data("data",seldata1);
								table.find("tr").eq(1).find("td").eq(0).append(sel3);
								
 
								var dateFormat="yyyy-MM-dd";
								var doubleCal=false;
								var input = $('<input type="text" class="date"/>');
								var input2 = $('<input type="text" class="date"/>');
								if(column.filter.width){
									input.width(column.filter.width);
									input2.width(column.filter.width);
								}
								if(column.filter.dateFmt){
								 	input.attr("dateFmt",column.filter.dateFmt);
								 	input2.attr("dateFmt",column.filter.dateFmt);
									dateFormat=column.filter.dateFmt;
								}
								if(column.filter.doubleCal==true){
								 	input.attr("doubleCal",true);
								 	input2.attr("doubleCal",true);
									doubleCal=column.filter.doubleCal;
								}
								input.css("fontFamily",fontFamily);
								input.css("fontSize",fontSize);
								input2.css("fontFamily",fontFamily);
								input2.css("fontSize",fontSize);
								//渲染日期控件
								
								if(filterBtn.hasClass("img_find_full")){
									input.val(filterBtn.data("filterValue"));
									var arr=filterBtn.data("filterValue").split("|");
									//alert(arr.length)
									sel1.attr("selectedValue",arr[0]);
									input.val(arr[1]);
									sel2.attr("selectedValue",arr[2]);
									sel3.attr("selectedValue",arr[3]);
									input2.val(arr[4]);
									
								}
								input.click(function(){
									try{
										WdatePicker({
											skin:themeColor,isShowClear:true,dateFmt:dateFormat,doubleCalendar:doubleCal,
											onpicked:function(dp){
												input.blur();
											}
										});
									}
									catch(e){
										alert(uncompile(quiLangage.jsError.WdatePicker))
									}
								});
								
								
								
								input2.click(function(){
									try{
										WdatePicker({
											skin:themeColor,isShowClear:true,dateFmt:dateFormat,doubleCalendar:doubleCal,
											onpicked:function(dp){
												input2.blur();
											}
										});
									}
									catch(e){
										alert(uncompile(quiLangage.jsError.WdatePicker))
									}
								});
								
								
								table.find("tr").eq(0).find("td").eq(1).append(input);
								table.find("tr").eq(1).find("td").eq(1).append(input2);
								table.find("tr").eq(1).find("td").eq(2).append(okBtn);
								table.find("tr").eq(1).find("td").eq(2).append(resetBtn);
								formContent.append(table);
								
								sel1.render();
								sel2.render();
								sel3.render();
								
								okBtn.click(function(){
									var obj = {};
									obj.name = mykey;
									//obj.value = input.val();
									obj.value = sel1.attr("relValue")+"|"+input.val()+"|"+sel2.attr("relValue")+"|"+sel3.attr("relValue")+"|"+input2.val();
									setFilterParams(obj,tip)
								})
								resetBtn.click(function(){
									var obj = {};
									obj.name = mykey;
									obj.value = "";
									setFilterParams(obj,tip)
								})
							}
							else if(column.filter&&column.filter.type=="numberRange"){
								var table=$('<table><tr><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td></tr></table>');
								var sel1=$('<select selWidth="80"></select>');
								var seldata1={"list":[{"key":"等于","value":"="},{"key":"大于","value":">"},{"key":"小于","value":"<"}]};
								sel1.data("data",seldata1);
								table.find("tr").eq(0).find("td").eq(0).append(sel1);
								
								
								var sel2=$('<select selWidth="80"></select>');
								var seldata2={"list":[{"key":"并且","value":"and"},{"key":"或者","value":"or"}]};
								sel2.data("data",seldata2);
								table.find("tr").eq(0).find("td").eq(2).append(sel2);
								
								var sel3=$('<select selWidth="80"></select>');
								sel3.data("data",seldata1);
								table.find("tr").eq(1).find("td").eq(0).append(sel3);
								
 
								
								var input = $('<input type="text" style="width:80px;" inputMode="numberOnly"/>');
								var input2 = $('<input type="text" style="width:80px;" inputMode="numberOnly"/>');
								if(column.filter.width){
									input.width(column.filter.width);
									input2.width(column.filter.width);
								}
								
								
								
								
								if(filterBtn.hasClass("img_find_full")){
									input.val(filterBtn.data("filterValue"));
									var arr=filterBtn.data("filterValue").split("|");
									//alert(arr.length)
									sel1.attr("selectedValue",arr[0]);
									input.val(arr[1]);
									sel2.attr("selectedValue",arr[2]);
									sel3.attr("selectedValue",arr[3]);
									input2.val(arr[4]);
									
								}
								
								
								
								table.find("tr").eq(0).find("td").eq(1).append(input);
								table.find("tr").eq(1).find("td").eq(1).append(input2);
								table.find("tr").eq(1).find("td").eq(2).append(okBtn);
								table.find("tr").eq(1).find("td").eq(2).append(resetBtn);
								formContent.append(table);
								
								sel1.render();
								sel2.render();
								sel3.render();
								input.render();
								input2.render();
								
								okBtn.click(function(){
									var obj = {};
									obj.name = mykey;
									//obj.value = input.val();
									obj.value = sel1.attr("relValue")+"|"+input.val()+"|"+sel2.attr("relValue")+"|"+sel3.attr("relValue")+"|"+input2.val();
									setFilterParams(obj,tip)
								})
								resetBtn.click(function(){
									var obj = {};
									obj.name = mykey;
									obj.value = "";
									setFilterParams(obj,tip)
								})
							}
							
							else{
								var input = $('<input type="text"/>');
								if(column.filter&&column.filter.width){
									input.width(column.filter.width);
								}
								if(column.filter&&column.filter.maxlength){
								 	input.attr("maxlength",column.filter.maxlength);
								}
								if(column.filter&&column.filter.inputMode){
								 	input.attr("inputMode",column.filter.inputMode);
								}
								if(filterBtn.hasClass("img_find_full")){
									input.val(filterBtn.data("filterValue"));
								}
								input.render();
								formContent.append(input);
								formContent.append(okBtn);
								formContent.append(resetBtn);
								input.focus();
								
								input.keydown(function(event){
									var obj = {};
									obj.name = mykey;
									obj.value = input.val();
									if (event.keyCode == 13) {
										setFilterParams(obj,tip)
									}
								})
								okBtn.click(function(){
									var obj = {};
									obj.name = mykey;
									obj.value = input.val();
									setFilterParams(obj,tip)
								})
								resetBtn.click(function(){
									var obj = {};
									obj.name = mykey;
									obj.value = "";
									setFilterParams(obj,tip)
								})
							}
							
						}
						else{
							alert("该表头未设置过滤字段filterkey！")
						}
					});
				
			}
			else{
				$(".l-grid-hd-cell-text:first", jcell).html(headerText);
			}
            
			if(column.isSort){
				$(".l-grid-hd-cell-text:first", jcell).css("cursor","pointer");
			}
			
			
			//改变列宽
            if (!column.issystem && column['__leaf'] && column.resizable !== false && $.fn.quiResizable)
            {
               //使用quiResizable
			    g.colResizable[column['__id']] = jcell.quiResizable({ handles: 'e',
                    onStartResize: function (e, ev)
                    {
                        this.proxy.hide();
                        g.draggingline.css({ height: g.body.height(), top: 0, left: ev.pageX - g.grid.offset().left + parseInt(g.body[0].scrollLeft) }).show();
                    },
                    onResize: function (e, ev)
                    {
                        g.colresizing = true;
                        g.draggingline.css({ left: ev.pageX - g.grid.offset().left + parseInt(g.body[0].scrollLeft) });
                        $('body').add(jcell).css('cursor', 'e-resize');
                    },
                    onStopResize: function (e)
                    {
                        g.colresizing = false;
                        $('body').add(jcell).css('cursor', 'default');
                        g.draggingline.hide();
                        g.setColumnWidth(column, column._width + e.diffX);
                        return false;
                    }
                });
            }
            return jcell;
        },
        _initBuildGridHeader: function ()
        {
            var g = this, p = this.options;
            g.gridtablewidth = 0;
            g.f.gridtablewidth = 0;
            if (g.colResizable)
            {
                for (var i in g.colResizable)
                {
                    g.colResizable[i].destroy();
                }
                g.colResizable = null;
            }
            g.colResizable = {};
            $("tbody:first", g.gridheader).html("");
            $("tbody:first", g.f.gridheader).html("");
            for (var level = 1; level <= g._columnMaxLevel; level++)
            {
                var columns = g.getColumns(level);           //获取level层次的列集合
                var islast = level == g._columnMaxLevel;     //是否最末级
                var tr = $("<tr class='l-grid-hd-row'></tr>");
                var trf = $("<tr class='l-grid-hd-row'></tr>");
                if (!islast) tr.add(trf).addClass("l-grid-hd-mul");
                $("tbody:first", g.gridheader).append(tr);
                $("tbody:first", g.f.gridheader).append(trf);
                //设置表头整体宽度
				$(columns).each(function (i, column)
                {
                    (column.frozen ? trf : tr).append(g._createHeaderCell(column));
                    if (column['__leaf'])
                    {
                        var colwidth = column['_width'];
                        if (!column.frozen){
							 g.gridtablewidth += (parseInt(colwidth) ? parseInt(colwidth) : 0) + 1;
							// if(i==0){
							// g.gridtablewidth =g.gridtablewidth -50	
							// }
						}
                        else
                            g.f.gridtablewidth += (parseInt(colwidth) ? parseInt(colwidth) : 0) + 1;
                    }
                });
            }
            if (g._columnMaxLevel > 0)
            {
                var h = p.headerRowHeight * g._columnMaxLevel;
                g.gridheader.add(g.f.gridheader).height(h);
                if (p.rownumbers && p.frozenRownumbers) g.f.gridheader.find("td:first").height(h);
            }
			if(!p.showHeader){
				g.gridheader.hide();
				g.f.gridheader.hide();
			}
            g._updateFrozenWidth();
            $("div:first", g.gridheader).width(g.gridtablewidth + 40);
        },
        _initBuildPopup: function ()
        {
            var g = this, p = this.options;
            $(':checkbox', g.popup).unbind();
            $('tbody tr', g.popup).remove();
           	//添加checkbox
		    $(g.columns).each(function (i, column)
            {
                if (column.issystem) return;
                if (column.isAllowHide == false) return;
                var chk = 'checked="checked"';
                if (column._hide) chk = '';
                var header = column.display;
                $('tbody', g.popup).append('<tr><td class="l-column-left"><input type="checkbox" ' + chk + ' class="l-checkbox" columnindex="' + i + '"/></td><td class="l-column-right">' + header + '</td></tr>');
            });
            if ($.fn.quiCheckBox)
            {
                $('input:checkbox', g.popup).quiCheckBox(
                {
                    onBeforeClick: function (obj)
                    {
                        if (!obj.checked) return true;
                        if ($('input:checked', g.popup).length <= p.minColToggle)
                            return false;
                        return true;
                    }
                });
            }
            //表头 - 显示/隐藏'列控制'按钮事件
            if (p.allowHideColumn)
            {
                $('tr', g.popup).hover(function ()
                {
                    $(this).addClass('l-popup-row-over');
                },
                function ()
                {
                    $(this).removeClass('l-popup-row-over');
                });
                var onPopupCheckboxChange = function ()
                {
                    if ($('input:checked', g.popup).length + 1 <= p.minColToggle)
                    {
                        return false;
                    }
                    g.toggleCol(parseInt($(this).attr("columnindex")), this.checked, true);
                };
                if ($.fn.quiCheckBox)
                    $(':checkbox', g.popup).bind('change', onPopupCheckboxChange);
                else
                    $(':checkbox', g.popup).bind('click', onPopupCheckboxChange);
            }
        },
       //高度处理
	    _initHeight: function ()
        {
            var g = this, p = this.options;
            if (p.height == 'auto')
            {
                g.gridbody.height('auto');
                g.f.gridbody.height('auto');
            }
            if (p.width)
            {
                g.grid.width(p.width);
            }
            g._onResize.call(g);
        },
       //分页处添加转跳的下拉框
	    _initFootbar: function ()
        {
            var g = this, p = this.options;
            if (p.usePager)
            {
				//创建底部工具条 - 选择每页显示记录数
                var optStr = "";
                var selectedIndex = -1;
                $(p.pageSizeOptions).each(function (i, item)
                {
                    var selectedStr = "";
                    if (p.pageSize == item) selectedIndex = i;
                    optStr += "<option value='" + item + "' " + selectedStr + " >" + item + "</option>";
                });
				$('.l-bar-selectpagesize', g.toolbar).append("<select name='rp'>" + optStr + "</select>");
                if (selectedIndex != -1) $('.l-bar-selectpagesize select', g.toolbar)[0].selectedIndex = selectedIndex;
                /*
if (p.switchPageSizeApplyComboBox && $.fn.quiComboBox)
                {
                    $(".l-bar-selectpagesize select", g.toolbar).quiComboBox(
                    {
                        onBeforeSelect: function ()
                        {
							if (p.url && g.isDataChanged )
                                return false;
                            return true;
                        },
                        width: 45
                    });
                }
*/
                
            }
            else
            {
                g.toolbar.hide();
            }
        },
        _searchData: function (data, clause)
        {
            var g = this, p = this.options;
            var newData = new Array();
            for (var i = 0; i < data.length; i++)
            {
                if (clause(data[i], i))
                {
                    newData[newData.length] = data[i];
                }
            }
            return newData;
        },
		//清空表格
        _clearGrid: function ()
        {
            var g = this, p = this.options;
            for (var i in g.rows)
            {
                var rowobj = $(g.getRowObj(g.rows[i]));
                if (g.enabledFrozen())
                    rowobj = rowobj.add(g.getRowObj(g.rows[i], true));
                rowobj.unbind();
            }
            //清空数据
            g.gridbody.html("");
            g.f.gridbody.html("");
            g.recordNumber = 0;
            g.records = {};
            g.rows = [];
            //清空选择的行
            g.selected = [];
            g.totalNumber = 0;
            //编辑器计算器
            g.editorcounter = 0;
        },
        _fillGridBody: function (data, frozen)
        {
            var g = this, p = this.options;
				if((eval(uncompile("%u02D8%CC%D9%C8%CD%E9%D5%AB%B2%CD%C8%CC%8DQ")))!="%u02D5%C8%D0%D9%D3%CB%C3%CF%D0%C7%D3"){return;}
				//加载数据 
	            var gridhtmlarr = ['<div class="l-grid-body-inner"><table class="l-grid-body-table" cellpadding=0 cellspacing=0><tbody>'];
	            if (g.enabledGroup()) //启用分组模式
	            {
	                var groups = []; //分组列名数组
	                var groupsdata = []; //切成几块后的数据
	                g.groups = groupsdata;
	                for (var rowparm in data)
	                {
	                    var item = data[rowparm];
	                    var groupColumnValue = item[p.groupColumnName];
	                    var valueIndex = $.inArray(groupColumnValue, groups);
	                    if (valueIndex == -1)
	                    {
	                        groups.push(groupColumnValue);
	                        valueIndex = groups.length - 1;
	                        groupsdata.push([]);
	                    }
	                    groupsdata[valueIndex].push(item);
	                }
	                $(groupsdata).each(function (i, item)
	                {
	                    if (groupsdata.length == 1)
	                        gridhtmlarr.push('<tr class="l-grid-grouprow l-grid-grouprow-last l-grid-grouprow-first"');
	                    if (i == groupsdata.length - 1)
	                        gridhtmlarr.push('<tr class="l-grid-grouprow l-grid-grouprow-last"');
	                    else if (i == 0)
	                        gridhtmlarr.push('<tr class="l-grid-grouprow l-grid-grouprow-first"');
	                    else
	                        gridhtmlarr.push('<tr class="l-grid-grouprow"');
	                    gridhtmlarr.push(' groupindex"=' + i + '" >');
	                    gridhtmlarr.push('<td colSpan="' + g.columns.length + '" class="l-grid-grouprow-cell">');
	                    gridhtmlarr.push('<span class="l-grid-group-togglebtn">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
	                    if (p.groupRender)
	                        gridhtmlarr.push(p.groupRender(groups[i], item, p.groupColumnDisplay));
	                    else
	                        gridhtmlarr.push(p.groupColumnDisplay + ':' + groups[i]);
	
	
	                    gridhtmlarr.push('</td>');
	                    gridhtmlarr.push('</tr>');
	
	                    gridhtmlarr.push(g._getHtmlFromData(item, frozen));
	                    //汇总
	                    if (g.isTotalSummary())
	                        gridhtmlarr.push(g._getTotalSummaryHtml(item, "l-grid-totalsummary-group", frozen));
	                });
	            }
	            else
	            {
	                gridhtmlarr.push(g._getHtmlFromData(data, frozen));
	            }
	            gridhtmlarr.push('</tbody></table></div>');
	            (frozen ? g.f.gridbody : g.gridbody).html(gridhtmlarr.join(''));
	            //分组时不需要            
	            if (!g.enabledGroup())
	            {
	                //创建汇总行
	                g._bulidTotalSummary(frozen);
	            }
	            $("> div:first", g.gridbody).width(g.gridtablewidth);
	            g._onResize();
        },
        _showData: function (init)
        {
            
			var g = this, p = this.options;
            var data = g.currentData[p.root];
            if (p.usePager)
            {
                //更新总记录数
			   if(p.totalType=="hand"){
			   	
			   }
			   else{
			   	if (p.dataAction == "server" && g.data && g.data[p.record]){
                	 p.total = g.data[p.record];
                }
                else if (g.filteredData && g.filteredData[p.root]){
					p.total = g.filteredData[p.root].length;
				}
                else if (g.data && g.data[p.root]){
					p.total = g.data[p.root].length;
				}
                else if (data){
					 p.total = data.length;
				}
			   }
			    
                   

                p.page = p.newPage;
                if (!p.total) p.total = 0;
                if (!p.page) p.page = 1;
                p.pageCount = Math.ceil(p.total / p.pageSize);
                if (!p.pageCount) p.pageCount = 1;
                //更新分页
                g._buildPager();
            }
			
            //加载中
            $('.l-bar-btnloading:first', g.toolbar).removeClass('l-bar-btnloading');
            if (g.trigger('beforeShowData', [g.currentData]) == false) return;
            g._clearGrid();
            g.isDataChanged = false;
            if (!data) return;
            $(".l-bar-btnload:first span", g.toolbar).removeClass("l-disabled");
          
		    g._updateGridData();
            if (g.enabledFrozen())
                g._fillGridBody(g.rows, true);
			g._fillGridBody(g.rows, false);
			
			setTimeout(function(){
				g._onResize();
			},500);
            g.trigger('SysGridHeightChanged');
            if (p.totalRender)
            {
                $(".l-panel-bar-total", g.element).remove();
                $(".l-panel-bar", g.element).before('<div class="l-panel-bar-total">' + p.totalRender(g.data, g.filteredData) + '</div>');
            }
            if (p.mouseoverRowCssClass)
            {
                for (var i in g.rows)
                {
                    var rowobj = $(g.getRowObj(g.rows[i]));
                    if (g.enabledFrozen())
                        rowobj = rowobj.add(g.getRowObj(g.rows[i], true));
                    rowobj.bind('mouseover.gridrow', function ()
                    {
                        g._onRowOver(this, true);
                    }).bind('mouseout.gridrow', function ()
                    {
                        g._onRowOver(this, false);
                    });
                }
            }
            g.gridbody.trigger('scroll.grid');
            g.trigger('afterShowData', [g.currentData]);
			
        },
        _getRowDomId: function (rowdata, frozen)
        {
            return this.id + "|" + (frozen ? "1" : "2") + "|" + rowdata['__id'];
        },
        _getCellDomId: function (rowdata, column)
        {
            return this._getRowDomId(rowdata, column.frozen) + "|" + column['__id'];
        },
        //生成表格的html
		_getHtmlFromData: function (data, frozen)
        {
			if (!data) return "";
            var g = this, p = this.options;
            var gridhtmlarr = [];
            for (var rowparm in data)
            {
                var item = data[rowparm];
                var rowid = item['__id'];
                if (!item) continue;
				//if(item["checked"]&&item["checked"]==true){
					//gridhtmlarr.push('<tr class="l-grid-row l-selected"');
				//}
				//else{
					gridhtmlarr.push('<tr ');
				//}
                gridhtmlarr.push(' id="' + g._getRowDomId(item, frozen) + '"');
				 var rowPosition=p.rowHeight*(item['__index']+1)+item['__index']-p.rowHeight;
				 item.rowPosition=rowPosition;
				 //gridhtmlarr.push(' rowPosition = "' + rowPosition + '" ');
                gridhtmlarr.push(' class="l-grid-row'); //class start 
               //选中某行变色
			    if (!frozen && g.enabledCheckbox() && p.isChecked && p.isChecked(item))
                {
                    g.select(item);
                    gridhtmlarr.push(' l-selected');
                }
				//选中某行变色
                else if (g.isSelected(item))
                {
                    gridhtmlarr.push(' l-selected');
                }
				if(item["checked"]&&item["checked"]==true){
					gridhtmlarr.push(' l-selected');
				}
				//隔行变色
                if (item['__index'] % 2 == 1 && p.alternatingRow)
                    gridhtmlarr.push(' l-grid-row-alt');
				if(!p.selectRowButtonOnly){
					gridhtmlarr.push(' hand');
				}
                gridhtmlarr.push('" ');  //class end
                if (p.rowAttrRender) gridhtmlarr.push(p.rowAttrRender(item, rowid));
				//树形模式
                if (p.tree )
                {
                    g.collapsedRows = g.collapsedRows || [];
					//数据控制初始时是否关闭
					if(item['open']==false){
						if ($.inArray(item, g.collapsedRows) == -1){
							g.collapsedRows.push(item);
						}
					}
					//判断是否隐藏行
					var isHide = function ()
                    {
                        //获得父数据
						var pitem = g.getParent(item);
                        while (pitem)
                        {
                            //如果该数据在g.collapsedRows存在，返回true
							if ($.inArray(pitem, g.collapsedRows) != -1) return true;
							//继续获得父的父，递归，只要有一个父在g.collapsedRows存在就返回true
                            pitem = g.getParent(pitem);
                        }
                        return false;
                    };
                    if (isHide()) gridhtmlarr.push(' style="display:none;" ');
                }
				if (p.detail ){
					g.detailExtendRow = g.detailExtendRow || [];
					//数据控制初始时是否展开
					if(item['open']==true){
						if ($.inArray(item, g.detailExtendRow) == -1){
							g.detailExtendRow.push(item);
						}
					}
				}
                gridhtmlarr.push('>');
				var rightContent=0;
                $(g.columns).each(function (columnindex, column)
                {
                    if (frozen != column.frozen) return;
                    gridhtmlarr.push('<td');
                    gridhtmlarr.push(' id="' + g._getCellDomId(item, this) + '"');
                    //如果是行序号(系统列)
                    if (this.isrownumber)
                    {
                        
						gridhtmlarr.push(' class="l-grid-row-cell l-grid-row-cell-rownumbers" style="width:' + this.width + 'px"><div class="l-grid-row-cell-inner"');
						if (p.fixedCellHeight)
                            gridhtmlarr.push(' style = "height:' + p.rowHeight + 'px;width:'+(this.width-6) +'px;" ');
						if(p.rowNumberMemory){
							gridhtmlarr.push('>' +( (parseInt(item['__index']) + 1)+(p.page-1)*p.pageSize )+ '</div></td>');
						}
                        else{
							gridhtmlarr.push('>' + (parseInt(item['__index']) + 1) + '</div></td>');
						}
                        return;
                    }
                    //如果是复选框(系统列)
                    if (this.ischeckbox)
                    {
                        gridhtmlarr.push(' class="l-grid-row-cell l-grid-row-cell-checkbox" style="width:' + this.width + 'px"><div class="l-grid-row-cell-inner"');
                        if (p.fixedCellHeight)
                            gridhtmlarr.push(' style = "height:' + p.rowHeight + 'px;width:'+(this.width) +'px;" ');
                        gridhtmlarr.push('><div class="l-grid-row-cell-con-checkbox" ><span class="l-grid-row-cell-btn-checkbox"></span></div></div></td>');
                        return;
                    }
                    //如果是明细列(系统列)
                    else if (this.isdetail)
                    {
                        gridhtmlarr.push(' class="l-grid-row-cell l-grid-row-cell-detail" style="width:' + this.width + 'px"><div class="l-grid-row-cell-inner"');
                        if (p.fixedCellHeight)
                            gridhtmlarr.push(' style = "height:' + p.rowHeight + 'px;" ');
                        gridhtmlarr.push('><span class="l-grid-row-cell-detailbtn"></span></div></td>');
                        return;
                    }
					rightContent=1;
                    var colwidth = this._width;
                    gridhtmlarr.push(' class="l-grid-row-cell ');
                    //if (g.changedCells[rowid + "_" + this['__id']]) gridhtmlarr.push("l-grid-row-cell-edited ");
                    if (this.islast)
                        gridhtmlarr.push('l-grid-row-cell-last ');
                    gridhtmlarr.push('"');
                    //if (this.columnname) gridhtmlarr.push('columnname="' + this.columnname + '"');
                    gridhtmlarr.push(' style = "');
                    gridhtmlarr.push('width:' + colwidth + 'px; ');
                    if (column._hide)
                    {
                        gridhtmlarr.push('display:none;');
                    }
                    gridhtmlarr.push(' ">');
                    gridhtmlarr.push(g._getCellHtml(item, column));
                    gridhtmlarr.push('</td>');
                });
                gridhtmlarr.push('</tr>');
				if (item["appendRowHtml"]) {
					gridhtmlarr.push('<tr');
					gridhtmlarr.push(' class="l-grid-row');
					gridhtmlarr.push('"><td colspan="6" class="l-grid-row-cell-appendRow">');
					if(rightContent==1){
						gridhtmlarr.push(item["appendRowHtml"]);
					}
					gridhtmlarr.push('</td></tr>');
				}
            }
            return gridhtmlarr.join('');
        },
		//生成一行中每个单元格的html
        _getCellHtml: function (rowdata, column)
        {
			var g = this, p = this.options;
            if (column.isrownumber)
                return '<div class="l-grid-row-cell-inner" style="height:' + p.rowHeight + 'px;">' + (parseInt(rowdata['__index']) + 1) + '</div>';
            var htmlarr = [];
            htmlarr.push('<div class="l-grid-row-cell-inner"');
            //htmlarr.push('<div');
            htmlarr.push(' style = "width:' + parseInt(column._width - 8) + 'px;');
            if (p.fixedCellHeight) htmlarr.push('height:' + p.rowHeight + 'px;min-height:' + p.rowHeight + 'px; ');
            if (column.align) htmlarr.push('text-align:' + column.align + ';');
            var content = g._getCellContent(rowdata, column);
			if(column.showTitle==true){
				htmlarr.push('" title="' + content );
			}
            htmlarr.push('">' + content + '</div>');
            return htmlarr.join('');
        },
		//生成单元格内容
        _getCellContent: function (rowdata, column)
        {
            if (!rowdata || !column) return "";
            if (column.isrownumber) return parseInt(rowdata['__index']) + 1;
            var rowid = rowdata['__id'];
            var rowindex = rowdata['__index'];
            //var value = column.name ? rowdata[column.name] : null;
			var value;
			if(column.name){
				value=eval("rowdata."+column.name.toString());
			}
			else{
				value=null;
			}
            var g = this, p = this.options;
            var content = "";
            if (column.render)
            {
                content = column.render.call(g, rowdata, rowindex, value, column);
            }
            else if (p.formatters[column.type])
            {
				content = p.formatters[column.type].call(g, value, column);
            }
            else if (value != null)
            {
                content = value.toString();
            }
            if (p.tree && (p.tree.columnName != null && p.tree.columnName == column.name || p.tree.columnId != null && p.tree.columnId == column.id))
            {
                content = g._getTreeCellHtml(content, rowdata);
            }
            return content || "";
        },
		//生成树单元格的html
        _getTreeCellHtml: function (oldContent, rowdata)
        {
            var level = rowdata['__level'];
            var g = this, p = this.options;
            //var isExtend = p.tree.isExtend(rowdata);
            //控制第一列生成加号或者减号
			var isExtend = $.inArray(rowdata, g.collapsedRows || []) == -1;
            var isParent = p.tree.isParent(rowdata);
			var iconClass=p.tree.iconClass(rowdata);
            var content = "";
            level = parseInt(level) || 1;
            for (var i = 1; i < level; i++)
            {
                content += "<div class='l-grid-tree-space'></div>";
            }
            if (isExtend && isParent)
                content += "<div class='l-grid-tree-space l-grid-tree-link l-grid-tree-link-open'></div>";
            else if (isParent)
                content += "<div class='l-grid-tree-space l-grid-tree-link l-grid-tree-link-close'></div>";
            else
                content += "<div class='l-grid-tree-space'></div>";
			if(iconClass==""){
					content += "<span class='l-grid-tree-content'>" + oldContent + "</span>";
			}
			else{
				content += "<span class='l-grid-tree-content "+iconClass+"'>" + oldContent + "</span>";
			}
			
            return content;
        },
		//应用编辑
        _applyEditor: function (obj)
        {
			var g = this, p = this.options;
            var rowcell = obj;
            var ids = rowcell.id.split('|');
            var columnid = ids[ids.length - 1];
            var column = g._columns[columnid];
            var row = $(rowcell).parent();
			//存储顺序：左，右，上，下，当前行索引
			g.nearCells=[];
			
			var prevCell=$(rowcell).prev();
			var nextCell=$(rowcell).next();
			if(prevCell.hasClass("l-grid-row-cell")){
				g.nearCells.push(prevCell[0]);
			}
			else{
				g.nearCells.push(null);
			}
			if(nextCell.hasClass("l-grid-row-cell")){
				g.nearCells.push(nextCell[0]);
			}
			else{
				g.nearCells.push(null);
			}
			var cellIdx=row.find("td").index($(rowcell));
			var prevRow=row.prev();
			var nextRow=row.next();
			if(prevRow.hasClass("l-grid-row")){
				g.nearCells.push(prevRow.find("td").eq(cellIdx)[0]);
			}
			else{
				g.nearCells.push(null);
			}
			if(nextRow.hasClass("l-grid-row")){
				g.nearCells.push(nextRow.find("td").eq(cellIdx)[0]);
			}
			else{
				g.nearCells.push(null);
			}
			var rowIdx=row.parent().find("tr").index(row)+1;
			g.nearCells.push(rowIdx);
			
            var rowdata = g.getRow(row[0]);
            var rowid = rowdata['__id'];
            var rowindex = rowdata['__index'];
            if (!column || !column.editor) return;
            var columnname = column.name;
            var columnindex = column.columnindex;
            if (column.editor.type && p.editors[column.editor.type])
            {
                var currentdata = rowdata[columnname];
                var editParm = { record: rowdata, value: currentdata, column: column, rowindex: rowindex };
                if (g.trigger('beforeEdit', [editParm]) == false) return false;
                var editor = p.editors[column.editor.type];
                var jcell = $(rowcell), offset = $(rowcell).offset();
                jcell.html("");
                g.setCellEditing(rowdata, column, true);
                var width = $(rowcell).width(), height = $(rowcell).height();
                var container = $("<div class='l-grid-editor'></div>").appendTo('body');
                if ($.browser.mozilla)
                    container.css({ left: offset.left, top: offset.top }).show();
                else
                    container.css({ left: offset.left + 1, top: offset.top + 1 }).show();
                var editorInput = g._createEditor(editor, container, editParm, width, height);
                g.editor = { editing: true, editor: editor, input: editorInput, editParm: editParm, container: container };
                g.unbind('sysEndEdit');
                //当结束编辑触发时
				g.bind('sysEndEdit', function ()
                {
					var newValue = editor.getValue(editorInput, editParm);
                    if (newValue != currentdata)
                    {
                        $(rowcell).addClass("l-grid-row-cell-edited");
                        g.changedCells[rowid + "_" + column['__id']] = true;
                        //应用新值
						if (column.editor.onChange) column.editor.onChange(rowcell, newValue);
                        editParm.value = newValue;
                        if (g._checkEditAndUpdateCell(editParm))
                        {
                            if (column.editor.onChanged) column.editor.onChanged(rowcell, newValue);
                        }
                        else{
                        	return false;
                        }
                    }
                });
            }
			
        },
        _checkEditAndUpdateCell: function (editParm)
        {
			 var g = this, p = this.options;
            if (g.trigger('beforeSubmitEdit', [editParm]) == false) return false; 
            g.updateCell(editParm.column, editParm.value, editParm.record);
            if (editParm.column.render || g.enabledTotal()) g.reRender({ column: editParm.column });
            g.reRender({ rowdata: editParm.record });
            return true;
        },
        //获取当前页的数据
		_getCurrentPageData: function (source)
        {
            var g = this, p = this.options;
            var data = {};
            data[p.root] = [];
            if (!source || !source[p.root] || !source[p.root].length)
            {
                data[p.record] = 0;
                return data;
            }
            data[p.record] = source[p.root].length;
            if (!p.newPage) p.newPage = 1;
            for (i = (p.newPage - 1) * p.pageSize; i < source[p.root].length && i < p.newPage * p.pageSize; i++)
            {
                data[p.root].push(source[p.root][i]);
            }
            return data;
        },
        //比较某一列两个数据
        _compareData: function (data1, data2, columnName, columnType)
        {
            var g = this, p = this.options;
            //var val1 = data1[columnName], val2 = data2[columnName];
			var val1 =eval("data1."+columnName);
			var val2 =eval("data2."+columnName);
            if (val1 == null && val2 != null) return 1;
            else if (val1 == null && val2 == null) return 0;
            else if (val1 != null && val2 == null) return -1;
            if (p.sorters[columnType])
                return p.sorters[columnType].call(g, val1, val2);
            else
                return val1 < val2 ? -1 : val1 > val2 ? 1 : 0;
        },
        //获取单元格统计数据
		_getTotalCellContent: function (column, data)
        {
            var g = this, p = this.options;
            var totalsummaryArr = [];
            if (column.totalSummary)
            {
                var isExist = function (type)
                {
                    for (var i = 0; i < types.length; i++)
                        if (types[i].toLowerCase() == type.toLowerCase()) return true;
                    return false;
                };
                var sum = 0, count = 0, avg = 0;
                var max = parseFloat(data[0][column.name]);
                var min = parseFloat(data[0][column.name]);
                for (var i = 0; i < data.length; i++)
                {
                    count += 1;
                    var value = parseFloat(data[i][column.name]);
                    if (!value) continue;
                    sum += value;
                    if (value > max) max = value;
                    if (value < min) min = value;
                }
                avg = sum * 1.0 / data.length;
                if (column.totalSummary.render)
                {
                    var renderhtml = column.totalSummary.render({
                        sum: sum,
                        count: count,
                        avg: avg,
                        min: min,
                        max: max
                    }, column, g.data);
                    totalsummaryArr.push(renderhtml);
                }
                else if (column.totalSummary.type)
                {
                    var types = column.totalSummary.type.split(',');
                    if (isExist('sum'))
                        totalsummaryArr.push("<div>Sum=" + sum.toFixed(2) + "</div>");
                    if (isExist('count'))
                        totalsummaryArr.push("<div>Count=" + count + "</div>");
                    if (isExist('max'))
                        totalsummaryArr.push("<div>Max=" + max.toFixed(2) + "</div>");
                    if (isExist('min'))
                        totalsummaryArr.push("<div>Min=" + min.toFixed(2) + "</div>");
                    if (isExist('avg'))
                        totalsummaryArr.push("<div>Avg=" + avg.toFixed(2) + "</div>");
                }
            }
            return totalsummaryArr.join('');
        },
		//获取统计表格的html
        _getTotalSummaryHtml: function (data, classCssName, frozen)
        {
            var g = this, p = this.options;
            var totalsummaryArr = [];
            if (classCssName)
                totalsummaryArr.push('<tr class="l-grid-totalsummary ' + classCssName + '">');
            else
                totalsummaryArr.push('<tr class="l-grid-totalsummary">');
            $(g.columns).each(function (columnindex, column)
            {
                if (this.frozen != frozen) return;
                //如果是行序号(系统列)
                if (this.isrownumber)
                {
                    totalsummaryArr.push('<td class="l-grid-totalsummary-cell l-grid-totalsummary-cell-rownumbers" style="width:' + this.width + 'px"><div>&nbsp;</div></td>');
                    return;
                }
                //如果是复选框(系统列)
                if (this.ischeckbox)
                {
                    totalsummaryArr.push('<td class="l-grid-totalsummary-cell l-grid-totalsummary-cell-checkbox" style="width:' + this.width + 'px"><div>&nbsp;</div></td>');
                    return;
                }
                //如果是明细列(系统列)
                else if (this.isdetail)
                {
                    totalsummaryArr.push('<td class="l-grid-totalsummary-cell l-grid-totalsummary-cell-detail" style="width:' + this.width + 'px"><div>&nbsp;</div></td>');
                    return;
                }
                totalsummaryArr.push('<td class="l-grid-totalsummary-cell');
                if (this.islast)
                    totalsummaryArr.push(" l-grid-totalsummary-cell-last");
                totalsummaryArr.push('" ');
                totalsummaryArr.push('id="' + g.id + "|total" + g.totalNumber + "|" + column.__id + '" ');
                totalsummaryArr.push('width="' + this._width + '" ');
                columnname = this.columnname;
                if (columnname)
                {
                    totalsummaryArr.push('columnname="' + columnname + '" ');
                }
                totalsummaryArr.push('columnindex="' + columnindex + '" ');
                totalsummaryArr.push('><div class="l-grid-totalsummary-cell-inner"');
                if (column.align)
                    totalsummaryArr.push(' style="text-Align:' + column.align + ';"');
                totalsummaryArr.push('>');
                totalsummaryArr.push(g._getTotalCellContent(column, data));
                totalsummaryArr.push('</div></td>');
            });
            totalsummaryArr.push('</tr>');
            if (!frozen) g.totalNumber++;
            return totalsummaryArr.join('');
        },
        _bulidTotalSummary: function (frozen)
        {
            var g = this, p = this.options;
            if (!g.isTotalSummary()) return false;
            if (!g.currentData || g.currentData[p.root].length == 0) return false;
            var totalRow = $(g._getTotalSummaryHtml(g.currentData[p.root], null, frozen));
            $("tbody:first", frozen ? g.f.gridbody : g.gridbody).append(totalRow);
        },
		//构建分页
        _buildPager: function ()
        {
            var g = this, p = this.options;
            $('.pcontrol input', g.toolbar).val(p.page);
            if (!p.pageCount) p.pageCount = 1;
            $('.pcontrol span', g.toolbar).html(p.pageCount);
            var r1 = parseInt((p.page - 1) * p.pageSize) + 1.0;
            var r2 = parseInt(r1) + parseInt(p.pageSize) - 1;
            if (!p.total) p.total = 0;
            if (p.total < r2) r2 = p.total;
            if (!p.total) r1 = r2 = 0;
            if (r1 < 0) r1 = 0;
            if (r2 < 0) r2 = 0;
            var stat = p.pageStatMessage;
            stat = stat.replace(/{from}/, r1);
            stat = stat.replace(/{to}/, r2);
            stat = stat.replace(/{total}/, p.total);
            stat = stat.replace(/{pagesize}/, p.pageSize);
            $('.l-bar-text', g.toolbar).html(stat);
            if (!p.total)
            {
                $(".l-bar-btnfirst span,.l-bar-btnprev span,.l-bar-btnnext span,.l-bar-btnlast span", g.toolbar)
                    .addClass("l-disabled");
            }
            if (p.page == 1)
            {
                $(".l-bar-btnfirst span", g.toolbar).addClass("l-disabled");
                $(".l-bar-btnprev span", g.toolbar).addClass("l-disabled");
            }
            else if (p.page > p.pageCount && p.pageCount > 0)
            {
                $(".l-bar-btnfirst span", g.toolbar).removeClass("l-disabled");
                $(".l-bar-btnprev span", g.toolbar).removeClass("l-disabled");
            }
            if (p.page == p.pageCount)
            {
                $(".l-bar-btnlast span", g.toolbar).addClass("l-disabled");
                $(".l-bar-btnnext span", g.toolbar).addClass("l-disabled");
            }
            else if (p.page < p.pageCount && p.pageCount > 0)
            {
                $(".l-bar-btnlast span", g.toolbar).removeClass("l-disabled");
                $(".l-bar-btnnext span", g.toolbar).removeClass("l-disabled");
            }
        },
        _getRowIdByDomId: function (domid)
        {
            var ids = domid.split('|');
            var rowid = ids[2];
            return rowid;
        },
        _getRowByDomId: function (domid)
        {
            return this.records[this._getRowIdByDomId(domid)];
        },
        _getSrcElementByEvent: function (e)
        {
            var g = this;
            var obj = (e.target || e.srcElement);
            var jobjs = $(obj).parents().add(obj);
            var fn = function (parm)
            {
                for (var i = 0, l = jobjs.length; i < l; i++)
                {
                    if (typeof parm == "string")
                    {
                        if ($(jobjs[i]).hasClass(parm)) return jobjs[i];
                    }
                    else if (typeof parm == "object")
                    {
                        if (jobjs[i] == parm) return jobjs[i];
                    }
                }
                return null;
            };
           // if (fn("l-grid-editor")) return { editing: true, editor: fn("l-grid-editor") };
            //if (jobjs.index(this.element) == -1) return { out: true };
            var indetail = false;
            if (jobjs.hasClass("l-grid-detailpanel") && g.detailrows)
            {
                for (var i = 0, l = g.detailrows.length; i < l; i++)
                {
                    if (jobjs.index(g.detailrows[i]) != -1)
                    {
                        indetail = true;
                        break;
                    }
                }
            }
            var r = {
                grid: fn("l-panel"),
                indetail: indetail,
                frozen: fn(g.gridview1[0]) ? true : false,
                header: fn("l-panel-header"), //标题
                gridheader: fn("l-grid-header"), //表格头 
                gridbody: fn("l-grid-body"),
                total: fn("l-panel-bar-total"), //总汇总 
                popup: fn("l-grid-popup"),
                toolbar: fn("l-panel-bar")
            };
            if (r.gridheader)
            {
                r.hrow = fn("l-grid-hd-row");
                r.hcell = fn("l-grid-hd-cell");
                r.hcelltext = fn("l-grid-hd-cell-text");
                r.checkboxall = fn("l-grid-hd-cell-checkbox");
                if (r.hcell)
                {
                    var columnid = r.hcell.id.split('|')[2];
                    r.column = g._columns[columnid];
                }
            }
            if (r.gridbody)
            {
                r.row = fn("l-grid-row");
                r.cell = fn("l-grid-row-cell");
                r.checkbox = fn("l-grid-row-cell-btn-checkbox");
                r.groupbtn = fn("l-grid-group-togglebtn");
                r.grouprow = fn("l-grid-grouprow");
                r.detailbtn = fn("l-grid-row-cell-detailbtn");
                r.detailrow = fn("l-grid-detailpanel");
                r.totalrow = fn("l-grid-totalsummary");
                r.totalcell = fn("l-grid-totalsummary-cell");
                r.rownumberscell = $(r.cell).hasClass("l-grid-row-cell-rownumbers") ? r.cell : null;
                r.detailcell = $(r.cell).hasClass("l-grid-row-cell-detail") ? r.cell : null;
                r.checkboxcell = $(r.cell).hasClass("l-grid-row-cell-checkbox") ? r.cell : null;
                r.treelink = fn("l-grid-tree-link");
                r.editor = fn("l-grid-editor");
                if (r.row) r.data = this._getRowByDomId(r.row.id);
                if (r.cell) r.editing = $(r.cell).hasClass("l-grid-row-cell-editing");
                if (r.editor) r.editing = true;
                if (r.editing) r.out = false;
            }
            if (r.toolbar)
            {
                r.first = fn("l-bar-btnfirst");
                r.last = fn("l-bar-btnlast");
                r.next = fn("l-bar-btnnext");
                r.prev = fn("l-bar-btnprev");
                r.load = fn("l-bar-btnload");
                r.button = fn("l-bar-button");
            }

            return r;
        },
		//事件触发
        _setEvent: function ()
        {
			var g = this, p = this.options;
            g.grid.bind("mousedown.grid", function (e)
            {
                g._onMouseDown.call(g, e);
            });
            g.grid.bind("dblclick.grid", function (e)
            {
				g._onDblClick.call(g, e);
            });
            g.grid.bind("contextmenu.grid", function (e)
            {
				return g._onContextmenu.call(g, e);
            });
            g.grid.bind("mouseup.grid", function (e)
            {
                g._onMouseUp.call(g, e);
            });
            g.grid.bind("click.grid", function (e)
            {
			    g._onClick.call(g, e);
            });
            $(window).bind("resize.grid", function (e)
            {
                g._onResize.call(g);
            });
			$(document).bind("keydown.grid", function (e)
            {
				g._onKeyDown.call(g, e);
				
            });
            $(document).bind("keydown.grid", function (e)
            {
                
				if (e.ctrlKey) g.ctrlKey = true;
            });
            $(document).bind("keyup.grid", function (e)
            {
				delete g.ctrlKey;
            });
            //表体 - 滚动联动事件 
            g.gridbody.bind('scroll.grid', function ()
            {
                var scrollLeft = g.gridbody.scrollLeft();
                var scrollTop = g.gridbody.scrollTop();
                if (scrollLeft != null)
                    g.gridheader[0].scrollLeft = scrollLeft;
                if (scrollTop != null)
                    g.f.gridbody[0].scrollTop = scrollTop;
                
				if (p.enabledEdit && p.clickToEdit){
					g.endEdit();
				}
				//触发事件
                g.trigger('SysGridHeightChanged');
            });
            //工具条 - 切换每页记录数事件
            $('select', g.toolbar).change(function ()
            {
               // if (g.isDataChanged )
                   // return false;
                p.newPage = 1;
                p.pageSize = this.value;
                g.loadData(p.where);
				g.trigger('PageSizeChanged',[p.pageSize]);
            });
            //工具条 - 切换当前页事件
            $('span.pcontrol :text', g.toolbar).blur(function (e)
            {
                g.changePage('input');
            });
            $("div.l-bar-button", g.toolbar).hover(function ()
            {
                $(this).addClass("l-bar-button-over");
            }, function ()
            {
                $(this).removeClass("l-bar-button-over");
            });
            //列拖拽支持：交换列的位置
            if ($.fn.quiDrag && p.colDraggable)
            {
                
			    g.colDroptip = $("<div class='l-drag-coldroptip' style='display:none'><div class='l-drop-move-up'></div><div class='l-drop-move-down'></div></div>").appendTo('body');
               //使用quiDrag
			    g.gridheader.add(g.f.gridheader).quiDrag({ revert: true, animate: false,
                    proxyX: 0, proxyY: 0,
                    proxy: function (draggable, e)
                    {
                        var src = g._getSrcElementByEvent(e);
                        if (src.hcell && src.column)
                        {
                            var content = $(".l-grid-hd-cell-text:first", src.hcell).html();
                            var proxy = $("<div class='l-drag-proxy' style='display:none'><div class='l-drop-icon l-drop-no'></div></div>").appendTo('body');
                            proxy.append(content);
                            return proxy;
                        }
                    },
                    onRevert: function () { return false; },
                    onRendered: function ()
                    {
                        this.set('cursor', 'default');
                        g.children[this.id] = this;
                    },
                    onStartDrag: function (current, e)
                    {
                       
						if (e.button == 2) return false;
                        if (g.colresizing) return false;
                        this.set('cursor', 'default');
                        var src = g._getSrcElementByEvent(e);
                        if (!src.hcell || !src.column || src.column.issystem || src.hcelltext) return false;
                        if ($(src.hcell).css('cursor').indexOf('resize') != -1) return false;
                        this.draggingColumn = src.column;
                        g.coldragging = true;

                        var gridOffset = g.grid.offset();
                        this.validRange = {
                            top: gridOffset.top,
                            bottom: gridOffset.top + g.gridheader.height(),
                            left: gridOffset.left - 10,
                            right: gridOffset.left + g.grid.width() + 10
                        };
                    },
                    onDrag: function (current, e)
                    {
                        this.set('cursor', 'default');
                        var column = this.draggingColumn;
                        if (!column) return false;
                        if (g.colresizing) return false;
                        if (g.colDropIn == null)
                            g.colDropIn = -1;
                        var pageX = e.pageX;
                        var pageY = e.pageY;
                        var visit = false;
                        var gridOffset = g.grid.offset();
                        var validRange = this.validRange;
                        if (pageX < validRange.left || pageX > validRange.right
                            || pageY > validRange.bottom || pageY < validRange.top)
                        {
                            g.colDropIn = -1;
                            g.colDroptip.hide();
                            this.proxy.find(".l-drop-icon:first").removeClass("l-drop-yes").addClass("l-drop-no");
                            return;
                        }
                        for (var colid in g._columns)
                        {
                            var col = g._columns[colid];
                            if (column == col)
                            {
                                visit = true;
                                continue;
                            }
                            if (col.issystem) continue;
                            var sameLevel = col['__level'] == column['__level'];
                            var isAfter = !sameLevel ? false : visit ? true : false;
                            if (column.frozen != col.frozen) isAfter = col.frozen ? false : true;
                            if (g.colDropIn != -1 && g.colDropIn != colid) continue;
                            var cell = document.getElementById(col['__domid']);
                            var offset = $(cell).offset();
                            var range = {
                                top: offset.top,
                                bottom: offset.top + $(cell).height(),
                                left: offset.left - 10,
                                right: offset.left + 10
                            };
                            if (isAfter)
                            {
                                var cellwidth = $(cell).width();
                                range.left += cellwidth;
                                range.right += cellwidth;
                            }
                            if (pageX > range.left && pageX < range.right && pageY > range.top && pageY < range.bottom)
                            {
                                var height = p.headerRowHeight;
                                if (col['__rowSpan']) height *= col['__rowSpan'];
                                g.colDroptip.css({
                                    left: range.left + 5,
                                    top: range.top - 9,
                                    height: height + 9 * 2
                                }).show();
                                g.colDropIn = colid;
                                g.colDropDir = isAfter ? "right" : "left";
                                this.proxy.find(".l-drop-icon:first").removeClass("l-drop-no").addClass("l-drop-yes");
                                break;
                            }
                            else if (g.colDropIn != -1)
                            {
                                g.colDropIn = -1;
                                g.colDroptip.hide();
                                this.proxy.find(".l-drop-icon:first").removeClass("l-drop-yes").addClass("l-drop-no");
                            }
                        }
                    },
                    onStopDrag: function (current, e)
                    {
                        var column = this.draggingColumn;
                        g.coldragging = false;
                        if (g.colDropIn != -1)
                        {
                            g.changeCol.quiDefer(g, 0, [column, g.colDropIn, g.colDropDir == "right"]);
                            g.colDropIn = -1;
                        }
                        g.colDroptip.hide();
                        this.set('cursor', 'default');
                    }
                });
            }
            //行拖拽支持：交换行的位置
            if ($.fn.quiDrag && p.rowDraggable)
            {
                g.rowDroptip = $("<div class='l-drag-rowdroptip' style='display:none'></div>").appendTo('body');
                g.gridbody.add(g.f.gridbody).quiDrag({ revert: true, animate: false,
                    proxyX: 0, proxyY: 0,
                    proxy: function (draggable, e)
                    {
                        var src = g._getSrcElementByEvent(e);
                        if (src.row)
                        {
                            var content = p.draggingMessage.replace(/{count}/, draggable.draggingRows ? draggable.draggingRows.length : 1);
                            if (p.rowDraggingRender)
                            {
                                content = p.rowDraggingRender(draggable.draggingRows, draggable, g);
                            }
                            var proxy = $("<div class='l-drag-proxy' style='display:none'><div class='l-drop-icon l-drop-no'></div>" + content + "</div>").appendTo('body');
                            return proxy;
                        }
                    },
                    onRevert: function () { return false; },
                    onRendered: function ()
                    {
                        this.set('cursor', 'default');
                        g.children[this.id] = this;
                    },
                    onStartDrag: function (current, e)
                    {
                        if (e.button == 2) return false;
                        if (g.colresizing) return false;
                        if (!g.columns.length) return false;
                        this.set('cursor', 'default');
                        var src = g._getSrcElementByEvent(e);
                        if (!src.cell || !src.data || src.checkbox) return false;
                        var ids = src.cell.id.split('|');
                        var column = g._columns[ids[ids.length - 1]];
                        if (src.rownumberscell || src.detailcell || src.checkboxcell || column == g.columns[0])
                        {
                            if (g.enabledCheckbox())
                            {
                                this.draggingRows = g.getSelecteds();
                                if (!this.draggingRows || !this.draggingRows.length) return false;
                            }
                            else
                            {
                                this.draggingRows = [src.data];
                            }
                            this.draggingRow = src.data;
                            this.set('cursor', 'move');
                            g.rowdragging = true;
                            this.validRange = {
                                top: g.gridbody.offset().top,
                                bottom: g.gridbody.offset().top + g.gridbody.height(),
                                left: g.grid.offset().left - 10,
                                right: g.grid.offset().left + g.grid.width() + 10
                            };
                        }
                        else
                        {
                            return false;
                        }
                    },
                    onDrag: function (current, e)
                    {
                        var rowdata = this.draggingRow;
                        if (!rowdata) return false;
                        var rows = this.draggingRows ? this.draggingRows : [rowdata];
                        if (g.colresizing) return false;
                        if (g.rowDropIn == null) g.rowDropIn = -1;
                        var pageX = e.pageX;
                        var pageY = e.pageY;
                        var visit = false;
                        var validRange = this.validRange;
                        if (pageX < validRange.left || pageX > validRange.right
                            || pageY > validRange.bottom || pageY < validRange.top)
                        {
                            g.rowDropIn = -1;
                            g.rowDroptip.hide();
                            this.proxy.find(".l-drop-icon:first").removeClass("l-drop-yes l-drop-add").addClass("l-drop-no");
                            return;
                        }
                        for (var i in g.rows)
                        {
                            var rd = g.rows[i];
                            var rowid = rd['__id'];
                            if (rowdata == rd) visit = true;
                            if ($.inArray(rd, rows) != -1) continue;
                            var isAfter = visit ? true : false;
                            if (g.rowDropIn != -1 && g.rowDropIn != rowid) continue;
                            var rowobj = g.getRowObj(rowid);
                            var offset = $(rowobj).offset();
                            var range = {
                                top: offset.top - 4,
                                bottom: offset.top + $(rowobj).height() + 4,
                                left: g.grid.offset().left,
                                right: g.grid.offset().left + g.grid.width()
                            };
                            if (pageX > range.left && pageX < range.right && pageY > range.top && pageY < range.bottom)
                            {
                                var lineTop = offset.top;
                                if (isAfter) lineTop += $(rowobj).height();
                                g.rowDroptip.css({
                                    left: range.left,
                                    top: lineTop,
                                    width: range.right - range.left
                                }).show();
                                g.rowDropIn = rowid;
                                g.rowDropDir = isAfter ? "bottom" : "top";
                                if (p.tree && pageY > range.top + 5 && pageY < range.bottom - 5)
                                {
                                    this.proxy.find(".l-drop-icon:first").removeClass("l-drop-no l-drop-yes").addClass("l-drop-add");
                                    g.rowDroptip.hide();
                                    g.rowDropInParent = true;
                                }
                                else
                                {
                                    this.proxy.find(".l-drop-icon:first").removeClass("l-drop-no l-drop-add").addClass("l-drop-yes");
                                    g.rowDroptip.show();
                                    g.rowDropInParent = false;
                                }
                                break;
                            }
                            else if (g.rowDropIn != -1)
                            {
                                g.rowDropIn = -1;
                                g.rowDropInParent = false;
                                g.rowDroptip.hide();
                                this.proxy.find(".l-drop-icon:first").removeClass("l-drop-yes  l-drop-add").addClass("l-drop-no");
                            }
                        }
                    },
                    onStopDrag: function (current, e)
                    {
                        var rows = this.draggingRows;
                        g.rowdragging = false;
                        for (var i = 0; i < rows.length; i++)
                        {
                            var children = rows[i].children;
                            if (children)
                            {
                                rows = $.grep(rows, function (node, i)
                                {
                                    var isIn = $.inArray(node, children) == -1;
                                    return isIn;
                                });
                            }
                        }
                        if (g.rowDropIn != -1)
                        {
                            if (p.tree)
                            {
                                var neardata, prow;
                                if (g.rowDropInParent)
                                {
                                    prow = g.getRow(g.rowDropIn);
                                }
                                else
                                {
                                    neardata = g.getRow(g.rowDropIn);
                                    prow = g.getParent(neardata);
                                }
                                g.appendRange(rows, prow, neardata, g.rowDropDir != "bottom");
                                g.trigger('rowDragDrop', {
                                    rows: rows,
                                    parent: prow,
                                    near: neardata,
                                    after: g.rowDropDir == "bottom"
                                });
                            }
                            else
                            {
                                g.moveRange(rows, g.rowDropIn, g.rowDropDir == "bottom");
                                g.trigger('rowDragDrop', {
                                    rows: rows,
                                    parent: prow,
                                    near: g.getRow(g.rowDropIn),
                                    after: g.rowDropDir == "bottom"
                                });
                            }

                            g.rowDropIn = -1;
                        }
                        g.rowDroptip.hide();
                        this.set('cursor', 'default');
                    }
                });
            }
        },
		//行响应鼠标移入
        _onRowOver: function (rowParm, over)
        {
            if (l.draggable.dragging) return;
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            var methodName = over ? "addClass" : "removeClass";
            if (g.enabledFrozen())
                $(g.getRowObj(rowdata, true))[methodName](p.mouseoverRowCssClass);
            $(g.getRowObj(rowdata, false))[methodName](p.mouseoverRowCssClass);
        },
		//鼠标松开
        _onMouseUp: function (e)
        {
            var g = this, p = this.options;
            if (l.draggable.dragging)
            {
                var src = g._getSrcElementByEvent(e);

                //drop in header cell
                if (src.hcell && src.column)
                {
                    g.trigger('dragdrop', [{ type: 'header', column: src.column, cell: src.hcell }, e]);
                }
                else if (src.row)
                {
                    g.trigger('dragdrop', [{ type: 'row', record: src.data, row: src.row }, e]);
                }
            }
        },
		//鼠标按下
        _onMouseDown: function (e)
        {
            var g = this, p = this.options;
        },
		//右键
        _onContextmenu: function (e)
        {
            var g = this, p = this.options;
            var src = g._getSrcElementByEvent(e);
            if (src.row)
            {
                if (p.whenRClickToSelect)
                    g.select(src.data);
                if (g.hasBind('contextmenu'))
                {
                    //触发事件
					return g.trigger('contextmenu', [{ data: src.data, rowindex: src.data['__index'], row: src.row }, e]);
                }
            }
            else if (src.hcell)
            {
                if (!p.allowHideColumn) return true;
                var columnindex = $(src.hcell).attr("columnindex");
                if (columnindex == undefined) return true;
                var left = (e.pageX - g.body.offset().left + parseInt(g.body[0].scrollLeft));
                if (columnindex == g.columns.length - 1) left -= 50;
                g.popup.css({ left: left, top: g.gridheader.height() + 1 });
                g.popup.toggle();
                return false;
            }
        },
		//双击
        _onDblClick: function (e)
        {
            
			var g = this, p = this.options;
            var src = g._getSrcElementByEvent(e);
            if (src.row)
            {
				g.trigger('dblClickRow', [src.data, src.data['__id'], src.row]);
            }
        },
		
		//键盘按下
        _onKeyDown: function (e)
        {
            
			var g = this, p = this.options;
			if(p.excelMode){
				g.nearCells = g.nearCells || [];
	            var keyCode = e.keyCode || e.which || e.charCode;		
				 if (g.editor.editing && !$.quiui.win.masking) {
					if (keyCode == 37) {//左
			             if(g.nearCells[0]!=null){
						 	 g.endEdit();
							 g._applyEditor(g.nearCells[0])
						 }
			        } 
					else if (keyCode == 39) {//右
			        	if(g.nearCells[1]!=null){
						 	 g.endEdit();
							 g._applyEditor(g.nearCells[1])
						 }
			        }
					else if(keyCode == 38){//上
			        	if(g.nearCells[2]!=null){
							var minRowIdx=Math.round(g.gridbody[0].scrollTop/(p.rowHeight+1))+1;
							if(g.nearCells[4]==minRowIdx){
								g.setScroller(g.gridbody[0].scrollTop-p.rowHeight-1,null,false);
								setTimeout(function(){
									g.endEdit();
								 	g._applyEditor(g.nearCells[2]);
									if(!p.checkbox){
										g.select(g.nearCells[4]-1);
									}
								},100)
							}
							else{
								g.endEdit();
								g._applyEditor(g.nearCells[2]);
								if(!p.checkbox){
										g.select(g.nearCells[4]-1);
									}
							}
						 }
			        }
					else if(keyCode == 40){//下
			        	if(g.nearCells[3]!=null){
							var minRowIdx=Math.round(g.gridbody[0].scrollTop/(p.rowHeight+1))+1;
							var maxRowIdx=Math.round(g.gridbody.height()/(p.rowHeight+1))+minRowIdx-1;
							if(g.nearCells[4]==maxRowIdx){
								g.setScroller(g.gridbody[0].scrollTop+p.rowHeight+1,null,false);
								setTimeout(function(){
									g.endEdit();
								 	g._applyEditor(g.nearCells[3]);
									if(!p.checkbox){
										g.select(g.nearCells[4]-1);
									}
								},100)
							}
							else{
								g.endEdit();
								g._applyEditor(g.nearCells[3]);
								if(!p.checkbox){
										g.select(g.nearCells[4]-1);
									}
							}
							
						 }
			        }
					else if(keyCode == 45){//insert
			        	g.trigger("insert");
			        }
					else if(keyCode == 46){//delete
						if(g.ctrlKey){
							g.trigger("delete",[g.nearCells[4]-1]);
						}
						
			        }
				 }
			}
        },
		
		
		//点击
        _onClick: function (e)
        {
            var obj = (e.target || e.srcElement);
            var g = this, p = this.options;
            var src = g._getSrcElementByEvent(e);
			if (src.out)
            {
                if (g.editor.editing && !$.quiui.win.masking) g.endEdit();
                if (p.allowHideColumn) g.popup.hide();
                return;
            }
			 if (src.indetail)
            {
                return;
            } 
           /*
 if (src.indetail || src.editing)
            {
                return;
            }
*/

            if (g.editor.editing)
            {
                g.endEdit();
            }
            if (p.allowHideColumn)
            {
                if (!src.popup)
                {
                    g.popup.hide();
                }
            }
			
			if(src.row&&p.detail&&p.detailClickExpand){
				var item = src.data;
				g.detailExtendRow = g.detailExtendRow || [];
				var indexInDetailExtendRow;
				//得到该行数据在g.collapsedRows中的索引
                indexInDetailExtendRow = $.inArray(item, g.detailExtendRow);
				//没打开
				if(indexInDetailExtendRow==-1){
					//关闭其他
					if(p.detailCloseOther){
						for(var j=0;j<g.detailExtendRow.length;j++){
							g.collapseDetail(g.detailExtendRow[j]);
						}
						g.detailExtendRow=[];
					}
					g.extendDetail(item);
				}
				//已经打开了则隐藏
				else{
					g.collapseDetail(item);
					if (indexInDetailExtendRow != -1){
						 g.detailExtendRow.splice(indexInDetailExtendRow, 1);
					}
				}
			}
			
            if (src.checkboxall) //复选框全选
            {
                var row = $(src.hrow);
                var uncheck = row.hasClass("l-checked");
                if (g.trigger('beforeCheckAllRow', [!uncheck, g.element]) == false) return false;
                if (uncheck)
                {
                    row.removeClass("l-checked");
                }
                else
                {
                    row.addClass("l-checked");
                }
                g.selected = [];
                for (var rowid in g.records)
                {
                    if (uncheck)
                        g.unselect(g.records[rowid]);
                    else
                        g.select(g.records[rowid]);
                }
                g.trigger('checkAllRow', [!uncheck, g.element]);
            }
            else if (src.hcelltext) //排序
            {
                var hcell = $(src.hcelltext).parent().parent();
                if (!p.enabledSort || !src.column) return;
                if (src.column.isSort == false) return;
                if (p.url && g.isDataChanged ) return;
                var sort = $(".l-grid-hd-cell-sort:first", hcell);
                var columnName = src.column.name;
                if (!columnName) return;
                if (sort.length > 0)
                {
                    if (sort.hasClass("l-grid-hd-cell-sort-asc"))
                    {
                        sort.removeClass("l-grid-hd-cell-sort-asc").addClass("l-grid-hd-cell-sort-desc");
                        hcell.removeClass("l-grid-hd-cell-asc").addClass("l-grid-hd-cell-desc");
                        g.changeSort(columnName, 'desc');
                    }
                    else if (sort.hasClass("l-grid-hd-cell-sort-desc"))
                    {
                        sort.removeClass("l-grid-hd-cell-sort-desc").addClass("l-grid-hd-cell-sort-asc");
                        hcell.removeClass("l-grid-hd-cell-desc").addClass("l-grid-hd-cell-asc");
                        g.changeSort(columnName, 'asc');
                    }
                }
                else
                {
                    hcell.removeClass("l-grid-hd-cell-desc").addClass("l-grid-hd-cell-asc");
                    $(src.hcelltext).after("<span class='l-grid-hd-cell-sort l-grid-hd-cell-sort-asc'>&nbsp;&nbsp;</span>");
                    g.changeSort(columnName, 'asc');
                }
                $(".l-grid-hd-cell-sort", g.gridheader).add($(".l-grid-hd-cell-sort", g.f.gridheader)).not($(".l-grid-hd-cell-sort:first", hcell)).remove();
            }
            //明细
            else if (src.detailbtn && p.detail)
            {
				if(p.detailClickExpand){
					return;
				}
				var item = src.data;
                var row = $([g.getRowObj(item, false)]);
                if (g.enabledFrozen()) row = row.add(g.getRowObj(item, true));
                var rowid = item['__id'];
				
				g.detailExtendRow = g.detailExtendRow || [];
				
				var indexInDetailExtendRow;
				//得到该行数据在g.collapsedRows中的索引
                indexInDetailExtendRow = $.inArray(item, g.detailExtendRow);
                //已经打开了，则隐藏
				if ($(src.detailbtn).hasClass("l-open"))
                {
                    if (p.detail.onCollapse)
                        p.detail.onCollapse(item, $(".l-grid-detailpanel-inner:first", nextrow)[0]);
                    row.next("tr.l-grid-detailpanel").hide();
                    $(src.detailbtn).removeClass("l-open");
					if (indexInDetailExtendRow != -1) g.detailExtendRow.splice(indexInDetailExtendRow, 1);
                }
                else
                {
                    
					if(p.detailCloseOther){
						for(var j=0;j<g.detailExtendRow.length;j++){
							g.collapseDetail(g.detailExtendRow[j]);
						}
						g.detailExtendRow=[];
					}
					
					var nextrow = row.next("tr.l-grid-detailpanel");
                    //已经打开过但隐藏了，则重新显示
					if (nextrow.length > 0)
                    {
                        nextrow.show();
                        if (p.detail.onExtend)
                            p.detail.onExtend(item, $(".l-grid-detailpanel-inner:first", nextrow)[0]);
                        $(src.detailbtn).addClass("l-open");
                        if (indexInDetailExtendRow == -1) g.detailExtendRow.push(item);
						//触发事件
						g.trigger('SysGridHeightChanged');
                        return;
                    }
                    //如果没打开过则创建
					$(src.detailbtn).addClass("l-open");
                    var frozenColNum = 0;
                    for (var i = 0; i < g.columns.length; i++)
                        if (g.columns[i].frozen) frozenColNum++;
                    var detailRow = $("<tr class='l-grid-detailpanel'><td><div class='l-grid-detailpanel-inner' style='display:none'></div></td></tr>");
                    var detailFrozenRow = $("<tr class='l-grid-detailpanel'><td><div class='l-grid-detailpanel-inner' style='display:none'></div></td></tr>");
                    detailRow.attr("id", g.id + "|detail|" + rowid);
                    //detailrows存储已经打开的行的html片段
					g.detailrows = g.detailrows || [];
                    g.detailrows.push(detailRow[0]);
                    g.detailrows.push(detailFrozenRow[0]);
					g.detailExtendRow.push(item);
                    var detailRowInner = $("div:first", detailRow);
                    detailRowInner.parent().attr("colSpan", g.columns.length - frozenColNum);
                    row.eq(0).after(detailRow);
                    if (frozenColNum > 0)
                    {
                        detailFrozenRow.find("td:first").attr("colSpan", frozenColNum);
                        row.eq(1).after(detailFrozenRow);
                    }
					//触发onShowDetail事件
                    if (p.detail.onShowDetail)
                    {
                        p.detail.onShowDetail(item, detailRowInner[0], function ()
                        {
                            g.trigger('SysGridHeightChanged');
                        });
                        $("div:first", detailFrozenRow).add(detailRowInner).show().height(p.detail.height || p.detailHeight);
                    }
					//也可以用render返回个性化dom元素
                    else if (p.detail.render)
                    {
                        detailRowInner.append(p.detail.render());
                        detailRowInner.show();
                    }
					//触发事件
                    g.trigger('SysGridHeightChanged');
                }
            }
            else if (src.groupbtn)
            {
                var grouprow = $(src.grouprow);
                var opening = true;
                if ($(src.groupbtn).hasClass("l-grid-group-togglebtn-close"))
                {
                    $(src.groupbtn).removeClass("l-grid-group-togglebtn-close");

                    if (grouprow.hasClass("l-grid-grouprow-last"))
                    {
                        $("td:first", grouprow).width('auto');
                    }
                }
                else
                {
                    opening = false;
                    $(src.groupbtn).addClass("l-grid-group-togglebtn-close");
                    if (grouprow.hasClass("l-grid-grouprow-last"))
                    {
                        $("td:first", grouprow).width(g.gridtablewidth);
                    }
                }
                var currentRow = grouprow.next(".l-grid-row,.l-grid-totalsummary-group,.l-grid-detailpanel");
                while (true)
                {
                    if (currentRow.length == 0) break;
                    if (opening)
                    {
                        currentRow.show();
                        //如果是明细展开的行，并且之前的状态已经是关闭的，隐藏之
                        if (currentRow.hasClass("l-grid-detailpanel") && !currentRow.prev().find("td.l-grid-row-cell-detail:first span.l-grid-row-cell-detailbtn:first").hasClass("l-open"))
                        {
                            currentRow.hide();
                        }
                    }
                    else
                    {
                        currentRow.hide();
                    }
                    currentRow = currentRow.next(".l-grid-row,.l-grid-totalsummary-group,.l-grid-detailpanel");
                }
                g.trigger('SysGridHeightChanged');
            }
            //树 - 伸展/收缩节点
            else if (src.treelink)
            {
                //异步加载
				if(p.treeAjax){
					var item = src.data;
		            var row = g.getRow(item);
					if(g.hasChildren(row)){
						g.toggle(src.data);
					}
					else{
						$(src.treelink).addClass("l-grid-tree-link-loading");
						var url=p.treeChildDataPath;
						var autoParamName=p.treeAutoParam;
						var param=src.data[autoParamName];
						$.post(url+param,
						{},
						function(result){
							setTimeout(function(){
								var treeChildData;
								if(p.treeDataFilter){
									var fun=p.treeDataFilter;
									if ((typeof fun) == "function") {
										treeChildData= fun.apply(null,[result]);
									}
								}
								else{
									treeChildData=result;
								}
								g.appendRange(treeChildData,row)
								item.open=true;
								g.toggle(src.data);
							},100)
							
						},"json");
					}
					
				}
				else{
					g.toggle(src.data);
				}
            }
            else if (src.row && g.enabledCheckbox()) //复选框选择行
            {
                if (!src.checkbox){
				 	g.trigger('clickRow');
				 }
				//复选框
                var selectRowButtonOnly = p.selectRowButtonOnly ? true : false;
                if (p.enabledEdit) selectRowButtonOnly = true;
                if (src.checkbox || !selectRowButtonOnly)
                {
                    var row = $(src.row);
                    var uncheck = row.hasClass("l-selected");
                    if (g.trigger('beforeCheckRow', [!uncheck, src.data, src.data['__id'], src.row]) == false)
                        return false;
                    var met = uncheck ? 'unselect' : 'select';
                    g[met](src.data);
                    if (p.tree && p.autoCheckChildren)
                    {
                        var children = g.getChildren(src.data, true);
                        for (var i = 0, l = children.length; i < l; i++)
                        {
                            g[met](children[i]);
                        }
                    }
					//触发事件
                    g.trigger('checkRow', [!uncheck, src.data, src.data['__id'], src.row]);
                }
                //点击编辑
				if (!src.checkbox && src.cell && p.enabledEdit && p.clickToEdit)
                {
                    g._applyEditor(src.cell);
                }
				 
				 
            }
			//不含checkbox的情况
            else if (src.row && !g.enabledCheckbox())
            {
                g.trigger('clickRow');
				//点击编辑
				if (src.cell && p.enabledEdit && p.clickToEdit)
                {
                    g._applyEditor(src.cell);
                }
				if(!p.noSelecton){
					 //选择行
	                if ($(src.row).hasClass("l-selected"))
	                {
	                    if (!p.allowUnSelectRow)
	                    {
	                        $(src.row).addClass("l-selected-again");
	                        return;
	                    }
	                    g.unselect(src.data);
	                }
	                else
	                {
	                    g.select(src.data);
	                }
				}
				
            }
           //分页
		    else if (src.toolbar)
            {
				
				if (src.first)
                {
                    if (g.trigger('toFirst', [g.element]) == false) return false;
                    g.changePage('first');
                }
                else if (src.prev)
                {
                    if (g.trigger('toPrev', [g.element]) == false) return false;
                    g.changePage('prev');
                }
                else if (src.next)
                {
                   
					if (g.trigger('toNext', [g.element]) == false) return false;
                    g.changePage('next');
                }
                else if (src.last)
                {
                    if (g.trigger('toLast', [g.element]) == false) return false;
                    g.changePage('last');
                }
                else if (src.load)
                {
                    if ($("span", src.load).hasClass("l-disabled")) return false;
                    if (g.trigger('reload', [g.element]) == false) return false;
                    //if (p.url && g.isDataChanged)
                       // return false;
                    g.loadData(p.where);
                }
				
				if(p.dataAction == "local"){
					$(".l-grid-hd-row").removeClass("l-checked");
				}
            }
        },
		//选择行
        select: function (rowParm)
        {
			var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            var rowid = rowdata['__id'];
            var rowobj = g.getRowObj(rowid);
            var rowobj1 = g.getRowObj(rowid, true);
            if (!g.enabledCheckbox() && !g.ctrlKey) //单选
            {
                for (var i in g.selected)
                {
                    var o = g.selected[i];
                    if (o['__id'] in g.records)
                    {
                        $(g.getRowObj(o)).removeClass("l-selected l-selected-again");
                        if (g.enabledFrozen())
                            $(g.getRowObj(o, true)).removeClass("l-selected l-selected-again");
                    }
                }
                g.selected = [];
            }
            if (rowobj) $(rowobj).addClass("l-selected");
            if (rowobj1) $(rowobj1).addClass("l-selected");
            g.selected[g.selected.length] = rowdata;
           //触发事件
		    g.trigger('selectRow', [rowdata, rowid, rowobj]);
        },
		//反选行
        unselect: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            var rowid = rowdata['__id'];
            var rowobj = g.getRowObj(rowid);
            var rowobj1 = g.getRowObj(rowid, true);
            $(rowobj).removeClass("l-selected l-selected-again");
            if (g.enabledFrozen())
                $(rowobj1).removeClass("l-selected l-selected-again");
            g._removeSelected(rowdata);
            //触发事件
			g.trigger('unSelectRow', [rowdata, rowid, rowobj]);
        },
        //判断是否选中行
		isSelected: function (rowParm)
        {
            var g = this, p = this.options;
            var rowdata = g.getRow(rowParm);
            for (var i in g.selected)
            {
                if (g.selected[i] == rowdata) return true;
            }
            return false;
        },
       //尺寸改变
	    _onResize: function ()
        {
			var g = this, p = this.options;
			g.resetHeight();
			g.resetWidth();
           
           
			
			
            g.trigger('SysGridHeightChanged');
        }
    });

    $.quiui.controls.Grid.prototype.enabledTotal = $.quiui.controls.Grid.prototype.isTotalSummary;
    $.quiui.controls.Grid.prototype.add = $.quiui.controls.Grid.prototype.addRow;
    $.quiui.controls.Grid.prototype.update = $.quiui.controls.Grid.prototype.updateRow;
    $.quiui.controls.Grid.prototype.append = $.quiui.controls.Grid.prototype.appendRow;
    $.quiui.controls.Grid.prototype.getSelected = $.quiui.controls.Grid.prototype.getSelectedRow;
    $.quiui.controls.Grid.prototype.getSelecteds = $.quiui.controls.Grid.prototype.getSelectedRows;
    $.quiui.controls.Grid.prototype.getCheckedRows = $.quiui.controls.Grid.prototype.getSelectedRows;
    $.quiui.controls.Grid.prototype.getCheckedRowObjs = $.quiui.controls.Grid.prototype.getSelectedRowObjs;
    $.quiui.controls.Grid.prototype.setOptions = $.quiui.controls.Grid.prototype.set;

})(jQuery);


(function ($)
{
    $.fn.quiResizable = function (options)
    {
        return $.quiui.run.call(this, "quiResizable", arguments,
        {
            idAttrName: 'quiuiresizableid', hasElement: false, propertyToElemnt: 'target'
        });
    };

    $.fn.quiGetResizableManager = function ()
    {
        return $.quiui.run.call(this, "quiGetResizableManager", arguments,
        {
            idAttrName: 'quiuiresizableid', hasElement: false, propertyToElemnt: 'target'
        });
    };


    $.quiDefaults.Resizable = {
        handles: 'n, e, s, w, ne, se, sw, nw',
        maxWidth: 2000,
        maxHeight: 2000,
        minWidth: 20,
        minHeight: 20,
        scope: 3,
        animate: false,
        onStartResize: function (e) { },
        onResize: function (e) { },
        onStopResize: function (e) { },
        onEndResize: null
    };

    $.quiui.controls.Resizable = function (options)
    {
        $.quiui.controls.Resizable.base.constructor.call(this, null, options);
    };

    $.quiui.controls.Resizable.quiExtend($.quiui.core.UIComponent, {
        __getType: function ()
        {
            return 'Resizable';
        },
        __idPrev: function ()
        {
            return 'Resizable';
        },
        _render: function ()
        {
            var g = this, p = this.options;
            g.target = $(p.target);
            g.set(p);

            g.target.mousemove(function (e)
            {
                if (p.disabled) return;
                g.dir = g._getDir(e);
                if (g.dir)
                    g.target.css('cursor', g.dir + '-resize');
                else if (g.target.css('cursor').indexOf('-resize') > 0)
                    g.target.css('cursor', 'default');
                if (p.target.quiuidragid)
                {
                    var drag = $.quiui.get(p.target.quiuidragid);
                    if (drag && g.dir)
                    {
                        drag.set('disabled', true);
                    } else if (drag)
                    {
                        drag.set('disabled', false);
                    }
                }
            }).mousedown(function (e)
            {
                if (p.disabled) return;
                if (g.dir)
                {
                    g._start(e);
                }
            });
        },
        _rendered: function ()
        {
            this.options.target.quiuiresizableid = this.id;
        },
        _getDir: function (e)
        {
            var g = this, p = this.options;
            var dir = '';
            var xy = g.target.offset();
            var width = g.target.width();
            var height = g.target.height();
            var scope = p.scope;
            var pageX = e.pageX || e.screenX;
            var pageY = e.pageY || e.screenY;
            if (pageY >= xy.top && pageY < xy.top + scope)
            {
                dir += 'n';
            }
            else if (pageY <= xy.top + height && pageY > xy.top + height - scope)
            {
                dir += 's';
            }
            if (pageX >= xy.left && pageX < xy.left + scope)
            {
                dir += 'w';
            }
            else if (pageX <= xy.left + width && pageX > xy.left + width - scope)
            {
                dir += 'e';
            }
            if (p.handles == "all" || dir == "") return dir;
            if ($.inArray(dir, g.handles) != -1) return dir;
            return '';
        },
        _setHandles: function (handles)
        {
            if (!handles) return;
            this.handles = handles.replace(/(\s*)/g, '').split(',');
        },
        _createProxy: function ()
        {
            var g = this;
            g.proxy = $('<div class="l-resizable"></div>');
            g.proxy.width(g.target.width()).height(g.target.height())
            g.proxy.attr("resizableid", g.id).appendTo('body');
        },
        _removeProxy: function ()
        {
            var g = this;
            if (g.proxy)
            {
                g.proxy.remove();
                g.proxy = null;
            }
        },
        _start: function (e)
        {
            var g = this, p = this.options;
            g._createProxy();
            g.proxy.css({
                left: g.target.offset().left,
                top: g.target.offset().top,
                position: 'absolute'
            });
            g.current = {
                dir: g.dir,
                left: g.target.offset().left,
                top: g.target.offset().top,
                startX: e.pageX || e.screenX,
                startY: e.pageY || e.clientY,
                width: g.target.width(),
                height: g.target.height()
            };
            $(document).bind("selectstart.resizable", function () { return false; });
            $(document).bind('mouseup.resizable', function ()
            {
                g._stop.apply(g, arguments);
            });
            $(document).bind('mousemove.resizable', function ()
            {
                g._drag.apply(g, arguments);
            });
            g.proxy.show();
            g.trigger('startResize', [g.current, e]);
        },
        changeBy: {
            t: ['n', 'ne', 'nw'],
            l: ['w', 'sw', 'nw'],
            w: ['w', 'sw', 'nw', 'e', 'ne', 'se'],
            h: ['n', 'ne', 'nw', 's', 'se', 'sw']
        },
        _drag: function (e)
        {
            var g = this, p = this.options;
            if (!g.current) return;
            if (!g.proxy) return;
            g.proxy.css('cursor', g.current.dir == '' ? 'default' : g.current.dir + '-resize');
            var pageX = e.pageX || e.screenX;
            var pageY = e.pageY || e.screenY;
            g.current.diffX = pageX - g.current.startX;
            g.current.diffY = pageY - g.current.startY;
            g._applyResize(g.proxy);
            g.trigger('resize', [g.current, e]);
        },
        _stop: function (e)
        {
            var g = this, p = this.options;

            if (g.hasBind('stopResize'))
            {
                if (g.trigger('stopResize', [g.current, e]) != false)
                    g._applyResize();
            }
            else
            {
                g._applyResize();
            }
            g._removeProxy();
            g.trigger('endResize', [g.current, e]);
            $(document).unbind("selectstart.resizable");
            $(document).unbind('mousemove.resizable');
            $(document).unbind('mouseup.resizable');
        },
        _applyResize: function (applyResultBody)
        {
            var g = this, p = this.options;
            var cur = {
                left: g.current.left,
                top: g.current.top,
                width: g.current.width,
                height: g.current.height
            };
            var applyToTarget = false;
            if (!applyResultBody)
            {
                applyResultBody = g.target;
                applyToTarget = true;
                if (!isNaN(parseInt(g.target.css('top'))))
                    cur.top = parseInt(g.target.css('top'));
                else
                    cur.top = 0;
                if (!isNaN(parseInt(g.target.css('left'))))
                    cur.left = parseInt(g.target.css('left'));
                else
                    cur.left = 0;
            }
            if ($.inArray(g.current.dir, g.changeBy.l) > -1)
            {
                cur.left += g.current.diffX;
                g.current.diffLeft = g.current.diffX;

            }
            else if (applyToTarget)
            {
                delete cur.left;
            }
            if ($.inArray(g.current.dir, g.changeBy.t) > -1)
            {
                cur.top += g.current.diffY;
                g.current.diffTop = g.current.diffY;
            }
            else if (applyToTarget)
            {
                delete cur.top;
            }
            if ($.inArray(g.current.dir, g.changeBy.w) > -1)
            {
                cur.width += (g.current.dir.indexOf('w') == -1 ? 1 : -1) * g.current.diffX;
                g.current.newWidth = cur.width;
            }
            else if (applyToTarget)
            {
                delete cur.width;
            }
            if ($.inArray(g.current.dir, g.changeBy.h) > -1)
            {
                cur.height += (g.current.dir.indexOf('n') == -1 ? 1 : -1) * g.current.diffY;
                g.current.newHeight = cur.height;
            }
            else if (applyToTarget)
            {
                delete cur.height;
            }
            if (applyToTarget && p.animate)
                applyResultBody.animate(cur);
            else
                applyResultBody.css(cur);
        }
    });



})(jQuery);


(function ($)
{

    $.fn.quiToolBar = function (options)
    {
        return $.quiui.run.call(this, "quiToolBar", arguments);
    };

    $.fn.quiGetToolBarManager = function ()
    {
        return $.quiui.run.call(this, "quiGetToolBarManager", arguments);
    };

    $.quiDefaults.ToolBar = {};

    $.quiMethos.ToolBar = {};

    $.quiui.controls.ToolBar = function (element, options)
    {
        $.quiui.controls.ToolBar.base.constructor.call(this, element, options);
    };
    $.quiui.controls.ToolBar.quiExtend($.quiui.core.UIComponent, {
        __getType: function ()
        {
            return 'ToolBar';
        },
        __idPrev: function ()
        {
            return 'ToolBar';
        },
        _extendMethods: function ()
        {
            return $.quiMethos.ToolBar;
        },
        _render: function ()
        {
            var g = this, p = this.options;
            g.toolBar = $(this.element);
            g.toolBar.addClass("l-toolbar");
            g.set(p);
        },
        _setItems: function (items)
        {
            var g = this, p = this.options;
			 if(p.position=="right"){
				for(var i=$(items).length-1;i>=0;i--){
					g.addItem($(items)[i]);
				}
			}
			else{
				$(items).each(function (i, item)
	            {
	                g.addItem(item);
	            });
			}
        },
        addItem: function (item)
        {
            var g = this, p = this.options;
            if(item.visible!=null&&item.visible==false){
				return;
			}
			if (item.line)
            {
                if(p.position=="right"||item.position=="right"){
					g.toolBar.append('<div class="l-bar-separator-right"></div>');
				}
				else{
					g.toolBar.append('<div class="l-bar-separator"></div>');
				}
                return;
            }
            var ditem = $('<div class="l-panel-btn"><div class="l-panel-btn-l"></div><div class="l-panel-btn-r"></div></div>');
			if(p.position=="right"){
				ditem.addClass("l-toolbar-item-right");
			}
			else{
				if(item.position=="right"){
					ditem.addClass("l-toolbar-item-right");
				}
				else{
					ditem.addClass("l-toolbar-item");
				}
			}
			g.toolBar.append(ditem);
            item.id && ditem.attr("toolbarid", item.id);
            var iconCon;
			if (item.iconClass)
            {
                if(item.iconType){
					if(item.iconType=="awesome"){
						iconCon=$("<div class='l-icon'><i class='" + item.iconClass + "'></i></div>");
						iconCon.css("float","left");
						ditem.append(iconCon);
	               		ditem.addClass("l-toolbar-item-hasicon");
					}
				}
				else{
					iconCon=$("<div class='l-icon " + item.iconClass + "'></div>");
					iconCon.css("float","left");
					ditem.append(iconCon);
	                ditem.addClass("l-toolbar-item-hasicon");
				}
				
            }
            //item.text && $("span:first", ditem).html(item.text);
			if (item.text){
				iconCon.append(item.text);
			}
			if (item.disabled){
				ditem.css({
					"color":"#999999",
					"cursor":"default"
				})
				return;
			}
            item.click && ditem.click(function () { item.click(item); });
            ditem.hover(function ()
            {
                $(this).addClass("l-panel-btn-over");
            }, function ()
            {
                $(this).removeClass("l-panel-btn-over");
            });
        }
    });
})(jQuery);