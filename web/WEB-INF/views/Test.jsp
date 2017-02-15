<%@ page language="java" pageEncoding="utf8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">

    <title>个人博客</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="Login">
    <!-- 引入ExtJs样式 -->
    <link rel="stylesheet" type="text/css" href="ext-6.2.0/build/modern/theme-windows/resources/theme-windows-all.css">
    <!-- 引入ExtJs核心Js -->

    <script type="text/javascript" src="<%=basePath %>ext-6.2.0/ext-bootstrap.js"></script>
    <script type="text/javascript" src="<%=basePath %>ext-6.2.0/build/ext-all.js"></script>
    <!-- 页面Js -->
    <script type="text/javascript" src="js/ext6/HelloWorld.js"></script>


</head>

<body>


</body>
</html>
