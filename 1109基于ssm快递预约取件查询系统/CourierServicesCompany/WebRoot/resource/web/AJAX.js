/**
 * Created by Administrator on 2016/11/15.
 */
function AJAX(url, msg, id) {
    $.ajax({
        cache: false,
        type: "post",
        url: url,
        data:$('#' + id).serialize(),// 你的formid
        async: false,
        success: function(data){
            easyDialog.open({
                container : {
                    header : '信息',
                    content : data.msg,
                    yesFn : btnFn,
                    noFn : true
                }
            });
        }
    });
}

var btnFn = function(){
    easyDialog.close();
    return false;
};



//刷新本页面
function AJAX2(url, msg, id) {
    $.ajax({
        cache: false,
        type: "post",
        url: url,
        data:$('#' + id).serialize(),// 你的formid
        async: false,
        success: function(data){
            if (data.flag){
                layer.msg(msg, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function(){
                    shuaxin2();
                    window.location.href = data.url;
                });
            }
        }
    });
}

function isJs(url, id) {
    $.ajax({
        cache: false,
        type: "post",
        url: url,
        data:$('#' + id).serialize(),// 你的formid
        async: false,
        success: function(data){
            if (data.flag){
                layer.msg(data.msg, {offset: '300px'},{
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function(){
                    shuaxin2();
                    alert(data.url)
                    window.location.href = data.url;
                });
            }
        }
    });
}

//刷新本页面
function login(url, id) {
    $.ajax({
        cache: false,
        type: "post",
        url: url,
        data:$('#' + id).serialize(),// 你的formid
        async: false,
        success: function(data){
            if (data.flag){
                layer.msg(data.msg, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function(){
                    shuaxin();
                    window.location.href = data.url;
                });
            }
        }
    });
}

function updateId(url, msg, id) {
    $.ajax({
        cache: false,
        type: "post",
        url: url,
        data:{id: id},// 你的formid
        async: false,
        success: function(data){
            if (data.flag){
                layer.msg(msg, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function(){
                    shuaxin2();
                    window.location.href = data.url;
                });
            }
        }
    });
}


function shuaxin() {
    window.parent.location.reload();
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

function shuaxin2() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}