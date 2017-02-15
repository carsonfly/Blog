<%@ page language="java" pageEncoding="utf8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">

    <title>信息发布系统</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="Login">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!--
    <link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css">
    <script type="text/javascript" src="/ext/ext-all-debug.js"></script>
    <script type="text/javascript" src="/ext/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="/ext/ext-all-debug.js"></script>
    <script type="text/javascript" src="/ext/locale/ext-lang-zh_CN.js"></script>
    -->

    <!-- 引入ExtJs样式 -->
    <link rel="stylesheet" type="text/css" href="ext-6.2.0/build/modern/theme-ios/resources/theme-ios-all-debug.css">
    <!-- 引入ExtJs核心Js -->

    <script type="text/javascript" src="ext-6.2.0/build/ext-modern-all-debug.js"></script>

    <script type="text/javascript" src="ext-6.2.0/build/modern/theme-ios/theme-ios-debug.js"></script>


    <script type="text/javascript" src="/js/BlogViewModern/HelloWorld.js"></script>


</head>

<body>


</body>
</html>
