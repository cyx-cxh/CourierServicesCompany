<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title></title>
    <!--框架必需start-->
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/jquery.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/language/cn.js"></script>
    <script type="text/javascript" src="${ctx}/resource/static/libs/js/framework.js"></script>
    <link href="${ctx}/resource/static/libs/css/import_basic.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" id="skin" prePath="./resource/static/" scrollerY="false"/>
    <link rel="stylesheet" type="text/css" id="customSkin"/>
    <!--框架必需end-->
<script type="text/javascript" src="${ctx}/resource/static/libs/js/popup/messager.js"></script>
    <!--弹出式提示框end-->
    <script>
        $(function () {
            //修正由于使用了tab导致高度计算不准确
            if (broswerFlag == "IE6") {
                setTimeout(function () {
                    top.iframeHeight('frmrightChild');
                }, 500)
            }
        })

        function customHeightSet(contentHeight) {
            if ($("#newsBox").width() < 420) {
                $("#newsBox").width(420);
            }
        }
    </script>
</head>
<body>
</body>
</html>