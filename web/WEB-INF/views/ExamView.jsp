<%@ page language="java" pageEncoding="utf8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">

    <title>技师考试</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="Login">
    <!--
    <link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css">
    <script type="text/javascript" src="/ext/ext-all-debug.js"></script>
    <script type="text/javascript" src="/ext/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="/ext/ext-all-debug.js"></script>
    <script type="text/javascript" src="/ext/locale/ext-lang-zh_CN.js"></script>
    -->

    <!-- 引入ExtJs样式 -->
    <link rel="stylesheet" type="text/css"
          href="ext-6.2.0/build/classic/theme-neptune/resources/theme-neptune-all-debug.css">
    <!-- 引入ExtJs核心Js -->
    <script type="text/javascript" src="ext-6.2.0/build/classic/locale/locale-zh_CN.js"></script>
    <script type="text/javascript" src="ext-6.2.0/build/ext-all.js"></script>
    <script type="text/javascript" src="ext-6.2.0/build/classic/theme-neptune/theme-neptune.js"></script>


    <script type="text/javascript" src="/js/ExamView/Main.js"></script>


</head>

<body>


</body>
</html>
